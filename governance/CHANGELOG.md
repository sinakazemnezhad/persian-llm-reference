<!-- dis-brand-agent: repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-GOVERNANCE-CHANGELOG-MD name="DIS BRAND Governed Agent" action=edit at=2026-08-12T22:03:10.463Z file=persian-llm-reference/governance/CHANGELOG.md -->
# Changelog

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
