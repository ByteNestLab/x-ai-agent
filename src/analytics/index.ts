import type { AnalyticsMetrics, AnalyticsReport } from "../types/index.js";

export function calculateEngagementRate(metrics: AnalyticsMetrics): number {
  if (metrics.impressions <= 0) return 0;
  const interactions = metrics.likes + metrics.replies + metrics.reposts + metrics.bookmarks;
  return Number(((interactions / metrics.impressions) * 100).toFixed(2));
}

export function generateReport(metrics: AnalyticsMetrics): AnalyticsReport {
  const engagementRate = calculateEngagementRate(metrics);
  const generatedAt = new Date().toISOString();
  const markdown = [
    "# X Content Analytics Report", "", `- Impressions: ${metrics.impressions}`, `- Likes: ${metrics.likes}`,
    `- Replies: ${metrics.replies}`, `- Reposts: ${metrics.reposts}`, `- Bookmarks: ${metrics.bookmarks}`,
    `- Followers: ${metrics.followers}`, `- Engagement rate: ${engagementRate}%`
  ].join("\\n");
  return { metrics, engagementRate, generatedAt, markdown };
}
