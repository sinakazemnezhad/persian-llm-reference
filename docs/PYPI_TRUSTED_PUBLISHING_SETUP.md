# Persian LLM Reference — PyPI Trusted Publishing Setup

**Package:** `persian-llm-reference`  
**Public repo:** https://github.com/sinakazemnezhad/persian-llm-reference  
**Workflow:** `.github/workflows/publish-pypi.yml`  
**Pattern:** Same as [sourcea-boot](https://github.com/Noetfield-Systems/sourcea-boot) · https://pypi.org/project/sourcea-boot/

---

## What this enables

GitHub Actions uploads `persian-llm-reference` to PyPI using **OIDC trusted publishing** — no long-lived `PYPI_API_TOKEN` in GitHub secrets.

The wheel bundles `reference-manifest.json` so agents can run offline:

```bash
pip install persian-llm-reference
plr stats
plr get persianmind-v1
plr cite
```

---

## Licenses (two layers)

| Artifact | License |
|----------|---------|
| **Python client** (`src/persian_llm_reference/`) | MIT — `LICENSE-MIT` |
| **Registry metadata** (`data/reference-manifest.json`, docs, site) | CC-BY-4.0 — `LICENSE` |

---

## Founder checklist (PyPI side)

### 1. Create the PyPI project

1. Sign in at https://pypi.org
2. Create project **`persian-llm-reference`** (if not already claimed)
3. Confirm **Owner** or **Maintainer** on https://pypi.org/project/persian-llm-reference/

### 2. Add Trusted Publisher

PyPI → **persian-llm-reference** → **Publishing** → **Add a new pending publisher**:

| Field | Value |
|-------|--------|
| **PyPI Project Name** | `persian-llm-reference` |
| **Owner** | `sinakazemnezhad` |
| **Repository name** | `persian-llm-reference` |
| **Workflow name** | `publish-pypi.yml` |
| **Environment name** | `pypi` |

### 3. GitHub environment

Repo → **Settings** → **Environments** → **New environment**:

- Name: `pypi`
- Optional: restrict deployment branch to `main`

### 4. Publish

**Option A — GitHub Release (recommended)**

1. Tag `v0.3.0` on `main`
2. Create GitHub Release from tag → triggers `publish-pypi`

**Option B — Manual dispatch**

1. Actions → **publish-pypi** → Run workflow
2. Input: `PUBLISH`

---

## Local dev

```bash
cd ~/Desktop/PERSIAN-LLM-REFERENCE
cd workspace && node scripts/sync-python-manifest.mjs
pip install -e .
plr version
plr validate
python -m build && twine check dist/*
```

---

## CI

| Workflow | When | Action |
|----------|------|--------|
| `build-check-pypi.yml` | push/PR touching `pyproject.toml` or `src/` | build + twine check + CLI smoke |
| `publish-pypi.yml` | release or manual `PUBLISH` | upload to PyPI |

---

## Related

- [sourcea-boot PyPI](https://pypi.org/project/sourcea-boot/)
- [sourcea-boot repo](https://github.com/Noetfield-Systems/sourcea-boot)
