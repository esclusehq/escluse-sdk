# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-05-12

### Added

- `@escluse/sdk` v0.1.0 initial release
- TypeScript support with full type definitions
- REST API client covering all major resources

#### Resources
- **ServersResource** — List, get, create, update, delete, start, stop, restart servers
- **NodesResource** — Node management for multi-server orchestration
- **UsersResource** — User account management
- **BillingResource** — Subscription and billing endpoints
- **WebSocketClient** — Real-time event streaming with auto-reconnect

#### Features
- Unified `EscluseClient` API entry point
- Workspace dependency on `@escluse/types`
- `tsup` for bundling (CommonJS + ESM output)
- Vitest for unit testing
- ESLint for code linting

### Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@escluse/types` | workspace:* | Shared TypeScript types |
| `tsup` | ^8.0.0 | Build tool |
| `typescript` | ^5.3.0 | TypeScript support |
| `vitest` | ^1.0.0 | Testing framework |

### Installation

```bash
npm install @escluse/sdk
```

### Usage

```typescript
import EscluseClient from '@escluse/sdk';

const client = new EscluseClient({ apiKey: 'your-api-key' });

// List servers
const { data: servers } = await client.servers.list();

// Create a server
const server = await client.servers.create({
  name: 'my-server',
  nodeId: 'node-123',
  game: 'minecraft',
  image: 'paper',
  memory: 2048,
  cpu: 2,
  disk: 10240,
});

// Start server
await client.servers.start(server.data.id);

// Real-time logs via WebSocket
client.ws.connect();
client.ws.on('server.log', (data) => {
  console.log(data.message);
});
client.ws.subscribeToServer('server-id');
```

### Exported Modules

```typescript
// Main client
export { default as EscluseClient } from './index';

// Config
export type { EscluseConfig } from './config';

// Resources
export { ServersResource, NodesResource, UsersResource, BillingResource } from './resources';

// WebSocket
export { WebSocketClient } from './websocket/client';

// Errors
export * from './errors';

// Types
export * from '@escluse/types';
```

### License

MIT