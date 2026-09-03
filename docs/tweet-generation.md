# AI Tweet Generator

The tweet generator validates topic, audience, tone, language, length, and up to eight optional keywords. It returns a primary draft, two alternatives, hashtags, and metadata.

```ts
const result = await generateTweet({ topic: "open source growth", audience: "maintainers", tone: "educational", language: "en", length: "medium", keywords: ["opensource"] }, new MockAIProvider());
```

Character limits are applied by the provider; a live X adapter should perform a final platform-specific validation before publishing.
