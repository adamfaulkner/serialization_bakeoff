# TypeScript Node.js Backend for Serialization Bakeoff

This is a TypeScript implementation of the serialization bakeoff backend service.

## Setup

```bash
# Install dependencies
npm install

# Build the TypeScript code
npm run build
```

## Development

```bash
# Start in watch mode (auto-rebuilds on changes)
npm run watch

# Run the server with auto-restart on changes
npm run dev
```

## Running the Server

```bash
# Build and start the server
npm run build && npm start
```

The server will start on port 3001 (https://localhost:3001) to avoid conflicts with the Rust backend on port 3000.

## Available Endpoints

- `/json` - JSON serialization
- `/msgpack` - MessagePack serialization
- `/cbor` - CBOR serialization
- `/proto` - Protocol Buffers serialization
- `/avro` - Avro serialization

The following endpoints are placeholders and not yet implemented:
- `/bebop` - Bebop serialization (not implemented)
- `/capnp` - Cap'n Proto serialization (not implemented)
- `/flatbuffers` - FlatBuffers serialization (not implemented)

## Features

- Loads the same CSV dataset as the Rust backend
- Provides serialization timing measurements via the `X-Encode-Duration` header
- Supports compression (when `X-Zstd-Enabled: true` header is provided)
- Implements HTTPS with the same self-signed certificates

## Build System

- Uses esbuild for fast bundling
- TypeScript for type safety
- Outputs ESM modules for Node.js