# Field analysis — PLR lane

**Updated:** 2026-08-13 · **Baseline:** v0.5.0 · 61 manifest entries  
**SSOT machine:** `data/source-radar.json` · **Gap mirror:** `gapMap` in `reference-manifest.json`

## PLR job on sources (not Alefbâ's job)

```text
PLR maps what the field already published.
PLR does not host training shards, license MOUs, or build-program corpus rows.
```

| Question | PLR lane | Build-program lane (separate) |
|----------|----------|-------------------------------|
| Analyze ecosystem gaps? | **Yes** — `gapMap`, `source-radar.json`, this doc | Yes — charter + corpus inventory |
| Forecast? | **Yes** — entry/verification targets in `forecast.plr` | Yes — gate timeline + compute |
| Prepare all source bytes? | **No** | **Staged** — G1→G4 bands only |
| Catalog HuggingFace / papers? | **Yes** | Only when public release exists |

**Law:** Receipt before claim. `field-gap` items stay out of the manifest until a public artifact + eval receipt exists.

---

## Current field picture (v0.5.0)

| Dimension | Count / note |
|-----------|----------------|
| Manifest entries | 61 |
| Verified | 48 |
| Measured | 13 |
| Indexed | 0 |
| Native-foundation class | 1 (`yasin-persian-base` — small, restricted; not gap-closer) |
| Reasoning eval gap (2026) | Partially closed — PARSE, PersianMHQA, PQuAD cataloged |
| Medical eval | PersianMedQA — now primary measured receipt source |
| Trust / cultural eval | EPT, TARAZ, Taarof, PERCUL, MELAC cataloged |
| Licensed bookshelf as first world | **Still field gap** — documented, not cataloged |

---

## Open questions (documented, not solved here)

1. **Native foundation** — No frontier model whose pretrain world is licensed Persian literature (gapMap #1).
2. **Preference loops** — Few production-scale native-rater datasets (gapMap #2).
3. **Literary depth** — Chat/instruction benchmarks outnumber book-memory / register evals (gapMap #3).
4. **Instruct stack** — Most open weights are English-base SFT/continued-pretrain under ~15B (gapMap #4).
5. **Tokenizer receipts** — No standard public fertility + alphabet-coverage card adopted across projects.
6. **Corpus law in registries** — Web scrape (OSCAR) cataloged; publisher-licensed shelves rarely appear as documented open releases.

These are **documented**, not solved, in PLR. Solving them is out of PLR scope until public artifacts ship.

---

## Forecast (PLR maintainer)

| Horizon | Entries | Verified | Measured | Focus |
|---------|---------|----------|----------|-------|
| **v0.5** | 60 | 40+ | 12+ | Upgrade indexed rows; Persian news; timeline UI |
| **v1.0** | 65+ | majority | 15+ | Stable schema; external citations; zero broken primaries |

**Field forecast (neutral):** More FA reasoning, trust, and domain evals in 2026; instruct models remain adapted unless a native-foundation checkpoint publishes verifiable evals.

---

## Source radar usage

`data/source-radar.json` groups external sources by category:

- `cataloged` — one or more `plrEntryIds` in the manifest  
- `cataloged-partial` — paper/indexed; release incomplete  
- `planned` — v0.5 ingest candidate with URL TBD  
- `field-gap` — documented absence; **no manifest row**  

**API:** `/data/source-radar.json` after build · loopback `/api/source-radar.json`

---

## What PLR should not do

- Scrape or mirror datasets  
- Invent benchmark scores  
- Add build-program or `program` rows without G1+ receipts  
- Duplicate Alefbâ corpus inventory (different schema, different repo)  
- Forecast "all Persian books" or parameter-count hype  

---

## Related

- [ECOSYSTEM.md](./ECOSYSTEM.md) — Awesome, MIZAN, PartAI  
- [ROADMAP.md](./ROADMAP.md) — phased execution  
- [MANIFEST_LAW.md](./MANIFEST_LAW.md) — verification gates  
- [../data/source-radar.json](../data/source-radar.json) — machine SSOT  
