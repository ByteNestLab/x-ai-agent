import { MockAIProvider, rewriteTweet } from "../src/index.js";
console.log(await rewriteTweet("Small experiments make better products.", "concise", new MockAIProvider()));
