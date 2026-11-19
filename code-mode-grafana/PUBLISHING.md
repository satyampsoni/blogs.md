# Publishing settings

## Page title and H1

From tool calls to Code Mode with NitroStack and Grafana

## Suggested URL slug

`code-mode-nitrostack-grafana`

## Meta description

Design Code Mode investigations with NitroStack and Grafana, including observability adapters, access controls, execution limits, and operational monitoring.

## Article excerpt

Follow the design of an incident-investigation workflow that coordinates metrics, deployment records, and logs through Code Mode. Use NitroStack to bound execution and Grafana to inspect its runtime, then plan the adapters, permissions, and failure behavior required for production.

## Article structure

1. TL;DR.
2. Tool calling, Code Mode history, and a worked investigation.
3. Business implications and the measurements needed to assess them.
4. A NitroStack walkthrough covering production data adapters, limits, reference-stack setup, dashboard reading, and generated programs.
5. Operational FAQs covering integrations, capacity, failures, authorization, writes, auditing, cost, and rollout.

## Assets and code

Keep the relative asset paths intact. The article includes two execution diagrams, a telemetry flow diagram, the guest JavaScript example, a TypeScript configuration excerpt, shell commands, and a PromQL expression. Diagrams have PNG images for publishing, with SVG and Mermaid sources beside them. Both replay dashboard screenshots remain in the assets directory for reference but are no longer embedded in the article.

Screenshots show actual executions over a synthetic service snapshot. Describe them accordingly. The expected investigation output is not a production incident or a comparative performance result.

## Editorial boundaries

The article presents a production architecture and identifies Incident Desk as its reference implementation. It does not claim that the included data comes from a production deployment. The provenance is stated once in the implementation section rather than repeated in reader-facing FAQs.

Model-driven program generation uses an external MCP client and is described separately. The client process needs its own Prometheus scrape target if its measurements are to appear in Grafana. Live observability adapters, durable audit storage, and production access policies are described as integrations to implement, not existing features of this repository.

Do not claim measured token or cost savings from these screenshots. Preserve the distinction between execution success and answer correctness in the TL;DR, walkthrough, and FAQs.

The configuration excerpt demonstrates base SDK options. The application adds admission control and telemetry in its runtime wrapper. It is not a replacement for the full runtime file.

## Publishing

Set the title, description, and slug in the CMS, and establish a canonical URL once the article is published. Retain source and application links. Visible FAQs do not guarantee an FAQ rich result in search.
