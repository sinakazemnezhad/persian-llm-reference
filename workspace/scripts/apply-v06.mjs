#!/usr/bin/env node
/** v0.6 — measured lift, firstSeen, gapTags, summary.fa polish */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST = path.join(ROOT, "data/reference-manifest.json");
const ADDITIONS = path.join(ROOT, "data/v06-entries.json");
const PAPER = "https://arxiv.org/abs/2506.00250";

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const additions = JSON.parse(fs.readFileSync(ADDITIONS, "utf8"));
const ids = new Set(manifest.entries.map((e) => e.id));

let merged = 0;
for (const entry of additions) {
  if (ids.has(entry.id)) continue;
  manifest.entries.push(entry);
  ids.add(entry.id);
  merged++;
}

function patch(id, fn) {
  const row = manifest.entries.find((e) => e.id === id);
  if (!row) return;
  fn(row);
}

function med(score) {
  return {
    name: "PersianMedQA (Persian)",
    score: String(score),
    asOf: "2025-06",
    receipt: "paper",
    url: PAPER,
  };
}

// PersianMedQA receipts for class rows (paper + project page)
patch("persianmind-v1", (e) => {
  if (!e.benchmarks?.some((b) => b.name?.includes("PersianMedQA"))) {
    e.benchmarks = [...(e.benchmarks || []), med("23.98")];
  }
});

const firstSeenModels = {
  "persianmind-v1": "2024-01",
  "dorna-llama3-8b": "2024-06",
  "dorna2-llama31-8b": "2025-01",
  "qwen25-7b-instruct": "2024-09",
  "maral-7b": "2023-06",
  "parsbert": "2020-05",
  "gaokerena-v": "2025-05",
  "meditron3-8b": "2024-11",
};
for (const [id, date] of Object.entries(firstSeenModels)) {
  patch(id, (e) => {
    e.firstSeen = e.firstSeen || date;
  });
}

manifest.gapMap.tags = [
  "native-foundation",
  "native-preference",
  "literary-eval",
  "instruct-stack",
];

const gapTagMap = {
  "yasin-persian-base": ["native-foundation"],
  "dorna-llama3-8b": ["instruct-stack"],
  "dorna2-llama31-8b": ["instruct-stack"],
  "parse-benchmark": ["literary-eval"],
  "taraz-benchmark": ["literary-eval"],
  "percul-benchmark": ["literary-eval"],
  "melac-benchmark": ["literary-eval"],
  "taarof-benchmark": ["literary-eval"],
  "ept-benchmark": ["native-preference"],
};
for (const [id, tags] of Object.entries(gapTagMap)) {
  patch(id, (e) => {
    e.gapTags = tags;
  });
}

manifest.meta.citations = [
  {
    type: "upstream-discovery",
    title: "Awesome-Persian-LLM",
    url: "https://github.com/MohammadHeydari/Awesome-Persian-LLM",
    maintainer: "Mohammad Heydari",
    note: "Discovery source credited for many PLR rows; reciprocal link pending maintainer PR.",
  },
];

manifest.version = "0.6.0";
manifest.generatedAt = new Date().toISOString();

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");
execSync("node scripts/polish-summary-fa.mjs", { cwd: path.join(ROOT, "workspace"), stdio: "inherit" });

const final = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const statuses = {};
for (const e of final.entries) statuses[e.status] = (statuses[e.status] || 0) + 1;
console.log(`v0.6 apply — merged ${merged} · total ${final.entries.length} · ${JSON.stringify(statuses)}`);
