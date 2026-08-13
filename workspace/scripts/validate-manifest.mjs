#!/usr/bin/env node
/** dis-brand-agent repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-WORKSPACE-SCRIPTS-VALIDATE-MAN name="DIS BRAND Governed Agent" action=edit at=2026-08-12T22:10:00.187Z */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = path.resolve(__dirname, "../../data/reference-manifest.json");
const REQUIRED = ["id", "kind", "class", "name", "status", "summary", "links"];

const data = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const ids = new Set();
let errors = 0;

for (const e of data.entries) {
  for (const key of REQUIRED) {
    if (e[key] === undefined || e[key] === null) {
      console.error(`FAIL  ${e.id || "?"} missing ${key}`);
      errors++;
    }
  }
  if (ids.has(e.id)) {
    console.error(`FAIL  duplicate id ${e.id}`);
    errors++;
  }
  ids.add(e.id);
  if (e.status === "measured" && (!e.benchmarks || e.benchmarks.length === 0)) {
    console.error(`WARN  ${e.id} measured without benchmarks`);
  }
}

if (data.entries.length < 60) {
  console.error(`FAIL  only ${data.entries.length} entries — minimum 60 for global reference v0.5`);
  errors++;
}

console.log(errors === 0 ? `PASS  validate-manifest — ${data.entries.length} entries` : `RED  validate-manifest — ${errors} errors`);
process.exit(errors === 0 ? 0 : 1);
