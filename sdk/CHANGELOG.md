# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-05-12

### Added
- Initial SDK release
- TypeScript support
- REST API client with full resource coverage (servers, nodes, users, billing)
- WebSocket support with auto-reconnect
- Server management (create, start, stop, restart, delete)
- Node management for multi-server orchestration
- User management endpoints
- Billing management endpoints
- Comprehensive error handling with custom error types
- Configuration module for API key and endpoint setup

### Features
- Full TypeScript definitions
- REST API client
- WebSocket real-time events
- Server management
- Node management
- User management
- Billing management
- Error handling with custom error types

### Dependencies
- `undici` - HTTP client
- `ws` - WebSocket client
- `zod` - Runtime validation
- `typescript` - TypeScript support