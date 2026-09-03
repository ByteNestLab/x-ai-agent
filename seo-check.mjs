import { readFile } from "node:fs/promises";

const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
const required = ["X AI Agent", "Twitter AI Agent", "X automation", "Twitter automation", "AI tweet generator", "AI reply generator", "Twitter scheduling", "social media automation"];
const missing = required.filter((term) => !readme.toLowerCase().includes(term.toLowerCase()));
if (missing.length) { console.error(`SEO check failed. Missing: ${missing.join(", ")}`); process.exit(1); }
console.log(`SEO check passed: ${required.length} target phrases found in README.md.`);
