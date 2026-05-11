# Escluse CLI

Command-line interface for Escluse.

## Installation

```bash
npm install -g @escluse/cli
```

## Usage

```bash
# Login
escluse login

# List servers
escluse servers list

# Create server
escluse servers create --name my-server --game minecraft --image paper

# Start server
escluse servers start <server-id>

# Stop server
escluse servers stop <server-id>

# View logs
escluse servers logs <server-id>
```