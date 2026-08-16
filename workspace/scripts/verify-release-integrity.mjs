#!/usr/bin/env node
/** Verify v0.13.1 release consistency across public surfaces */

const RELEASE = process.env.PLR_RELEASE || "0.13.1";
const BASE = "https://sinakazemnezhad.github.io/persian-llm-reference";
const TAG_MANIFEST = `https://raw.githubusercontent.com/sinakazemnezhad/persian-llm-reference/v${RELEASE}/data/reference-manifest.json`;

async function getJson(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`${url} → HTTP ${r.status}`);
  return r.json();
}

function manifestFingerprint(m) {
  const measured = m.entries.filter((e) => e.status === "measured").length;
  const ids = m.entries.map((e) => e.id).sort().join(",");
  return `${m.version}|${m.entries.length}|${measured}|${ids.length}`;
}

let fail = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
  if (!ok) fail++;
}

async function main() {
  console.log(`verify-release-integrity — target v${RELEASE}\n`);

  const [release, api, staticM, tagM] = await Promise.all([
    getJson(`${BASE}/release.json`),
    getJson(`${BASE}/api/v1/reference.json`),
    getJson(`${BASE}/data/reference-manifest.json`),
    getJson(TAG_MANIFEST),
  ]);

  check("live release.json version", release.version === RELEASE, release.version);
  check("live release entryCount", release.entryCount === 72, String(release.entryCount));

  const fpApi = manifestFingerprint(api);
  const fpStatic = manifestFingerprint(staticM);
  const fpTag = manifestFingerprint(tagM);
  check("API v1 version", api.version === RELEASE, api.version);
  check("tag manifest version", tagM.version === RELEASE, tagM.version);
  check("API v1 ≡ static manifest", fpApi === fpStatic, fpApi);
  check("API v1 ≡ tag manifest", fpApi === fpTag, `api ${fpApi} tag ${fpTag}`);
  check("measured rows", api.entries.filter((e) => e.status === "measured").length >= 25);

  try {
    const pypi = await getJson(`https://pypi.org/pypi/persian-llm-reference/${RELEASE}/json`);
    check("PyPI version", pypi.info.version === RELEASE, pypi.info.version);
  } catch (e) {
    check("PyPI version", false, e.message);
  }

  try {
    const about = await fetch(`${BASE}/about/`);
    check("/about/ live", about.status === 200);
  } catch {
    check("/about/ live", false);
  }

  const doi = process.env.PLR_ZENODO_DOI;
  if (doi) {
    try {
      const z = await getJson(`https://zenodo.org/api/records/${doi.replace(/^https?:\/\/doi\.org\//, "")}`);
      check("Zenodo resolvable", Boolean(z.metadata?.title));
    } catch (e) {
      check("Zenodo resolvable", false, e.message);
    }
  } else {
    console.log("SKIP  Zenodo DOI (set PLR_ZENODO_DOI to verify)");
  }

  const hf = process.env.PLR_HF_DATASET || "Noetfield/persian-llm-reference";
  try {
    const r = await fetch(`https://huggingface.co/api/datasets/${hf}`);
    if (r.status !== 200) {
      console.log(`SKIP  HF dataset (not published yet) — ${hf}`);
    } else {
      check("HF dataset exists", true, hf);
      const card = await getJson(`https://huggingface.co/datasets/${hf}/resolve/main/reference-manifest.json`);
      check("HF manifest version", card.version === RELEASE, card.version);
    }
  } catch (e) {
    console.log(`SKIP  HF dataset — ${e.message}`);
  }

  console.log(fail === 0 ? "\nGREEN  release integrity" : `\nRED  ${fail} mismatch(es)`);
  process.exit(fail === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("RED", e.message);
  process.exit(1);
});
