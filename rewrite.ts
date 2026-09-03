import { z } from "zod";
import type { Tone } from "../types/index.js";
import type { AIProvider } from "./providers.js";

const rewriteSchema = z.object({ tweet: z.string().trim().min(1).max(1000), style: z.enum(["professional", "casual", "humorous", "educational", "provocative", "concise"]) });

export async function rewriteTweet(tweet: string, style: Tone, provider: AIProvider): Promise<string> {
  const input = rewriteSchema.parse({ tweet, style });
  return provider.rewriteTweet(input.tweet, input.style);
}
