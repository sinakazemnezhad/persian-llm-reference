"""Persian LLM Reference — Python client for the open atlas manifest."""

from __future__ import annotations

__version__ = "0.3.0"
__all__ = ["__version__", "load_manifest", "CANONICAL_MANIFEST_URL"]

CANONICAL_MANIFEST_URL = (
    "https://raw.githubusercontent.com/sinakazemnezhad/persian-llm-reference/"
    "main/data/reference-manifest.json"
)

from persian_llm_reference.manifest import load_manifest  # noqa: E402
