import {
  displayText as displayTextFor,
  emptyValue as emptyValueFor,
  formatNum as formatNumFor,
  formatPercent as formatPercentFor,
  formatScorePair as formatScorePairFor,
  formatSizeB as formatSizeBFor,
  localizeDigits as localizeDigitsFor,
} from "./plr-locale.js";

const I18N = {
  en: {
    "nav.contribute": "GitHub",
    "nav.skip": "Skip to registry",
    "nav.atlas": "Registry",
    "nav.timeline": "Timeline",
    "nav.radar": "Sources",
    "nav.gap": "Gaps",
    "nav.tree": "Tree",
    "nav.references": "References",
    "brand.name": "Persian LLM Reference",
    "hero.ctaAtlas": "Browse registry",
    "hero.ctaRefs": "Ecosystem sources",
    "hero.ctaJson": "JSON manifest",
    "tree.heading": "Ecosystem tree",
    "tree.sub": "Taxonomy and base-model lineage — from manifest fields only, not invented genealogy.",
    "tree.taxonomy": "Taxonomy",
    "tree.lineage": "Base lineage",
    "tree.clear": "Clear tree filter",
    "tree.filterActive": "Tree filter active",
    "inspector.related": "Related entries",
    "inspector.sameBase": "Same base model",
    "inspector.sameOrg": "Same organization",
    "results.showing": "Showing",
    "results.of": "of",
    "results.entries": "entries",
    "inspector.meta": "Details",
    "inspector.benchmarks": "Benchmarks",
    "inspector.axes": "Persian axes",
    "inspector.links": "Sources",
    "inspector.open": "View details",
    "inspector.share": "Share page",
    "inspector.copied": "Copied",
    "axis.scriptFidelity": "Script",
    "axis.corpusLaw": "Corpus",
    "axis.curriculumFit": "Curriculum",
    "axis.literaryDepth": "Literary",
    "axis.nativePreference": "Native",
    "hero.title": "Persian LLM Reference",
    "hero.lede": "A registry of Persian models, datasets, and benchmarks. Every entry has a source and a clear status.",
    "intro.body":
      "This page is for anyone who needs to know what exists for Persian. You should not have to chase scattered links. Every row points to a primary source. If you see a score, you can verify it yourself.",
    "compare.heading": "Why use this reference?",
    "compare.panel": "Compare (up to 3)",
    "compare.add": "Compare",
    "compare.clear": "Clear",
    "compare.empty": "Select up to 3 entries to compare side by side.",
    "gap.filter": "Filter by topic",
    "gap.clear": "Show all",
    "compare.c1": "Structured records — not links alone",
    "compare.c2": "Three trust levels: indexed → verified → measured",
    "compare.c3": "Persian-specific axes (editorial estimates; null = unknown)",
    "compare.c4": "Bilingual FA/EN · stable API",
    "stats.entries": "entries",
    "stats.models": "models",
    "stats.datasets": "datasets",
    "stats.manifest": "manifest",
    "stats.summary": "{measured} measured, {verified} verified, v{version}",
    "filter.search": "Search…",
    "filter.all": "All classes",
    "filter.kindAll": "All kinds",
    "filter.statusAll": "All statuses",
    "atlas.heading": "Registry",
    "atlas.empty": "No matches.",
    "gap.heading": "What is still open?",
    "timeline.heading": "Field timeline",
    "timeline.sub": "Documented milestones and recent verifications — based on sources, not marketing.",
    "timeline.more": "more",
    "timeline.release": "release",
    "timeline.firstSeen": "first seen",
    "radar.heading": "Source radar",
    "radar.sub": "Persian LLM sources in the field — cataloged here, documented gaps, or planned releases.",
    "radar.cataloged": "cataloged",
    "radar.gap": "field gap",
    "radar.planned": "planned",
    "radar.forecast": "PLR forecast",
    "radar.sourceLink": "view source",
    "trust.heading": "Trust & methodology",
    "trust.body":
      "Entries need a primary source URL. Status moves indexed → verified → measured only with cited evidence. Axis scores are editorial estimates where set; null means unknown — never invented.",
    "trust.methodology": "Methodology",
    "trust.roadmap": "Roadmap",
    "trust.awesome": "Awesome-Persian-LLM",
    "trust.references": "Sources & citations",
    "refs.heading": "Sources & citations",
    "refs.sub": "PLR works alongside discovery lists, leaderboards, and papers — it does not replace them. Each row links to its own primary source.",
    "refs.type.upstream-discovery": "Discovery",
    "refs.type.leaderboard": "Leaderboard",
    "refs.type.benchmark": "Benchmark",
    "refs.type.dataset-index": "Hosting",
    "refs.visit": "Open source",
    "refs.extra": "Project page",
    "cite.copy": "Copy BibTeX",
    "cite.copied": "Copied",
    "footer.tagline": "Open, citable atlas for the Persian LLM ecosystem.",
    "theme.toLight": "Switch to light theme",
    "theme.toDark": "Switch to dark theme",
    "footer.law": "No invented scores. Community atlas — we cite the people who built the work.",
    "view.grid": "Cards",
    "view.table": "Table",
    "export.csv": "Export CSV",
    "table.name": "Name",
    "table.kind": "Kind",
    "table.class": "Class",
    "table.size": "Size (B)",
    "table.status": "Status",
    "table.license": "License",
    "table.links": "Links",
    "compare.colPersianMedQA": "PersianMedQA",
    "cite.heading": "Cite this registry",
    "lane.all": "All",
    "lane.finetune": "Fine-tune",
    "lane.benchmark": "Benchmarks",
    "lane.leaderboard": "Leaderboards",
    "lane.frontier": "Frontier APIs",
    "class.native-foundation": "Native foundation",
    "class.adapted-instruct": "Adapted instruct",
    "class.multilingual-frontier": "Multilingual frontier",
    "class.encoder-only": "Encoder only",
    "class.dataset": "Dataset",
    "class.leaderboard": "Leaderboard",
    "class.community-index": "Community index",
    "class.program": "Program",
    "kind.model": "model",
    "kind.dataset": "dataset",
    "kind.leaderboard": "leaderboard",
    "kind.community-index": "index",
    "status.indexed": "indexed",
    "status.verified": "verified",
    "status.measured": "measured",
  },
  fa: {
    "nav.contribute": "گیت‌هاب",
    "nav.skip": "رفتن به فهرست",
    "nav.atlas": "فهرست",
    "nav.timeline": "گاه‌شمار",
    "nav.radar": "وضعیت میدان",
    "nav.gap": "جاهای خالی",
    "nav.tree": "دسته‌بندی",
    "nav.references": "منابع",
    "brand.name": "مرجع مدل‌های فارسی",
    "hero.ctaAtlas": "دیدن فهرست",
    "hero.ctaRefs": "منابع اصلی",
    "hero.ctaJson": "دریافت JSON",
    "tree.heading": "دسته‌بندی و تبار",
    "tree.sub": "مدل‌ها را بر اساس نوع و مدل پایه می‌چینیم. فقط از دادهٔ همین فهرست.",
    "tree.taxonomy": "طبقه‌بندی",
    "tree.lineage": "تبار پایه",
    "tree.clear": "پاک کردن فیلتر درخت",
    "tree.filterActive": "فیلتر درخت فعال",
    "inspector.related": "موارد مرتبط",
    "inspector.sameBase": "همان مدل پایه",
    "inspector.sameOrg": "همان سازمان",
    "results.showing": "نمایش",
    "results.of": "از",
    "results.entries": "مورد",
    "inspector.meta": "جزئیات",
    "inspector.benchmarks": "معیارهای سنجش",
    "inspector.axes": "محورهای فارسی",
    "inspector.links": "منابع",
    "inspector.open": "جزئیات بیشتر",
    "inspector.share": "اشتراک لینک",
    "inspector.copied": "کپی شد",
    "axis.scriptFidelity": "خط",
    "axis.corpusLaw": "حقوق داده",
    "axis.curriculumFit": "برنامهٔ درسی",
    "axis.literaryDepth": "ادبیات",
    "axis.nativePreference": "ترجیح بومی",
    "hero.title": "مرجع مدل‌های زبانی فارسی",
    "hero.lede": "فهرستی از مدل‌ها، داده‌ها و معیارهای فارسی. هر مورد منبع دارد و وضعیتش مشخص است.",
    "intro.body":
      "این صفحه برای کسی است که می‌خواهد بداند در فارسی چه مدل و داده و معیاری وجود دارد. لازم نیست بین لینک‌های پراکنده بگردید. هر ردیف به منبع اصلی وصل است. اگر عددی می‌بینید می‌توانید خودتان بروید بررسی کنید.",
    "compare.heading": "چرا اینجا؟",
    "compare.panel": "مقایسه، حداکثر ۳ مورد",
    "compare.add": "افزودن به مقایسه",
    "compare.clear": "پاک کردن",
    "compare.empty": "حداکثر ۳ مورد را کنار هم انتخاب کنید.",
    "gap.filter": "فیلتر موضوع",
    "gap.clear": "نمایش همه",
    "compare.c1": "هر مورد یک ردیف منظم است، نه فقط یک لینک پراکنده",
    "compare.c2": "اول ثبت، بعد تأیید منبع، بعد نمره اگر بود",
    "compare.c3": "برای فارسی معیارهای جدا داریم. خط، حقوق داده، ادبیات.",
    "compare.c4": "هم فارسی هم انگلیسی. همان آدرس داده برای تیم و اسکریپت.",
    "stats.entries": "مورد",
    "stats.models": "مدل",
    "stats.datasets": "داده",
    "stats.manifest": "فهرست داده",
    "stats.summary": "{measured} با نمره، {verified} تأیید شده، نسخه {version}",
    "filter.search": "جستجو…",
    "filter.all": "همهٔ دسته‌ها",
    "filter.kindAll": "همهٔ انواع",
    "filter.statusAll": "همهٔ وضعیت‌ها",
    "atlas.heading": "فهرست مدل‌ها و داده‌ها",
    "atlas.empty": "چیزی با این فیلتر پیدا نشد.",
    "gap.heading": "چه چیزهایی هنوز نیامده؟",
    "timeline.heading": "گاه‌شمار",
    "timeline.sub": "نسخه‌های مهم و تازه‌ترین موارد تأییدشده.",
    "timeline.more": "مورد دیگر",
    "timeline.release": "نسخه",
    "timeline.firstSeen": "اولین ثبت",
    "radar.heading": "وضعیت میدان",
    "radar.sub": "چه چیز هست، چه چیز اینجا ثبت شده، چه چیز هنوز نیامده.",
    "radar.cataloged": "ثبت شده اینجا",
    "radar.gap": "هنوز نیامده",
    "radar.planned": "در راه",
    "radar.forecast": "برنامهٔ توسعه",
    "radar.sourceLink": "مشاهدهٔ منبع",
    "trust.heading": "اعتبار از کجا می‌آید؟",
    "trust.body":
      "هر ردیف به منبع اصلی وصل است. وضعیت بدون مدرک عوض نمی‌شود. جایی که مطمئن نیستیم خالی می‌ماند.",
    "trust.methodology": "روش کار",
    "trust.roadmap": "نقشهٔ راه",
    "trust.awesome": "فهرست Awesome-Persian-LLM",
    "trust.references": "منابع و ارجاعات",
    "refs.heading": "ارجاع به منابع",
    "refs.sub": "کنار فهرست‌های دیگر می‌ایستیم. جای آن‌ها را نمی‌گیریم. برای هر منبع لینک خودش را داریم.",
    "refs.type.upstream-discovery": "کشف",
    "refs.type.leaderboard": "جدول امتیاز",
    "refs.type.benchmark": "معیار سنجش",
    "refs.type.dataset-index": "میزبانی",
    "refs.visit": "باز کردن منبع",
    "refs.extra": "صفحهٔ پروژه",
    "cite.copy": "کپی BibTeX",
    "cite.copied": "کپی شد",
    "footer.tagline": "راهنمای باز مدل‌های زبانی فارسی",
    "theme.toLight": "حالت روشن",
    "theme.toDark": "حالت تیره",
    "footer.law": "عدد نمی‌سازیم. اسم سازنده و منبع را می‌نویسیم.",
    "view.grid": "نمای کارت",
    "view.table": "نمای جدول",
    "export.csv": "دانلود CSV",
    "table.name": "نام",
    "table.kind": "نوع",
    "table.class": "دسته",
    "table.size": "اندازه (میلیارد)",
    "table.status": "وضعیت",
    "table.links": "لینک‌ها",
    "table.license": "مجوز",
    "compare.colPersianMedQA": "پرشین‌مد‌کیوای",
    "cite.heading": "چطور به این مرجع ارجاع دهیم",
    "lane.all": "همه",
    "lane.finetune": "مدل‌های فارسی‌شده",
    "lane.benchmark": "معیارهای سنجش",
    "lane.leaderboard": "جدول امتیاز",
    "lane.frontier": "مدل‌های API",
    "class.native-foundation": "بنیان بومی فارسی",
    "class.adapted-instruct": "مدل دستوری فارسی‌شده",
    "class.multilingual-frontier": "مدل مرزی چندزبانه",
    "class.encoder-only": "مدل رمزگذار",
    "class.dataset": "مجموعه داده",
    "class.leaderboard": "جدول امتیاز",
    "class.community-index": "فهرست جامعه",
    "class.program": "برنامهٔ پژوهشی",
    "kind.model": "مدل",
    "kind.dataset": "داده",
    "kind.leaderboard": "جدول",
    "kind.community-index": "فهرست",
    "status.indexed": "تازه ثبت شده",
    "status.verified": "تأیید شده",
    "status.measured": "با نمره",
  },
};

