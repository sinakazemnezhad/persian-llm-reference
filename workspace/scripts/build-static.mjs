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

// Stable machine API v1 — projection of canonical manifest (no second source)
fs.mkdirSync(path.join(PUBLIC, "api/v1"), { recursive: true });
fs.writeFileSync(
  path.join(PUBLIC, "api/v1/reference.json"),
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
  apiV1Path: "/persian-llm-reference/api/v1/reference.json",
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
  apiV1: `${REF.canonicalSite}/api/v1/reference.json`,
  hfDataset: REF.hfDatasetUrl,
  sitemap: `${REF.canonicalSite}/sitemap.xml`,
  sourceRadar: `${REF.canonicalSite}/data/source-radar.json`,
  about: `${REF.canonicalSite}/about/`,
  contact: REF.contactIssues || `${REF.canonicalRepo}/issues`,
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

function isoDate(value) {
  const d = new Date(value || Date.now());
  return Number.isNaN(d.getTime()) ? new Date().toISOString().slice(0, 10) : d.toISOString().slice(0, 10);
}

function homeSchemaJson() {
  const measured = manifest.entries.filter((e) => e.status === "measured").length;
  const maintainer = REF.maintainer || "Persian LLM Reference maintainers";
  const aboutUrl = `${REF.canonicalSite}/about/`;
  const licenseUrl = "https://creativecommons.org/licenses/by/4.0/";
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Persian LLM Reference",
    alternateName: REF.name?.fa || "مرجع مدل‌های زبانی فارسی",
    description: REF.mission?.en,
    url: `${REF.canonicalSite}/`,
    version: REF.version,
    dateModified: manifest.generatedAt,
    keywords: ["Persian LLM", "Farsi", "language model", "benchmark", "registry"],
    inLanguage: ["fa", "en"],
    license: {
      "@type": "CreativeWork",
      name: "Creative Commons Attribution 4.0 International",
      url: licenseUrl,
    },
    creator: { "@type": "Organization", name: maintainer, url: aboutUrl },
    publisher: { "@type": "Organization", name: maintainer, url: aboutUrl },
    variableMeasured: `${manifest.entries.length} tracked · ${measured} measured`,
    distribution: [
      {
        "@type": "DataDownload",
        encodingFormat: "application/json",
        contentUrl: `${REF.canonicalSite}/api/v1/reference.json`,
      },
      { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: REF.manifestRaw },
    ],
    isAccessibleForFree: true,
  };
}

