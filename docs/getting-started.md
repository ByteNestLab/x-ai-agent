# Getting Started with X AI Agent

This guide gets a local X/Twitter AI Agent workflow running without an X API key.

## Install

```bash
npm install
npm run build
npm test
```

## Generate a draft

```ts
import { generateTweet, MockAIProvider } from "x-ai-agent";
const draft = await generateTweet({ topic: "content systems", audience: "creators", tone: "casual", language: "en", length: "short" }, new MockAIProvider());
console.log(draft.content);
```

The mock provider is deterministic enough for development. Add a real provider only after reviewing its data handling and terms.