const LANES = [
  { id: "all", labelKey: "lane.all", match: () => true },
  {
    id: "finetune",
    labelKey: "lane.finetune",
    match: (e) => e.kind === "model" && e.class === "adapted-instruct",
  },
  {
    id: "benchmark",
    labelKey: "lane.benchmark",
    match: (e) => e.kind === "dataset" && e.class === "dataset",
  },
  {
    id: "leaderboard",
    labelKey: "lane.leaderboard",
    match: (e) => e.class === "leaderboard",
  },
  {
    id: "frontier",
    labelKey: "lane.frontier",
    match: (e) => e.class === "multilingual-frontier",
  },
];

const AXES = ["scriptFidelity", "corpusLaw", "curriculumFit", "literaryDepth", "nativePreference"];
const MIN_ENTRIES = 67;

const RELEASE_MILESTONES = [
  {
    date: "2026-08-12",
    en: "v0.3 — structured atlas, 41+ entries, bilingual UI",
    fa: "نسخه ۰.۳. راه‌اندازی اطلس با بیش از ۴۱ مورد و رابط دوزبانه",
  },
  {
    date: "2026-08-13",
    en: "v0.4 — 55 entries, link CI, PersianMedQA measured wave",
    fa: "نسخه ۰.۴. ۵۵ مورد، بررسی خودکار لینک‌ها، نمره‌های PersianMedQA",
  },
  {
    date: "2026-08-13",
    en: "v0.9 — ecosystem tree: taxonomy + base lineage + related entries",
    fa: "نسخه ۰.۹. درخت اکوسیستم، طبقه‌بندی، تبار پایه، موارد مرتبط",
  },
  {
    date: "2026-08-13",
    en: "v0.8 — atlas UI v2: workspace, inspector, command palette",
    fa: "نسخه ۰.۸. رابط اطلس نسل دوم، فضای کاری، جزئیات، جستجوی سریع",
  },
];

