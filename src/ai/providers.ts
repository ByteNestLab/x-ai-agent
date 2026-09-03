import type { ReplyOptions, TweetGenerationOptions } from "../types/index.js";

export interface AIProvider {
  readonly name: string;
  generateTweet(options: TweetGenerationOptions): Promise<string>;
  rewriteTweet(tweet: string, style: TweetGenerationOptions["tone"]): Promise<string>;
  generateReplies(options: ReplyOptions): Promise<string[]>;
}

export class MockAIProvider implements AIProvider {
  readonly name = "mock";

  async generateTweet(options: TweetGenerationOptions): Promise<string> {
    const keywordText = options.keywords?.length ? ` ${options.keywords.map((word) => `#${word.replace(/\s+/g, "")}`).join(" ")}` : "";
    const prefix = options.tone === "professional" ? "A practical perspective:" : "A useful idea:";
    return `${prefix} ${options.topic} for ${options.audience}.${keywordText}`.slice(0, options.length === "short" ? 140 : options.length === "medium" ? 220 : 280);
  }

  async rewriteTweet(tweet: string, style: TweetGenerationOptions["tone"]): Promise<string> {
    const lead = style === "concise" ? "In short:" : style === "educational" ? "Key lesson:" : `${style[0].toUpperCase()}${style.slice(1)} take:`;
    return `${lead} ${tweet}`.slice(0, 280);
  }

  async generateReplies(options: ReplyOptions): Promise<string[]> {
    const objective = options.objective === "start-conversation" ? "What has your experience been?" : "This is a useful point to explore further.";
    return [
      `${objective} From a ${options.persona} perspective, I would add one practical example.`,
      `Building on this: the important trade-off is context, consistency, and measurable outcomes.`,
      `Thanks for sharing this. A small experiment could help validate the idea with the right audience.`
    ];
  }
}

export class OpenAIProvider implements AIProvider {
  readonly name = "openai";
  constructor(private readonly apiKey = process.env.OPENAI_API_KEY) {}
  private unavailable(): never { throw new Error("OpenAI adapter is an interface placeholder. Add an API client and configure OPENAI_API_KEY."); }
  async generateTweet(_options: TweetGenerationOptions): Promise<string> { this.unavailable(); }
  async rewriteTweet(_tweet: string, _style: TweetGenerationOptions["tone"]): Promise<string> { this.unavailable(); }
  async generateReplies(_options: ReplyOptions): Promise<string[]> { this.unavailable(); }
}

export class GeminiProvider extends OpenAIProvider { readonly name = "gemini"; }
export class ClaudeProvider extends OpenAIProvider { readonly name = "claude"; }
