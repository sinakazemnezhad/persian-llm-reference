#!/usr/bin/env node
/** dis-brand-agent repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-WORKSPACE-SRC-SERVER-MJS name="DIS BRAND Governed Agent" action=edit at=2026-08-12T22:02:52.292Z */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../public");
const DATA_DIR = path.resolve(__dirname, "../../data");
const MANIFEST_FILE = path.join(DATA_DIR, "reference-manifest.json");
const RADAR_FILE = path.join(DATA_DIR, "source-radar.json");
const HOST = process.env.PLR_HOST || "127.0.0.1";
const PORT = Number(process.env.PLR_PORT || 5294);
const VERSION = "0.1.0";
const BUILD_SHA = process.env.PLR_SHA || "local";

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
};

function safeJoin(root, urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\\/g, "/");
  const rel = clean === "/" ? "/index.html" : clean;
  const full = path.resolve(root, "." + rel);
  if (!full.startsWith(root)) return null;
  return full;
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(body, null, 2));
}

function readManifest() {
  return JSON.parse(fs.readFileSync(MANIFEST_FILE, "utf8"));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);

  if (url.pathname === "/api/health") {
    return sendJson(res, 200, { ok: true, product: "persian-llm-reference", version: VERSION });
  }

  if (url.pathname === "/api/reference.json" || url.pathname === "/api/reference") {
    try {
      const manifest = readManifest();
      return sendJson(res, 200, manifest);
    } catch {
      return sendJson(res, 500, { error: "manifest_read_failed" });
    }
  }

  if (url.pathname === "/api/source-radar.json" || url.pathname === "/api/source-radar") {
    try {
      const radar = JSON.parse(fs.readFileSync(RADAR_FILE, "utf8"));
      return sendJson(res, 200, radar);
    } catch {
      return sendJson(res, 404, { error: "source_radar_not_found" });
    }
  }

  if (url.pathname === "/api/release.json") {
    return sendJson(res, 200, {
      product: "persian-llm-reference",
      version: VERSION,
      sha: BUILD_SHA,
      generatedAt: new Date().toISOString(),
    });
  }

  if (url.pathname === "/.well-known/persian-llm-reference.json") {
    try {
      const manifest = readManifest();
      return sendJson(res, 200, {
        schema: manifest.schema,
        version: manifest.version,
        mission: manifest.mission,
        entryCount: manifest.entries.length,
        api: `http://${HOST}:${PORT}/api/reference.json`,
      });
    } catch {
      return sendJson(res, 500, { error: "manifest_read_failed" });
    }
  }

  const filePath = safeJoin(ROOT, url.pathname);
  if (!filePath || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  const ext = path.extname(filePath);
  const type = TYPES[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-store" });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, HOST, () => {
  console.log(`Persian LLM Reference → http://${HOST}:${PORT}`);
});
