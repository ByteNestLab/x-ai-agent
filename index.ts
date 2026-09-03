export type Tone = "professional" | "casual" | "humorous" | "educational" | "provocative" | "concise";
export type Language = "en" | "zh" | "ja" | "es" | "fr";

export interface TweetGenerationOptions {
  topic: string;
  audience: string;
  tone: Tone;
  language: Language;
  length: "short" | "medium" | "long";
  keywords?: string[];
}

export interface TweetResult {
  content: string;
  alternatives: string[];
  hashtags: string[];
  metadata: { provider: string; characterCount: number; generatedAt: string };
}

export interface ReplyOptions {
  originalTweet: string;
  persona: string;
  tone: Tone;
  objective: "add-value" | "start-conversation" | "support" | "disagree";
}

export interface ReplyResult {
  replies: string[];
  metadata: { provider: string; generatedAt: string };
}

export interface ScheduledTweet {
  id: string;
  content: string;
  scheduledAt: string;
  timezone: string;
  status: "queued" | "published" | "failed" | "cancelled";
  retryPolicy: { maxAttempts: number; backoffMs: number };
  randomizationWindowMinutes: number;
}

export interface ScheduleOptions {
  content: string;
  scheduledAt: string | Date;
  timezone: string;
  retryPolicy?: Partial<ScheduledTweet["retryPolicy"]>;
  randomizationWindowMinutes?: number;
}

export interface EngagementWorkflow {
  id: string;
  keywords: string[];
  maxRepliesPerDay: number;
  requireApproval: boolean;
  status: "draft" | "active" | "paused";
  queue: Array<{ postId: string; suggestedReply?: string; approved: boolean }>;
}

export interface EngagementWorkflowOptions {
  keywords: string[];
  maxRepliesPerDay: number;
  requireApproval?: boolean;
}

export interface AnalyticsMetrics {
  impressions: number;
  likes: number;
  replies: number;
  reposts: number;
  bookmarks: number;
  followers: number;
}

export interface AnalyticsReport {
  metrics: AnalyticsMetrics;
  engagementRate: number;
  generatedAt: string;
  markdown: string;
}

export interface ActionToValidate {
  type: "publish" | "reply" | "follow" | "like";
  content?: string;
  recentContents?: string[];
  dailyCount?: number;
}
