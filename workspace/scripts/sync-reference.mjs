#!/usr/bin/env node
/** dis-brand-agent repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-WORKSPACE-SCRIPTS-SYNC-REFEREN name="DIS BRAND Governed Agent" action=edit at=2026-08-12T22:02:52.548Z */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = path.resolve(__dirname, "../../data/reference-manifest.json");
const out = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
out.generatedAt = new Date().toISOString();
fs.writeFileSync(MANIFEST, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`sync:reference — ${out.entries.length} entries · ${out.generatedAt}`);
