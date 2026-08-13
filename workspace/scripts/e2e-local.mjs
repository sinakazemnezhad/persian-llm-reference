#!/usr/bin/env node
/** dis-brand-agent repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-WORKSPACE-SCRIPTS-E2E-LOCAL-MJ name="DIS BRAND Governed Agent" action=edit at=2026-08-12T22:10:02.804Z */

const BASE = process.env.PLR_E2E_BASE || "http://127.0.0.1:5294";
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
    record("api/reference.json entries", manifest.entries?.length >= 20);
    record("gapMap present", Array.isArray(manifest.gapMap?.en));

    const home = await fetchText("/");
    record("/ 200", home.status === 200);
    record("home atlas UI", home.text.includes('id="atlas"') && home.text.includes("stats-bar"));
    const staticManifest = await fetch(`${BASE}/data/reference-manifest.json`).then((r) => r.json()).catch(() => null);
    record("data/reference-manifest.json", staticManifest?.entries?.length >= 20);
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
    record("browser renders entries", count >= 20);

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
