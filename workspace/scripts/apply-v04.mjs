#!/usr/bin/env node
/** Merge v0.4 entries + verification upgrades into reference-manifest.json */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST = path.join(ROOT, "data/reference-manifest.json");
const ADDITIONS = path.join(ROOT, "data/v04-entries.json");
const VERIFIED_AT = "2026-08-13";

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

const upgrades = [
  ["maral-7b", (e) => {
    e.license = "MIT";
    e.status = "verified";
    e.origin = { base: "Mistral-7B-v0.1", persianTraining: "SFT" };
    e.verifiedAt = VERIFIED_AT;
  }],
  ["persian-phi", (e) => {
    e.license = "Apache-2.0";
    e.sizeB = 3.8;
    e.status = "verified";
    e.links = { paper: "https://arxiv.org/abs/2512.07454", hf: "https://huggingface.co/amirakhlaghiqqq/PersianPhi" };
    e.origin = { base: "Phi-3-mini-4k-instruct", persianTraining: "SFT" };
    e.verifiedAt = VERIFIED_AT;
  }],
  ["yasin-persian-base", (e) => {
    e.sizeB = 0.15;
    e.license = "YRSL-restricted";
    e.notes = "Small custom decoder (~152M params); YRSL v1.0 restricted license — not frontier native-foundation scale.";
  }],
  ["ava-llama3-v2", (e) => {
    e.license = "MIT";
    e.status = "verified";
    e.origin = { base: "Llama-3-8B", persianTraining: "fine-tune" };
    e.verifiedAt = VERIFIED_AT;
  }],
  ["persian-llama-7b", (e) => {
    e.license = "Llama-2-community";
    e.origin = { base: "Llama-2-7B", persianTraining: "LoRA-SFT" };
  }],
  ["matina-corpus", (e) => {
    e.license = "CC-BY-NC-ND-4.0";
    e.status = "verified";
    e.links = {
      paper: "https://arxiv.org/html/2502.09188v1",
      hf: "https://huggingface.co/datasets/MatinaAI/matina_persian_text_corpus",
    };
    e.corpus = { class: "curated-persian-text", licensedBooks: false, tokensB: 73 };
    e.verifiedAt = VERIFIED_AT;
  }],
  ["mizan-leaderboard", (e) => {
    e.links = { web: "https://huggingface.co/spaces/MCINext/mizan-llm-leaderboard" };
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["open-persian-llm-leaderboard", (e) => {
    e.links = { web: "https://huggingface.co/spaces/PartAI/open-persian-llm-leaderboard" };
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["elab-benchmark", (e) => {
    e.links = {
      paper: "https://arxiv.org/abs/2504.12553",
      web: "https://huggingface.co/spaces/MCILAB/LLM_Alignment_Evaluation",
    };
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["gemma3-persian", (e) => {
    e.license = "Apache-2.0";
    e.sizeB = 4;
    e.status = "verified";
    e.links = {
      ollama: "https://ollama.com/mshojaei77/gemma3persian",
      hf: "https://huggingface.co/mshojaei77/gemma-3-4b-persian-v0",
    };
    e.origin = { base: "google/gemma-3-4b-it", persianTraining: "fine-tune" };
    e.verifiedAt = VERIFIED_AT;
  }],
  ["dorna2-llama31-8b", (e) => {
    e.license = "Llama-3.1-community";
    e.status = "verified";
    e.links = {
      hf: "https://huggingface.co/PartAI/Dorna2-Llama3.1-8B-Instruct",
      leaderboard: "https://huggingface.co/spaces/PartAI/open-persian-llm-leaderboard",
    };
    e.origin = { base: "Llama-3.1-8B-Instruct", persianTraining: "continued-pretrain+SFT" };
    e.verifiedAt = VERIFIED_AT;
    delete e.links.paper;
  }],
  ["persian-ollama-index", (e) => {
    e.license = "GPL-3.0";
    e.status = "verified";
    e.verifiedAt = VERIFIED_AT;
  }],
  ["dorna-4bit-quantized", (e) => {
    e.license = "Llama-3-community";
    e.status = "verified";
    e.origin = { base: "PartAI/Dorna-Llama3-8B-Instruct", persianTraining: "quantized-4bit" };
    e.verifiedAt = VERIFIED_AT;
  }],
  ["persian-biomedical-llm", (e) => {
    e.id = "biopars";
    e.name = { en: "BioPars — Persian biomedical LLM", fa: "بیوپارس — مدل زیست‌پزشکی فارسی" };
    e.org = "Research";
    e.license = "CC-BY-NC-ND-4.0";
    e.status = "verified";
    e.summary = {
      en: "BioPars biomedical LLM for Persian clinical QA; Nature Scientific Reports + GitHub code.",
      fa: "مدل زیست‌پزشکی بیوپارس برای پرسش‌وپاسخ بالینی فارسی؛ مقالهٔ Nature + گیت‌هاب.",
    };
    e.links = {
      paper: "https://www.nature.com/articles/s41598-026-55970-3",
      repo: "https://github.com/amirap80/BioPars",
    };
    e.origin = { base: "custom-biomedical", persianTraining: "domain-pretrain" };
    e.verifiedAt = VERIFIED_AT;
    ids.delete("persian-biomedical-llm");
    ids.add("biopars");
  }],
  ["dorna-llama3-8b", (e) => {
    e.benchmarks = e.benchmarks || [];
    const hasMed = e.benchmarks.some((b) => b.name?.includes("PersianMedQA"));
    if (!hasMed) {
      e.benchmarks.push({
        name: "PersianMedQA (Persian)",
        score: "34.9",
        asOf: "2025-06",
        receipt: "paper",
        url: "https://arxiv.org/abs/2506.00250",
      });
    }
    if (e.links?.leaderboard?.includes("Open_Persian")) {
      e.links.leaderboard = "https://huggingface.co/spaces/PartAI/open-persian-llm-leaderboard";
    }
  }],
  ["dorna-llama3-8b-instruct", (e) => {
    if (e.links?.leaderboard?.includes("Open_Persian")) {
      e.links.leaderboard = "https://huggingface.co/spaces/PartAI/open-persian-llm-leaderboard";
    }
  }],
];

for (const [id, fn] of upgrades) {
  patch(id, fn);
}

manifest.version = "0.4.0";
manifest.generatedAt = new Date().toISOString();

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`v0.4 apply — merged ${merged} · total ${manifest.entries.length} entries`);
