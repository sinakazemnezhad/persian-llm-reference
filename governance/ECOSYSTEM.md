# Ecosystem map — Persian LLM references

**Updated:** 2026-08-13 · **Baseline:** PLR v0.5.0 · 61 entries

## Three layers (complement, don’t compete)

```text
DISCOVER  →  SCORE  →  STRUCTURE  →  BUILD (separate)
```

| Layer | Primary home | What it does | What it does *not* do |
|-------|----------------|--------------|------------------------|
| **Discovery** | [Awesome-Persian-LLM](https://github.com/MohammadHeydari/Awesome-Persian-LLM) | Curated links: papers, models, tools, blogs, APIs | Typed schema · verification gates · agent JSON |
| **Scores** | [MIZAN](https://mcinext-mizan-llm-leaderboard.hf.space/) · [PartAI leaderboard](https://huggingface.co/spaces/PartAI/open-persian-llm-leaderboard) | Live rankings on Persian benchmarks | Full ecosystem map · corpus law fields |
| **Structure** | **Persian LLM Reference** (this repo) | Sourced records · FA/EN atlas · `reference-manifest.json` · gap map | Replace Awesome · host leaderboard tables |
| **Build** | **Alefbâ** (`~/Desktop/ALEFBA` · `:5293`) | Persian-native foundation charter + future artifacts | Neutral registry marketing |

## One-line roles

```text
Awesome finds · Leaderboards score · PLR types and verifies · Alefbâ builds what the gap map names
```

---

## Agent security eval (sibling)

| Resource | Role | Doc |
|----------|------|-----|
| [agent-security-bench](https://github.com/sinakazemnezhad/agent-security-bench) | Agent Security Evaluation Kit — score agent code / tool policy with receipts | [docs/SCORE_AGENT_WITH_ASB.md](../docs/SCORE_AGENT_WITH_ASB.md) |

## Awesome-Persian-LLM — relationship

**Maintainer:** [Awesome-Persian-LLM](https://github.com/MohammadHeydari/Awesome-Persian-LLM) (public repo) · MIT · community curated.

PLR already lists Awesome as a **verified** `community-index` entry (`awesome-persian-llm`). Summary policy:

- **Credit upstream** — many PLR rows were *found* via Awesome; say so in PRs and changelog when ingesting.
- **Never fork** — do not mirror the Awesome README inside PLR.
- **Reciprocal link** — one small section in Awesome pointing to PLR (see `outreach/AWESOME_PERSIAN_LLM_PR.md`).
- **Give back** — when PLR adds rows sourced from Awesome, mention it in the PLR changelog line; optional notify maintainer in PR comment.

### What Awesome teaches PLR

| Lesson | PLR action |
|--------|------------|
| Topic taxonomy (RAG, culture, eval, embeddings) | Use-case lanes in Phase 2; `kind` + `class` in manifest |
| Low-friction PR culture | One-entry PR template in `CONTRIBUTING.md` |
| “Underrepresented language” narrative | Gap map (EN + FA) — same mission, different artifact |
| Breadth over depth | Awesome stays broad; PLR goes deep per artifact |

### What PLR adds alongside discovery lists

| Capability | Discovery lists (e.g. Awesome) | PLR structured atlas |
|------------|-------------------------------|----------------------|
| Machine JSON API | — | `reference-manifest.json` + `.well-known` |
| Verification ladder | — | `indexed` → `verified` → `measured` |
| Per-row license / size / origin | — | Required fields |
| Honest benchmark nulls | — | Receipt + `asOf` or `null` |
| Persian depth axes (editorial) | — | Five axes; `null` = unknown |
| Gap map (open questions in the field) | — | `gapMap` in manifest |
| Bilingual browse UI | — | FA default atlas |

---

## Gap audit — v0.4 status

*v0.3–v0.4 tranches ingested. Remaining candidates for v0.5.*

### Ingested in PLR v0.3–v0.4 ✓

| Artifact | PLR id |
|----------|--------|
| Dorna 4-bit / full weights | `dorna-4bit-quantized`, `dorna-llama3-8b-instruct` |
| Persian Ollama index | `persian-ollama-index` |
| FarsiSyntheticData | `farsi-synthetic-data` |
| Persian-Synthetic-Instruct | `persian-synthetic-instruct` |
| TLPC, alpaca-persian | `tlpc-corpus`, `alpaca-persian` |
| FaMTEB, FarsInstruct, Khayyam | `famteb-benchmark`, `farsinstruct`, `khayyam-persianmmlu` |
| PARSE, EPT, PERCUL, MELAC, Taarof | `parse-benchmark`, `ept-benchmark`, … |
| Hakim, Tooka-SBERT | `hakim-embedding`, `tooka-sbert` |
| Matina leaderboard | `matina-llm-leaderboard` |
| PersianMedQA, PQuAD, PersianMHQA | `persianmedqa`, `pquad-dataset`, `persianmhqa-dataset` |

### Still planned (v0.5+)

| Artifact | Priority |
|----------|----------|
| Persian news (Kaggle) | Medium — needs stable URL + license |
| Additional regional instruct models | Medium |
| IslamicPCQA public release | When dataset ships |

See **`data/source-radar.json`** and **[FIELD_ANALYSIS.md](./FIELD_ANALYSIS.md)** for full field map.

---

## Gap audit archive (v0.3 planning)

### Models & weights

| Artifact | Primary source (from Awesome) | PLR priority |
|----------|-------------------------------|--------------|
| Dorna 4-bit quantized | `huggingface.co/amirMohammadi/Dorna-Llama3-8B-Instruct-Quantized4Bit` | Link as variant on `dorna-llama3-8b` or separate row |
| Persian Ollama collection | `github.com/sepy-dev/Persian-Ollama-LLm` | `community-index` |

### Datasets & corpora

| Artifact | Source | Priority |
|----------|--------|----------|
| FarsiSyntheticData | `github.com/MohammadHeydari/FarsiSyntheticData` | High — maintainer overlap |
| Persian-Synthetic-Instruct | HF `Heydaritoday/Persian-Synthetic-Instruct` | High |
| TLPC (Targoman) | HF `Targoman/TLPC` | Medium |
| alpaca-persian | HF `sinarashidi/alpaca-persian` | Medium |
| Persian news (Kaggle) | Kaggle dataset | Medium |

### Benchmarks & eval (papers)

| Artifact | Source | Priority |
|----------|--------|----------|
| FaMTEB | arXiv embedding benchmark | High |
| FarsInstruct | arXiv 2407.11186 | High |
| Khayyam / PersianMMLU | OpenReview | High |
| PARSE | ResearchGate / paper | Medium |
| PERCUL | ACL anthology | Medium |
| EPT (trustworthiness) | iSecure journal | Medium |
| MELAC | ACL anthology | Medium |
| Taarof eval | ACL EMNLP 2025 | Medium — cultural |

### Embeddings (encoder lane)

| Artifact | Source | Priority |
|----------|--------|----------|
| Hakim | arXiv 2505.08435 | High |
| Tooka-SBERT | ACL findings | Medium |

### Leaderboards

| Artifact | Source | Priority |
|----------|--------|----------|
| Matina Persian LLM leaderboard | HF `MatinaAI/persian_llm_leaderboard` | High — missing from PLR |

### Out of scope for PLR v1

- Iranian API marketplaces (AvvalAI, GapGPT, liara, roboo, ivira) — product listings, not research artifacts
- LinkedIn / Virgool blog posts — discovery only; link from Awesome
- Generic RAG tutorials and notebooks — tools lane, not registry rows unless canonical dataset/paper

---

## Alefbâ — separate product

| | PLR | Alefbâ |
|---|-----|--------|
| Path | `~/Desktop/PERSIAN-LLM-REFERENCE` | `~/Desktop/ALEFBA` |
| Port | 5294 | 5293 |
| Public registry row | N/A | **None until artifacts ship** |
| Connection | `gapMap` documents what Alefbâ aims to build | Charter cites same gaps |

**Rule:** Alefbâ does not appear in PLR as promotion. When weights + measured Persian evals exist → one `program` or `native-foundation` row with receipts.

**Naming:** Prefer `persianAxes` over `alefbaAxes` in public schema long-term (neutral global reference).

---

## Outreach sequence

| Step | Action | Status |
|------|--------|--------|
| 1 | List Awesome in manifest (`verified`) | Done |
| 2 | Draft reciprocal PR | `outreach/AWESOME_PERSIAN_LLM_PR.md` |
| 3 | Grow to 40+ with Awesome as ingestion source | Phase 1 |
| 4 | HF dataset card → manifest URL | Phase 3 |
| 5 | Short schema note / arXiv (optional) | Phase 3 |

---

## Related

- [ROADMAP.md](./ROADMAP.md) — phased execution
- [POSITIONING.md](./POSITIONING.md) — what PLR is, alongside other references
- [outreach/AWESOME_PERSIAN_LLM_PR.md](./outreach/AWESOME_PERSIAN_LLM_PR.md) — PR draft
