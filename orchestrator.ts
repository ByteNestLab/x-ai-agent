import { generateReply } from "../ai/reply.js";
import { generateTweet } from "../ai/content.js";
import { rewriteTweet } from "../ai/rewrite.js";
import type { AIProvider } from "../ai/providers.js";
import type { ReplyOptions, TweetGenerationOptions } from "../types/index.js";

export class AgentOrchestrator {
  constructor(private readonly provider: AIProvider) {}
  generateTweet(options: TweetGenerationOptions) { return generateTweet(options, this.provider); }
  rewriteTweet(tweet: string, style: TweetGenerationOptions["tone"]) { return rewriteTweet(tweet, style, this.provider); }
  generateReply(options: ReplyOptions) { return generateReply(options, this.provider); }
}
