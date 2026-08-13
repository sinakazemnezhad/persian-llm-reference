#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MANIFEST = path.resolve(__dirname, "../../data/reference-manifest.json");
const TIMEOUT_MS = 15000;
const HF_DELAY_MS = 350;

function collectUrls(obj, out = new Set()) {
  if (obj === null || obj === undefined) return out;
  if (typeof obj === "string" && /^https?:\/\//i.test(obj)) out.add(obj);
  else if (Array.isArray(obj)) obj.forEach((v) => collectUrls(v, out));
  else if (typeof obj === "object") Object.values(obj).forEach((v) => collectUrls(v, out));
  return out;
}

async function fetchStatus(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let res = await fetch(url, { method: "HEAD", signal: controller.signal, redirect: "follow" });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: "GET", signal: controller.signal, redirect: "follow" });
    }
    return res.status;
  } catch (e) {
    return e.name === "AbortError" ? 599 : 598;
  } finally {
    clearTimeout(timer);
  }
}

async function checkUrl(url) {
  const maxAttempts = url.includes("huggingface.co/") ? 4 : 2;
  let status = 0;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    status = await fetchStatus(url);
    if (status < 400) return status;
    if (url.includes("huggingface.co/") && (status === 401 || status === 403)) return status;
    if ((status === 429 || status >= 598) && attempt < maxAttempts - 1) {
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      continue;
    }
    break;
  }
  return status;
}

function isOk(url, status) {
  if (status < 400) return true;
  if (url.includes("huggingface.co/") && (status === 401 || status === 403 || status === 429)) return true;
  return false;
}

const data = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const urls = [...collectUrls(data.entries)].sort();
let errors = 0;

console.log(`validate-links — ${urls.length} URLs\n`);

for (const url of urls) {
  const status = await checkUrl(url);
  const ok = isOk(url, status);
  const note = ok && status >= 400 ? " (HF auth/rate-limit)" : "";
  console.log(`${ok ? "PASS" : "FAIL"}  ${status}  ${url}${note}`);
  if (!ok) errors++;
  if (url.includes("huggingface.co/")) await new Promise((r) => setTimeout(r, HF_DELAY_MS));
}

console.log(errors === 0 ? `\nPASS  validate-links` : `\nRED  validate-links — ${errors} failures`);
process.exit(errors === 0 ? 0 : 1);
