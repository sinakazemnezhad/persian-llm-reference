#!/usr/bin/env node
/** Publish manifest snapshot to Hugging Face Hub (requires HF_TOKEN). */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const REF = JSON.parse(fs.readFileSync(path.join(ROOT, "REFERENCE.json"), "utf8"));
const DATASET_DIR = path.join(ROOT, "huggingface/dataset");
const REPO = process.env.PLR_HF_DATASET || "sinakazemnezhad/persian-llm-reference";
const VERSION = process.env.PLR_RELEASE || REF.version;

if (!process.env.HF_TOKEN) {
  console.error("RED  HF_TOKEN required — run: hf auth login");
  process.exit(1);
}

if (!fs.existsSync(path.join(DATASET_DIR, "reference-manifest.json"))) {
  execSync("npm run build", { cwd: path.join(ROOT, "workspace"), stdio: "inherit" });
}

const manifest = JSON.parse(fs.readFileSync(path.join(DATASET_DIR, "reference-manifest.json"), "utf8"));
if (manifest.version !== VERSION) {
  console.error(`RED  manifest version ${manifest.version} ≠ target ${VERSION}`);
  process.exit(1);
}

console.log(`Publishing HF dataset ${REPO} @ v${VERSION}…`);
execSync(
  `hf upload ${REPO} ${DATASET_DIR}/ --repo-type dataset --commit-message "PLR manifest v${VERSION}"`,
  { stdio: "inherit", env: { ...process.env, HF_TOKEN: process.env.HF_TOKEN } }
);
console.log(`PASS  https://huggingface.co/datasets/${REPO}`);
