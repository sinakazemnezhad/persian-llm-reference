# Outreach PR — Awesome-Persian-LLM

**Target repo:** [MohammadHeydari/Awesome-Persian-LLM](https://github.com/MohammadHeydari/Awesome-Persian-LLM)  
**Drafted:** 2026-08-13 · **Author:** Persian LLM Reference maintainers  
**Status:** Ready to fork → branch → PR (not yet submitted)

---

## Strategy (why this PR helps)

| Avoid | Do instead |
|-------|------------|
| Copy Awesome’s link style into PLR | Offer a **different artifact** (JSON manifest + verification gates) |
| “We’re better” | “You discover · we structure — same mission” |
| Long README dump | **One short section** + table of contents line |
| Pit PLR against MIZAN/PartAI | Complement them — PLR as **index of indexes**; Awesome included as a row |
| Ask maintainer to curate PLR | Offer **give-back**: changelog credits when we ingest from Awesome |

**Reciprocal truth:** PLR already lists Awesome as a verified `community-index` entry with maintainer credit. This PR completes the loop.

---

## PR title

```text
Add Persian LLM Reference — structured manifest companion (discovery → verify)
```

---

## PR body (paste into GitHub)

```markdown
## Summary

This PR adds a **single new section** to the README — not a duplicate of existing links.

[**Persian LLM Reference**](https://sinakazemnezhad.github.io/persian-llm-reference/) is a bilingual open registry (JSON + browse UI) built **with gratitude for this Awesome list as a discovery source**. It does not replace curated links; it adds:

- typed records (model / dataset / benchmark / leaderboard)
- verification status (`indexed` → `verified` → `measured`)
- honest `null` benchmark fields until a paper or leaderboard receipt exists
- a machine-readable manifest for papers and coding agents

**This repo is already listed** in the manifest as a verified community index:

- Entry id: `awesome-persian-llm`
- Manifest: https://raw.githubusercontent.com/sinakazemnezhad/persian-llm-reference/main/data/reference-manifest.json

## Why add it here?

Researchers and agent tools need **structure**, not another markdown bullet. Awesome remains the best place to **find** resources; PLR is a companion for **cite and verify**.

## What changed

- README: new section “Structured companion” (below “Why this repo?”)
- Table of contents: one new anchor

No other files touched. Happy to shorten wording or move the section if you prefer another placement.

## License note

PLR manifest metadata is CC-BY-4.0. Linking here does not imply endorsement — only cross-reference between community resources.

با تشکر از نگهداری این فهرست — امیدواریم لایهٔ JSON مکمل کشف شما باشد، نه جایگزین آن.
```

---

## README patch (unique section — insert after “Why this repo?”)

**Insert location:** After the “Why this repo?” paragraph block, **before** `## Contributing`.

**Add to Table of Contents** (near top):

```markdown
* [Structured companion (JSON atlas)](#structured-companion-json-atlas)
```

**New section:**

```markdown
---

## Structured companion (JSON atlas)

Link lists excel at **discovery**. Some workflows also need **typed, citable records** — license, size, verification status, benchmark receipts — in one machine-readable file.

[**Persian LLM Reference**](https://sinakazemnezhad.github.io/persian-llm-reference/) is an open companion project:

| | This Awesome list | Persian LLM Reference |
|---|-------------------|------------------------|
| **Strength** | Breadth — papers, tools, blogs, APIs | Depth per artifact — schema + sources |
| **Format** | Curated markdown links | Bilingual UI + [`reference-manifest.json`](https://raw.githubusercontent.com/sinakazemnezhad/persian-llm-reference/main/data/reference-manifest.json) |
| **Scores** | Links to leaderboards | Cites leaderboards; does not mirror live tables |
| **Unknowns** | — | Benchmark fields stay `null` until verified |

- **Browse (FA/EN):** https://sinakazemnezhad.github.io/persian-llm-reference/
- **Cite in papers/agents:** manifest URL above · check `version` and `generatedAt`
- **This list inside the atlas:** entry `awesome-persian-llm` (verified community index)

*Same ecosystem — discover here, structure and verify there.*

---
```

---

## Fork workflow (when ready to send)

```bash
# 1. Fork on GitHub: MohammadHeydari/Awesome-Persian-LLM

# 2. Clone your fork
git clone https://github.com/<your-user>/Awesome-Persian-LLM.git
cd Awesome-Persian-LLM

# 3. Branch
git checkout -b add-persian-llm-reference-companion

# 4. Edit README.md — TOC line + section above only

# 5. Commit
git commit -am "Add Persian LLM Reference as structured JSON companion"

# 6. Push and open PR against MohammadHeydari/main
gh pr create --repo MohammadHeydari/Awesome-Persian-LLM \
  --title "Add Persian LLM Reference — structured manifest companion (discovery → verify)" \
  --body-file /path/to/PR-body.md
```

Use the **PR body** block from this file for `--body-file`.

---

## After merge (PLR follow-up)

1. Update `awesome-persian-llm` entry: set reciprocal link in `links.web` if maintainer adds anchor URL.
2. Log in `governance/CHANGELOG.md`.
3. Begin v0.3 ingestion tranche from `ECOSYSTEM.md` gap audit — credit Awesome in changelog lines.

---

## If maintainer declines or is silent

- Keep Awesome entry verified in PLR regardless.
- Link from PLR README (already planned).
- Do not re-open aggressive PRs; one respectful PR is enough.
- Authority grows through manifest quality and external citations, not README politics.
