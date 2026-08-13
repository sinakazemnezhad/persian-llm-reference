# Roadmap — Persian LLM Reference

**Saved:** 2026-08-13 · **Baseline:** v0.5.0 · 61 entries

## North star

```text
Become the trusted, citable, bilingual atlas for Persian LLMs —
the place researchers, builders, and agents go first,
because every row has a source and every score is earned.
```

## One-line law

```text
STRUCTURED · SOURCED · BILINGUAL · HONEST NULLS — THE ATLAS EARNS AUTHORITY, IT DOES NOT CLAIM IT.
```

## Mission arc

```text
reference first (map the field) → authority second (own the index) → infrastructure third (schema + community)
```

| Phase | Focus | Outcome |
|-------|-------|---------|
| **1 — Credibility** | Prove it works; grow registry; raise verification | Obviously real and useful |
| **2 — Usability** | Compare, cite, deep links, use-case lanes | People open it weekly |
| **3 — Authority** | Timeline, gap tags, external citations, HF presence | Default index for papers and tools |
| **4 — Infrastructure** | Stable schema, community PRs, optional org/domain | Persian LLM layer on the internet |

---

## For who · why · what · why

### For who

| Audience | What they get |
|----------|----------------|
| **Researchers** | One structured index: models, datasets, benchmarks, leaderboards — with primary URLs and verification status |
| **Builders / engineers** | JSON API, taxonomy, size/class/license fields — copy-paste artifacts (HF id, license, links) |
| **Community curators** | Governed registry with PR template — better than scattered Awesome lists |
| **Agents (Cursor, etc.)** | Machine-readable manifest with honest `null`s — no hallucinated benchmark scores |
| **Persian NLP field** | Neutral atlas that cites everyone; promotes no single project |

**Not for:** investors, fundraising, or selling a founder charter inside the registry.

### Why (the problem)

| Today | Gap PLR fills |
|-------|----------------|
| Awesome-Persian-LLM and similar lists | Useful but unstructured; links rot; no verification gates |
| MIZAN, PartAI leaderboards | Scores for some models; not a full ecosystem map |
| Hugging Face search | No Persian-native taxonomy or corpus-law fields |
| Hype and self-promotion | Invented numbers; charter projects listed as “best” |
| Papers and agents | No canonical structured index to cite |

### To build what

| Layer | Artifact | SSOT path |
|-------|----------|-----------|
| **Registry** | All public Persian models, corpora, evals, leaderboards | `data/reference-manifest.json` |
| **Atlas UI** | Bilingual FA/EN browse, filter, compare (later) | `workspace/public/` |
| **API** | `/api/reference.json`, raw manifest, `.well-known` | Built from manifest on deploy |
| **Governance** | Methodology, manifest law, changelog, this roadmap | `governance/` |
| **CI / proof** | `validate-manifest`, `validate-links`, E2E | `workspace/scripts/` |

### Why build that

1. **Someone must own the map** — gaps cannot be closed until they are documented honestly.
2. **Authority compounds** — sourced rows → citations → default index.
3. **Agents need honest data** — `null` is a feature; invented scores poison research.
4. **Neutrality enables collaboration** — link Awesome-Persian-LLM as ally; cite MIZAN/PartAI; do not replace them.
5. **Alefbâ needs a mirror** — charter builds what the gap map says is missing; PLR documents the gap without selling Alefbâ in the registry.

---

## Two products — do not mix

