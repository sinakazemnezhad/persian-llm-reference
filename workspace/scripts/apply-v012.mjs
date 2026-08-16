#!/usr/bin/env node
/** v0.12 — decision+gap release: gapTags coverage + FA copy cleanup (no score changes) */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST = path.join(ROOT, "data/reference-manifest.json");
const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

const LITERARY_EVAL = new Set([
  "parse-benchmark",
  "taraz-benchmark",
  "percul-benchmark",
  "melac-benchmark",
  "taarof-benchmark",
  "elab-benchmark",
  "ept-benchmark",
  "khayyam-persianmmlu",
  "parsi-nlu",
  "pquad-dataset",
]);

const MEDICAL = new Set([
  "persianmedqa",
  "biopars",
  "biomistral-7b",
  "meditron3-8b",
  "meditron3-qwen25-7b",
  "gaokerena-v",
  "gaokerena-mf3qa",
  "open-ensemble-persianmedqa",
]);

const INSTRUCTION_DATA = new Set([
  "farsinstruct",
  "alpaca-persian",
  "persian-synthetic-instruct",
  "farsi-synthetic-data",
  "matina-corpus",
  "tlpc-corpus",
  "oscar-2201-corpus",
  "wikimedia-fa-wikipedia",
  "persianmhqa-dataset",
  "islamicpcqa-benchmark",
]);

function isOpenLicense(license = "") {
  const l = license.toLowerCase();
  if (!l || l.includes("proprietary")) return false;
  if (l === "research" || l === "see-paper" || l.includes("restricted")) return false;
  return true;
}

function hasPersianMedQA(e) {
  return (e.benchmarks || []).some((b) => String(b.name || "").includes("PersianMedQA"));
}

function assignGapTags(e) {
  const tags = new Set(e.gapTags || []);

  if (e.class === "native-foundation") tags.add("native-foundation");
  if (e.class === "adapted-instruct") tags.add("instruct-stack");
  if (LITERARY_EVAL.has(e.id)) tags.add("literary-eval");
  if (["ept-benchmark", "percul-benchmark", "taarof-benchmark"].includes(e.id)) {
    tags.add("native-preference");
  }

  if (
    MEDICAL.has(e.id) ||
    hasPersianMedQA(e) ||
    /medical|biomed|پزشک/i.test(e.summary?.en || "") ||
    /پزشک|زیست‌پزشک/i.test(e.summary?.fa || "")
  ) {
    tags.add("medical-eval");
  }

  if (e.kind === "model" && e.sizeB != null && e.sizeB <= 8 && isOpenLicense(e.license)) {
    tags.add("small-model");
  }

  if (e.kind === "dataset" && (e.id.includes("benchmark") || e.class === "dataset")) {
    if (e.id.includes("benchmark") || LITERARY_EVAL.has(e.id)) tags.add("public-benchmark");
  }
  if (e.kind === "leaderboard") tags.add("public-benchmark");

  if (INSTRUCTION_DATA.has(e.id) || e.id.includes("instruct") || e.id.includes("synthetic")) {
    tags.add("instruction-data");
  }
  if (e.class === "adapted-instruct" || e.id.endsWith("-instruct")) tags.add("instruction-data");

  if (e.status === "measured") tags.add("measured-evidence");
  if (isOpenLicense(e.license) && e.kind === "model") tags.add("open-weights");

  if (e.kind === "community-index") tags.add("ecosystem-index");
  if (e.class === "encoder-only") tags.add("encoder-stack");

  if (tags.size === 0) tags.add("cataloged");

  return [...tags].sort();
}

function cleanFaText(text) {
  if (!text) return text;
  let s = text
    .replace(/\s*—\s*/g, "، ")
    .replace(/\s*–\s*/g, "، ")
    .replace(/·/g, "، ")
    .replace(/معیار سنجش:\s*/g, "")
    .replace(/مجموعه‌دادهٔ فارسی —\s*/g, "مجموعه‌دادهٔ فارسی. ")
    .replace(/\s{2,}/g, " ")
    .trim();
  s = s.replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
  return s;
}

manifest.gapMap = {
  en: [
    "No frontier-scale model whose first world is licensed Persian literature",
    "Few native-rater preference loops at production scale",
    "Literary register and book-memory evals remain sparse",
    "Most open models are English-base adaptations under 15B",
    "Medical QA evidence is thin outside PersianMedQA-style receipts",
    "Few open models under 8B with citable public eval scores",
    "Many rows still lack a published benchmark we can cite with asOf",
    "Instruction data and SFT recipes are scattered across repos",
  ],
  fa: [
    "هنوز مدل بزرگی نداریم که اولویت اولش ادبیات مجازدار فارسی باشد",
    "نظرسنجی ارزیاب بومی در مقیاس محصول واقعی کم است",
    "معیار سنجش سبک ادبی و حافظهٔ کتاب در فارسی هنوز پراکنده است",
    "بیشتر مدل‌های باز، نسخهٔ فارسی‌شدهٔ مدل انگلیسی زیر ۱۵ میلیارد پارامترند",
    "شواهد پرسش‌وپاسخ پزشکی فارسی خارج از رسیدهای PersianMedQA کم است",
    "مدل باز زیر ۸ میلیارد با نمرهٔ عمومی قابل استناد کم داریم",
    "هنوز ردیف‌های زیادی بدون معیار منتشرشده با تاریخ و منبع هستند",
    "داده و دستور آموزش پراکنده بین مخازن مختلف پخش شده است",
  ],
  tags: [
    "native-foundation",
    "native-preference",
    "literary-eval",
    "instruct-stack",
    "medical-eval",
    "small-model",
    "public-benchmark",
    "instruction-data",
  ],
};

let tagUpdates = 0;
let faUpdates = 0;
for (const e of manifest.entries) {
  const nextTags = assignGapTags(e);
  if (JSON.stringify(nextTags) !== JSON.stringify(e.gapTags || [])) {
    e.gapTags = nextTags;
    tagUpdates++;
  }
  if (e.name?.fa) {
    const n = cleanFaText(e.name.fa);
    if (n !== e.name.fa) {
      e.name.fa = n;
      faUpdates++;
    }
  }
  if (e.summary?.fa) {
    const s = cleanFaText(e.summary.fa);
    if (s !== e.summary.fa) {
      e.summary.fa = s;
      faUpdates++;
    }
  }
}

manifest.version = "0.12.0";
manifest.generatedAt = new Date().toISOString();

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");
execSync("node scripts/polish-summary-fa.mjs", { cwd: path.join(ROOT, "workspace"), stdio: "inherit" });

const final = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const untagged = final.entries.filter((e) => !e.gapTags?.length);
console.log(
  `v0.12 apply — gapTag rows updated ${tagUpdates} · fa fields ${faUpdates} · untagged ${untagged.length}`
);
if (untagged.length) {
  console.error("RED untagged:", untagged.map((e) => e.id).join(", "));
  process.exit(1);
}
