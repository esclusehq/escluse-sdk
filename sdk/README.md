# @escluse/sdk

Official Escluse SDK for Node.js and browsers.

## Installation

```bash
npm install @escluse/sdk
```

## Usage

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

// Real-time logs
client.ws.connect();
client.ws.on('server.log', (data) => {
  console.log(data.message);
});
client.ws.subscribeToServer('server-id');
```

## Features

- TypeScript support
- REST API client
- WebSocket support with auto-reconnect
- Server management
- Node management
- User management
- Billing management
- Error handling

## License

MIT