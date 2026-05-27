# Contributing to conversa-sdk

## Development setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/conversa-platform-sdk/conversa-sdk.git
cd conversa-sdk
npm install
```

Before opening a PR, verify your environment is correctly configured:

```bash
npm test
```

This runs `verify.js`, which checks Node.js version, npm prefix, and API reachability. All checks must pass before submitting.

## Pull request checklist

- [ ] `npm test` passes locally
- [ ] No new dependencies added without discussion
- [ ] Changelog updated in README.md

## Code style

Standard JS, no semicolons, 2-space indent.
