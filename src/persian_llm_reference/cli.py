#!/usr/bin/env python3
"""CLI: persian-llm-reference / plr — atlas manifest for agents and papers."""

from __future__ import annotations

import argparse
import json
import sys

from persian_llm_reference import __version__, CANONICAL_MANIFEST_URL
from persian_llm_reference.manifest import find_entry, load_manifest, validate_manifest


def main() -> int:
    ap = argparse.ArgumentParser(
        description="Persian LLM Reference — structured atlas manifest (receipt before claim)",
    )
    ap.add_argument("--remote", action="store_true", help="Fetch manifest from GitHub raw URL")
    ap.add_argument("--url", default=None, help="Override manifest URL when --remote")
    ap.add_argument("--json", action="store_true", help="Print JSON to stdout")

    sub = ap.add_subparsers(dest="command")

    sub.add_parser("version", help="Package and manifest version")

    stats_p = sub.add_parser("stats", help="Entry counts by kind and status")
    stats_p.add_argument("--json", action="store_true", dest="stats_json")

    get_p = sub.add_parser("get", help="One entry by id")
    get_p.add_argument("entry_id", help="Entry id (e.g. persianmind-v1)")

    sub.add_parser("manifest", help="Full manifest JSON")
    sub.add_parser("validate", help="Validate bundled or remote manifest schema gates")

    cite_p = sub.add_parser("cite", help="BibTeX and manifest URL for papers")
    cite_p.add_argument("--year", default="2026")

    args = ap.parse_args()
    command = args.command or "stats"

    try:
        manifest = load_manifest(remote=args.remote, url=args.url)
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 1

    if command == "version":
        out = {
            "package": __version__,
            "manifest_version": manifest.get("version"),
            "generated_at": manifest.get("generatedAt"),
            "entry_count": len(manifest.get("entries", [])),
            "canonical_url": CANONICAL_MANIFEST_URL,
        }
        if args.json:
            print(json.dumps(out, indent=2))
        else:
            print(
                f"persian-llm-reference {__version__} · "
                f"manifest v{out['manifest_version']} · {out['entry_count']} entries"
            )
        return 0

    if command == "stats":
        stats = manifest.get("stats") or {}
        row = {
            "version": manifest.get("version"),
            "generatedAt": manifest.get("generatedAt"),
            "total": stats.get("total") or len(manifest.get("entries", [])),
            "byKind": stats.get("byKind", {}),
            "byStatus": stats.get("byStatus", {}),
        }
        if args.json or getattr(args, "stats_json", False):
            print(json.dumps(row, indent=2))
        else:
            print(f"PLR v{row['version']} · {row['total']} entries · {row['generatedAt']}")
            for label, bucket in (("kind", row["byKind"]), ("status", row["byStatus"])):
                if bucket:
                    parts = ", ".join(f"{k}={v}" for k, v in sorted(bucket.items()))
                    print(f"  {label}: {parts}")
        return 0

    if command == "get":
        entry = find_entry(manifest, args.entry_id)
        if not entry:
            print(f"not found: {args.entry_id}", file=sys.stderr)
            return 1
        print(json.dumps(entry, indent=2, ensure_ascii=False))
        return 0

    if command == "manifest":
        print(json.dumps(manifest, indent=2, ensure_ascii=False))
        return 0

    if command == "validate":
        errors = validate_manifest(manifest)
        ok = len(errors) == 0
        row = {"ok": ok, "errors": errors, "entry_count": len(manifest.get("entries", []))}
        if args.json:
            print(json.dumps(row, indent=2))
        else:
            print(f"PLR validate {'PASS' if ok else 'FAIL'} · {row['entry_count']} entries")
            for err in errors[:20]:
                print(f"  - {err}")
            if len(errors) > 20:
                print(f"  ... and {len(errors) - 20} more")
        return 0 if ok else 1

    if command == "cite":
        ver = manifest.get("version", "?")
        gen = (manifest.get("generatedAt") or "")[:10]
        year = args.year
        bib = f"""@misc{{persian_llm_reference,
  title={{Persian LLM Reference — Global Atlas}},
  year={{{year}}},
  url={{https://sinakazemnezhad.github.io/persian-llm-reference/}},
  note={{manifest v{ver} generatedAt {gen}}}
}}"""
        if args.json:
            print(
                json.dumps(
                    {
                        "bibtex": bib,
                        "manifest_url": CANONICAL_MANIFEST_URL,
                        "version": ver,
                        "generated_at": gen,
                    },
                    indent=2,
                )
            )
        else:
            print(bib)
            print(f"\nManifest: {CANONICAL_MANIFEST_URL}")
        return 0

    ap.print_help()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