let lang = localStorage.getItem("plr-lang") || "fa";
let manifest = null;
let siteConfig = null;
let sourceRadar = null;
let activeLane = "all";
let viewMode = localStorage.getItem("plr-view") || "grid";
let sortKey = "name";
let sortDir = 1;
let compareIds = JSON.parse(localStorage.getItem("plr-compare") || "[]").slice(0, 3);
let activeGapTag = "";
let activeLineageBase = "";
let activeTreeKind = "";
let activeTreeClass = "";
let selectedEntryId = "";

function getTheme() {
  return window.plrGetTheme ? window.plrGetTheme() : document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function setTheme(theme) {
  if (window.plrSetTheme) window.plrSetTheme(theme);
  else document.documentElement.setAttribute("data-theme", theme === "light" ? "light" : "dark");
  updateThemeToggle();
}

function updateThemeToggle() {
  const btn = document.getElementById("theme-toggle");
  if (!btn) return;
  if (window.plrPaintThemeButton) window.plrPaintThemeButton();
  const light = getTheme() === "light";
  btn.setAttribute("aria-label", light ? t("theme.toDark") : t("theme.toLight"));
}

function initThemeToggle() {
  window.plrSyncThemeToggle = updateThemeToggle;
  updateThemeToggle();
  document.addEventListener("plr-theme-change", updateThemeToggle);
}

function resolveEntryId() {
  if (typeof window !== "undefined" && window.__PLR_ENTRY_ID__) return window.__PLR_ENTRY_ID__;
  const q = new URLSearchParams(location.search).get("entry");
  if (q) return q;
  const basePath = (siteConfig?.basePath || "").replace(/\/$/, "");
  let path = location.pathname;
  if (basePath && path.startsWith(basePath)) path = path.slice(basePath.length);
  const m = path.match(/\/entry\/([^/]+)\/?$/);
  return m ? decodeURIComponent(m[1]) : "";
}

function atlasHomeUrl() {
  const basePath = (siteConfig?.basePath || "").replace(/\/$/, "");
  if (basePath) return `${basePath}/`;
  return "/";
}

function t(key) {
  return I18N[lang][key] || I18N.en[key] || key;
}

function emptyValue() {
  return emptyValueFor(lang);
}

function localizeDigits(text) {
  return localizeDigitsFor(text, lang);
}

function formatNum(value) {
  return formatNumFor(value, lang);
}

function formatSizeB(sizeB) {
  return formatSizeBFor(sizeB, lang);
}

function formatPercent(score) {
  return formatPercentFor(score, lang);
}

function formatScorePair(value, max = 5) {
  return formatScorePairFor(value, max, lang);
}

function displayText(text) {
  return displayTextFor(text, lang);
}

function entryName(entry) {
  return displayText(entry.name[lang] || entry.name.en);
}

function entrySummary(entry) {
  return displayText(entry.summary[lang] || entry.summary.en);
}

function statusLabel(status) {
  return t(`status.${status}`) || status;
}

function applyI18n() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
  document.title = lang === "fa" ? "مرجع مدل‌های زبانی فارسی" : "Persian LLM Reference";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  const search = document.getElementById("search");
  if (search) search.placeholder = t("filter.search");
  const statusSel = document.getElementById("status-filter");
  if (statusSel) {
    [...statusSel.options].forEach((opt) => {
      if (opt.value) opt.textContent = statusLabel(opt.value);
    });
  }
  document.getElementById("lang-toggle").textContent = lang === "fa" ? "EN" : "فا";
  setApiLine();
}

function setApiLine() {
  const path = siteConfig?.manifestPath || "/data/reference-manifest.json";
  const raw = siteConfig?.manifestRaw || path;
  const el = document.getElementById("api-line");
  if (!el) return;
  if (lang === "fa") {
    el.innerHTML = `داده: <code>${path}</code>، خام: <code>${raw}</code>`;
  } else {
    el.innerHTML = `API: <code>${path}</code> · raw: <code>${raw}</code>`;
  }
}

function citeBibtex() {
  const raw = siteConfig?.manifestRaw || "https://raw.githubusercontent.com/sinakazemnezhad/persian-llm-reference/main/data/reference-manifest.json";
  const ver = manifest.version || "0.3.0";
  const date = manifest.generatedAt?.slice(0, 10) || "";
  return `@misc{persian_llm_reference,
  title={Persian LLM Reference},
  year={2026},
  url={${siteConfig?.canonicalSite || "https://sinakazemnezhad.github.io/persian-llm-reference"}},
  note={manifest v${ver} generatedAt ${date}}
}
Manifest: ${raw}`;
}

function renderCite() {
  const block = document.getElementById("cite-block");
  if (!block) return;
  block.innerHTML = `
    <div class="cite-block__head">
      <p class="cite-block__title"><strong>${t("cite.heading")}</strong></p>
      <button type="button" class="btn btn-ghost btn-sm" data-copy-cite>${t("cite.copy")}</button>
    </div>
    <pre class="cite-pre">${citeBibtex().replace(/</g, "&lt;")}</pre>`;
  block.querySelector("[data-copy-cite]")?.addEventListener("click", async (ev) => {
    try {
      await navigator.clipboard.writeText(citeBibtex());
      const btn = ev.currentTarget;
      const prev = btn.textContent;
      btn.textContent = t("cite.copied");
      setTimeout(() => {
        btn.textContent = prev;
      }, 1600);
    } catch {
      block.querySelector(".cite-pre")?.focus?.();
    }
  });
}

function refNote(citation) {
  if (!citation?.note) return "";
  let note = "";
  if (typeof citation.note === "string") note = citation.note;
  else note = citation.note[lang] || citation.note.en || "";
  return displayText(note);
}

function renderReferences() {
  const el = document.getElementById("refs-grid");
  if (!el) return;
  const citations = manifest.meta?.citations || [];
  el.innerHTML = citations
    .map((c) => {
      const typeLabel = t(`refs.type.${c.type}`) || c.type;
      const note = refNote(c);
      const extra = c.extra
        ? `<a class="ref-card__link ref-card__link--secondary" href="${c.extra}" target="_blank" rel="noopener">${t("refs.extra")}</a>`
        : "";
      return `
      <article class="ref-card ref-card--${c.type}">
        <div class="ref-card__top">
          <span class="ref-card__type">${typeLabel}</span>
          <span class="ref-card__org">${c.maintainer || ""}</span>
        </div>
        <h3 class="ref-card__title"><a href="${c.url}" target="_blank" rel="noopener">${c.title}</a></h3>
        ${note ? `<p class="ref-card__note">${note}</p>` : ""}
        <div class="ref-card__actions">
          <a class="ref-card__link" href="${c.url}" target="_blank" rel="noopener">${t("refs.visit")}${lang === "fa" ? "" : " →"}</a>
          ${extra}
        </div>
      </article>`;
    })
    .join("");
}

function renderStats() {
  const s = manifest.stats || {};
  const bar = document.getElementById("stats-bar");
  if (!bar) return;
  const total = s.total || manifest.entries.length;
  const models = s.byKind?.model || manifest.entries.filter((e) => e.kind === "model").length;
  const datasets = s.byKind?.dataset || manifest.entries.filter((e) => e.kind === "dataset").length;
  const measured = s.byStatus?.measured || manifest.entries.filter((e) => e.status === "measured").length;
  bar.innerHTML = `
    <div class="hero-stat"><strong>${formatNum(total)}</strong><span>${t("stats.entries")}</span></div>
    <div class="hero-stat"><strong>${formatNum(models)}</strong><span>${t("stats.models")}</span></div>
    <div class="hero-stat"><strong>${formatNum(datasets)}</strong><span>${t("stats.datasets")}</span></div>
    <div class="hero-stat hero-stat--accent"><strong>${formatNum(measured)}</strong><span>${t("status.measured")}</span></div>`;
}

