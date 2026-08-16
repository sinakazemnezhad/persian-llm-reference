# Score an agent with agent-security-bench

Companion walkthrough for [persian-llm-reference](https://github.com/sinakazemnezhad/persian-llm-reference) authors and agent builders.

## Why link these repos

| Repo | Role |
|------|------|
| [persian-llm-reference](https://github.com/sinakazemnezhad/persian-llm-reference) | Sourced atlas of Persian LLMs + manifests |
| [agent-security-bench](https://github.com/sinakazemnezhad/agent-security-bench) | Agent Security Evaluation Kit — score agent code and refuse unsafe tools |

Use PLR to discover models; use ASB to regression-test agents that call tools around those models.

## Five-minute score

```bash
pip install -U agent-security-bench==0.4.0
asb selftest
asb security \
  --suite "$(python -c 'from agent_security_bench.scoring import repo_root; print(repo_root())')/security/suites/core_v1.json" \
  --agent-log path/to/agent_log.json \
  --out receipt.json
```

From an ASB checkout:

```bash
asb score-trace \
  --suite security/suites/core_v1.json \
  --trace examples/traces/mcp_session_pass.jsonl \
  --out receipts/trace.json
asb leaderboard --out-dir receipts/leaderboard --agent-id my-agent
```

## Registry pointer

ASB suites that matter for Persian LLM agent gateways:

- `sec.core_v1` — smoke injection / jailbreak / overreach
- `sec.production_v1` — SSRF args, confused deputy, secret echo
- Tasks `ml.13`, `ml.16`, `ml.18`, `ml.19` — tenant isolation, MCP args, DLP, vector namespaces

Demand map: https://github.com/sinakazemnezhad/agent-security-bench/blob/main/docs/DEMAND_MAP_2026.md
