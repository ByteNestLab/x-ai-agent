# Twitter Scheduling and X Posts

`TweetScheduler` validates a post, stores its ISO timestamp and timezone, and tracks `queued`, `published`, `failed`, or `cancelled` status. Retry policy and a small randomization window support ordinary timing experiments.

```ts
const task = scheduler.scheduleTweet({ content: "A useful post", scheduledAt: "2030-01-01T10:00:00Z", timezone: "UTC", retryPolicy: { maxAttempts: 2 } });
```

The MVP is in-memory. A worker and durable store belong in a future integration. Randomization must never be used to evade rate limits or anti-abuse systems.
