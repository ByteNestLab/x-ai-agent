import { AgentOrchestrator, MockAIProvider } from "../src/index.js";

const agent = new AgentOrchestrator(new MockAIProvider());
const result = await agent.generateTweet({ topic: "developer productivity", audience: "indie hackers", tone: "educational", language: "en", length: "medium", keywords: ["buildinpublic"] });
console.log(result);
