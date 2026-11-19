# Publishing settings

## Page title and H1

From tool calls to Code Mode with NitroStack and Grafana

## Suggested URL slug

`code-mode-nitrostack-grafana`

## Meta description

Learn how Code Mode coordinates MCP tools, run an investigation with NitroStack, and inspect execution duration, failures, and tool activity in Grafana.

## Article excerpt

Code Mode lets a program coordinate tools and return selected findings to a model. Follow a service investigation, run it with NitroStack, and use Prometheus and Grafana to examine its execution. The article closes with FAQs on costs, measurements, and sandbox access.

## Article structure

1. TL;DR.
2. Tool calling, Code Mode history, and a worked investigation.
3. Business implications and the measurements needed to assess them.
4. A NitroStack walkthrough covering limits, setup, traffic generation, dashboard reading, and an optional AI client.
5. Frequently asked questions.

## Assets and code

Keep the relative asset paths intact. The article includes two execution diagrams, two dashboard screenshots, a telemetry flow diagram, the guest JavaScript example, a TypeScript configuration excerpt, shell commands, and a PromQL expression. Diagrams have PNG images for publishing, with SVG and Mermaid sources beside them.

Screenshots show actual executions over a synthetic service snapshot. Describe them accordingly. The expected investigation output is not a production incident or a comparative performance result.

## Editorial boundaries

The reviewed investigation runs without an LLM key. Model-driven program generation uses an external MCP client and is described separately. The client process needs its own Prometheus scrape target if its measurements are to appear in Grafana.

Do not claim measured token or cost savings from these screenshots. Preserve the distinction between execution success and answer correctness in the TL;DR, walkthrough, and FAQs.

The configuration excerpt demonstrates base SDK options. The application adds admission control and telemetry in its runtime wrapper. It is not a replacement for the full runtime file.

## Publishing

Set the title, description, and slug in the CMS, and establish a canonical URL once the article is published. Retain source and application links. Visible FAQs do not guarantee an FAQ rich result in search.
