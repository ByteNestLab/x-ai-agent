#!/usr/bin/env node
import { AgentOrchestrator, MockAIProvider, TweetScheduler, calculateEngagementRate, generateReport } from "./index.js";

const args = process.argv.slice(2);
const [command, subcommand] = args;

function help(): void {
  console.log(`x-ai-agent - open source X/Twitter AI Agent toolkit\n\nCommands:\n  generate tweet   Generate a tweet with the mock provider\n  rewrite          Rewrite a tweet\n  reply            Suggest replies\n  schedule         Create a scheduled tweet\n  report           Calculate engagement metrics\n\nExamples:\n  x-ai-agent generate tweet --topic "AI workflows" --audience developers\n  x-ai-agent rewrite --tweet "Hello X" --style concise\n  x-ai-agent reply --tweet "What are you building?" --persona founder\n  x-ai-agent schedule --content "Ship small" --at 2030-01-01T10:00:00Z\n  x-ai-agent report --impressions 1000 --likes 70 --replies 10 --reposts 5 --bookmarks 15`);
}

function value(flag: string, fallback = ""): string { const index = args.indexOf(flag); return index >= 0 ? args[index + 1] ?? fallback : fallback; }

if (!command || command === "--help" || command === "-h") { help(); }
else if (command === "generate" && subcommand === "tweet") {
  const orchestrator = new AgentOrchestrator(new MockAIProvider());
  const result = await orchestrator.generateTweet({ topic: value("--topic", "AI automation"), audience: value("--audience", "developers"), tone: value("--tone", "educational") as "educational", language: value("--language", "en") as "en", length: value("--length", "medium") as "medium", keywords: value("--keywords").split(",").filter(Boolean) });
  console.log(JSON.stringify(result, null, 2));
} else if (command === "rewrite") {
  const result = await new AgentOrchestrator(new MockAIProvider()).rewriteTweet(value("--tweet", "Build useful things."), value("--style", "concise") as "concise");
  console.log(result);
} else if (command === "reply") {
  const result = await new AgentOrchestrator(new MockAIProvider()).generateReply({ originalTweet: value("--tweet", "What are you building?"), persona: value("--persona", "builder"), tone: value("--tone", "casual") as "casual", objective: value("--objective", "add-value") as "add-value" });
  console.log(JSON.stringify(result, null, 2));
} else if (command === "schedule") {
  const task = new TweetScheduler().scheduleTweet({ content: value("--content", "Hello X"), scheduledAt: value("--at", new Date(Date.now() + 86_400_000).toISOString()), timezone: value("--timezone", "UTC") });
  console.log(JSON.stringify(task, null, 2));
} else if (command === "report") {
  const metrics = { impressions: Number(value("--impressions", "0")), likes: Number(value("--likes", "0")), replies: Number(value("--replies", "0")), reposts: Number(value("--reposts", "0")), bookmarks: Number(value("--bookmarks", "0")), followers: Number(value("--followers", "0")) };
  console.log(JSON.stringify(generateReport(metrics), null, 2));
} else { help(); process.exitCode = 1; }
