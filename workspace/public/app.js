const I18N = {
  en: {
    "nav.contribute": "Contribute on GitHub",
    "hero.kicker": "Global registry · receipt before claim",
    "hero.title": "Persian LLM Reference",
    "hero.lede":
      "A structured open registry for Persian models — model, corpus, benchmark, leaderboard. JSON for researchers and agents. Community-maintained — not a personal list.",
    "compare.heading": "Why this reference?",
    "compare.c1": "Structured JSON — not links only",
    "compare.c2": "Verification gates indexed → measured",
    "compare.c3": "Persian axes (editorial estimates; null = unknown)",
    "compare.c4": "Bilingual FA/EN · stable API",
    "stats.entries": "entries",
    "stats.models": "models",
    "stats.datasets": "datasets",
    "filter.search": "Search…",
    "filter.all": "All classes",
    "filter.statusAll": "All statuses",
    "atlas.heading": "Registry",
    "atlas.empty": "No matches.",
    "gap.heading": "Gap map",
    "trust.heading": "Trust & methodology",
    "trust.body": "Entries need a primary source URL. Status moves indexed → verified → measured only with cited evidence. Axis scores are editorial estimates where set; null means unknown — never invented.",
    "footer.law": "No invented scores. Global reference — not a personal project.",
    "class.native-foundation": "Native foundation",
    "class.adapted-instruct": "Adapted instruct",
    "class.multilingual-frontier": "Multilingual frontier",
    "class.encoder-only": "Encoder only",
    "class.dataset": "Dataset",
    "class.leaderboard": "Leaderboard",
    "class.community-index": "Community index",
    "class.program": "Program",
  },
  fa: {
    "nav.contribute": "مشارکت در گیت‌هاب",
    "hero.kicker": "رجیستری جهانی · رسید قبل از ادعا",
    "hero.title": "مرجع جهانی مدل‌های زبانی فارسی",
    "hero.lede":
      "رجیستری باز و ساختاریافته برای مدل‌های فارسی — مدل، پیکره، بنچمارک، جدول. JSON برای پژوهشگران و عامل‌ها. نگهداری جامعه — نه فهرست شخصی.",
    "compare.heading": "چرا این مرجع؟",
    "compare.c1": "ساختار JSON — نه فقط پیوند",
    "compare.c2": "درگاه تأیید indexed → measured",
    "compare.c3": "محور فارسی (برآورد تحریریه؛ null = نامشخص)",
    "compare.c4": "دوزبانه FA/EN · API پایدار",
    "stats.entries": "رکورد",
    "stats.models": "مدل",
    "stats.datasets": "پیکره",
    "filter.search": "جستجو…",
    "filter.all": "همه کلاس‌ها",
    "filter.statusAll": "همه وضعیت‌ها",
    "atlas.heading": "رجیستری",
    "atlas.empty": "نتیجه‌ای نیست.",
    "gap.heading": "نقشهٔ شکاف",
    "trust.heading": "اعتماد و روش",
    "trust.body": "هر رکورد به نشانی منبع اولیه نیاز دارد. وضعیت فقط با استناد indexed → verified → measured می‌شود. نمرهٔ محورها برآورد تحریریه است؛ null یعنی نامشخص — نه ساختگی.",
    "footer.law": "نمرهٔ ساختگی ممنوع. مرجع جهانی — نه پروژهٔ شخصی.",
    "class.native-foundation": "بنیان فارسی",
    "class.adapted-instruct": "دستوری سازگارشده",
    "class.multilingual-frontier": "مرز چندزبانه",
    "class.encoder-only": "فقط رمزگذار",
    "class.dataset": "Dataset",
    "class.leaderboard": "جدول",
    "class.community-index": "فهرست جامعه",
    "class.program": "برنامه",
  },
};

const AXES = ["scriptFidelity", "corpusLaw", "curriculumFit", "literaryDepth", "nativePreference"];

let lang = localStorage.getItem("plr-lang") || "fa";
let manifest = null;
let siteConfig = null;

function t(key) {
  return I18N[lang][key] || I18N.en[key] || key;
}

function applyI18n() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  const search = document.getElementById("search");
  if (search) search.placeholder = t("filter.search");
  document.getElementById("lang-toggle").textContent = lang === "fa" ? "EN" : "فا";
}

function setApiLine() {
  const path = siteConfig?.manifestPath || "/data/reference-manifest.json";
  const raw = siteConfig?.manifestRaw || path;
  document.getElementById("api-line").innerHTML =
    `API: <code>${path}</code> · raw: <code>${raw}</code>`;
}

function renderStats() {
  const s = manifest.stats || {};
  const bar = document.getElementById("stats-bar");
  const models = s.byKind?.model || manifest.entries.filter((e) => e.kind === "model").length;
  const datasets = s.byKind?.dataset || manifest.entries.filter((e) => e.kind === "dataset").length;
  bar.innerHTML = `
    <span class="stat"><strong>${s.total || manifest.entries.length}</strong> ${t("stats.entries")}</span>
    <span class="stat"><strong>${models}</strong> ${t("stats.models")}</span>
    <span class="stat"><strong>${datasets}</strong> ${t("stats.datasets")}</span>
    <span class="stat muted">${manifest.version} · ${manifest.generatedAt?.slice(0, 10) || ""}</span>`;
}

