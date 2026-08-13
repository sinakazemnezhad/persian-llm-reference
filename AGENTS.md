# Persian LLM Reference — Agent guide

<!-- dis-brand-agent: repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-AGENTS-MD name="DIS BRAND Governed Agent" action=edit at=2026-08-13T01:48:17.141Z file=PERSIAN-LLM-REFERENCE/AGENTS.md -->

**Standalone repo on Desktop.** Local path: `~/Desktop/PERSIAN-LLM-REFERENCE/` — git repo root for GitHub push.

| Command | Role |
|---------|------|
| `cd workspace && npm run build` | Validate manifest + static public |
| `cd workspace && npm start` | Local atlas `:5294` |
| `cd workspace && npm run e2e` | Prove cascade |

**SSOT:** `data/reference-manifest.json` · **Field radar:** `data/source-radar.json` · **Analysis:** `governance/FIELD_ANALYSIS.md`

**GitHub:** `sinakazemnezhad/persian-llm-reference`

**Plan:** `governance/ROADMAP.md` · **PyPI:** `pip install persian-llm-reference` · `docs/PYPI_TRUSTED_PUBLISHING_SETUP.md`

**Law:** Receipt before claim. No invented benchmark scores. Honor upstream curators and builders.

**Persian UI law:** `workspace/public/plr-locale.js` + `.cursor/rules/persian-ui-locale-law.mdc` — FA mode uses Persian digits (`۶۷` not `67`), Vazirmatn-only typography, no em-dash SaaS copy. `npm run build` runs `validate-persian-ui.mjs`.
