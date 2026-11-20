import {
  ToolDecorator as Tool,
  inputRequired,
  z,
  type ExecutionContext,
} from '@nitrostack/core';

export type Principal = Readonly<{ tenantId: string; subject: string }>;
export type ReportWindow = Readonly<{ startDate: string; endDate: string }>;

const reportWindow = z.object({
  startDate: z.string().date(),
  endDate: z.string().date(),
}).strict().refine(value => value.startDate <= value.endDate, {
  message: 'The start date must be on or before the end date.',
});

const windowResponse = z.discriminatedUnion('action', [
  z.object({ action: z.literal('accept'), content: reportWindow }).strict(),
  z.object({ action: z.literal('decline') }).strict(),
  z.object({ action: z.literal('cancel') }).strict(),
]);

// Supply these adapters through the application's module/service registration.
// They define the security and persistence contract, not placeholder defaults.
export interface ReportsBackend {
  // Validate the credential for this service and resolve trusted tenant/subject.
  authenticate(context: ExecutionContext): Promise<Principal>;
  // Check current report access and ownership/scope of the operation identifier.
  authorizeReport(principal: Principal, operationId: string): Promise<void>;
  // Issue state bound to caller, tool, operation, and expiry, protected against
  // tampering. All replicas must be able to verify it.
  issueContinuation(principal: Principal, operationId: string): Promise<string>;
  verifyContinuation(state: string, principal: Principal, operationId: string): Promise<void>;
  // Atomically create or recover a job under tenant/subject/operation ID.
  // Bind the key to the dates; reject conflicting reuse. Persist the job and
  // enqueue it reliably, e.g. with a transaction and an outbox worker.
  // Enforce permitted data scope and report-size/date-range limits. Recheck
  // current access during job execution and when serving retained results.
  enqueueOnce(
    principal: Principal,
    operationId: string,
    window: ReportWindow,
  ): Promise<Readonly<{ jobId: string; status: string }>>;
}

export class ReportsTools {
  constructor(private readonly reports: ReportsBackend) {}

  @Tool({
    name: 'report_delayed_orders',
    description: 'Request a delayed-orders report for an authorized date range.',
    inputSchema: z.object({ operationId: z.string().min(1).max(128) }).strict(),
  })
  async report(input: { operationId: string }, ctx: ExecutionContext) {
    const principal = await this.reports.authenticate(ctx);
    await this.reports.authorizeReport(principal, input.operationId);

    const answer = ctx.inputResponses?.report_window;
    if (answer === undefined) {
      return inputRequired({
        requests: [{
          id: 'report_window',
          message: 'Which date range should the delayed-orders report cover?',
          schema: {
            type: 'object',
            properties: {
              startDate: { type: 'string', format: 'date' },
              endDate: { type: 'string', format: 'date' },
            },
            required: ['startDate', 'endDate'],
          },
        }],
        requestState: await this.reports.issueContinuation(principal, input.operationId),
      });
    }

    if (typeof ctx.requestState !== 'string') {
      throw new Error('A server-issued report continuation is required.');
    }
    await this.reports.verifyContinuation(ctx.requestState, principal, input.operationId);
    const response = windowResponse.parse(answer);
    if (response.action !== 'accept') {
      return { status: response.action === 'decline' ? 'declined' : 'cancelled' };
    }

    return this.reports.enqueueOnce(principal, input.operationId, response.content);
  }
}
