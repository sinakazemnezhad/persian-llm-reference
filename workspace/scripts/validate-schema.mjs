#!/usr/bin/env node
/** Validate manifest against JSON Schema v1 (structural smoke). */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST = path.join(ROOT, "data/reference-manifest.json");
const SCHEMA = path.join(ROOT, "schema/reference-manifest-v1.json");

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const schema = JSON.parse(fs.readFileSync(SCHEMA, "utf8"));
let errors = 0;

if (manifest.schema !== schema.properties.schema.const) {
  console.error(`FAIL  schema mismatch: ${manifest.schema}`);
  errors++;
}

const entrySchema = schema.$defs.entry;
for (const e of manifest.entries) {
  for (const key of entrySchema.required) {
    if (e[key] === undefined || e[key] === null) {
      console.error(`FAIL  ${e.id || "?"} missing ${key}`);
      errors++;
    }
  }
  if (!/^[a-z0-9-]+$/.test(e.id)) {
    console.error(`FAIL  ${e.id} invalid id`);
    errors++;
  }
  if (!entrySchema.properties.kind.enum.includes(e.kind)) {
    console.error(`FAIL  ${e.id} invalid kind ${e.kind}`);
    errors++;
  }
}

const measured = manifest.entries.filter((e) => e.status === "measured").length;
if (measured < 15) {
  console.error(`FAIL  only ${measured} measured — minimum 15 for v0.6`);
  errors++;
}

if (manifest.entries.length < 63) {
  console.error(`FAIL  only ${manifest.entries.length} entries — minimum 63 for v0.6`);
  errors++;
}

console.log(
  errors === 0
    ? `PASS  validate-schema — ${manifest.entries.length} entries · ${measured} measured`
    : `RED  validate-schema — ${errors} errors`
);
process.exit(errors === 0 ? 0 : 1);
