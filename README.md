# Panacea JavaScript SDK

`panacea-js` is the official [Panacea](https://github.com/medibloc/panacea-core) JavaScript SDK written in TypeScript and powered by [CosmJS](https://github.com/cosmos/cosmjs).

It extends CosmJS with [Panacea-specific features](https://github.com/medibloc/panacea-core#key-features), including AOL, DID, and NFT, while retaining standard CosmJS APIs such as `connectWithSigner` and `sendTokens`.

Panacea JS 2.3.x targets Panacea Core 2.3.x. Legacy PNFT APIs remain available only for clients that connect to Panacea Core 2.2.x.

## Usage

### Installation

```bash
yarn add @medibloc/panacea-js \
  @cosmjs/proto-signing@0.34.1 \
  @cosmjs/stargate@0.34.1 \
  cosmjs-types@0.9.0
```

### Examples

See [docs/examples.md](docs/examples.md) for usage examples.

### HD wallet utilities

The SDK can generate a branch xpub offline, derive indexed Panacea addresses
on a server without private keys, and recreate the matching CosmJS wallet when
the mnemonic is available. The fixed address path is
`m/44'/371'/0'/0/{index}`. See the
[HD wallet example](docs/examples.md#deriving-customer-addresses-without-private-keys).

## Development

Install dependencies and build the project.

```bash
corepack yarn install --frozen-lockfile
yarn build
```

Run lint and unit tests.

```bash
yarn lint
yarn test
```

### Integration tests

Start a disposable Panacea Core v2.3.0 node with RPC exposed on port `26657`. The container image is `ghcr.io/medibloc/panacea-core:v2.3.0`. The account derived from `MNEMONIC` must exist on the local chain and have enough `umed` to pay transaction fees.

Run the integration tests against that node.

```bash
PANACEAD_ENABLED=true \
TENDERMINT_URL="http://localhost:26657" \
CHAIN_ID="chain-1" \
MNEMONIC="..." \
yarn test
```

Integration tests submit transactions. Do not point them at a production network or use a production mnemonic.

## License

[Apache-2.0 License](LICENSE)
