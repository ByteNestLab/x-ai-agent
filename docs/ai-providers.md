# AI Providers for a Twitter AI Agent

`AIProvider` makes the model vendor replaceable. The repository includes a runnable `MockAIProvider` plus OpenAI, Gemini, and Claude placeholders.

```ts
import { AgentOrchestrator, MockAIProvider } from "x-ai-agent";
const agent = new AgentOrchestrator(new MockAIProvider());
await agent.generateTweet({ topic: "agent design", audience: "developers", tone: "professional", language: "en", length: "medium" });
```

Production adapters should read credentials from environment variables, define timeout and retry behavior, redact sensitive context, and document provider retention terms. Do not put API keys in source code.