function injectSchema() {
  const el = document.getElementById("schema-dataset");
  if (!el) return;
  el.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Persian LLM Reference",
    description: manifest.mission?.en,
    inLanguage: ["fa", "en"],
    url: siteConfig?.canonicalSite || location.origin,
    distribution: {
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: siteConfig?.manifestRaw || `${location.origin}/data/reference-manifest.json`,
    },
  });
}

function entryAxes(entry) {
  return entry.persianAxes || entry.alefbaAxes || null;
}

function axisDots(axes) {
  if (!axes) return "";
  const nums = AXES.map((k) => axes[k]).filter((v) => typeof v === "number");
  if (nums.length === 0) return "";
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  const filled = Math.round(avg);
  return `<span class="axis-row" title="Persian axes (editorial; null=unknown)">${Array.from({ length: 4 })
    .map((_, i) => `<span class="axis-dot ${i < filled ? "filled" : ""}"></span>`)
    .join("")}</span>`;
}

function linkHtml(links) {
  if (!links) return "";
  const parts = [];
  if (links.hf) parts.push(`<a href="${links.hf}" target="_blank" rel="noopener">HF</a>`);
  if (links.paper) parts.push(`<a href="${links.paper}" target="_blank" rel="noopener">paper</a>`);
  if (links.repo) parts.push(`<a href="${links.repo}" target="_blank" rel="noopener">repo</a>`);
  if (links.web) parts.push(`<a href="${links.web}" target="_blank" rel="noopener">web</a>`);
  if (links.ollama) parts.push(`<a href="${links.ollama}" target="_blank" rel="noopener">ollama</a>`);
  if (links.leaderboard) parts.push(`<a href="${links.leaderboard}" target="_blank" rel="noopener">board</a>`);
  return parts.length ? `<div class="card-links">${parts.join("")}</div>` : "";
}

function renderCard(entry) {
  const name = entry.name[lang] || entry.name.en;
  const summary = entry.summary[lang] || entry.summary.en;
  const classLabel = t(`class.${entry.class}`) || entry.class;
  const size = entry.sizeB ? `${entry.sizeB}B` : "—";
  return `
    <article class="entry-card" data-class="${entry.class}" data-status="${entry.status}" data-id="${entry.id}">
      <div class="entry-meta">
        <span class="badge">${classLabel}</span>
        <span class="badge badge--status-${entry.status}">${entry.status}</span>
        <span class="badge">${size}</span>
      </div>
      <h3>${name}</h3>
      <p>${summary}</p>
      ${axisDots(entryAxes(entry))}
      ${linkHtml(entry.links)}
    </article>`;
}

function getFilters() {
  return {
    q: document.getElementById("search").value.trim().toLowerCase(),
    cls: document.getElementById("class-filter").value,
    status: document.getElementById("status-filter").value,
  };
}

function renderAtlas() {
  if (!manifest) return;
  const { q, cls, status } = getFilters();
  const entries = manifest.entries.filter((e) => {
    if (cls && e.class !== cls) return false;
    if (status && e.status !== status) return false;
    if (!q) return true;
    return JSON.stringify(e).toLowerCase().includes(q);
  });
  document.getElementById("entry-grid").innerHTML = entries.map(renderCard).join("");
  document.getElementById("empty-state").classList.toggle("hidden", entries.length > 0);
}

function fillClassFilter() {
  const sel = document.getElementById("class-filter");
  const classes = [...new Set(manifest.entries.map((e) => e.class))].sort();
  sel.innerHTML = `<option value="">${t("filter.all")}</option>`;
  classes.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = t(`class.${c}`) || c;
    sel.appendChild(opt);
  });
}

function renderGap() {
  const items = manifest.gapMap[lang] || manifest.gapMap.en;
  document.getElementById("gap-list").innerHTML = items.map((li) => `<li>${li}</li>`).join("");
}

function resolveManifestUrl() {
  const basePath = (siteConfig?.basePath || "").replace(/\/$/, "");
  if (basePath) {
    return new URL(`${basePath}/data/reference-manifest.json`, location.origin).href;
  }
  const pageBase = location.href.endsWith("/") ? location.href : `${location.href}/`;
  return new URL("data/reference-manifest.json", pageBase).href;
}

async function loadManifest() {
  const urls = [resolveManifestUrl()];
  const fallback = new URL("data/reference-manifest.json", location.href);
  if (!urls.includes(fallback.href)) urls.push(fallback.href);
  urls.push("/data/reference-manifest.json", "/api/reference.json");

  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
    } catch {
      /* try next */
    }
  }
  throw new Error("manifest_unavailable");
}

async function boot() {
  applyI18n();
  try {
    siteConfig = await fetch(new URL("site-config.json", location.href)).then((r) => r.json());
    const gh = document.getElementById("github-link");
    if (gh && siteConfig.canonicalRepo) gh.href = siteConfig.canonicalRepo;
  } catch {
    siteConfig = {};
  }

  manifest = await loadManifest();
  setApiLine();
  renderStats();
  injectSchema();
  fillClassFilter();
  renderGap();
  renderAtlas();

  document.getElementById("lang-toggle").addEventListener("click", () => {
    lang = lang === "fa" ? "en" : "fa";
    localStorage.setItem("plr-lang", lang);
    applyI18n();
    fillClassFilter();
    renderGap();
    renderStats();
    renderAtlas();
  });

  ["search", "class-filter", "status-filter"].forEach((id) => {
    document.getElementById(id).addEventListener("input", renderAtlas);
    document.getElementById(id).addEventListener("change", renderAtlas);
  });
}

boot();