function writeSitemapAndRobots() {
  const lastmod = isoDate(manifest.generatedAt);
  const urls = [
    { loc: `${REF.canonicalSite}/`, priority: "1.0", changefreq: "weekly" },
    { loc: `${REF.canonicalSite}/about/`, priority: "0.6", changefreq: "monthly" },
    ...manifest.entries.map((e) => ({
      loc: `${REF.canonicalSite}/entry/${e.id}/`,
      priority: e.status === "measured" ? "0.8" : "0.7",
      changefreq: "monthly",
    })),
  ];
  const sitemap =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url><loc>${u.loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`
      )
      .join("\n") +
    `\n</urlset>\n`;
  fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), sitemap, "utf8");
  fs.writeFileSync(
    path.join(PUBLIC, "robots.txt"),
    `User-agent: *\nAllow: /\n\nSitemap: ${REF.canonicalSite}/sitemap.xml\n`,
    "utf8"
  );
}

function patchHomeSeo(html) {
  const schema = JSON.stringify(homeSchemaJson()).replace(/</g, "\\u003c");
  return html
    .replace(/<script type="application\/ld\+json" id="schema-dataset">[\s\S]*?<\/script>/, `<script type="application/ld+json" id="schema-dataset">${schema}</script>`)
    .replace(/tokens\.css\?v=[^"]+/, `tokens.css?v=${REF.version}`)
    .replace(/app\.css\?v=[^"]+/, `app.css?v=${REF.version}`)
    .replace(/theme-init\.js\?v=[^"]+/, `theme-init.js?v=${REF.version}`)
    .replace(/app\.js\?v=[^"]+/, `app.js?v=${REF.version}`);
}

function entryIndexHtml(entry, indexTemplate) {
  const depth = "../../";
  const title = `${entry.name.en} · Persian LLM Reference`;
  const description = entry.summary?.en || entry.name.en;
  const canonical = `${REF.canonicalSite}/entry/${entry.id}/`;
  const keywords = [entry.kind, entry.class, entry.status, "Persian LLM", "Farsi", entry.org].filter(Boolean).join(", ");
  const entrySchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: entry.name.en,
    alternativeHeadline: entry.name.fa,
    description,
    url: canonical,
    inLanguage: ["en", "fa"],
    isPartOf: { "@type": "Dataset", name: "Persian LLM Reference", url: `${REF.canonicalSite}/` },
    author: { "@type": "Organization", name: entry.org || "Persian LLM Reference" },
  };
  let html = indexTemplate
    .replace(/href="favicon\.svg"/, `href="${depth}favicon.svg"`)
    .replace(/href="\.\/"/, `href="${depth}"`)
    .replace(/href="tokens\.css[^"]*"/, `href="${depth}tokens.css?v=${REF.version}"`)
    .replace(/href="app\.css[^"]*"/, `href="${depth}app.css?v=${REF.version}"`)
    .replace(/src="theme-init\.js[^"]*"/, `src="${depth}theme-init.js?v=${REF.version}"`)
    .replace(/src="app\.js[^"]*"/, `src="${depth}app.js?v=${REF.version}"`)
    .replace(/<title>[^<]+<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(/<meta name="description"[^>]+>/, `<meta name="description" content="${escapeAttr(description)}" />`)
    .replace(/<meta name="keywords"[^>]+>/, `<meta name="keywords" content="${escapeAttr(keywords)}" />`)
    .replace(/<link rel="canonical"[^>]+>/, "")
    .replace(/<meta property="og:[^"]+"[^>]+>\n?/g, "")
    .replace(/<meta name="twitter:[^"]+"[^>]+>\n?/g, "")
    .replace(/<script type="application\/ld\+json" id="schema-dataset">[\s\S]*?<\/script>\n?/g, "")
    .replace(/<script type="application\/ld\+json">\{"@context":"https:\/\/schema.org","@type":"WebSite"[\s\S]*?<\/script>\n?/g, "")
    .replace(/<link rel="alternate" hreflang="[^"]+"[^>]+>\n?/g, "")
    .replace(/<link rel="sitemap"[^>]+>\n?/g, "");
  const headExtra = `
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="index, follow" />
  <meta property="og:title" content="${escapeAttr(entry.name.en)}" />
  <meta property="og:description" content="${escapeAttr(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="Persian LLM Reference" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${escapeAttr(entry.name.en)}" />
  <meta name="twitter:description" content="${escapeAttr(description)}" />
  <script type="application/ld+json">${JSON.stringify(entrySchema).replace(/</g, "\\u003c")}</script>
  <script>window.__PLR_ENTRY_ID__=${JSON.stringify(entry.id)};</script>`;
  html = html.replace("</head>", `${headExtra}\n</head>`);
  return html;
}

writeSitemapAndRobots();

const indexRaw = fs.readFileSync(path.join(PUBLIC, "index.html"), "utf8");
fs.writeFileSync(path.join(PUBLIC, "index.html"), patchHomeSeo(indexRaw), "utf8");

const indexTemplate = indexRaw;
const entryRoot = path.join(PUBLIC, "entry");
fs.mkdirSync(entryRoot, { recursive: true });
for (const entry of manifest.entries) {
  const dir = path.join(entryRoot, entry.id);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), entryIndexHtml(entry, indexTemplate), "utf8");
}

// Hugging Face dataset mirror (canonical manifest copy)
const hfDatasetDir = path.join(ROOT, "huggingface/dataset");
fs.mkdirSync(hfDatasetDir, { recursive: true });
fs.copyFileSync(MANIFEST_SRC, path.join(hfDatasetDir, "reference-manifest.json"));

// Python PyPI bundle
const pyDataDir = path.join(ROOT, "src/persian_llm_reference/data");
fs.mkdirSync(pyDataDir, { recursive: true });
fs.copyFileSync(MANIFEST_SRC, path.join(pyDataDir, "reference-manifest.json"));

console.log(`build — v${REF.version} · ${manifest.entries.length} entries · ${manifest.entries.length} entry pages · static public/ ready`);
