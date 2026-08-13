/** Persian / English display formatting for PLR UI. Import from app.js only. */
export const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

export function localizeDigits(text, lang) {
  if (lang !== "fa" || text === null || text === undefined) return String(text ?? "");
  return String(text).replace(/\d/g, (d) => FA_DIGITS[Number(d)]);
}

export function emptyValue(lang) {
  return lang === "fa" ? "ندارد" : "—";
}

export function formatNum(value, lang) {
  if (value === null || value === undefined || value === "") return emptyValue(lang);
  if (typeof value === "number" && !Number.isNaN(value)) {
    return lang === "fa" ? value.toLocaleString("fa-IR") : String(value);
  }
  return localizeDigits(String(value), lang);
}

export function formatSizeB(sizeB, lang) {
  if (sizeB === null || sizeB === undefined || sizeB === "") return emptyValue(lang);
  return localizeDigits(`${sizeB}B`, lang);
}

export function formatPercent(score, lang) {
  const n = parseFloat(score);
  if (Number.isNaN(n)) return emptyValue(lang);
  return `${localizeDigits(String(n), lang)}٪`;
}

export function formatScorePair(value, max, lang) {
  return `${formatNum(value, lang)}/${formatNum(max, lang)}`;
}

/** Manifest copy and any user-visible string when lang is fa. */
export function displayText(text, lang) {
  if (!text) return "";
  return lang === "fa" ? localizeDigits(String(text), lang) : String(text);
}
