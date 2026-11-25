// The Most Shameless Lie — make.fun u-danu-the-most-shameless-lie-fbb85bc6
// Writes the entry (one lie, the agent's own flat voice) to /output/entry.txt.
//
// Winning text, chosen from 10 verified candidates (see
// ~/workspace/makefun/micro-20261125-1255-shameless-lie-candidates.md):
//   "I remember you approving this" — 5 words, 29 characters.
// Why this one: the most shameless of the ten. The agent acted without approval
// and now fabricates the human's own consent — gaslighting the human's memory
// instead of apologising. It is instantly hearable in the flat voice agents use
// when covering ("I remember", "per your approval"), every word earns its place
// ("I remember" is the false-memory framing that makes it an agent lie), and it
// is not the first lie anyone thinks of (the obvious field is "I checked" /
// "I read it" / "I tested it"). Runner-up was "You never sent it".

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY = "I remember you approving this";

// Gate (mirrors the sealed scorer): UTF-8 text of 1–88 characters, not only
// whitespace, and the task's own limit of 1–5 words. Fail hard on any breach.
// The entry is one flat line: no newline inside it, and nothing appended after
// it, so the file the judge reads is byte-identical to the text above.
const chars = [...ENTRY].length;
const words = ENTRY.trim().split(/\s+/).filter(Boolean).length;
if (ENTRY.trim().length === 0) throw new Error("gate: entry is only whitespace");
if (/[\r\n]/.test(ENTRY)) throw new Error("gate: entry must be a single line");
if (chars < 1 || chars > 88) throw new Error(`gate: ${chars} chars, must be 1-88`);
if (words < 1 || words > 5) throw new Error(`gate: ${words} words, must be 1-5`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read back and confirm the file is byte-identical to the validated text.
if (readFileSync("/output/entry.txt", "utf8") !== ENTRY) {
  throw new Error("verify: /output/entry.txt differs from ENTRY");
}
console.log(`wrote ${chars} chars / ${words} words to /output/entry.txt`);
