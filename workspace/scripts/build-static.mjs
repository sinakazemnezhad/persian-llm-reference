#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_SRC = path.join(ROOT, "data/reference-manifest.json");
const PUBLIC = path.resolve(__dirname, "../public");
const REF = JSON.parse(fs.readFileSync(path.join(ROOT, "REFERENCE.json"), "utf8"));

const manifest = JSON.parse(fs.readFileSync(MANIFEST_SRC, "utf8"));
manifest.generatedAt = new Date().toISOString();
manifest.version = REF.version;
delete manifest.agentAttribution;

const kinds = {};
const classes = {};
const statuses = {};
for (const e of manifest.entries) {
  kinds[e.kind] = (kinds[e.kind] || 0) + 1;
  classes[e.class] = (classes[e.class] || 0) + 1;
  statuses[e.status] = (statuses[e.status] || 0) + 1;
}
manifest.stats = {
  total: manifest.entries.length,
  byKind: kinds,
  byClass: classes,
  byStatus: statuses,
};

const publicManifest = structuredClone(manifest);
delete publicManifest.agentAttribution;

fs.mkdirSync(path.join(PUBLIC, "data"), { recursive: true });
fs.mkdirSync(path.join(PUBLIC, ".well-known"), { recursive: true });

const sourceManifest = structuredClone(manifest);
delete sourceManifest.agentAttribution;
fs.writeFileSync(MANIFEST_SRC, JSON.stringify(sourceManifest, null, 2) + "\n", "utf8");
fs.writeFileSync(
  path.join(PUBLIC, "data/reference-manifest.json"),
  JSON.stringify(publicManifest, null, 2),
  "utf8"
);

const siteConfig = {
  version: REF.version,
  canonicalSite: REF.canonicalSite,
  canonicalRepo: REF.canonicalRepo,
  manifestPath: "/persian-llm-reference/data/reference-manifest.json",
  manifestRaw: REF.manifestRaw,
  basePath: REF.githubPagesBase || "",
  name: REF.name,
};

fs.writeFileSync(path.join(PUBLIC, "site-config.json"), JSON.stringify(siteConfig, null, 2), "utf8");

const wellKnown = {
  schema: manifest.schema,
  version: manifest.version,
  generatedAt: manifest.generatedAt,
  mission: manifest.mission,
  entryCount: manifest.entries.length,
  stats: manifest.stats,
  manifest: `${REF.canonicalSite}/data/reference-manifest.json`,
  manifestRaw: REF.manifestRaw,
  repo: REF.canonicalRepo,
};

fs.writeFileSync(
  path.join(PUBLIC, ".well-known/persian-llm-reference.json"),
  JSON.stringify(wellKnown, null, 2),
  "utf8"
);

fs.writeFileSync(
  path.join(PUBLIC, "release.json"),
  JSON.stringify(
    {
      product: "persian-llm-reference",
      version: REF.version,
      generatedAt: manifest.generatedAt,
      entryCount: manifest.entries.length,
    },
    null,
    2
  ),
  "utf8"
);

console.log(`build — v${REF.version} · ${manifest.entries.length} entries · static public/ ready`);
