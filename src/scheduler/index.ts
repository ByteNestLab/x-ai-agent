import { z } from "zod";
import type { ScheduleOptions, ScheduledTweet } from "../types/index.js";

const scheduleSchema = z.object({
  content: z.string().trim().min(1).max(280),
  scheduledAt: z.union([z.string().datetime({ offset: true }), z.date()]),
  timezone: z.string().trim().min(1),
  retryPolicy: z.object({ maxAttempts: z.number().int().min(0).max(10).optional(), backoffMs: z.number().int().min(0).optional() }).optional(),
  randomizationWindowMinutes: z.number().int().min(0).max(120).optional()
});

export class TweetScheduler {
  private readonly queue = new Map<string, ScheduledTweet>();

  scheduleTweet(options: ScheduleOptions): ScheduledTweet {
    const input = scheduleSchema.parse(options);
    const date = input.scheduledAt instanceof Date ? input.scheduledAt : new Date(input.scheduledAt);
    if (Number.isNaN(date.getTime())) throw new Error("scheduledAt must be a valid date");
    const id = `tweet_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const task: ScheduledTweet = {
      id, content: input.content, scheduledAt: date.toISOString(), timezone: input.timezone, status: "queued",
      retryPolicy: { maxAttempts: input.retryPolicy?.maxAttempts ?? 3, backoffMs: input.retryPolicy?.backoffMs ?? 30_000 },
      randomizationWindowMinutes: input.randomizationWindowMinutes ?? 0
    };
    this.queue.set(id, task);
    return task;
  }

  list(): ScheduledTweet[] { return [...this.queue.values()]; }
  cancel(id: string): boolean { const task = this.queue.get(id); if (!task) return false; task.status = "cancelled"; return true; }
}
