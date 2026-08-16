#!/usr/bin/env node
/** v0.13 — normalize measured receipts + 5 Table 4 additions (PersianMedQA paper) */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST = path.join(ROOT, "data/reference-manifest.json");
const PAPER_PM = "https://arxiv.org/abs/2506.00250";
const PAPER_BELE = "https://arxiv.org/abs/2401.06466";
const AS_OF = "2025-06";
const VERIFIED_AT = "2026-08-16";

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

function pmqReceipt(faScore, table = "Table 4") {
  return {
    name: "PersianMedQA (Persian)",
    benchmark: "PersianMedQA",
    metric: "accuracy",
    value: String(faScore),
    score: String(faScore),
    unit: "percent",
    language: "fa",
    conditions: `zero-shot MCQ, Persian split (Fa), ${table}, arxiv:2506.00250`,
    asOf: AS_OF,
    receipt: "paper",
    source: PAPER_PM,
    url: PAPER_PM,
    publication: PAPER_PM,
  };
}

function normalizeBenchmark(b, entry) {
  const name = String(b.name || "");
  const isPMQ = name.includes("PersianMedQA");
  const isBele = name.includes("Belebele");
  const benchmark = isPMQ ? "PersianMedQA" : isBele ? "Belebele" : name.replace(/\s*\(.*\)\s*$/, "").trim();
  const publication = isPMQ ? PAPER_PM : isBele ? PAPER_BELE : b.publication || b.url || entry.links?.paper;
  const conditions =
    b.conditions ||
    (isPMQ
      ? "zero-shot MCQ, Persian split (Fa), Table 4, arxiv:2506.00250"
      : isBele
        ? "zero-shot, Persian (Fas), Belebele benchmark, arxiv:2401.06466"
        : "see source");
  return {
    ...b,
    benchmark,
    metric: b.metric || "accuracy",
    value: b.value ?? b.score,
    score: b.score ?? b.value,
    unit: b.unit || "percent",
    language: b.language || (isPMQ || isBele ? "fa" : undefined),
    conditions,
    source: b.source || b.url || publication,
    url: b.url || b.source || publication,
    publication,
  };
}

let normalized = 0;
for (const e of manifest.entries) {
  if (e.status !== "measured" || !e.benchmarks?.length) continue;
  e.benchmarks = e.benchmarks.map((b) => {
    const next = normalizeBenchmark(b, e);
    if (JSON.stringify(next) !== JSON.stringify(b)) normalized++;
    return next;
  });
}

