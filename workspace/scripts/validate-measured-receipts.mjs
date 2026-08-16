#!/usr/bin/env node
/** Measured rows must carry reproducible receipt fields */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const MANIFEST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../data/reference-manifest.json");
const data = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

let errors = 0;
for (const e of data.entries) {
  if (e.status !== "measured") continue;
  if (!e.benchmarks?.length) {
    console.error(`FAIL  ${e.id} measured without benchmarks`);
    errors++;
    continue;
  }
  for (const [i, b] of e.benchmarks.entries()) {
    const value = b.value ?? b.score;
    const source = b.source || b.url;
    const asOf = b.asOf;
    const benchmark = b.benchmark || b.name;
    const conditions = b.conditions;
    if (value === undefined || value === null || value === "") {
      console.error(`FAIL  ${e.id} benchmarks[${i}] missing value/score`);
      errors++;
    }
    if (!source) {
      console.error(`FAIL  ${e.id} benchmarks[${i}] missing source/url`);
      errors++;
    }
    if (!asOf) {
      console.error(`FAIL  ${e.id} benchmarks[${i}] missing asOf`);
      errors++;
    }
    if (!benchmark) {
      console.error(`FAIL  ${e.id} benchmarks[${i}] missing benchmark/name`);
      errors++;
    }
    if (!conditions) {
      console.error(`FAIL  ${e.id} benchmarks[${i}] missing conditions`);
      errors++;
    }
  }
}

if (errors) {
  console.error(`\nRED  validate-measured-receipts — ${errors} error(s)`);
  process.exit(1);
}
console.log(`PASS  validate-measured-receipts — ${data.entries.filter((e) => e.status === "measured").length} measured`);
