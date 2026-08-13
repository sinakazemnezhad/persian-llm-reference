# Persian LLM Reference — manifest law

<!-- dis-brand-agent: repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-GOVERNANCE-MANIFEST-LAW-MD name="DIS BRAND Governed Agent" action=edit at=2026-08-12T22:01:32.604Z file=persian-llm-reference/governance/MANIFEST_LAW.md -->

## SSOT

| Concern | Only edit here |
|---------|----------------|
| Registry records | `data/reference-manifest.json` |
| Human changelog | `governance/CHANGELOG.md` |
| Browse UI | `workspace/public/` |

## Entry classes

| Class | Meaning |
|-------|---------|
| `native-foundation` | Pretrain world is Persian-first (claimed or proven) |
| `adapted-instruct` | English base + Persian continued pretrain / SFT |
| `multilingual-frontier` | Frontier model with Persian among many languages |
| `encoder-only` | BERT-class — not generative LLM |
| `dataset` | Training or eval corpus |
| `leaderboard` | Aggregated benchmark index |
| `community-index` | Curated link list (e.g. awesome repos) |
| `program` | Research charter / lab program (e.g. Alefbâ) |

## Verification gates

| Gate | Requirement |
|------|-------------|
| **indexed** | Public URL exists |
| **verified** | License, size, base model confirmed from primary source |
| **measured** | ≥1 benchmark with name, date, link |
| **corpus-documented** | Training data class stated with source |
| **literary** | Native-rater or cultural benchmark cited |

Empty fields stay `null`. Never invent scores.

## Persian-native axes (`alefbaAxes` 0–4)

| Axis | 0 | 4 |
|------|---|---|
| `scriptFidelity` | Unknown / weak ZWNJ·RTL | Native morph + ZWNJ in generation |
| `corpusLaw` | Unknown / scrape-only | Licensed bookshelf + provenance |
| `curriculumFit` | No ladder | Alphabet → book ladder native |
| `literaryDepth` | Chat-only | Register · metaphor · book memory |
| `nativePreference` | None | Native-rater preference loops |

`null` = not yet assessed.
