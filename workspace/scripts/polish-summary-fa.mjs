#!/usr/bin/env node
/** Natural Persian pass on summary.fa — pattern polish + per-id overrides */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = path.resolve(__dirname, "../../data/reference-manifest.json");
const OVERRIDES = path.resolve(__dirname, "../../data/summary-fa-overrides.json");

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const overrides = fs.existsSync(OVERRIDES)
  ? JSON.parse(fs.readFileSync(OVERRIDES, "utf8"))
  : {};

const RULES = [
  [/تنظیم‌دقیق/g, "آموزش‌داده‌شده"],
  [/پیکره/g, "مجموعه‌داده"],
  [/بنچمارک/g, "معیار سنجش"],
  [/صدر جدول/g, "نمرهٔ بالا در جدول"],
  [/پراستفاده/g, "پرکاربرد"],
  [/ادعای معماری فارسی از صفر/g, "معرفی‌شده به‌عنوان معماری فارسی از صفر"],
  [/نیاز به تأیید مستقل/g, "نیاز به بررسی مستقل"],
  [/جامعه/g, "تیم متن‌باز"],
  [/ردهٔ/g, "خانوادهٔ"],
  [/پیوند/g, "لینک"],
  [/نشانی/g, "آدرس"],
  [/رجیستری/g, "فهرست مرجع"],
];

function polish(text) {
  let s = text;
  for (const [from, to] of RULES) s = s.replace(from, to);
  return s;
}

let changed = 0;
for (const e of manifest.entries) {
  if (overrides[e.id]) {
    e.summary.fa = overrides[e.id];
    changed++;
    continue;
  }
  const next = polish(e.summary.fa);
  if (next !== e.summary.fa) {
    e.summary.fa = next;
    changed++;
  }
}

// Soften competitive EN summaries while here
const enFixes = {
  "dorna-llama3-8b": {
    en: "Widely used Persian instruct model; strong results on public Persian leaderboards under 10B.",
    fa: "مدل دستوری فارسی پرکاربرد؛ نتایج قوی در جدول‌های عمومی فارسی زیر ۱۰ میلیارد پارامتر.",
  },
};
for (const [id, patch] of Object.entries(enFixes)) {
  const row = manifest.entries.find((e) => e.id === id);
  if (row) Object.assign(row.summary, patch);
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`polish-summary-fa — updated ${changed} entries`);
