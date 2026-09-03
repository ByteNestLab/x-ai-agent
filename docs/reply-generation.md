# AI Reply Generator

Reply suggestions use the original post, a persona, a tone, and an objective such as `add-value` or `start-conversation`. The API returns up to three suggestions so a person can select and edit one.

```ts
const result = await generateReply({ originalTweet: "What are you learning?", persona: "curious founder", tone: "casual", objective: "start-conversation" }, new MockAIProvider());
console.log(result.replies);
```

Use an engagement queue and approval step for replies. Relevance matters more than volume.
