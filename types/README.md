# @escluse/types

Shared TypeScript types for Escluse packages.

## Installation

```bash
npm install @escluse/types
```

## Usage

```typescript
import type { Server, Node, User, Subscription } from '@escluse/types';
```

## Structure

```
src/
├── index.ts       # Main exports
├── auth.ts        # Auth types (User, ApiKey, Tokens)
├── server.ts      # Server types (Server, ServerStats, Backup)
├── node.ts        # Node types (Node, NodeStats, Allocation)
├── billing.ts     # Billing types (Subscription, Plan, Invoice)
├── websocket.ts   # WebSocket types (events, messages)
└── common.ts      # Common types (ApiResponse, Pagination)
```

## Build

```bash
npm run build
```