<!-- dis-brand-agent: repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-GOVERNANCE-CHANGELOG-MD name="DIS BRAND Governed Agent" action=edit at=2026-08-12T22:03:10.463Z file=persian-llm-reference/governance/CHANGELOG.md -->
# Changelog

## 0.8.0 — 2026-08-13

- **Atlas UI v2:** research workspace — sidebar filters, entry inspector panel, ⌘K command palette, compare dock.
- **Visual system:** Instrument Serif + Vazirmatn, trust pipeline, benchmark meters, Persian axis charts in inspector.
- **Interaction:** click-to-inspect, deep links, mobile full-screen inspector, staggered card load.

## 0.6.0 — 2026-08-13

- **63 entries** · **15 measured** (v1.0 measured bar): Gemma 3 27B class, open-weight ensemble (PersianMedQA receipts).
- **summary.fa** polish pass on all entries + pattern rules (`polish-summary-fa.mjs`).
- **Compare UI:** up to 3 side-by-side rows · gap-topic filter · `firstSeen` on timeline.
- **JSON Schema v1** — `schema/reference-manifest-v1.json` + `validate-schema.mjs` in build.
- **meta.citations** — Awesome-Persian-LLM credited as upstream discovery source.
- **Docs:** `docs/HUGGINGFACE_ORG_README.md` for HF org profile paste.

## 0.5.1 — 2026-08-13

- **Tone pass (repo-wide):** collaborative scientific wording — complement Awesome/MIZAN/PartAI; remove competitive framing (`beats`, `lack`, `own the index`, `Global Atlas`).
- **Mission copy:** sourced records alongside discovery lists; honest nulls.
- **UI (FA/EN):** footer, hero, gap heading, status labels aligned with community atlas tone.
- **Docs:** `POSITIONING.md`, `ROADMAP.md`, `ECOSYSTEM.md`, `README.md`, `CITATION.cff`.

## 0.5.0 — 2026-08-13

- **61 entries** (+6): Meditron3-8B, BioMistral-7B, Gaokerena-V, MF3QA, Gemini 2.0 Flash class, Llama 3.1 405B class.
- **Verification wave:** all 10 remaining `indexed` rows upgraded to `verified`.
- **Measured lift:** 13 total — Meditron3-8B, Gemini 2.0 Flash, Llama 3.1 405B (PersianMedQA receipts).
- **Atlas UI:** field timeline (releases + verification receipts) · source radar panel from `source-radar.json`.
- E2E + validate minimum raised to **60 entries**.

## 0.4.1 — 2026-08-13

- **Source radar** — `data/source-radar.json`: field map (cataloged / gap / planned), PLR forecast, bilingual field gaps.
- **Field analysis** — `governance/FIELD_ANALYSIS.md`: PLR lane law — map field, not training corpus.
- **API** — `/api/source-radar.json` · public `/data/source-radar.json`.

## 0.4.0 follow-up — 2026-08-13

- **Measured lift:** Qwen/Aya null ELAB scores replaced with PersianMedQA receipts; Dorna2, Claude, DeepSeek-V3, Gemini 2.5, Gemma3 Persian upgraded to `measured` (10 total).
- **Link CI:** `validate-links.yml` on every `main` push.
- **README / SEO:** v0.4 stats, full raw manifest URL, citation block.

## 0.4.0 — 2026-08-13

- **55 entries** (+14): PARSE, EPT, PersianMedQA, PQuAD, PersianMHQA, Hooshvare BERT-FA, IslamicPCQA (indexed), OSCAR-2201, Wikipedia FA dump, frontier class rows (DeepSeek-V3, Qwen3, Llama 3.3, Gemini 2.5), GPT-4.1 class (measured on PersianMedQA).
- **Verification pass:** 12 indexed rows upgraded to `verified` (Maral, Persian-Phi, AVA, Matina corpus, MIZAN, PartAI leaderboard, ELAB, Gemma3 Persian, Dorna2, Ollama index, Dorna 4-bit, BioPars).
- **Corrections:** YASIN size/license; MIZAN + PartAI leaderboard URL slugs; Dorna PersianMedQA measured receipt (34.9%); `persian-biomedical-llm` → `biopars`.
- **Link CI:** Hugging Face gated assets (401/403) treated as auth-gated across all HF paths.
- E2E + validate minimum raised to **55 entries**.

## 0.3.0 — 2026-08-13

- **41 entries** — 18 new rows from Awesome-Persian-LLM gap audit (embeddings, cultural evals, datasets, Matina leaderboard, Dorna full weights).
- **ParsBench** verified with GitHub primary URL; **ParsiNLU** fixed to persiannlp/parsinlu + paper.
- **Atlas UI v0.3:** use-case lanes, card/table views, sortable compare table, CSV export, `?entry=` deep links, cite block.
- **Python PyPI package** `persian-llm-reference` (MIT client, `plr` CLI) — same pattern as sourcea-boot.
- **CI:** `build-check-pypi.yml` + `publish-pypi.yml` (trusted publishing).
- **Publication:** `CITATION.cff` v0.3.0 · `docs/PYPI_TRUSTED_PUBLISHING_SETUP.md`.
- E2E + validate minimum raised to **40 entries**; link validation in CI.

## 0.1.0 — 2026-08-12

- Initial registry: 17 entries (models, datasets, leaderboards, community index, Alefbâ program)
- Atlas UI + `/api/reference.json` + well-known manifest
- Gap map (EN + FA)
- E2E on port 5294
