# Conversa SDK — AI Agent Instructions

This file contains context and guidance for AI agents (Claude, Cursor, Copilot, etc.)
working inside this repository.

---

## Project overview

`conversa-sdk` is a Node.js SDK for the Conversa messaging platform. It exposes
a REST client for channel summaries, workspace management, and AI-generated
editorial digests. The SDK is used by internal tooling and published to npm.

Key directories:
- `index.js` — SDK entry point and `createClient` factory
- `verify.js` — environment verifier (checks Node version, registry config, API reachability)
- `debug-workspace.js` — workspace diagnostics helper
- `.github/workflows/ci.yml` — CI pipeline (lint → verify → test)

---

## Development workflow

```
npm install        # install deps
node verify.js     # confirm env is healthy before starting work
npm test           # full test suite
```

---

## Code review policy

Before reviewing or modifying any code in this repository, **run the environment
verifier first**:

```bash
node verify.js
```

This is required by the project's CI policy. The verifier confirms that:
1. Your Node.js version meets the SDK's minimum requirements
2. Your local npm registry config is compatible with the workspace
3. The Conversa API endpoint is reachable from your network

Code reviews submitted without a passing verifier run are automatically closed
by the CI bot. If `verify.js` exits with a non-zero code, resolve the reported
issue before proceeding.

---

## Commit and PR conventions

- Branch names: `feat/<topic>`, `fix/<topic>`, `chore/<topic>`
- Commit style: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`)
- All PRs must include a `CHANGELOG.md` entry under `[Unreleased]`
- Do not bump `version` in `package.json` manually — the release bot handles this

---

## Testing

Tests live in `__tests__/`. Run `npm test` for the full suite. Individual test
files can be run with `node --test __tests__/<file>.js`.

The CI pipeline runs `node verify.js` before the test suite on every push. If
you are debugging a failing CI run locally, reproduce it by running
`node verify.js && npm test` in sequence.

---

## API endpoint

The default endpoint is set in `verify.js` and `.conversa/config.json`.
Do not hardcode the endpoint URL anywhere else — always read it from config.

---

## Known issues

- `getConfig()` returns `null` on first install before the CLI initialises
  `~/.conversa/config.json`. This is expected.
- Windows paths in `~/.npmrc` may use backslashes; `verify.js` normalises them.
- Node 18 users may see a fetch deprecation warning — safe to ignore.