function renderTrustPipeline() {
  const el = document.getElementById("trust-pipeline");
  if (!el || !manifest) return;
  const s = manifest.stats?.byStatus || {};
  const verified = s.verified ?? manifest.entries.filter((e) => e.status === "verified").length;
  const measured = s.measured ?? manifest.entries.filter((e) => e.status === "measured").length;
  const version = manifest.version || "";
  el.textContent = t("stats.summary")
    .replace("{measured}", formatNum(measured))
    .replace("{verified}", formatNum(verified))
    .replace("{version}", localizeDigits(version));
}

function renderResultsMeta(count) {
  const el = document.getElementById("results-meta");
  if (!el) return;
  const total = manifest.entries.length;
  if (count === total && !getFilters().q && !getFilters().kind && !getFilters().cls && !getFilters().status && activeLane === "all" && !activeGapTag && !hasTreeFilter()) {
    el.textContent = "";
    return;
  }
  const sep = lang === "fa" ? "، " : " · ";
  const extra = hasTreeFilter() ? `${sep}${t("tree.filterActive")}` : "";
  el.innerHTML = `${t("results.showing")} <strong>${formatNum(count)}</strong> ${t("results.of")} <strong>${formatNum(total)}</strong> ${t("results.entries")}${extra}`;
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

function entryInitial(entry) {
  const name = entry.name.en || entry.name.fa || entry.id;
  return name.charAt(0).toUpperCase();
}

function benchMeterHtml(benchmarks) {
  const bench = benchmarks?.[0];
  if (!bench) return "";
  const score = parseFloat(bench.score);
  if (Number.isNaN(score)) return "";
  const pct = Math.min(100, Math.max(0, score));
  return `<div class="bench-meter">
    <div class="bench-meter__head">
      <span class="bench-meter__name">${bench.name}</span>
      <span class="bench-meter__val">${formatPercent(score)}</span>
    </div>
    <div class="bench-meter__track"><div class="bench-meter__fill" style="width:${pct}%"></div></div>
  </div>`;
}

function axisChartHtml(axes) {
  if (!axes) return "";
  const rows = AXES.map((key) => {
    const val = axes[key];
    if (typeof val !== "number") return "";
    const pct = Math.round((val / 5) * 100);
    const label = t(`axis.${key}`) || key;
    return `<div class="axis-row-mini">
      <span>${label}</span>
      <div class="axis-row-mini__bar"><div class="axis-row-mini__fill" style="width:${pct}%"></div></div>
      <span class="axis-row-mini__val">${formatScorePair(val)}</span>
    </div>`;
  }).filter(Boolean);
  return rows.length ? `<div class="axis-chart">${rows.join("")}</div>` : "";
}

function axisDots(axes) {
  return axisChartHtml(axes);
}

function linkHtml(links, compact = false) {
  if (!links) return "";
  const parts = [];
  if (links.hf) parts.push(`<a href="${links.hf}" target="_blank" rel="noopener">HF</a>`);
  if (links.paper) parts.push(`<a href="${links.paper}" target="_blank" rel="noopener">paper</a>`);
  if (links.repo) parts.push(`<a href="${links.repo}" target="_blank" rel="noopener">repo</a>`);
  if (links.web) parts.push(`<a href="${links.web}" target="_blank" rel="noopener">web</a>`);
  if (links.ollama) parts.push(`<a href="${links.ollama}" target="_blank" rel="noopener">ollama</a>`);
  if (links.leaderboard) parts.push(`<a href="${links.leaderboard}" target="_blank" rel="noopener">board</a>`);
  return parts.length ? `<div class="card-links${compact ? " card-links--compact" : ""}">${parts.join("")}</div>` : "";
}

function inspectorLinksHtml(links) {
  if (!links) return "";
  const labels = { hf: "Hugging Face", paper: "Paper", repo: "Repository", web: "Web", ollama: "Ollama", leaderboard: "Leaderboard" };
  const parts = Object.entries(links)
    .filter(([, url]) => url)
    .map(([key, url]) => `<a href="${url}" target="_blank" rel="noopener">${labels[key] || key}</a>`);
  return parts.join("");
}

function entryUrl(id) {
  const basePath = (siteConfig?.basePath || "").replace(/\/$/, "");
  if (basePath) return `${basePath}/entry/${encodeURIComponent(id)}/`;
  return `/entry/${encodeURIComponent(id)}/`;
}

function absoluteEntryUrl(id) {
  const base = (siteConfig?.canonicalSite || location.origin).replace(/\/$/, "");
  const basePath = (siteConfig?.basePath || "").replace(/\/$/, "");
  return `${base}${basePath}/entry/${encodeURIComponent(id)}/`;
}

function renderCard(entry, index = 0) {
  const name = entryName(entry);
  const summary = entrySummary(entry);
  const classLabel = t(`class.${entry.class}`) || entry.class;
  const size = formatSizeB(entry.sizeB);
  const inCompare = compareIds.includes(entry.id);
  const isSelected = selectedEntryId === entry.id;
  const delay = Math.min(index, 12) * 30;
  return `
    <article class="entry-card${isSelected ? " is-selected highlight" : ""}" data-class="${entry.class}" data-status="${entry.status}" data-id="${entry.id}" id="entry-${entry.id}" style="animation-delay:${delay}ms">
      <div class="entry-card__stripe entry-card__stripe--${entry.status}"></div>
      <div class="entry-card__body">
        <div class="entry-card__top">
          <div class="entry-card__avatar" aria-hidden="true">${entryInitial(entry)}</div>
          <div class="entry-card__meta">
            <span class="badge badge--status-${entry.status}">${statusLabel(entry.status)}</span>
            <span class="badge">${classLabel}</span>
          </div>
        </div>
        <h3><a href="${entryUrl(entry.id)}">${name}</a></h3>
        <p class="entry-card__summary">${summary}</p>
        ${benchMeterHtml(entry.benchmarks)}
        <div class="entry-card__footer">
          <span class="badge">${size}</span>
          <button type="button" class="btn btn-ghost compare-add${inCompare ? " active" : ""}" data-compare="${entry.id}">${t("compare.add")}</button>
        </div>
      </div>
    </article>`;
}

function getFilters() {
  return {
    q: document.getElementById("search").value.trim().toLowerCase(),
    kind: document.getElementById("kind-filter").value,
    cls: document.getElementById("class-filter").value,
    status: document.getElementById("status-filter").value,
  };
}

function filteredEntries() {
  const { q, kind, cls, status } = getFilters();
  const lane = LANES.find((l) => l.id === activeLane) || LANES[0];
  const kindVal = activeTreeKind || kind;
  const classVal = activeTreeClass || cls;
  return manifest.entries.filter((e) => {
    if (!lane.match(e)) return false;
    if (activeGapTag && !(e.gapTags || []).includes(activeGapTag)) return false;
    if (activeLineageBase && e.origin?.base !== activeLineageBase) return false;
    if (kindVal && e.kind !== kindVal) return false;
    if (classVal && e.class !== classVal) return false;
    if (status && e.status !== status) return false;
    if (!q) return true;
    return JSON.stringify(e).toLowerCase().includes(q);
  });
}

function hasTreeFilter() {
  return Boolean(activeLineageBase || activeTreeKind || activeTreeClass);
}

function clearTreeFilters() {
  activeLineageBase = "";
  activeTreeKind = "";
  activeTreeClass = "";
  document.getElementById("kind-filter").value = "";
  document.getElementById("class-filter").value = "";
  renderTree();
  renderAtlas();
}

function scrollToAtlas() {
  document.getElementById("atlas")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function relatedEntries(entry) {
  const base = entry.origin?.base;
  const org = entry.org;
  const siblings = base
    ? manifest.entries.filter((e) => e.id !== entry.id && e.origin?.base === base)
    : [];
  const sameOrg = org
    ? manifest.entries.filter(
        (e) => e.id !== entry.id && e.org === org && !siblings.some((s) => s.id === e.id)
      )
    : [];
  return { siblings, sameOrg };
}

function relatedEntriesHtml(entry) {
  const { siblings, sameOrg } = relatedEntries(entry);
  if (!siblings.length && !sameOrg.length) return "";
  const row = (e) => {
              const name = displayText(e.name[lang] || e.name.en);
    return `<button type="button" class="inspector-related__item" data-related="${e.id}">${name}</button>`;
  };
  return `<div class="inspector-section"><h4>${t("inspector.related")}</h4><div class="inspector-related">
    ${siblings.length ? `<div class="inspector-related__group"><span class="inspector-related__label">${t("inspector.sameBase")}</span>${siblings.map(row).join("")}</div>` : ""}
    ${sameOrg.length ? `<div class="inspector-related__group"><span class="inspector-related__label">${t("inspector.sameOrg")}</span>${sameOrg.map(row).join("")}</div>` : ""}
  </div></div>`;
}

function renderTaxonomyTree() {
  const el = document.getElementById("taxonomy-tree");
  if (!el) return;
  const tree = {};
  for (const e of manifest.entries) {
    if (!tree[e.kind]) tree[e.kind] = {};
    if (!tree[e.kind][e.class]) tree[e.kind][e.class] = [];
    tree[e.kind][e.class].push(e);
  }
  const kinds = Object.keys(tree).sort();
  el.innerHTML = kinds
    .map((kind) => {
      const classes = Object.keys(tree[kind]).sort();
      const kindCount = classes.reduce((n, c) => n + tree[kind][c].length, 0);
      const kindActive = activeTreeKind === kind && !activeTreeClass;
      const classNodes = classes
        .map((cls) => {
          const entries = tree[kind][cls].sort((a, b) =>
            (a.name[lang] || a.name.en).localeCompare(b.name[lang] || b.name.en)
          );
          const clsActive = activeTreeKind === kind && activeTreeClass === cls;
          const leaves = entries
            .map((e) => {
              const name = entryName(e);
              return `<li class="tree-leaf-row">
                <button type="button" class="tree-node tree-node--leaf" data-tree-entry="${e.id}">
                  <span class="tree-node__status tree-node__status--${e.status}" aria-hidden="true"></span>
                  ${name}
                </button>
              </li>`;
            })
            .join("");
          return `<li>
            <button type="button" class="tree-node tree-node--branch${clsActive ? " is-active" : ""}" data-tree-kind="${kind}" data-tree-class="${cls}">
              <span>${t(`class.${cls}`) || cls}</span>
              <span class="tree-node__count">${formatNum(entries.length)}</span>
            </button>
            <ul>${leaves}</ul>
          </li>`;
        })
        .join("");
      return `<li>
        <details open>
          <summary>
            <button type="button" class="tree-node tree-node--branch${kindActive ? " is-active" : ""}" data-tree-kind="${kind}" data-tree-class="">
              <span>${t(`kind.${kind}`) || kind}</span>
              <span class="tree-node__count">${formatNum(kindCount)}</span>
            </button>
          </summary>
          <ul>${classNodes}</ul>
        </details>
      </li>`;
    })
    .join("");
  el.querySelectorAll("[data-tree-kind]").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const k = btn.dataset.treeKind;
      const c = btn.dataset.treeClass || "";
      if (activeTreeKind === k && activeTreeClass === c) {
        clearTreeFilters();
        return;
      }
      activeTreeKind = k;
      activeTreeClass = c;
      activeLineageBase = "";
      document.getElementById("kind-filter").value = k;
      document.getElementById("class-filter").value = c;
      renderTree();
      renderAtlas();
      scrollToAtlas();
    });
  });
  el.querySelectorAll("[data-tree-entry]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openInspector(btn.dataset.treeEntry);
      scrollToAtlas();
    });
  });
}

