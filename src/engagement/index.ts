import { z } from "zod";
import type { EngagementWorkflow, EngagementWorkflowOptions } from "../types/index.js";

const workflowSchema = z.object({ keywords: z.array(z.string().trim().min(1)).min(1).max(20), maxRepliesPerDay: z.number().int().min(0).max(100), requireApproval: z.boolean().default(true) });

export function createEngagementWorkflow(options: EngagementWorkflowOptions): EngagementWorkflow {
  const input = workflowSchema.parse(options);
  return { id: `eng_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`, keywords: input.keywords, maxRepliesPerDay: input.maxRepliesPerDay, requireApproval: input.requireApproval, status: "draft", queue: [] };
}

export function enqueuePost(workflow: EngagementWorkflow, postId: string, suggestedReply?: string): EngagementWorkflow {
  if (workflow.queue.length >= workflow.maxRepliesPerDay) throw new Error("Daily engagement limit reached");
  workflow.queue.push({ postId, suggestedReply, approved: !workflow.requireApproval });
  return workflow;
}

export function approvePost(workflow: EngagementWorkflow, postId: string): boolean {
  const item = workflow.queue.find((entry) => entry.postId === postId);
  if (!item) return false;
  item.approved = true;
  return true;
}
