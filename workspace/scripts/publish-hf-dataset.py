#!/usr/bin/env python3
"""Publish PLR manifest snapshot to Hugging Face Hub (requires HF_TOKEN write scope)."""

import json
import os
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REF = json.loads((ROOT / "REFERENCE.json").read_text())
DATASET_DIR = ROOT / "huggingface" / "dataset"
REPO = os.environ.get("PLR_HF_DATASET") or REF.get("hfDataset") or "Noetfield/persian-llm-reference"
VERSION = os.environ.get("PLR_RELEASE", REF["version"])
TOKEN = os.environ.get("HF_TOKEN") or os.environ.get("HUGGING_FACE_HUB_TOKEN")

if not TOKEN:
    print("RED  HF_TOKEN required (write scope)", file=sys.stderr)
    sys.exit(1)

manifest_path = DATASET_DIR / "reference-manifest.json"
if not manifest_path.exists():
    print("RED  run npm run build first", file=sys.stderr)
    sys.exit(1)

manifest = json.loads(manifest_path.read_text())
if manifest.get("version") != VERSION:
    print(f"RED  manifest version {manifest.get('version')} ≠ {VERSION}", file=sys.stderr)
    sys.exit(1)

from huggingface_hub import HfApi

api = HfApi(token=TOKEN)
who = api.whoami()
username = who.get("name") or who.get("user")
print(f"HF user: {username}")

namespace = REPO.split("/")[0]
if namespace != username:
    REPO = f"{username}/persian-llm-reference"
    print(f"Using dataset repo: {REPO}", file=sys.stderr)

print(f"Publishing dataset {REPO} @ v{VERSION}…")
api.create_repo(REPO, repo_type="dataset", exist_ok=True)
api.upload_folder(
    folder_path=str(DATASET_DIR),
    repo_id=REPO,
    repo_type="dataset",
    commit_message=f"PLR manifest v{VERSION}",
)
print(f"PASS  https://huggingface.co/datasets/{REPO}")
