import { createEngagementWorkflow, enqueuePost, approvePost } from "../src/index.js";
const workflow = createEngagementWorkflow({ keywords: ["typescript", "ai-agent"], maxRepliesPerDay: 5, requireApproval: true });
enqueuePost(workflow, "post_123", "A thoughtful, context-aware reply draft.");
approvePost(workflow, "post_123");
console.log(workflow);
