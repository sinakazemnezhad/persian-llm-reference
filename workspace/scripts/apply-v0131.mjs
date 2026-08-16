#!/usr/bin/env node
/** v0.13.1 — fix Table 3 vs Table 4 receipt conditions */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MANIFEST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../data/reference-manifest.json");
const PAPER = "https://arxiv.org/abs/2506.00250";

const TABLE3_FIXES = {
  "gemini-20-flash-class":
    "selective-answering baseline, Persian split (Fa), Table 3, arxiv:2506.00250",
  "gemma-3-27b-it-class":
    "selective-answering, Persian split (Fa), Table 3, arxiv:2506.00250",
};

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
let fixed = 0;

for (const e of manifest.entries) {
  const cond = TABLE3_FIXES[e.id];
  if (!cond || e.status !== "measured") continue;
  for (const b of e.benchmarks || []) {
    if (!String(b.name || "").includes("PersianMedQA")) continue;
    b.conditions = cond;
    if (!e.links?.paper) e.links = { ...e.links, paper: PAPER };
    fixed++;
  }
}

manifest.version = "0.13.1";
manifest.generatedAt = new Date().toISOString();
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`v0.13.1 apply — fixed ${fixed} Table 3 conditions`);