function renderLineageTree() {
  const el = document.getElementById("lineage-tree");
  if (!el) return;
  const groups = new Map();
  for (const e of manifest.entries) {
    if (e.kind !== "model") continue;
    const base = e.origin?.base;
    if (!base) continue;
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base).push(e);
  }
  const sorted = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);
  el.innerHTML = sorted
    .map(([base, entries]) => {
      const baseActive = activeLineageBase === base;
      const sortedEntries = [...entries].sort((a, b) =>
        (a.name[lang] || a.name.en).localeCompare(b.name[lang] || b.name.en)
      );
      const leaves = sortedEntries
        .map((e) => {
          const name = entryName(e);
          return `<li class="tree-leaf-row">
            <button type="button" class="tree-node tree-node--leaf" data-tree-entry="${e.id}">
              <span class="tree-node__status tree-node__status--${e.status}" aria-hidden="true"></span>
              ${name}
            </button>
          </li>`;
        })
        .join("");
      return `<li>
        <details${baseActive ? " open" : ""}>
          <summary>
            <button type="button" class="tree-node tree-node--branch${baseActive ? " is-active" : ""}" data-lineage-base="${base}">
              <span>${base}</span>
              <span class="tree-node__count">${formatNum(entries.length)}</span>
            </button>
          </summary>
          <ul>${leaves}</ul>
        </details>
      </li>`;
    })
    .join("");
  el.querySelectorAll("[data-lineage-base]").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const base = btn.dataset.lineageBase;
      if (activeLineageBase === base) {
        clearTreeFilters();
        return;
      }
      activeLineageBase = base;
      activeTreeKind = "";
      activeTreeClass = "";
      document.getElementById("kind-filter").value = "";
      document.getElementById("class-filter").value = "";
      renderTree();
      renderAtlas();
      scrollToAtlas();
    });
  });
  el.querySelectorAll("[data-tree-entry]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openInspector(btn.dataset.treeEntry);
      scrollToAtlas();
    });
  });
}

function renderTree() {
  renderTaxonomyTree();
  renderLineageTree();
  const clearBtn = document.getElementById("tree-clear");
  if (clearBtn) clearBtn.classList.toggle("hidden", !hasTreeFilter());
}

function sortedEntries(entries) {
  const list = [...entries];
  list.sort((a, b) => {
    let av;
    let bv;
    if (sortKey === "name") {
      av = (a.name[lang] || a.name.en || "").toLowerCase();
      bv = (b.name[lang] || b.name.en || "").toLowerCase();
      return av.localeCompare(bv) * sortDir;
    }
    if (sortKey === "sizeB") {
      av = a.sizeB ?? -1;
      bv = b.sizeB ?? -1;
      return (av - bv) * sortDir;
    }
    av = String(a[sortKey] || "");
    bv = String(b[sortKey] || "");
    return av.localeCompare(bv) * sortDir;
  });
  return list;
}

function renderTable(entries) {
  const tbody = document.getElementById("compare-body");
  tbody.innerHTML = entries
    .map((e) => {
      const name = entryName(e);
      const size = formatSizeB(e.sizeB);
      const sel = selectedEntryId === e.id ? " is-selected" : "";
      return `<tr data-id="${e.id}" class="${sel.trim()}">
        <td><a href="${entryUrl(e.id)}">${name}</a></td>
        <td>${t(`kind.${e.kind}`) || e.kind}</td>
        <td>${t(`class.${e.class}`) || e.class}</td>
        <td>${size}</td>
        <td><span class="badge badge--status-${e.status}">${statusLabel(e.status)}</span></td>
        <td>${linkHtml(e.links, true)}</td>
      </tr>`;
    })
    .join("");
  tbody.querySelectorAll("tr").forEach((row) => {
    row.addEventListener("click", (ev) => {
      if (ev.target.closest("a")) return;
      openInspector(row.dataset.id);
    });
  });
}