| | **Persian LLM Reference** | **Alefbâ** |
|---|---|---|
| **Role** | Neutral field atlas — maps the whole ecosystem | Founding charter — builds Persian-native foundation intelligence |
| **Tone** | Librarian · curator · cite everyone | Founder · investor · literary mission |
| **Where** | `~/Desktop/PERSIAN-LLM-REFERENCE` | `PLUS ONE/ALEFBA` (separate) |
| **Live** | [sinakazemnezhad.github.io/persian-llm-reference](https://sinakazemnezhad.github.io/persian-llm-reference/) | Local charter site when running |
| **In registry** | Everyone with a primary source | One `program` row only when earned — not promoted |

---

## Four pillars — meaningful · usable · productive · smart

### 1. Meaningful — answer real questions

People need **decisions**, not another link dump.

| User question | Atlas answer |
|---------------|--------------|
| Which open model for Persian fine-tune? | Filter: `adapted-instruct` · open license · size · measured benchmarks |
| Which eval to cite? | Benchmark rows with primary URL + `asOf` |
| What is still missing? | **Gap map** (EN + FA) — hero content |
| Persian-native or English-adapted? | `origin.base` + `class` + `corpus.class` on every card |
| Commercial use? | `license` on card + filter |

**Rules**

- “Best for X” only when **measured** with receipt; otherwise “no measured winner yet”.
- Depth per row beats raw row count.
- Gap map stays current as entries grow.

### 2. Usable — 30-second wins

| Audience | Usability deliverable |
|----------|----------------------|
| Researcher | Cite block: manifest URL + `version` + `generatedAt` |
| Engineer | HF model id · Ollama tag · repo link as primary actions on card |
| Agent | Stable raw manifest URL + JSON Schema (phase 3) |
| Persian reader | FA default UI; Persian labels for classes where possible |

**Rules**

- Deep links: `?entry={id}` for papers and PRs.
- Mobile-readable cards (Telegram shares).
- One PR = one entry (`governance/CONTRIBUTING.md`).

### 3. Productive — save hours

| Workflow | Feature |
|----------|---------|
| Pick a model | Compare 3 side-by-side + CSV/JSON export |
| Write related work | Stats paragraph from manifest (version-dated) |
| Run evals | Link model → leaderboards that list it; do not mirror scores |
| Track the field | Monthly `CHANGELOG.md` + `generatedAt` bump |
| Community sync | Awesome-Persian-LLM PR: “structured verified atlas here” |

**Rules**

- **Mirror indexes, do not duplicate** — cite MIZAN/PartAI URLs.
- `validate-links` on every push (phase 1).
- Weekly link cron optional (phase 2) — open issue on dead primary URL.

### 4. Smart — agent-native, not AI theater

| Layer | Deliverable |
|-------|-------------|
| Schema contract | JSON Schema v1; semver manifest; breaking-change policy |
| Honest nulls | Document in README: `null` = unknown; `measured` = receipt required |
| Derived fields (build-time) | e.g. `openWeights`, `hasMeasuredBenchmarks`, `primaryLink` |
| Gap ↔ entry | Tags: which entries partially address each gap bullet |
| Timeline | `firstSeen` per model — narrative without hype |
| Verification ladder | UI badge: what evidence moves `indexed` → `verified` → `measured` |

**Rules**

- No chatbot that ranks models.
- No auto-scraped leaderboard scores without `asOf` + URL.
- Strip internal metadata from published manifest on build.

---

## Milestone ladder (honest)

| Version | Bar | Target date (indicative) |
|---------|-----|--------------------------|
| **v0.5.0** *(now)* | 61 entries · 48+ verified · 13 measured · timeline + source radar UI | 2026-08 |
| **v0.2.1** | 23 entries · live site · methodology · no fake scores | 2026-08 |
| **v0.3** | 40+ entries · link CI · Awesome cross-link PR | weeks 1–4 |
| **v0.4** | 10+ `verified` · 8+ `measured` · ParsBench URL · Dorna HF non-GGUF | weeks 3–6 *(met)* |
| **v0.5** | Compare UI · timeline lane · use-case lanes · deep links | months 2–3 |
| **v1.0** | 60+ entries · majority linked · 15+ measured · zero broken primary URLs · ≥1 external citation | months 4–6 |
| **v2.0** | Schema stable · community PRs · optional `persian-llm-reference` org · custom domain | year 1+ |

**Current stats (v0.5.0):** 61 entries · **48 verified** · **13 measured** · 0 indexed.

---

## Phase 1 — Credibility + completeness (weeks 1–4)

**Goal:** Obviously *real* and *useful* — not “another awesome list.”

### Step 1.1 — Prove green baseline

- [ ] `cd workspace && npm run build` — PASS
- [ ] `cd workspace && npm run e2e` — GREEN
- [ ] Live site: 23 entries via `/data/reference-manifest.json`
- [ ] Trailing slash: `/` → 200; no slash → redirect OK
- [ ] `node scripts/validate-links.mjs` — PASS (document HF Spaces 401 as auth-gated)

### Step 1.2 — Grow registry to 40+

**Sources (in order):**

1. [Awesome-Persian-LLM](https://github.com/MohammadHeydari/Awesome-Persian-LLM)
2. MIZAN leaderboard entries
3. PartAI Open Persian LLM Leaderboard
4. Hugging Face search: Persian / Farsi instruct models

**Per-entry checklist:**

- [ ] Unique `id` (kebab-case)
- [ ] `kind` + `class` from `MANIFEST_LAW.md`
- [ ] At least one primary `links.hf` | `links.paper` | `links.repo` | `links.web`
- [ ] `license` and `sizeB` from primary source (or `null`)
- [ ] `status: indexed` minimum; upgrade when evidence allows
- [ ] `summary.en` + `summary.fa`
- [ ] `alefbaAxes`: editorial estimate or `null` — never invented
- [ ] `benchmarks[].score` only with `asOf` + receipt URL

**Target tranches:**

| Tranche | Count | Focus |
|---------|-------|-------|
| A | +5–10 | Major open instruct models from Awesome list |
| B | +5–7 | Datasets and eval suites missing today |
| C | +3–5 | Leaderboards and community indexes if gaps remain |

### Step 1.3 — Raise verification

- [ ] Upgrade **10 rows** from `indexed` → `verified` (license + size + base confirmed)
- [ ] Upgrade **4+ rows** to `measured` (benchmark name, score, `asOf`, link)
- [ ] Close **ParsBench** — add primary URL or explicit URL-pending note in `summary`
- [ ] Add **Dorna** non-GGUF HF weights if published

### Step 1.4 — CI and governance visibility

- [ ] Add `validate-links.mjs` to `.github/workflows/` on every push to `main`
- [ ] Fail CI if manifest invalid (`validate-manifest.mjs`)
- [ ] Bump `generatedAt`; log adds in `governance/CHANGELOG.md`
- [ ] Methodology linked from site trust panel (already present — verify copy)

### Step 1.5 — Discovery (short term)

- [ ] SEO: title, description, JSON-LD (verify on live)
- [ ] README: raw manifest URL for papers
- [ ] Open PR to Awesome-Persian-LLM: link to PLR as structured verified atlas
- [ ] Queries to own: “Persian LLM”, “مدل زبانی فارسی”, “Farsi language model benchmark”

### Phase 1 exit criteria

| Check | Target |
|-------|--------|
| Entry count | ≥ 40 |
| `npm run build` + `e2e` | GREEN on merge SHA |
| Link validation | CI on every push |
| Measured rows | ≥ 8 |
| Verified rows | ≥ 10 |
| Broken primary URLs | 0 (or documented pending) |
| Awesome PR | Opened or merged |

**Ship:** tag **v0.3** when exit criteria met.

---

## Phase 2 — Usability + productivity (weeks 5–10)

**Goal:** Tool people open every week — not bookmark once.

### Step 2.1 — Compare matrix (minimal v0.5)

- [ ] Table view: sort by `sizeB`, `class`, `status`
- [ ] Filter: class · status · kind · open license
- [ ] Optional: filter by `alefbaAxes` (non-null only)
- [ ] Export: CSV + JSON snippet for selected rows
- [ ] E2E: compare renders ≥1 row; export downloads

### Step 2.2 — Navigation and cite

- [ ] Deep link `?entry={id}` scrolls to card + highlights
- [ ] Card actions: Open HF · Open paper · Open repo (when present)
- [ ] Footer / trust panel: “Cite this registry” with version + `generatedAt`
- [ ] Share URL copies bilingual-safe link

### Step 2.3 — Use-case lanes

Home or nav shortcuts — pre-filtered views:

| Lane | Filter |
|------|--------|
| **Fine-tune** | `kind: model` · open license · `adapted-instruct` |
| **Benchmark** | `kind: dataset` + benchmark entries |
| **Leaderboard** | `class: leaderboard` |
| **Frontier (API)** | `multilingual-frontier` · proprietary noted |

### Step 2.4 — Productivity automation

- [ ] Monthly release ritual: bump `generatedAt`, `CHANGELOG.md`, `stats` in manifest
- [ ] Optional: weekly GitHub Action — `validate-links` → issue on failure
- [ ] PR template: one entry, one URL, checklist from `CONTRIBUTING.md`

### Step 2.5 — Install Playwright in CI (optional)

- [ ] E2E browser step: `.entry-card` count ≥ entry total
- [ ] Lang toggle smoke

### Phase 2 exit criteria

| Check | Target |
|-------|--------|
| Compare UI | Ship + E2E |
| Deep links | Work on live |
| Use-case lanes | ≥ 3 lanes |
| Changelog | 2+ monthly entries |
| Export | CSV works |

**Ship:** tag **v0.5** when compare + lanes live.

---

## Phase 3 — Authority (months 2–6)

**Goal:** Default reference for papers, Hugging Face READMEs, and agent tools.

### Step 3.1 — Timeline lane

- [ ] Add `firstSeen` (ISO date) to model entries from paper/release date
- [ ] UI: chronological strip or sort — PersianMind → Dorna → …
- [ ] Source: paper date or HF first commit — cite in PR

### Step 3.2 — Gap map ↔ entries

- [ ] Tag entries: `gapTags: ["literary-eval", "native-preference", …]`
- [ ] UI: click gap bullet → filtered entries
- [ ] Refresh gap copy when field changes (changelog note)

### Step 3.3 — Benchmark mirror (cite only)

- [ ] Each benchmark row: primary paper + leaderboard URL
- [ ] Model rows: `benchmarks[]` with `asOf`, never stale uncited scores
- [ ] Link to MIZAN / PartAI / ELAB / TARAZ — do not host full tables

### Step 3.4 — External presence

- [ ] Hugging Face org README or dataset card → manifest URL
- [ ] Short arXiv or tech report: “Persian LLM Reference schema v1” (optional)
- [ ] Track ≥1 external citation (paper, repo, HF card)

### Step 3.5 — v1.0 registry depth

- [ ] **60+** entries
- [ ] Majority with primary links
- [ ] **15+** measured
- [ ] Zero broken primary URLs
- [ ] Bilingual parity on all new UI strings

### Phase 3 exit criteria

| Check | Target |
|-------|--------|
| Entries | ≥ 60 |
| Measured | ≥ 15 |
| External citation | ≥ 1 documented |
| Timeline | Live for major models |
| Gap tags | Live |

**Ship:** tag **v1.0**.

---

## Phase 4 — Infrastructure (year 1+)

**Goal:** Structured layer the ecosystem runs on.

### Step 4.1 — Schema stability

- [ ] Publish `schema/reference-manifest-v1.json` (JSON Schema)
- [ ] Document semver: manifest `version` vs schema `PERSIAN-LLM-REFERENCE/v1`
- [ ] Breaking change policy in `governance/MANIFEST_LAW.md`
- [ ] Derived fields at build: `openWeights`, `hasMeasuredBenchmarks`, `primaryLink`

### Step 4.2 — Community governance

- [ ] Multi-maintainer or org: `persian-llm-reference` on GitHub
- [ ] CONTRIBUTING + CODEOWNERS for manifest
- [ ] Intake: community PRs for one entry each

### Step 4.3 — Optional infrastructure

- [ ] Custom domain (e.g. `reference.persianllm.org`)
- [ ] Stable API versioning: `/api/v1/reference.json`
- [ ] Agent skill or MCP readme pointing at manifest

### Step 4.4 — Alefbâ relationship (when earned)

- [ ] Alefbâ appears as **one measured row** when gates ship — not before
- [ ] No charter copy in registry marketing fields

### Phase 4 exit criteria

| Check | Target |
|-------|--------|
| JSON Schema | Published + validated in CI |
| Community PRs | Documented path + ≥3 merged externals |
| Schema consumers | ≥1 agent or paper depends on v1 |

**Ship:** tag **v2.0**.

---

## Gap thesis (long-term — what the field lacks)

Document honestly in `gapMap`; do not invent solutions in the registry.

1. No frontier model whose **first world is licensed Persian literature**
2. Few **native-rater preference** loops at production scale
3. Sparse **literary register / book-memory** evaluation
4. Most open models = **English-base adaptations under 15B**

When Alefbâ ships capabilities, they appear as **one earned row** — the reference maps the gap; Alefbâ tries to close it separately.

---

## What we are NOT building

| Not this | Why |
|----------|-----|
| Beat GPT on Persian chat | Layer 5 product — not a registry job |
| Replace MIZAN or PartAI | Cite them; mirror structure only |
| Fundraising site | That is Alefbâ |
| “Most complete in the world” without count + verification | Credibility law |
| Invented benchmark or axis scores | Receipt before claim |
| Chat widget ranking models | Smart = schema, not theater |
| Move repo into PLUS ONE | Desktop standalone repo |
| Push to `sinakazemnezhadca-eng` | Wrong GitHub account |

---

## Operational commands (every phase)

```bash
cd ~/Desktop/PERSIAN-LLM-REFERENCE/workspace
npm run build          # validate manifest + static public
npm run e2e            # local :5294 smoke (start server first)
node scripts/validate-links.mjs
```

**Git:** push as `sinakazemnezhad` · Pages deploy via `.github/workflows/deploy-pages.yml`

**Done law:** never claim done without `build` + `e2e` green on the reported SHA.

---

## Release checklist (every version bump)

1. Edit `data/reference-manifest.json` only (SSOT)
2. `npm run build`
3. `npm run e2e`
4. `node scripts/validate-links.mjs`
5. Update `governance/CHANGELOG.md`
6. Bump `version` + `generatedAt` in manifest
7. Commit · push `main` → Pages auto-deploy
8. Verify live manifest entry count + `/` 200

---

## Success metrics summary

| Dimension | v0.3 | v0.5 | v1.0 | v2.0 |
|-----------|------|------|------|------|
| Entries | 40+ | 45+ | 60+ | maintained |
| Measured | 8+ | 12+ | 15+ | growing |
| Verified | 10+ | 15+ | majority linked | — |
| Compare UI | — | yes | enhanced | stable |
| Link CI | yes | yes | yes | + schema validate |
| External cite | — | — | ≥1 | ≥3 |
| JSON Schema | — | — | draft | v1 stable |

---

## Related docs

| Doc | Role |
|-----|------|
| [METHODOLOGY.md](./METHODOLOGY.md) | How we verify and cite |
| [MANIFEST_LAW.md](./MANIFEST_LAW.md) | Taxonomy and gates |
| [POSITIONING.md](./POSITIONING.md) | vs other references |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | PR rules |
| [CHANGELOG.md](./CHANGELOG.md) | Release log |
| [../AGENTS.md](../AGENTS.md) | Agent ops |

---

*Persian LLM Reference maintainers · CC-BY-4.0*