const NEW_MEASURED = [
  {
    id: "gpt-41-mini-class",
    kind: "model",
    class: "multilingual-frontier",
    name: { en: "GPT-4.1 Mini class (proprietary)", fa: "ردهٔ جی‌پی‌تی ۴.۱ مینی" },
    org: "OpenAI",
    sizeB: null,
    license: "proprietary",
    status: "measured",
    summary: {
      en: "OpenAI GPT-4.1 Mini tier on PersianMedQA Persian split (74.76%, paper Table 4).",
      fa: "ردهٔ GPT-4.1 Mini در PersianMedQA فارسی (۷۴٫۷۶٪، جدول ۴ مقاله).",
    },
    links: { web: "https://platform.openai.com/docs", paper: PAPER_PM },
    origin: { base: "GPT-4.1", persianTraining: "multilingual-pretrain" },
    benchmarks: [pmqReceipt("74.76")],
    verifiedAt: VERIFIED_AT,
    gapTags: ["measured-evidence", "medical-eval"],
  },
  {
    id: "claude-35-haiku-class",
    kind: "model",
    class: "multilingual-frontier",
    name: { en: "Claude 3.5 Haiku class (proprietary)", fa: "ردهٔ کلود ۳.۵ هایکو" },
    org: "Anthropic",
    sizeB: null,
    license: "proprietary",
    status: "measured",
    summary: {
      en: "Anthropic Claude 3.5 Haiku on PersianMedQA Persian split (57.16%, paper Table 4).",
      fa: "کلود ۳.۵ هایکو در PersianMedQA فارسی (۵۷٫۱۶٪، جدول ۴ مقاله).",
    },
    links: { web: "https://www.anthropic.com/", paper: PAPER_PM },
    origin: { base: "Claude-3.5", persianTraining: "multilingual-pretrain" },
    benchmarks: [pmqReceipt("57.16")],
    verifiedAt: VERIFIED_AT,
    gapTags: ["measured-evidence", "medical-eval"],
  },
  {
    id: "gemma-3-12b-it-class",
    kind: "model",
    class: "multilingual-frontier",
    name: { en: "Gemma 3 12B IT class", fa: "جمّا ۳ ۱۲بی دستوری" },
    org: "Google",
    sizeB: 12,
    license: "open-weights",
    status: "measured",
    summary: {
      en: "Gemma 3 12B instruct on PersianMedQA Persian split (52.22%, paper Table 4).",
      fa: "جمّا ۳ ۱۲بی دستوری در PersianMedQA فارسی (۵۲٫۲۲٪، جدول ۴ مقاله).",
    },
    links: { hf: "https://huggingface.co/google/gemma-3-12b-it", paper: PAPER_PM },
    origin: { base: "Gemma-3", persianTraining: "multilingual-pretrain" },
    benchmarks: [pmqReceipt("52.22")],
    verifiedAt: VERIFIED_AT,
    gapTags: ["measured-evidence", "medical-eval", "open-weights", "small-model"],
  },
  {
    id: "cohere-command-r7b-class",
    kind: "model",
    class: "multilingual-frontier",
    name: { en: "Cohere Command R7B class", fa: "کوهیر کامند R7B" },
    org: "Cohere",
    sizeB: 7,
    license: "proprietary",
    status: "measured",
    summary: {
      en: "Cohere Command R7B on PersianMedQA Persian split (38.77%, paper Table 4).",
      fa: "کوهیر کامند R7B در PersianMedQA فارسی (۳۸٫۷۷٪، جدول ۴ مقاله).",
    },
    links: { web: "https://cohere.com/", paper: PAPER_PM },
    origin: { base: "Command-R", persianTraining: "multilingual-pretrain" },
    benchmarks: [pmqReceipt("38.77")],
    verifiedAt: VERIFIED_AT,
    gapTags: ["measured-evidence", "medical-eval", "small-model"],
  },
  {
    id: "mistral-nemo-instruct",
    kind: "model",
    class: "multilingual-frontier",
    name: { en: "Mistral Nemo Instruct", fa: "میسترال نمو دستوری" },
    org: "Mistral AI",
    sizeB: 12,
    license: "Apache-2.0",
    status: "measured",
    summary: {
      en: "Mistral Nemo instruct on PersianMedQA Persian split (36.23%, paper Table 4).",
      fa: "میسترال نمو دستوری در PersianMedQA فارسی (۳۶٫۲۳٪، جدول ۴ مقاله).",
    },
    links: {
      hf: "https://huggingface.co/mistralai/Mistral-Nemo-Instruct-2407",
      paper: PAPER_PM,
    },
    origin: { base: "Mistral-Nemo", persianTraining: "multilingual-pretrain" },
    benchmarks: [pmqReceipt("36.23")],
    verifiedAt: VERIFIED_AT,
    gapTags: ["measured-evidence", "medical-eval", "open-weights"],
  },
];

const ids = new Set(manifest.entries.map((e) => e.id));
let added = 0;
for (const entry of NEW_MEASURED) {
  if (ids.has(entry.id)) continue;
  manifest.entries.push(entry);
  ids.add(entry.id);
  added++;
}

manifest.version = "0.13.0";
manifest.generatedAt = new Date().toISOString();

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");

const measured = manifest.entries.filter((e) => e.status === "measured");
console.log(
  `v0.13 apply — normalized benches touched ${normalized} · added ${added} measured · total measured ${measured.length}`
);
