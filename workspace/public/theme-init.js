(function () {
  var STORAGE = "plr-theme";
  var ICON_SUN =
    '<svg class="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.75"/><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/></svg>';
  var ICON_MOON =
    '<svg class="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z" stroke="currentColor" stroke-width="1.75" stroke-linejoin="round"/></svg>';

  function readStoredTheme() {
    var saved = localStorage.getItem(STORAGE);
    return saved === "light" || saved === "dark" ? saved : null;
  }

  function systemTheme() {
    return "light";
  }

  function getTheme() {
    var attr = document.documentElement.getAttribute("data-theme");
    return attr === "light" || attr === "dark" ? attr : readStoredTheme() || systemTheme();
  }

  function syncMeta(theme) {
    var meta = document.getElementById("theme-color-active");
    if (meta) meta.content = theme === "light" ? "#faf7f2" : "#050608";
  }

  function paintButton() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    var light = getTheme() === "light";
    btn.innerHTML = light ? ICON_MOON : ICON_SUN;
    btn.setAttribute("data-theme-state", light ? "light" : "dark");
    btn.title = light ? "Dark mode" : "Light mode";
  }

  function notifyThemeChange(theme) {
    paintButton();
    if (typeof window.plrSyncThemeToggle === "function") window.plrSyncThemeToggle();
    document.dispatchEvent(new CustomEvent("plr-theme-change", { detail: { theme: theme } }));
  }

  function applyTheme(theme, persist) {
    var next = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    if (persist !== false) localStorage.setItem(STORAGE, next);
    syncMeta(next);
    notifyThemeChange(next);
    return next;
  }

  function setTheme(theme) {
    return applyTheme(theme, true);
  }

  function reconcileTheme() {
    return applyTheme(readStoredTheme() || systemTheme(), false);
  }

  window.plrSetTheme = setTheme;
  window.plrGetTheme = getTheme;
  window.plrPaintThemeButton = paintButton;
  window.plrReconcileTheme = reconcileTheme;

  function bindToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", function () {
      setTheme(getTheme() === "light" ? "dark" : "light");
    });
  }

  function boot() {
    reconcileTheme();
    bindToggle();
  }

  window.addEventListener("pageshow", function (event) {
    if (event.persisted) reconcileTheme();
  });

  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", function () {
    if (!readStoredTheme()) reconcileTheme();
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
