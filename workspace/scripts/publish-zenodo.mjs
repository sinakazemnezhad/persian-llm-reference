#!/usr/bin/env node
/** Publish v0.13.1 manifest snapshot to Zenodo (requires ZENODO_TOKEN). */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const REF = JSON.parse(fs.readFileSync(path.join(ROOT, "REFERENCE.json"), "utf8"));
const ZENODO = process.env.ZENODO_USE_SANDBOX === "1" ? "https://sandbox.zenodo.org" : "https://zenodo.org";
const TOKEN = process.env.ZENODO_TOKEN;
const VERSION = process.env.PLR_RELEASE || REF.version;
const MANIFEST = path.join(ROOT, "huggingface/dataset/reference-manifest.json");
const META = JSON.parse(fs.readFileSync(path.join(ROOT, ".zenodo.json"), "utf8"));

if (!TOKEN) {
  console.error("RED  ZENODO_TOKEN required — create at https://zenodo.org/account/settings/applications/tokens/new");
  process.exit(1);
}

if (!fs.existsSync(MANIFEST)) {
  console.error("RED  run npm run build first");
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
if (manifest.version !== VERSION) {
  console.error(`RED  manifest version ${manifest.version} ≠ ${VERSION}`);
  process.exit(1);
}

async function zenodo(path, opts = {}) {
  const r = await fetch(`${ZENODO}${path}`, {
    ...opts,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      ...(opts.body ? {} : { "Content-Type": "application/json" }),
      ...opts.headers,
    },
  });
  const text = await r.text();
  let body;
  try {
    body = JSON.parse(text);
  } catch {
    body = text;
  }
  if (!r.ok) throw new Error(`Zenodo ${path} → ${r.status}: ${text.slice(0, 300)}`);
  return body;
}

const metadata = {
  ...META,
  version: VERSION,
  related_identifiers: [
    ...(META.related_identifiers || []),
    {
      identifier: `https://github.com/sinakazemnezhad/persian-llm-reference/releases/tag/v${VERSION}`,
      relation: "isVersionOf",
      scheme: "url",
    },
  ],
};

console.log(`Creating Zenodo deposition for v${VERSION}…`);

async function main() {
  const dep = await zenodo("/api/deposit/depositions", {
    method: "POST",
    body: JSON.stringify({ metadata }),
  });

  const depId = dep.id;
  const bucket = dep.links.bucket;

  const fileBuf = fs.readFileSync(MANIFEST);
  const fileName = `reference-manifest-v${VERSION}.json`;
  const uploadUrl = `${bucket}/${fileName}`;

  const up = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: fileBuf,
  });
  if (!up.ok) throw new Error(`Upload failed ${up.status}`);

  await zenodo(`/api/deposit/depositions/${depId}/files`, {
    method: "POST",
    body: JSON.stringify({ filename: fileName, uri: uploadUrl }),
  });

  const published = await zenodo(`/api/deposit/depositions/${depId}/actions/publish`, { method: "POST" });
  const doi = published.doi || published.metadata?.doi;
  const recordUrl = published.links?.record_html || published.links?.latest_html;
  console.log(`PASS  DOI: ${doi}`);
  console.log(`PASS  Record: ${recordUrl}`);
}

main().catch((e) => {
  console.error("RED", e.message);
  process.exit(1);
});
