# Distribution status — external authority loop

**Updated:** 2026-08-16 · **Release:** v0.13.1

## Integrity (verified)

| Surface | URL / ID | Status |
|---------|----------|--------|
| Live `release.json` | https://sinakazemnezhad.github.io/persian-llm-reference/release.json | ✅ 0.13.1 · 72 entries |
| API v1 | https://sinakazemnezhad.github.io/persian-llm-reference/api/v1/reference.json | ✅ ≡ tag manifest |
| PyPI | https://pypi.org/project/persian-llm-reference/0.13.1/ | ✅ 0.13.1 |
| GitHub Release | https://github.com/sinakazemnezhad/persian-llm-reference/releases/tag/v0.13.1 | ✅ |
| `/about/` | https://sinakazemnezhad.github.io/persian-llm-reference/about/ | ✅ |

## External distribution (open)

| Channel | Status | Action |
|---------|--------|--------|
| **Zenodo DOI** | ⏳ | Connect [Zenodo ↔ GitHub](https://zenodo.org/account/settings/github/) **or** set `ZENODO_TOKEN` + run `npm run publish:zenodo` in `workspace/` |
| **HF Dataset** | ⏳ | `hf auth login` + `npm run publish:hf` in `workspace/` (repo: `sinakazemnezhad/persian-llm-reference`) |
| **Awesome PR** | ⏳ open | [PR #2](https://github.com/MohammadHeydari/Awesome-Persian-LLM/pull/2) — one follow-up posted 2026-08-16; no further spam |
| **External citation** | ❌ | Await first paper/tool citing PLR |

## Automation

- `workspace/scripts/verify-release-integrity.mjs` — cross-surface consistency check
- `workspace/scripts/publish-zenodo.mjs` — Zenodo deposition (needs `ZENODO_TOKEN`)
- `workspace/scripts/publish-hf-dataset.mjs` — HF upload (needs `HF_TOKEN`)
- `.github/workflows/publish-distribution.yml` — runs on release when secrets are set

## Authority loop complete when

```text
GitHub Release + PyPI + Zenodo DOI + HF Dataset + API v1
→ all same v0.13.1 manifest fingerprint
→ at least one lives outside the GitHub repo UI
```

Then start **v0.14 State of Persian LLM** brief.
