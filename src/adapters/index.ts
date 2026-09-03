export interface XAdapter {
  publish(content: string): Promise<{ id: string; url?: string }>;
  discover(query: string): Promise<Array<{ id: string; text: string }>>;
}

export class MockXAdapter implements XAdapter {
  async publish(content: string): Promise<{ id: string; url?: string }> { return { id: `mock_${Date.now()}`, url: `https://x.com/i/status/mock_${content.length}` }; }
  async discover(query: string): Promise<Array<{ id: string; text: string }>> { return [{ id: "mock_post_1", text: `Example result for ${query}` }]; }
}

export class OfficialXApiAdapter implements XAdapter {
  async publish(_content: string): Promise<{ id: string; url?: string }> { throw new Error("Official X API adapter is reserved for a future integration."); }
  async discover(_query: string): Promise<Array<{ id: string; text: string }>> { throw new Error("Official X API adapter is reserved for a future integration."); }
}

export class BrowserAutomationAdapter extends OfficialXApiAdapter {}
