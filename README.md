# Escluse Packages

Monorepo for Escluse SDKs, shared types, and tools.

## Structure

```
packages/
├── openapi/           # OpenAPI specification (source of truth)
│   └── openapi.yaml
├── types/             # Shared TypeScript types
│   └── src/
│       ├── auth.ts
│       ├── server.ts
│       ├── node.ts
│       ├── billing.ts
│       ├── websocket.ts
│       └── common.ts
├── sdk/               # Node.js SDK (@escluse/sdk)
│   └── src/
│       ├── client.ts
│       ├── config/
│       ├── resources/   # servers, nodes, users, billing
│       ├── websocket/
│       ├── errors/
│       └── utils/
├── sdk-python/        # Python SDK (escluse)
│   └── escluse/
│       ├── client.py
│       ├── config.py
│       ├── resources/   # servers, nodes, users, billing
│       ├── websocket/
│       ├── exceptions.py
│       └── types/
├── cli/               # CLI tool (@escluse/cli)
│   └── src/
│       └── index.ts
```

## Development

```bash
cd packages
npm install

# Build all TypeScript packages
npm run build

# Typecheck all packages
npm run typecheck

# Lint all packages
npm run lint
```

## Architecture

```
┌─────────────────────────────────────────────┐
│            OpenAPI Specification            │
│              (openapi.yaml)                │
└──────────────────┬──────────────────────────┘
                   │
                   ▼ Type Generation
┌─────────────────────────────────────────────┐
│              @escluse/types                 │
│        (Shared TypeScript types)            │
└──────────────────┬──────────────────────────┘
                   │
           ┌───────┴───────┐
           ▼               ▼
    ┌────────────┐  ┌──────────────┐
    │ @escluse/sdk│  │   escluse    │
    │  (Node.js)  │  │   (Python)   │
    └────────────┘  └──────────────┘
           │
           ▼
    ┌────────────┐
    │ @escluse/cli│
    │     (CLI)   │
    └────────────┘
```

## Source of Truth

OpenAPI spec (`openapi.yaml`) adalah source of truth untuk:
1. API documentation
2. TypeScript types generation
3. Python types generation
4. SDK code generation (future)

## Publishing

```bash
# Publish types
cd packages/types && npm publish --access public

# Publish Node.js SDK
cd packages/sdk && npm publish --access public

# Publish Python SDK
cd packages/sdk-python
pip install build twine
python -m build
python -m twine upload --repository pypi dist/*

# Publish CLI
cd packages/cli && npm publish --access public
```

## License

MIT