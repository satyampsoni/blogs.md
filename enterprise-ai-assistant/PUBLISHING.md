# Publishing settings

## Page title and H1

What It Takes to Build a Company AI Assistant

## Suggested URL slug

`building-company-ai-assistant`

## Meta description

Build a company AI assistant through prompts, RAG, MCP tools, authorization, guardrails, caching, model routing, observability, and release evaluations.

## Article excerpt

An employee assistant begins with an LLM API. Each new request exposes another responsibility: company knowledge, business actions, permissions, cost, and change control. Follow the architecture as it develops, with diagrams, an authorization-boundary example, and FAQs.

## Structure and audience

The article is for engineers and product leaders building employee assistants. It follows the user's supplied escalation story and keeps the existing collection format: TL;DR, narrative explanation, a NitroStack implementation section, and FAQs.

The employee assistant is an architectural walkthrough, not a customer deployment or a report of measured operating results. No production screenshots, benchmark numbers, company benefits policy, or actual employee records are presented.

The diagrams have PNG images for publishing, with SVG and Mermaid sources. Retain relative asset paths and descriptive alt text.

## Technical boundaries to preserve

- RAG supplies context but does not guarantee an accurate answer or enforce authorization by itself.
- A model-directed call cannot grant permissions. Backend policies apply independently of model behavior.
- Guardrails reduce risk; they are not a complete prompt-injection defense.
- Authorization and user intent are different. Bind approvals to the actor and exact action parameters.
- MCP tokens are audience-bound; downstream resource access requires appropriate credentials, not blind token passthrough.
- Semantic response caching must respect scope, source changes, revocation, and freshness. It is distinct from model prompt caching.
- Observability does not require unrestricted prompt logging. Logs and traces need their own access and retention policy.
- The TypeScript example defines an application boundary through injected interfaces. It does not implement OAuth, a policy engine, an approval service, or HR storage. Its adapters must meet the documented contracts.
- The HR backend owns atomic idempotency, including retries and concurrency. The example does not supply a transaction across services.
- NitroStack supplies the MCP tool/application layer; the other services remain application integrations.

## Publishing

Use the title, slug, and description in the CMS. Set the canonical URL when a publishing destination exists. Keep the visible FAQs; they do not guarantee search rich results.

The implementation and testing notes belong in editorial records, not inserted as research narration in the article.
