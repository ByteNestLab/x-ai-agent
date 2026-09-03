import { TweetScheduler } from "../src/index.js";
const scheduler = new TweetScheduler();
console.log(scheduler.scheduleTweet({ content: "Ship a small improvement today.", scheduledAt: "2030-01-01T10:00:00Z", timezone: "UTC", randomizationWindowMinutes: 10 }));
