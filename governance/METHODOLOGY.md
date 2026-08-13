# Methodology — Persian LLM Reference

## Purpose

This registry lists Persian (Farsi) language models, datasets, benchmarks, and related indexes with **structured fields** and **citation policy**. It is a community reference, not a product ranking.

## How entries are added

1. Open a pull request with one entry (or one factual correction) per PR.
2. Every entry must include at least one **primary source URL** (`links.hf`, `links.paper`, `links.repo`, or `links.web`) unless explicitly marked as URL pending in `summary` / `notes`.
3. Maintainers check that the URL resolves and matches the described artifact.

## Verification statuses

| Status | Meaning |
|--------|---------|
| `indexed` | Listed with source link or documented URL-pending note |
| `verified` | Maintainer confirmed primary URL and metadata |
| `measured` | Published benchmark or leaderboard score with `asOf` and receipt |

See `governance/MANIFEST_LAW.md` for full gate definitions.

## Persian axes (`persianAxes` / `alefbaAxes`)

Five editorial dimensions (script, corpus law, curriculum fit, literary depth, native preference):

- **Numeric values** are maintainer **editorial estimates** for comparison — not lab measurements.
- **`null`** means **unknown** — we do not invent scores.
- Scores must not be added without a cited rationale in the PR.

## What we exclude

- Self-referential entries that only promote unrelated projects without independent artifacts.
- Invented benchmark numbers or axis scores without sources.

## Cite policy

Prefer citing the **manifest JSON** (`manifestRaw` in `REFERENCE.json`) and the `generatedAt` / `version` fields. Link to individual primary sources for model weights and papers.

## License

Registry metadata: CC-BY-4.0. Each listed artifact retains its own license.
