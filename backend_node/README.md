# Node.js Backend for Serialization Bakeoff

This is a Node.js implementation of the serialization bakeoff backend service.

## Setup

```bash
# Install dependencies
npm install
```

## Running the Server

```bash
# Start the server
npm start
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

## Performance

This Node.js implementation allows for comparing serialization performance between Node.js and Rust implementations.