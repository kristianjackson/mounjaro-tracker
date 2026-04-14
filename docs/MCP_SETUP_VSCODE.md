# VS Code + MCP Setup Guide

This doc prepares your local VS Code environment so AI tooling can access GitHub, Cloudflare, and related systems through MCP.

## 1) Required Accounts & Tokens
- GitHub Personal Access Token (repo + PR scopes)
- Cloudflare API Token (Workers, D1, KV scopes)

## 2) Recommended MCP Servers
1. GitHub MCP server (repo ops, issues, PRs)
2. Cloudflare MCP server(s) (Workers, observability, browser automation)
3. Filesystem MCP (local project awareness)
4. Browser automation MCP (end-to-end smoke tests)

## 3) Example MCP config (generic)
```json
{
  "mcpServers": {
    "github": {
      "command": "github-mcp-server",
      "args": ["stdio"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PAT}"
      }
    },
    "cloudflare-observability": {
      "command": "npx",
      "args": ["mcp-remote", "https://observability.mcp.cloudflare.com/mcp"]
    },
    "cloudflare-browser": {
      "command": "npx",
      "args": ["mcp-remote", "https://browser.mcp.cloudflare.com/mcp"]
    }
  }
}
```

## 4) Validation Checklist
- Confirm MCP host can list available servers.
- Confirm GitHub repo read works.
- Confirm Cloudflare account resources can be listed.
- Confirm local filesystem server can read this repo.

## 5) Next Steps After Enabling MCP
- Generate initial D1 migrations.
- Wire secrets and environment config.
- Add CI pipeline for type checks and deploy previews.
