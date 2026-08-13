# Contributing

<!-- dis-brand-agent: repo=PLUS ONE product=DIS BRAND tag=DIS-PLUSONE-PERSIAN-LLM-REFERENCE-GOVERNANCE-CONTRIBUTING-MD name="DIS BRAND Governed Agent" action=edit at=2026-08-12T22:03:09.747Z file=persian-llm-reference/governance/CONTRIBUTING.md -->

## Add one entry

1. Edit `data/reference-manifest.json` — copy an existing `entries[]` object.
2. Set `status` honestly (`indexed` until verified).
3. Include at least one `links.*` URL to a primary source (Hugging Face, arXiv, official site).
4. Run `cd workspace && npm run e2e` with server on `:5294`.
5. Append one line to `governance/CHANGELOG.md`.

## Forbidden

- Invented benchmark scores
- `measured` without `benchmarks[].url` and `asOf`
- `native-foundation` without independent verification note

## Classes

See `MANIFEST_LAW.md`.
