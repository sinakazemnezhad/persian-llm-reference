#!/usr/bin/env node
/** PersianMedQA Table 4 scores — receipt: arxiv:2506.00250 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = path.resolve(__dirname, "../../data/reference-manifest.json");
const PAPER = "https://arxiv.org/abs/2506.00250";
const AS_OF = "2025-06";

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

function med(score) {
  return {
    name: "PersianMedQA (Persian)",
    score: String(score),
    asOf: AS_OF,
    receipt: "paper",
    url: PAPER,
  };
}

function patch(id, fn) {
  const row = manifest.entries.find((e) => e.id === id);
  if (!row) throw new Error(`missing entry: ${id}`);
  fn(row);
}

const measuredUpgrades = [
  ["qwen25-7b-instruct", (e) => {
    e.benchmarks = [med("39.99")];
  }],
  ["aya-expanse-8b", (e) => {
    e.benchmarks = [med("40.60")];
  }],
  ["dorna2-llama31-8b", (e) => {
    e.status = "measured";
    e.benchmarks = [med("34.87")];
    e.verifiedAt = e.verifiedAt || "2026-08-13";
  }],
  ["persianmind-v1", (e) => {
    const has = e.benchmarks?.some((b) => b.name?.includes("PersianMedQA"));
    if (!has) e.benchmarks.push(med("24.22"));
  }],
  ["claude-class", (e) => {
    e.status = "measured";
    e.links = { web: "https://docs.anthropic.com/" };
    e.benchmarks = [med("75.19")];
    e.verifiedAt = "2026-08-13";
  }],
  ["deepseek-v3-class", (e) => {
    e.status = "measured";
    e.benchmarks = [med("68.05")];
    e.verifiedAt = "2026-08-13";
  }],
  ["gemini-25-class", (e) => {
    e.status = "measured";
    e.benchmarks = [med("82.37")];
    e.verifiedAt = "2026-08-13";
  }],
  ["gemma3-persian", (e) => {
    e.status = "measured";
    e.benchmarks = [med("35.87")];
  }],
];

for (const [id, fn] of measuredUpgrades) patch(id, fn);

manifest.generatedAt = new Date().toISOString();
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");

const stats = {};
manifest.entries.forEach((e) => {
  stats[e.status] = (stats[e.status] || 0) + 1;
});
console.log(`measured pass — ${JSON.stringify(stats)}`);
