import { z } from "zod";
import type { ReplyOptions, ReplyResult } from "../types/index.js";
import type { AIProvider } from "./providers.js";

const replySchema = z.object({
  originalTweet: z.string().trim().min(1).max(1000),
  persona: z.string().trim().min(2),
  tone: z.enum(["professional", "casual", "humorous", "educational", "provocative", "concise"]),
  objective: z.enum(["add-value", "start-conversation", "support", "disagree"])
});

export async function generateReply(options: ReplyOptions, provider: AIProvider): Promise<ReplyResult> {
  const input = replySchema.parse(options);
  const replies = await provider.generateReplies(input);
  return { replies: replies.slice(0, 3), metadata: { provider: provider.name, generatedAt: new Date().toISOString() } };
}
