#!/usr/bin/env node
/** v0.10 — measured wave (20+), Dorna receipt fix, ROADMAP stats */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST = path.join(ROOT, "data/reference-manifest.json");
const ADDITIONS = path.join(ROOT, "data/v10-entries.json");
const PAPER = "https://arxiv.org/abs/2506.00250";
const VERIFIED_AT = "2026-08-13";

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
  if (!row) {
    console.warn(`missing id for patch: ${id}`);
    return;
  }
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

function setMedScore(row, score) {
  const bench = med(score);
  const idx = (row.benchmarks || []).findIndex((b) => b.name?.includes("PersianMedQA"));
  if (idx >= 0) row.benchmarks[idx] = bench;
  else row.benchmarks = [...(row.benchmarks || []), bench];
  row.status = "measured";
}

// Dorna-Llama3 was not in PersianMedQA eval — remove mis-attributed Dorna2 score.
patch("dorna-llama3-8b", (e) => {
  e.benchmarks = (e.benchmarks || []).filter((b) => !b.name?.includes("PersianMedQA"));
  e.status = "verified";
  e.notes =
    "PersianMedQA paper evaluates Dorna2-LLaMA-3.1-8B separately (see dorna2-llama31-8b). Leaderboard link is live-receipt only.";
});

const measuredUpgrades = [
  ["biomistral-7b", (e) => setMedScore(e, "25.76")],
  ["llama33-class", (e) => setMedScore(e, "66.63")],
  ["meditron3-8b", (e) => setMedScore(e, "38.67")],
  ["llama-31-405b-class", (e) => setMedScore(e, "67.02")],
  ["dorna2-llama31-8b", (e) => setMedScore(e, "34.87")],
  ["persianmind-v1", (e) => setMedScore(e, "24.22")],
];

for (const [id, fn] of measuredUpgrades) patch(id, fn);

manifest.version = "0.10.0";
manifest.generatedAt = new Date().toISOString();

const kinds = {};
const classes = {};
const statuses = {};
for (const e of manifest.entries) {
  kinds[e.kind] = (kinds[e.kind] || 0) + 1;
  classes[e.class] = (classes[e.class] || 0) + 1;
  statuses[e.status] = (statuses[e.status] || 0) + 1;
}
manifest.stats = {
  total: manifest.entries.length,
  byKind: kinds,
  byClass: classes,
  byStatus: statuses,
};

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(
  `v0.10 apply — merged ${merged} · total ${manifest.entries.length} · measured ${statuses.measured || 0} · ${JSON.stringify(statuses)}`
);
