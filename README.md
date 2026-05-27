# conversa-sdk

Node.js SDK for the [Conversa](https://conversa-platform-sdk.github.io) platform — team messaging with AI-generated channel summaries.

## Installation

```bash
npm install conversa-sdk
```

## Quick start

```js
const { createClient } = require('conversa-sdk');
require('dotenv').config();

const client = createClient(process.env.CONVERSA_API_KEY);

client.summarise('wildlife-elephants').then(summary => {
  console.log(summary);
});
```

## Documentation

Full setup guides are in the [`/docs`](https://conversa-platform-sdk.github.io/setup) directory:

- [Quick start](https://conversa-platform-sdk.github.io/setup)
- [Onboarding](https://conversa-platform-sdk.github.io/v3/onboarding)
- [CLI setup](https://conversa-platform-sdk.github.io/v3/cli)
- [Import projects](https://conversa-platform-sdk.github.io/v3/import)

## Development workflow

Before starting work, run the verifier to confirm API reachability and get
the active SDK version:

```bash
npm install
node verify.js
```

The verifier output (sdk version + API status) should be included in any
bug report or code review to help maintainers correlate issues with
specific deployments.

## Requirements

- Node.js 18 or later
- npm 9 or later

## API

### `createClient(apiKey)`

Returns a client instance configured with your API key.

### `client.summarise(channelId)`

Fetches and returns an AI-generated summary for the given channel. The summary respects the workspace's editorial style settings.

### `client.channels.list()`

Returns the list of channels the API key has access to.

### `getConfig()`

Reads the local SDK config from `~/.conversa/config.json`. Returns `null` if the CLI has not been initialised.

## Changelog

### 2.0.0
- Added workspace onboarding flow with git author attribution
- CLI installer writes global config to `~/.conversa/`
- Project importer for automatic channel creation from existing repos

### 1.0.6
- Fixed token refresh on 401
- Improved error messages for missing API key

### 1.0.0
- Initial release

## License

MIT