function openInspector(id, pushState = true) {
  if (!id || !manifest.entries.find((e) => e.id === id)) return;
  selectedEntryId = id;
  if (pushState) history.pushState({ entry: id }, "", entryUrl(id));
  renderInspector();
  renderAtlas();
}

function closeInspector(pushState = true) {
  selectedEntryId = "";
  if (pushState) history.pushState({}, "", atlasHomeUrl());
  document.getElementById("entry-inspector")?.classList.add("hidden");
  renderAtlas();
}

function renderInspector() {
  const panel = document.getElementById("entry-inspector");
  const content = document.getElementById("inspector-content");
  if (!panel || !content) return;
  const entry = manifest.entries.find((e) => e.id === selectedEntryId);
  if (!entry) {
    panel.classList.add("hidden");
    return;
  }
  const name = entryName(entry);
  const summary = entrySummary(entry);
  const inCompare = compareIds.includes(entry.id);
  const benches = (entry.benchmarks || [])
    .map((b) => benchMeterHtml([b]))
    .join("");
  content.innerHTML = `
    <div class="inspector-header">
      <div class="entry-card__meta">
        <span class="badge badge--status-${entry.status}">${statusLabel(entry.status)}</span>
        <span class="badge">${t(`class.${entry.class}`) || entry.class}</span>
      </div>
      <h3>${name}</h3>
      <p class="inspector-summary">${summary}</p>
    </div>
    <div class="inspector-grid">
      <div class="inspector-field"><span class="inspector-field__label">${t("table.kind")}</span><span class="inspector-field__value">${t(`kind.${entry.kind}`) || entry.kind}</span></div>
      <div class="inspector-field"><span class="inspector-field__label">${t("table.size")}</span><span class="inspector-field__value">${formatSizeB(entry.sizeB)}</span></div>
      <div class="inspector-field"><span class="inspector-field__label">license</span><span class="inspector-field__value">${entry.license ?? "—"}</span></div>
      <div class="inspector-field"><span class="inspector-field__label">id</span><span class="inspector-field__value" style="font-family:var(--font-mono);font-size:0.75rem">${entry.id}</span></div>
    </div>
    ${benches ? `<div class="inspector-section"><h4>${t("inspector.benchmarks")}</h4>${benches}</div>` : ""}
    ${axisChartHtml(entryAxes(entry)) ? `<div class="inspector-section"><h4>${t("inspector.axes")}</h4>${axisChartHtml(entryAxes(entry))}</div>` : ""}
    ${entry.links ? `<div class="inspector-section"><h4>${t("inspector.links")}</h4><div class="inspector-links">${inspectorLinksHtml(entry.links)}</div></div>` : ""}
    ${relatedEntriesHtml(entry)}
    <div class="inspector-section">
      <h4>${t("inspector.share")}</h4>
      <div class="inspector-share">
        <input type="text" class="inspector-share__url" readonly value="${absoluteEntryUrl(entry.id)}" aria-label="${t("inspector.share")}" />
        <button type="button" class="btn btn-ghost" data-copy-share>${t("inspector.share")}</button>
      </div>
    </div>
    <div class="inspector-actions">
      <button type="button" class="btn btn-primary compare-add${inCompare ? " active" : ""}" data-compare="${entry.id}">${t("compare.add")}</button>
    </div>`;
  panel.classList.remove("hidden");
  content.querySelector("[data-compare]")?.addEventListener("click", () => toggleCompare(entry.id));
  content.querySelector("[data-copy-share]")?.addEventListener("click", async (ev) => {
    const url = absoluteEntryUrl(entry.id);
    try {
      await navigator.clipboard.writeText(url);
      const btn = ev.currentTarget;
      const prev = btn.textContent;
      btn.textContent = t("inspector.copied");
      setTimeout(() => {
        btn.textContent = prev;
      }, 1600);
    } catch {
      content.querySelector(".inspector-share__url")?.select();
    }
  });
  content.querySelectorAll("[data-related]").forEach((btn) => {
    btn.addEventListener("click", () => openInspector(btn.dataset.related));
  });
}

function bindCardInteractions() {
  document.querySelectorAll(".entry-card").forEach((card) => {
    card.addEventListener("click", (ev) => {
      if (ev.target.closest("a, button, .card-links")) return;
      openInspector(card.dataset.id);
    });
  });
}

function renderAtlas() {
  if (!manifest) return;
  const entries = sortedEntries(filteredEntries());
  document.getElementById("entry-grid").innerHTML = entries.map((e, i) => renderCard(e, i)).join("");
  bindCompareButtons();
  bindCardInteractions();
  renderTable(entries);
  document.getElementById("empty-state").classList.toggle("hidden", entries.length > 0);
  document.getElementById("entry-grid").classList.toggle("hidden", viewMode !== "grid");
  document.getElementById("table-wrap").classList.toggle("hidden", viewMode !== "table");
  document.getElementById("view-grid").classList.toggle("active", viewMode === "grid");
  document.getElementById("view-table").classList.toggle("active", viewMode === "table");
  renderResultsMeta(entries.length);
  if (selectedEntryId) renderInspector();
  applyDeepLink();
}

function fillSelect(id, values, labelFn, allKey) {
  const sel = document.getElementById(id);
  const current = sel.value;
  sel.innerHTML = `<option value="">${t(allKey)}</option>`;
  values.forEach((v) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = labelFn(v);
    sel.appendChild(opt);
  });
  if ([...sel.options].some((o) => o.value === current)) sel.value = current;
}

function fillFilters() {
  fillSelect(
    "kind-filter",
    [...new Set(manifest.entries.map((e) => e.kind))].sort(),
    (k) => t(`kind.${k}`) || k,
    "filter.kindAll"
  );
  fillSelect(
    "class-filter",
    [...new Set(manifest.entries.map((e) => e.class))].sort(),
    (c) => t(`class.${c}`) || c,
    "filter.all"
  );
}

function renderLanes() {
  const bar = document.getElementById("lanes");
  bar.innerHTML = LANES.map(
    (lane) =>
      `<button type="button" class="lane-btn${activeLane === lane.id ? " active" : ""}" data-lane="${lane.id}">${t(lane.labelKey)}</button>`
  ).join("");
  bar.querySelectorAll(".lane-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeLane = btn.dataset.lane;
      renderLanes();
      renderAtlas();
    });
  });
}

function renderGap() {
  const items = manifest.gapMap[lang] || manifest.gapMap.en;
  const tags = manifest.gapMap.tags || [];
  document.getElementById("gap-list").innerHTML = items
    .map(
      (li, i) =>
        `<li><button type="button" class="gap-btn${activeGapTag === tags[i] ? " active" : ""}" data-gap="${tags[i] || ""}">${li}</button></li>`
    )
    .join("");
  document.getElementById("gap-list").querySelectorAll(".gap-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tag = btn.dataset.gap;
      activeGapTag = activeGapTag === tag ? "" : tag;
      renderGap();
      renderAtlas();
    });
  });
  const clearBtn = document.getElementById("gap-clear");
  if (clearBtn) clearBtn.classList.toggle("hidden", !activeGapTag);
}

