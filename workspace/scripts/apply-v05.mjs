#!/usr/bin/env node
/** Merge v0.5 entries + verification upgrades into reference-manifest.json */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST = path.join(ROOT, "data/reference-manifest.json");
const ADDITIONS = path.join(ROOT, "data/v05-entries.json");
const VERIFIED_AT = "2026-08-13";
const PAPER = "https://arxiv.org/abs/2506.00250";

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const additions = JSON.parse(fs.readFileSync(ADDITIONS, "utf8"));
const ids = new Set(manifest.entries.map((e) => e.id));

let merged = 0;
for (const entry of additions) {
  if (ids.has(entry.id)) {
    console.warn(`skip duplicate id: ${entry.id}`);
    continue;
  }
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

const upgrades = [
  ["yasin-persian-base", (e) => {
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["persian-llama-7b", (e) => {
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["gpt-4-class", (e) => {
    e.status = "verified";
    e.links = { web: "https://platform.openai.com/docs" };
    e.notes = "Legacy GPT-4 class row; see gpt-41-class for PersianMedQA measured receipt.";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["taraz-benchmark", (e) => {
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["gemini-class", (e) => {
    e.status = "verified";
    e.links = { web: "https://deepmind.google/technologies/gemini/" };
    e.notes = "Generic Gemini class; see gemini-25-class and gemini-20-flash-class for PersianMedQA scores.";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["tlpc-corpus", (e) => {
    e.status = "verified";
    e.license = "see-model-card";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["alpaca-persian", (e) => {
    e.status = "verified";
    e.license = "see-model-card";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["islamicpcqa-benchmark", (e) => {
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["qwen3-class", (e) => {
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["llama33-class", (e) => {
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["biomistral-7b", (e) => {
    e.links.paper = "https://arxiv.org/abs/2402.10373";
  }],
];

for (const [id, fn] of upgrades) {
  patch(id, fn);
}

manifest.version = "0.5.0";
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
  `v0.5 apply — merged ${merged} · total ${manifest.entries.length} · ${JSON.stringify(statuses)}`
);
