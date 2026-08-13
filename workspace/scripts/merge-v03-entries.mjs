#!/usr/bin/env node
/** Merge v03 entries into reference-manifest.json */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST = path.join(ROOT, "data/reference-manifest.json");
const ADDITIONS = path.join(ROOT, "data/v03-entries.json");

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

// Upgrade parsbench
const pb = manifest.entries.find((e) => e.id === "parsbench");
if (pb) {
  pb.links = { repo: "https://github.com/ParsBench/ParsBench", web: "https://github.com/ParsBench/ParsBench" };
  pb.status = "verified";
  pb.summary = {
    en: "Persian LLM evaluation benchmark suite — canonical open-source project on GitHub.",
    fa: "مجموعهٔ ارزیابی مدل‌های فارسی — پروژهٔ متن‌باز اصلی در گیت‌هاب.",
  };
  pb.verifiedAt = "2026-08-13";
  delete pb.notes;
}

// Fix parsi-nlu primary source
const pn = manifest.entries.find((e) => e.id === "parsi-nlu");
if (pn) {
  pn.links = {
    repo: "https://github.com/persiannlp/parsinlu",
    paper: "https://arxiv.org/abs/2012.06154",
  };
  pn.status = "verified";
  pn.verifiedAt = "2026-08-13";
}

fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log(`merged ${merged} entries · total ${manifest.entries.length}`);
