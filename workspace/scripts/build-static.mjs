#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");
const MANIFEST_SRC = path.join(ROOT, "data/reference-manifest.json");
const RADAR_SRC = path.join(ROOT, "data/source-radar.json");
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
fs.mkdirSync(path.join(PUBLIC, "schema"), { recursive: true });

const schemaSrc = path.join(ROOT, "schema/reference-manifest-v1.json");
if (fs.existsSync(schemaSrc)) {
  fs.copyFileSync(schemaSrc, path.join(PUBLIC, "schema/reference-manifest-v1.json"));
}

const sourceManifest = structuredClone(manifest);
delete sourceManifest.agentAttribution;
fs.writeFileSync(MANIFEST_SRC, JSON.stringify(sourceManifest, null, 2) + "\n", "utf8");
fs.writeFileSync(
  path.join(PUBLIC, "data/reference-manifest.json"),
  JSON.stringify(publicManifest, null, 2),
  "utf8"
);

if (fs.existsSync(RADAR_SRC)) {
  const radar = JSON.parse(fs.readFileSync(RADAR_SRC, "utf8"));
  radar.version = REF.version;
  radar.generatedAt = manifest.generatedAt;
  radar.stats = { ...radar.stats, plrManifestEntries: manifest.entries.length };
  fs.writeFileSync(path.join(PUBLIC, "data/source-radar.json"), JSON.stringify(radar, null, 2), "utf8");
  fs.writeFileSync(RADAR_SRC, JSON.stringify(radar, null, 2) + "\n", "utf8");
}

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
  sourceRadar: `${REF.canonicalSite}/data/source-radar.json`,
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

function escapeAttr(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function entryIndexHtml(entry, indexTemplate) {
  const depth = "../../";
  const title = `${entry.name.en} · Persian LLM Reference`;
  const description = entry.summary?.en || entry.name.en;
  const canonical = `${REF.canonicalSite}/entry/${entry.id}/`;
  let html = indexTemplate
    .replace(/href="favicon\.svg"/, `href="${depth}favicon.svg"`)
    .replace(/href="\.\/"/, `href="${depth}"`)
    .replace(/href="tokens\.css[^"]*"/, `href="${depth}tokens.css?v=${REF.version}"`)
    .replace(/href="app\.css[^"]*"/, `href="${depth}app.css?v=${REF.version}"`)
    .replace(/src="theme-init\.js[^"]*"/, `src="${depth}theme-init.js?v=${REF.version}"`)
    .replace(/src="app\.js[^"]*"/, `src="${depth}app.js?v=${REF.version}"`)
    .replace(/<title>[^<]+<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(
      /<meta name="description"[^>]+>/,
      `<meta name="description" content="${escapeAttr(description)}" />`
    );
  const headExtra = `
  <link rel="canonical" href="${canonical}" />
  <meta property="og:title" content="${escapeAttr(entry.name.en)}" />
  <meta property="og:description" content="${escapeAttr(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="article" />
  <script>window.__PLR_ENTRY_ID__=${JSON.stringify(entry.id)};</script>`;
  html = html.replace("</head>", `${headExtra}\n</head>`);
  return html;
}

const indexTemplate = fs.readFileSync(path.join(PUBLIC, "index.html"), "utf8");
const entryRoot = path.join(PUBLIC, "entry");
fs.mkdirSync(entryRoot, { recursive: true });
for (const entry of manifest.entries) {
  const dir = path.join(entryRoot, entry.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), entryIndexHtml(entry, indexTemplate), "utf8");
}

// Python PyPI bundle
const pyDataDir = path.join(ROOT, "src/persian_llm_reference/data");
fs.mkdirSync(pyDataDir, { recursive: true });
fs.copyFileSync(MANIFEST_SRC, path.join(pyDataDir, "reference-manifest.json"));

console.log(`build — v${REF.version} · ${manifest.entries.length} entries · ${manifest.entries.length} entry pages · static public/ ready`);