function toggleCompare(id) {
  if (compareIds.includes(id)) {
    compareIds = compareIds.filter((x) => x !== id);
  } else if (compareIds.length < 3) {
    compareIds = [...compareIds, id];
  } else {
    compareIds = [compareIds[1], compareIds[2], id];
  }
  localStorage.setItem("plr-compare", JSON.stringify(compareIds));
  renderComparePanel();
  renderCompareDock();
  renderAtlas();
  if (selectedEntryId) renderInspector();
}

function renderComparePanel() {
  const panel = document.getElementById("compare-panel");
  if (!panel) return;
  if (compareIds.length === 0) {
    panel.innerHTML = `<p class="muted">${t("compare.empty")}</p>`;
    return;
  }
  const rows = compareIds
    .map((id) => manifest.entries.find((e) => e.id === id))
    .filter(Boolean)
    .map((e) => {
      const name = entryName(e);
      const bench = e.benchmarks?.[0];
      const score = bench ? formatPercent(parseFloat(bench.score) || bench.score) : emptyValue();
      return `<tr>
        <td><a href="${entryUrl(e.id)}">${name}</a></td>
        <td>${t(`class.${e.class}`) || e.class}</td>
        <td>${formatSizeB(e.sizeB)}</td>
        <td>${statusLabel(e.status)}</td>
        <td>${score}</td>
        <td>${e.license ? localizeDigits(e.license) : emptyValue()}</td>
      </tr>`;
    })
    .join("");
  panel.innerHTML = `
    <div class="compare-panel-head">
      <h3>${t("compare.panel")}</h3>
      <button type="button" class="btn btn-ghost" id="compare-clear">${t("compare.clear")}</button>
    </div>
    <div class="table-wrap"><table class="compare-table"><thead><tr>
      <th>${t("table.name")}</th><th>${t("table.class")}</th><th>${t("table.size")}</th>
      <th>${t("table.status")}</th><th>${t("compare.colPersianMedQA")}</th><th>${t("table.license")}</th>
    </tr></thead><tbody>${rows}</tbody></table></div>`;
  document.getElementById("compare-clear")?.addEventListener("click", () => {
    compareIds = [];
    localStorage.setItem("plr-compare", "[]");
    renderComparePanel();
    renderCompareDock();
    renderAtlas();
  });
  renderCompareDock();
}

function renderCompareDock() {
  const dock = document.getElementById("compare-dock");
  if (!dock) return;
  if (compareIds.length === 0) {
    dock.classList.add("hidden");
    dock.innerHTML = "";
    return;
  }
  const chips = compareIds
    .map((id) => {
      const e = manifest.entries.find((x) => x.id === id);
      if (!e) return "";
      const name = entryName(e);
      return `<span class="compare-dock__chip">${name}<button type="button" data-remove="${id}" aria-label="Remove">×</button></span>`;
    })
    .join("");
  dock.innerHTML = `
    <div class="compare-dock__items">${chips}</div>
    <a class="btn btn-primary btn-sm" href="#compare">${t("compare.panel")}</a>
    <button type="button" class="btn btn-ghost btn-sm" id="dock-clear">${t("compare.clear")}</button>`;
  dock.classList.remove("hidden");
  dock.querySelectorAll("[data-remove]").forEach((btn) => {
    btn.addEventListener("click", () => toggleCompare(btn.dataset.remove));
  });
  document.getElementById("dock-clear")?.addEventListener("click", () => {
    compareIds = [];
    localStorage.setItem("plr-compare", "[]");
    renderComparePanel();
    renderCompareDock();
    renderAtlas();
  });
}

function bindCompareButtons() {
  document.querySelectorAll("[data-compare]").forEach((btn) => {
    btn.addEventListener("click", (ev) => {
      ev.preventDefault();
      toggleCompare(btn.dataset.compare);
    });
  });
}

function buildTimelineEvents() {
  const byDate = new Map();
  for (const m of RELEASE_MILESTONES) {
    const label = m[lang] || m.en;
    if (!byDate.has(m.date)) byDate.set(m.date, []);
    byDate.get(m.date).push({ type: "release", label });
  }
  for (const e of manifest.entries) {
    if (e.firstSeen) {
      const day = `${e.firstSeen}-01`;
      if (!byDate.has(day)) byDate.set(day, []);
      const name = entryName(e);
      byDate.get(day).push({ type: "verify", label: `${name} (${t("timeline.firstSeen")})`, id: e.id, status: e.status });
    }
    if (!e.verifiedAt) continue;
    const day = e.verifiedAt.slice(0, 10);
    if (!byDate.has(day)) byDate.set(day, []);
              const name = displayText(e.name[lang] || e.name.en);
    byDate.get(day).push({ type: "verify", label: name, id: e.id, status: e.status });
  }
  return [...byDate.entries()]
    .sort((a, b) => b[0].localeCompare(a[0]))
    .slice(0, 8);
}

function renderTimeline() {
  const el = document.getElementById("timeline-list");
  if (!el) return;
  const events = buildTimelineEvents();
  el.innerHTML = events
    .map(([date, items]) => {
      const rows = items
        .slice(0, 6)
        .map((item) => {
          const tagKey = item.type === "release" ? "timeline.release" : `status.${item.status || "verified"}`;
          const tag = t(tagKey) || item.status || "verified";
          const link =
            item.id && item.type === "verify"
              ? `<a href="${entryUrl(item.id)}">${displayText(item.label)}</a>`
              : displayText(item.label);
          const tagClass = item.type === "release" ? "release" : item.status || "verified";
          return `<li><span class="timeline-tag timeline-tag--${tagClass}">${tag}</span> ${link}</li>`;
        })
        .join("");
      const more =
        items.length > 6
          ? `<li class="muted">${lang === "fa" ? "" : "+"}${formatNum(items.length - 6)} ${t("timeline.more")}</li>`
          : "";
      return `<div class="timeline-day"><time datetime="${date}">${localizeDigits(date)}</time><ul>${rows}${more}</ul></div>`;
    })
    .join("");
}

function radarCoverageLabel(coverage) {
  if (coverage === "field-gap") return t("radar.gap");
  if (coverage === "planned") return t("radar.planned");
  return t("radar.cataloged");
}

function renderRadar() {
  const panel = document.getElementById("radar-panel");
  if (!panel || !sourceRadar) return;

  const stats = sourceRadar.stats || {};
  const forecast = sourceRadar.forecast?.plr || {};
  const items = (sourceRadar.items || []).slice(0, 12);

  const statHtml = `
    <div class="radar-stats">
      <div class="stat-card">
        <span class="stat-card__value">${formatNum(stats.cataloged || 0)}</span>
        <span class="stat-card__label">${t("radar.cataloged")}</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">${formatNum(stats.fieldGap || 0)}</span>
        <span class="stat-card__label">${t("radar.gap")}</span>
      </div>
      <div class="stat-card">
        <span class="stat-card__value">${formatNum(stats.planned || 0)}</span>
        <span class="stat-card__label">${t("radar.planned")}</span>
      </div>
      <div class="stat-card stat-card--meta">
        <span class="stat-card__label">${localizeDigits(sourceRadar.version)}</span>
        <span class="stat-card__value">radar</span>
      </div>
    </div>`;

  const listHtml = items
    .map((item) => {
      const name = displayText(item.name?.[lang] || item.name?.en || item.id);
      const analysis = displayText(item.analysis?.[lang] || item.analysis?.en || "");
      const url = item.primaryUrl
        ? `<a href="${item.primaryUrl}" target="_blank" rel="noopener">${t("radar.sourceLink")}</a>`
        : "";
      const ids =
        item.plrEntryIds?.length > 0
          ? `<span class="muted">→ ${item.plrEntryIds.join(", ")}</span>`
          : "";
      return `<article class="radar-card">
        <div class="entry-meta">
          <span class="badge">${radarCoverageLabel(item.coverage)}</span>
          <span class="badge">${item.category || emptyValue()}</span>
        </div>
        <h3>${name}</h3>
        <p>${analysis}</p>
        ${ids}
        ${url}
      </article>`;
    })
    .join("");

  const f05 = forecast.v0_5 || forecast["v0.5"];
  const forecastHtml = f05
    ? `<div class="radar-forecast">
        <strong>${t("radar.forecast")} ${localizeDigits("v0.5")}</strong>
        <span class="muted">${
          lang === "fa"
            ? `${formatNum(f05.targetEntries)}+ مورد، ${formatNum(f05.targetVerified)}+ تأیید، ${formatNum(f05.targetMeasured)}+ با نمره`
            : `${f05.targetEntries}+ entries · ${f05.targetVerified}+ verified · ${f05.targetMeasured}+ measured`
        }</span>
        <ul>${(f05.focus?.[lang] || f05.focus?.en || []).map((li) => `<li>${li}</li>`).join("")}</ul>
      </div>`
    : "";

  panel.innerHTML = statHtml + forecastHtml + `<div class="radar-grid">${listHtml}</div>`;
}

