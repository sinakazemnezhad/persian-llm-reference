# Persian LLM Reference

**Local path:** `~/Desktop/PERSIAN-LLM-REFERENCE/` — this folder is the git repo root for GitHub.

**مرجع مدل‌های زبانی فارسی**

The **open atlas** for Persian (Farsi) language models — **63 sourced entries** (v0.9.0) with verification gates and bilingual JSON. Works **alongside** [Awesome-Persian-LLM](https://github.com/MohammadHeydari/Awesome-Persian-LLM), MIZAN, PartAI, and the teams who build these models.

> Community-maintained · sourced · machine-readable · online-first.

## Stats (v0.9.0)

| | Count |
|---|------|
| **Total entries** | 63 |
| **Verified** | 48 |
| **Measured** | 15 |
| **PyPI** | `persian-llm-reference` 0.9.0 |

## How PLR fits the ecosystem

| Resource | What it offers | What PLR adds alongside |
|----------|----------------|-------------------------|
| [Awesome Persian LLM](https://github.com/MohammadHeydari/Awesome-Persian-LLM) | Curated discovery links | Structured records + verification gates |
| Leaderboards (MIZAN, PartAI) | Benchmark scores | Links to leaderboards inside one manifest |
| Hugging Face search | Model hosting + cards | Persian taxonomy · corpus · script fields |
| Papers & repos | Primary artifacts | Indexed rows with `asOf` dates and cite URLs |

**Upstream discovery:** [Awesome-Persian-LLM](https://github.com/MohammadHeydari/Awesome-Persian-LLM) — verified community index `awesome-persian-llm` · [ECOSYSTEM.md](governance/ECOSYSTEM.md). Bibliographic link only — not an endorsement or partnership.

## Live surfaces (after deploy)

| Surface | URL |
|---------|-----|
| **Atlas UI** | `https://sinakazemnezhad.github.io/persian-llm-reference` |
| **PyPI (Python client)** | `https://pypi.org/project/persian-llm-reference/` |
| **Manifest JSON** | `/data/reference-manifest.json` |
| **Raw manifest (cite in papers)** | `https://raw.githubusercontent.com/sinakazemnezhad/persian-llm-reference/main/data/reference-manifest.json` |
| **Source radar (field gaps + forecast)** | `/data/source-radar.json` |
| **Agent discovery** | `/.well-known/persian-llm-reference.json` |

## Repository layout

| Path | Role |
|------|------|
| `data/reference-manifest.json` | **SSOT** — all models, datasets, benchmarks |
| `workspace/public/` | Static site (GitHub Pages root after build) |
| `governance/MANIFEST_LAW.md` | Taxonomy + verification gates |
| `governance/METHODOLOGY.md` | Trust, axes, cite policy |
| `governance/POSITIONING.md` | What PLR is — alongside other references |
| `governance/ROADMAP.md` | **Full phased plan** — meaningful · usable · productive · smart |
| `docs/PYPI_TRUSTED_PUBLISHING_SETUP.md` | PyPI OIDC publish (sourcea-boot pattern) |
| `pyproject.toml` | Python package · `pip install persian-llm-reference` |

## GitHub setup (required)

1. Repo: [github.com/sinakazemnezhad/persian-llm-reference](https://github.com/sinakazemnezhad/persian-llm-reference)
2. Enable **GitHub Pages** → source: **GitHub Actions**
3. Push `main` branch
4. Site: `https://sinakazemnezhad.github.io/persian-llm-reference`

## Python client (PyPI)

Same pattern as [sourcea-boot](https://github.com/Noetfield-Systems/sourcea-boot) · [pypi.org/project/sourcea-boot](https://pypi.org/project/sourcea-boot/).

```bash
pip install persian-llm-reference
plr stats
plr get persianmind-v1
plr cite
plr validate
```

Editable install from repo root:

```bash
cd workspace && node scripts/sync-python-manifest.mjs
pip install -e .
```

- **Python client:** MIT (`LICENSE-MIT`)
- **Registry metadata:** CC-BY-4.0 (`LICENSE`)
- **Publish:** GitHub Release → `publish-pypi` workflow (trusted publishing). See `docs/PYPI_TRUSTED_PUBLISHING_SETUP.md`.

## Build & verify

```bash
cd workspace
npm run build    # validate + copy manifest to public/
npm run e2e      # local server smoke
```

## Verification gates

`indexed` → `verified` → `measured` → `corpus-documented` → `literary`

**No invented scores.** `null` until a primary source exists.

## Cite

```bibtex
@misc{persian_llm_reference,
  title={Persian LLM Reference — Open Atlas},
  author={{Persian LLM Reference maintainers}},
  year={2026},
  version={0.9.0},
  url={https://sinakazemnezhad.github.io/persian-llm-reference},
  howpublished={\\url{https://raw.githubusercontent.com/sinakazemnezhad/persian-llm-reference/main/data/reference-manifest.json}},
  note={Check manifest generatedAt for snapshot date}
}
```

Also see [CITATION.cff](CITATION.cff) for machine-readable metadata.

## Contributing

One PR = one entry + primary source URL. See `governance/CONTRIBUTING.md`.

## License

Manifest metadata and docs: **CC-BY-4.0**. Each model entry retains its own license.
