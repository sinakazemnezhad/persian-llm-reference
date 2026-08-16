#!/usr/bin/env node
/** Every manifest row must carry gapTags (v0.12 law) */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MANIFEST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../data/reference-manifest.json");
const data = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

const missing = data.entries.filter((e) => !e.gapTags?.length);
if (missing.length) {
  console.error("FAIL  entries without gapTags:", missing.map((e) => e.id).join(", "));
  process.exit(1);
}

const tags = data.gapMap?.tags || [];
const unmatched = tags.filter(
  (tag) => !data.entries.some((e) => (e.gapTags || []).includes(tag))
);
if (unmatched.length) {
  console.error("WARN  gapMap tags with zero entries:", unmatched.join(", "));
}

console.log(`PASS  validate-gap-coverage — ${data.entries.length} entries tagged`);
