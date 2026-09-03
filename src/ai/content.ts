import { z } from "zod";
import type { TweetGenerationOptions, TweetResult } from "../types/index.js";
import type { AIProvider } from "./providers.js";

export const tweetGenerationSchema = z.object({
  topic: z.string().trim().min(3),
  audience: z.string().trim().min(2),
  tone: z.enum(["professional", "casual", "humorous", "educational", "provocative", "concise"]),
  language: z.enum(["en", "zh", "ja", "es", "fr"]),
  length: z.enum(["short", "medium", "long"]),
  keywords: z.array(z.string().trim().min(1)).max(8).optional()
});

export async function generateTweet(options: TweetGenerationOptions, provider: AIProvider): Promise<TweetResult> {
  const input = tweetGenerationSchema.parse(options);
  const content = await provider.generateTweet(input);
  const hashtags = input.keywords?.map((keyword) => `#${keyword.replace(/\\s+/g, "")}`) ?? [];
  const alternatives = await Promise.all([
    provider.generateTweet({ ...input, tone: "concise" }),
    provider.generateTweet({ ...input, tone: "educational" })
  ]);
  return { content, alternatives, hashtags, metadata: { provider: provider.name, characterCount: content.length, generatedAt: new Date().toISOString() } };
}
