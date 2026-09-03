import { describe, expect, it } from "vitest";
import { MockAIProvider } from "../src/ai/providers.js";
import { generateTweet } from "../src/ai/content.js";
import { rewriteTweet } from "../src/ai/rewrite.js";
import { calculateEngagementRate } from "../src/analytics/index.js";
import { createEngagementWorkflow } from "../src/engagement/index.js";
import { TweetScheduler } from "../src/scheduler/index.js";
import { SafetyGuard } from "../src/safety/index.js";

describe("X AI Agent MVP", () => {
  it("validates tweet generation input", async () => {
    await expect(generateTweet({ topic: "x", audience: "", tone: "casual", language: "en", length: "short" }, new MockAIProvider())).rejects.toThrow();
  });
  it("generates tweet alternatives", async () => {
    const result = await generateTweet({ topic: "AI workflows", audience: "developers", tone: "educational", language: "en", length: "medium", keywords: ["ai"] }, new MockAIProvider());
    expect(result.alternatives).toHaveLength(2);
    expect(result.hashtags).toEqual(["#ai"]);
  });
  it("validates tweet rewrite", async () => {
    await expect(rewriteTweet("", "concise", new MockAIProvider())).rejects.toThrow();
    await expect(rewriteTweet("Build in public", "concise", new MockAIProvider())).resolves.toContain("In short");
  });
  it("calculates engagement rate", () => expect(calculateEngagementRate({ impressions: 1000, likes: 50, replies: 10, reposts: 20, bookmarks: 20, followers: 500 })).toBe(10));
  it("validates scheduler options", () => {
    const scheduler = new TweetScheduler();
    expect(() => scheduler.scheduleTweet({ content: "", scheduledAt: new Date(), timezone: "UTC" })).toThrow();
    expect(scheduler.scheduleTweet({ content: "Ship it", scheduledAt: new Date(Date.now() + 1000), timezone: "UTC" }).status).toBe("queued");
  });
  it("enforces safety limits and duplicate detection", () => {
    const guard = new SafetyGuard({ dailyLimit: 2 });
    expect(guard.validateAction({ type: "publish", content: "Buy now", dailyCount: 0 }).allowed).toBe(false);
    expect(guard.validateAction({ type: "publish", content: "Same message", recentContents: ["Same message"] }).reasons).toContain("Duplicate or near-duplicate content detected.");
    expect(guard.validateAction({ type: "publish", content: "ok", dailyCount: 2 }).allowed).toBe(false);
  });
  it("defaults engagement workflows to manual approval", () => expect(createEngagementWorkflow({ keywords: ["ai"], maxRepliesPerDay: 5 }).requireApproval).toBe(true));
});
