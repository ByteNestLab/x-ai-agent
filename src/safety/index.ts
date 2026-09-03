import type { ActionToValidate } from "../types/index.js";

export interface SafetyGuardOptions { dailyLimit?: number; duplicateSimilarity?: number; }
export interface SafetyValidation { allowed: boolean; warnings: string[]; reasons: string[]; }

export class SafetyGuard {
  private readonly dailyLimit: number;
  private readonly duplicateSimilarity: number;
  constructor(options: SafetyGuardOptions = {}) { this.dailyLimit = options.dailyLimit ?? 50; this.duplicateSimilarity = options.duplicateSimilarity ?? 0.88; }

  validateAction(action: ActionToValidate): SafetyValidation {
    const warnings: string[] = [];
    const reasons: string[] = [];
    if ((action.dailyCount ?? 0) >= this.dailyLimit) reasons.push(`Daily action limit of ${this.dailyLimit} reached.`);
    if (action.content && this.looksSpammy(action.content)) { warnings.push("Content contains repeated promotional language."); reasons.push("Spam-like content detected."); }
    if (action.content && action.recentContents?.some((existing) => this.similarity(action.content!, existing) >= this.duplicateSimilarity)) reasons.push("Duplicate or near-duplicate content detected.");
    if (action.type === "reply" || action.type === "follow" || action.type === "like") warnings.push("Review platform rules and approve engagement actions manually.");
    return { allowed: reasons.length === 0, warnings, reasons };
  }

  private looksSpammy(content: string): boolean { return /(buy now|limited offer|free money|click here)/i.test(content) || /https?:\/\/\S+.*https?:\/\/\S+/i.test(content); }

  private similarity(a: string, b: string): number {
    const left = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
    const right = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));
    if (!left.size || !right.size) return 0;
    const intersection = [...left].filter((token) => right.has(token)).length;
    return intersection / new Set([...left, ...right]).size;
  }
}
