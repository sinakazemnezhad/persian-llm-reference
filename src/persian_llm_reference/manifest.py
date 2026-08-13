"""Load the Persian LLM Reference manifest from bundle or canonical URL."""

from __future__ import annotations

import json
import urllib.error
import urllib.request
from importlib import resources
from typing import Any

from persian_llm_reference import CANONICAL_MANIFEST_URL

_REQUIRED_ENTRY_KEYS = ("id", "kind", "class", "name", "status", "summary", "links")


def _bundled_manifest_text() -> str:
    return (
        resources.files("persian_llm_reference")
        .joinpath("data/reference-manifest.json")
        .read_text(encoding="utf-8")
    )


def load_manifest(*, remote: bool = False, url: str | None = None) -> dict[str, Any]:
    """Return parsed manifest dict.

    Default: bundled copy shipped with the wheel (matches release tag).
    remote=True: fetch from *url* or CANONICAL_MANIFEST_URL (network).
    """
    if remote:
        target = url or CANONICAL_MANIFEST_URL
        try:
            with urllib.request.urlopen(target, timeout=30) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except (urllib.error.URLError, json.JSONDecodeError) as exc:
            raise RuntimeError(f"manifest fetch failed: {target}") from exc

    return json.loads(_bundled_manifest_text())


def validate_manifest(manifest: dict[str, Any]) -> list[str]:
    """Return list of validation errors (empty = ok)."""
    errors: list[str] = []
    entries = manifest.get("entries")
    if not isinstance(entries, list):
        return ["entries must be a list"]
    if len(entries) < 1:
        errors.append("entries is empty")
    seen: set[str] = set()
    for entry in entries:
        if not isinstance(entry, dict):
            errors.append("entry is not an object")
            continue
        eid = entry.get("id")
        if eid in seen:
            errors.append(f"duplicate id: {eid}")
        seen.add(eid)
        for key in _REQUIRED_ENTRY_KEYS:
            if entry.get(key) is None:
                errors.append(f"{eid or '?'} missing {key}")
        if entry.get("status") == "measured":
            benchmarks = entry.get("benchmarks") or []
            if not benchmarks:
                errors.append(f"{eid} measured without benchmarks")
    return errors


def find_entry(manifest: dict[str, Any], entry_id: str) -> dict[str, Any] | None:
    for entry in manifest.get("entries", []):
        if entry.get("id") == entry_id:
            return entry
    return None
