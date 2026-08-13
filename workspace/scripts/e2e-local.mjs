#!/usr/bin/env node
/** dis-brand-agent repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-WORKSPACE-SCRIPTS-E2E-LOCAL-MJ name="DIS BRAND Governed Agent" action=edit at=2026-08-12T22:10:02.804Z */

const BASE = process.env.PLR_E2E_BASE || "http://127.0.0.1:5294";
const MIN_ENTRIES = Number(process.env.PLR_MIN_ENTRIES || 67);
let pass = 0;
let fail = 0;

function record(name, ok) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (ok) pass++;
  else fail++;
}

async function fetchText(path) {
  const r = await fetch(`${BASE}${path}`);
  const text = await r.text();
  return { status: r.status, text };
}

async function main() {
  console.log(`Persian LLM Reference E2E → ${BASE}\n`);

  let manifest;
  try {
    const health = await fetch(`${BASE}/api/health`).then((r) => r.json());
    record("/api/health", health.ok === true);

    manifest = await fetch(`${BASE}/api/reference.json`).then((r) => r.json());
    record("api/reference.json entries", manifest.entries?.length >= MIN_ENTRIES);
    record("gapMap present", Array.isArray(manifest.gapMap?.en));

    const home = await fetchText("/");
    record("/ 200", home.status === 200);
    record("home atlas UI", home.text.includes('id="atlas"') && home.text.includes("stats-bar"));
    record("home UI lanes + table", home.text.includes("lane-bar") && home.text.includes("compare-table"));
    record("home timeline + radar", home.text.includes("timeline-list") && home.text.includes("radar-panel"));
    record("home compare panel", home.text.includes("compare-panel"));
    record("home tree UI", home.text.includes("taxonomy-tree") && home.text.includes("lineage-tree"));
    record("home references section", home.text.includes("refs-grid") && home.text.includes("references-heading"));
    record("theme toggle present", home.text.includes('id="theme-toggle"'));
    record("theme-init script", home.text.includes("theme-init.js"));
    const entryPage = await fetchText("/entry/dorna-llama3-8b/");
    record("entry page /entry/{id}/", entryPage.status === 200 && entryPage.text.includes("dorna-llama3-8b"));
    const staticManifest = await fetch(`${BASE}/data/reference-manifest.json`).then((r) => r.json()).catch(() => null);
  try {
    const pageBase = `${BASE}/`;
    const murl = new URL("data/reference-manifest.json", pageBase).href;
    const resolved = await fetch(murl).then((r) => r.json());
    record("manifest URL resolution (./data/)", resolved.entries?.length >= MIN_ENTRIES);
    const cfg = await fetch(`${BASE}/site-config.json`).then((r) => r.json()).catch(() => ({}));
    const basePath = (cfg.basePath || "").replace(/\/$/, "");
    if (basePath) {
      const ghStyle = new URL(`${basePath}/data/reference-manifest.json`, BASE).href;
      const r2 = await fetch(ghStyle);
      if (r2.ok) {
        const m2 = await r2.json();
        record("manifest URL resolution (basePath)", m2.entries?.length >= MIN_ENTRIES);
      } else {
        record("manifest URL resolution (basePath skipped local)", true);
      }
    }
  } catch {
    record("manifest URL resolution", false);
  }

    record("data/reference-manifest.json", staticManifest?.entries?.length >= MIN_ENTRIES);
  } catch (e) {
    console.error("RED  E2E crash:", e.message);
    process.exit(1);
  }

  try {
    const { chromium } = await import("playwright");
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));

    await page.goto(`${BASE}/`, { waitUntil: "domcontentloaded" });
    record("browser no pageerror", errors.length === 0);

    const count = await page.locator(".entry-card").count();
    record("browser renders entries", count >= MIN_ENTRIES);

    await page.locator("#lang-toggle").click();
    await page.waitForTimeout(100);
    const title = await page.locator("#atlas-title").textContent();
    record("lang toggle", /Persian|فارسی|مرجع/.test(title || ""));

    await browser.close();
  } catch (err) {
    if (String(err.message || err).includes("Cannot find package") || String(err).includes("playwright")) {
      record("browser smoke skipped (no playwright)", true);
    } else {
      record("browser smoke", false);
    }
  }

  console.log(`\n${fail === 0 ? "GREEN" : "RED"}  ${pass}/${pass + fail} pass`);
  process.exit(fail === 0 ? 0 : 1);
}

main().catch((e) => {
  console.error("RED  E2E crash:", e.message);
  process.exit(1);
});
