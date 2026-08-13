#!/usr/bin/env node
/** CI guard: Persian UI locale law for PLR workspace/public */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.resolve(__dirname, "../public");
const appJs = fs.readFileSync(path.join(PUBLIC, "app.js"), "utf8");
const indexHtml = fs.readFileSync(path.join(PUBLIC, "index.html"), "utf8");
const localeJs = path.join(PUBLIC, "plr-locale.js");

let fail = 0;
function ok(name, pass) {
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}`);
  if (!pass) fail++;
}

ok("plr-locale.js exists", fs.existsSync(localeJs));
ok("app.js imports plr-locale.js", appJs.includes('from "./plr-locale.js"'));
ok("renderStats uses formatNum", /renderStats[\s\S]*formatNum\(total\)/.test(appJs));
ok("no Literata in index.html", !/Literata/i.test(indexHtml));
ok("no Instrument Serif in index.html", !/Instrument Serif/i.test(indexHtml));
ok("default theme light", indexHtml.includes('data-theme="light"'));

const faBlock = appJs.match(/^\s*fa:\s*\{([\s\S]*?)^\s*\},/m);
if (faBlock) {
  const strings = [...faBlock[1].matchAll(/"[^"]+"\s*:\s*"([^"]*)"/g)].map((m) => m[1]);
  const badDash = strings.filter((s) => /—|–/.test(s));
  const badDot = strings.filter((s) => /·/.test(s));
  const badAsciiDigits = strings.filter((s) => /[0-9]/.test(s));
  ok("I18N.fa has no em dash", badDash.length === 0);
  ok("I18N.fa has no middle dot", badDot.length === 0);
  ok("I18N.fa has no ASCII digits", badAsciiDigits.length === 0);
  if (badDash.length) console.log("  em dash in:", badDash.slice(0, 3).join(" | "));
  if (badAsciiDigits.length) console.log("  ASCII digits in:", badAsciiDigits.slice(0, 3).join(" | "));
} else {
  ok("I18N.fa block found", false);
}

if (fail > 0) {
  console.error(`\nRED  validate-persian-ui — ${fail} failure(s)`);
  process.exit(1);
}
console.log("\nPASS  validate-persian-ui");
