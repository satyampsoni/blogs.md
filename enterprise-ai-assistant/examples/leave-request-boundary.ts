export type Principal = Readonly<{
  tenantId: string;
  subject: string;
  employeeId: string;
}>;
export type LeaveInput = Readonly<{
  startDate: string;
  endDate: string;
  reason: string;
}>;
export type LeaveResource = LeaveInput & Readonly<{
  tenantId: string;
  employeeId: string;
}>;
export type LeaveReceipt = Readonly<{ requestId: string; status: string }>;

export interface Services {
  // Verify the credential, issuer, audience, expiry, and relevant account state.
  // Resolve employeeId through a trusted tenant/directory mapping.
  authenticate(context: unknown): Promise<Principal>;
  // Validate dates/reason and reject arguments outside the self-service schema.
  parseInput(proposedInput: unknown): LeaveInput;
  // Evaluate current permissions for this principal, action, and resource.
  authorize(principal: Principal, action: 'leave:create', resource: LeaveResource): Promise<void>;
  // Resolve a server-held approval bound to this caller and exact operation.
  // Return its stable operation ID after checking validity and expiry.
  verifyApproval(
    principal: Principal,
    action: 'leave:create',
    resource: LeaveResource,
    approvalHandle: string,
  ): Promise<Readonly<{ operationId: string }>>;
  hr: {
    // The backend must enforce atomic deduplication for tenant/operation ID,
    // including concurrent calls and a retry after a lost response. Bind the
    // key to the payload and reject reuse with different parameters.
    createLeave(input: LeaveResource & Readonly<{ idempotencyKey: string }>): Promise<LeaveReceipt>;
  };
}

// An application boundary, not a complete OAuth/approval/HR implementation.
export async function createLeaveRequest(
  context: unknown,
  proposedInput: unknown,
  approvalHandle: string,
  services: Services,
): Promise<LeaveReceipt> {
  const principal = await services.authenticate(context);
  const input = services.parseInput(proposedInput);
  const resource = {
    ...input,
    tenantId: principal.tenantId,
    employeeId: principal.employeeId,
  };

  await services.authorize(principal, 'leave:create', resource);
  const approval = await services.verifyApproval(
    principal, 'leave:create', resource, approvalHandle,
  );

  return services.hr.createLeave({
    ...resource,
    idempotencyKey: approval.operationId,
  });
}