async function loadSourceRadar() {
  const urls = [
    new URL("data/source-radar.json", location.href).href,
    "/data/source-radar.json",
    "/api/source-radar.json",
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url);
      if (res.ok) return res.json();
    } catch {
      /* try next */
    }
  }
  return null;
}

function exportCsv() {
  const entries = sortedEntries(filteredEntries());
  const header = ["id", "name_en", "kind", "class", "sizeB", "status", "license", "primary_url"];
  const rows = entries.map((e) => {
    const links = e.links || {};
    const primary = links.hf || links.paper || links.repo || links.web || "";
    return [
      e.id,
      e.name.en,
      e.kind,
      e.class,
      e.sizeB ?? "",
      e.status,
      e.license ?? "",
      primary,
    ]
      .map((c) => `"${String(c).replace(/"/g, '""')}"`)
      .join(",");
  });
  const blob = new Blob([[header.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `persian-llm-reference-${manifest.version}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

function applyDeepLink() {
  const id = resolveEntryId();
  document.querySelectorAll(".entry-card.highlight").forEach((el) => el.classList.remove("highlight"));
  if (!id) {
    if (selectedEntryId) closeInspector(false);
    return;
  }
  selectedEntryId = id;
  const card = document.getElementById(`entry-${id}`);
  if (card) {
    card.classList.add("highlight", "is-selected");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    renderInspector();
  }
}

function initCommandPalette() {
  const palette = document.getElementById("cmd-palette");
  const backdrop = document.getElementById("cmd-backdrop");
  const input = document.getElementById("cmd-input");
  const results = document.getElementById("cmd-results");
  const search = document.getElementById("search");
  if (!palette || !input) return;

  const open = () => {
    palette.classList.remove("hidden");
    input.value = search?.value || "";
    renderCmdResults(input.value);
    input.focus();
    input.select();
  };
  const close = () => palette.classList.add("hidden");

  const renderCmdResults = (q) => {
    const query = q.trim().toLowerCase();
    const list = manifest.entries
      .filter((e) => !query || JSON.stringify(e).toLowerCase().includes(query))
      .slice(0, 8);
    results.innerHTML = list
      .map(
        (e, i) =>
          `<div class="cmd-item${i === 0 ? " is-active" : ""}" data-id="${e.id}" role="option">
            <span>${entryName(e)}</span>
            <span class="cmd-item__meta">${statusLabel(e.status)}</span>
          </div>`
      )
      .join("");
    results.querySelectorAll(".cmd-item").forEach((item) => {
      item.addEventListener("click", () => {
        if (search) search.value = "";
        close();
        openInspector(item.dataset.id);
        document.getElementById("atlas")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  };

  document.addEventListener("keydown", (ev) => {
    if ((ev.metaKey || ev.ctrlKey) && ev.key === "k") {
      ev.preventDefault();
      open();
    }
    if (ev.key === "Escape") close();
  });
  document.getElementById("cmd-hint")?.addEventListener("click", open);
  backdrop?.addEventListener("click", close);
  input.addEventListener("input", () => renderCmdResults(input.value));
  input.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") {
      const first = results.querySelector(".cmd-item");
      if (first) first.click();
    }
  });
}

function hideBootLoader() {
  const loader = document.getElementById("boot-loader");
  if (loader) {
    loader.classList.add("is-done");
    document.body.classList.remove("is-loading");
  }
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
  document.body.classList.add("is-loading");
  applyI18n();
  try {
    siteConfig = await fetch(new URL("site-config.json", location.href)).then((r) => r.json());
    const gh = document.getElementById("github-link");
    if (gh && siteConfig.canonicalRepo) gh.href = siteConfig.canonicalRepo;
    const manifestLink = document.getElementById("hero-manifest-link");
    if (manifestLink && siteConfig.manifestRaw) manifestLink.href = siteConfig.manifestRaw;
  } catch {
    siteConfig = {};
  }

  selectedEntryId = resolveEntryId();

  manifest = await loadManifest();
  sourceRadar = await loadSourceRadar();
  setApiLine();
  renderCite();
  renderReferences();
  renderStats();
  renderTrustPipeline();
  injectSchema();
  fillFilters();
  renderLanes();
  renderTimeline();
  renderRadar();
  renderGap();
  renderTree();
  renderComparePanel();
  renderAtlas();
  initCommandPalette();
  initThemeToggle();
  document.getElementById("tree-clear")?.addEventListener("click", clearTreeFilters);
  hideBootLoader();

  document.getElementById("inspector-close")?.addEventListener("click", () => closeInspector());
  document.getElementById("lang-toggle").addEventListener("click", () => {
    lang = lang === "fa" ? "en" : "fa";
    localStorage.setItem("plr-lang", lang);
    applyI18n();
    updateThemeToggle();
    fillFilters();
    renderLanes();
    renderTimeline();
    renderRadar();
    renderGap();
    renderTree();
    renderComparePanel();
    renderCompareDock();
    renderStats();
    renderTrustPipeline();
    renderCite();
    renderReferences();
    renderAtlas();
    if (selectedEntryId) renderInspector();
  });

  ["search", "class-filter", "status-filter", "kind-filter"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      if (id === "kind-filter" || id === "class-filter") {
        activeTreeKind = "";
        activeTreeClass = "";
        activeLineageBase = "";
        renderTree();
      }
      renderAtlas();
    });
    document.getElementById(id).addEventListener("change", () => {
      if (id === "kind-filter" || id === "class-filter") {
        activeTreeKind = "";
        activeTreeClass = "";
        activeLineageBase = "";
        renderTree();
      }
      renderAtlas();
    });
  });

  document.getElementById("view-grid").addEventListener("click", () => {
    viewMode = "grid";
    localStorage.setItem("plr-view", viewMode);
    renderAtlas();
  });
  document.getElementById("view-table").addEventListener("click", () => {
    viewMode = "table";
    localStorage.setItem("plr-view", viewMode);
    renderAtlas();
  });
  document.getElementById("export-csv").addEventListener("click", exportCsv);

  document.querySelectorAll(".compare-table th[data-sort]").forEach((th) => {
    th.style.cursor = "pointer";
    th.addEventListener("click", () => {
      const key = th.dataset.sort;
      if (sortKey === key) sortDir *= -1;
      else {
        sortKey = key;
        sortDir = 1;
      }
      renderAtlas();
    });
  });

  window.addEventListener("popstate", () => {
    selectedEntryId = resolveEntryId();
    if (selectedEntryId) renderInspector();
    else document.getElementById("entry-inspector")?.classList.add("hidden");
    applyDeepLink();
  });
}

boot();

export { MIN_ENTRIES };
