#!/usr/bin/env node
/** Copy SSOT manifest into Python package data for PyPI wheels. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const SRC = path.join(ROOT, "data/reference-manifest.json");
const DEST_DIR = path.join(ROOT, "src/persian_llm_reference/data");
const DEST = path.join(DEST_DIR, "reference-manifest.json");

fs.mkdirSync(DEST_DIR, { recursive: true });
fs.copyFileSync(SRC, DEST);
console.log(`sync-python — ${DEST}`);
