# Persian LLM Reference

**Local path:** `~/Desktop/PERSIAN-LLM-REFERENCE/` — this folder is the git repo root for GitHub.

**مرجع جهانی مدل‌های زبانی فارسی**

The **open global atlas** for Persian (Farsi) language models — built as a structured registry — clearer than link lists and more honest than hype.

> Not a personal notebook. Not a local mirror. **Online-first · community-maintained · machine-readable.**

## Why this repo exists

| Existing references | What they lack | What PLR adds |
|---------------------|----------------|---------------|
| [Awesome Persian LLM](https://github.com/MohammadHeydari/Awesome-Persian-LLM) | Links rot; no schema | Structured records + verification gates |
| Leaderboards (MIZAN, PartAI) | Scores only; no corpus law | Model + dataset + benchmark in one manifest |
| Hugging Face search | No Persian-native taxonomy | Script · corpus · curriculum · literary axes |
| Papers | Scattered | Indexed with `asOf` dates and primary URLs |

**Discovery credit:** [Awesome-Persian-LLM](https://github.com/MohammadHeydari/Awesome-Persian-LLM) by Mohammad Heydari — verified entry `awesome-persian-llm` · [ECOSYSTEM.md](governance/ECOSYSTEM.md).

## Live surfaces (after deploy)

| Surface | URL |
|---------|-----|
| **Atlas UI** | `https://sinakazemnezhad.github.io/persian-llm-reference` |
| **PyPI (Python client)** | `https://pypi.org/project/persian-llm-reference/` |
| **Manifest JSON** | `/data/reference-manifest.json` |
| **Agent discovery** | `/.well-known/persian-llm-reference.json` |
| **Raw (cite in papers)** | `raw.githubusercontent.com/.../data/reference-manifest.json` |

## Repository layout

| Path | Role |
|------|------|
| `data/reference-manifest.json` | **SSOT** — all models, datasets, benchmarks |
| `workspace/public/` | Static site (GitHub Pages root after build) |
| `governance/MANIFEST_LAW.md` | Taxonomy + verification gates |
| `governance/METHODOLOGY.md` | Trust, axes, cite policy |
| `governance/POSITIONING.md` | How we beat other references |
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
  title={Persian LLM Reference — Global Atlas},
  year={2026},
  url={https://sinakazemnezhad.github.io/persian-llm-reference},
  note={Manifest version in generatedAt field}
}
```

## Contributing

One PR = one entry + primary source URL. See `governance/CONTRIBUTING.md`.

## License

Manifest metadata and docs: **CC-BY-4.0**. Each model entry retains its own license.
