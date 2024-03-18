# Panacea Javascript SDK

The `panacea-js` is the official [Panacea](https://github.com/medibloc/panacea-core) Javascript SDK written in Typescript, powered by [CosmJS](https://github.com/cosmos/cosmjs).

The `panacea-js` extends the CosmJS in order to provide [Panacea-specific features](https://github.com/medibloc/panacea-core#key-features) (AOL, DID, PNFT).
So, it exposes CosmJS basic functions as they are, such as `connectWithSigner` and `sendTokens`.

## Usage

### Installation

```bash
yarn add @medibloc/panacea-js \
  @cosmjs/proto-signing@0.32.3 \
  @cosmjs/stargate@0.32.3 \
  cosmjs-types@0.9.0
```

### Examples

A list of examples can be found at the [example.md](docs/examples.md).

## Contribution

Install dependencies and build the project.
```bash
yarn install
yarn build
```

To run simple unit tests,
```bash
yarn test
````

To run integration tests with [panacea-core](https://github.com/medibloc/panacea-core), start a `panacea-core` daemon first.
```bash
docker run --rm -d \
  -e CHAIN_ID="chain-1" \
  -e MNEMONIC="..." \
  -p 26657:26657 \
  -v $(pwd)/scripts:/root/scripts \
  --name core \
  ghcr.io/medibloc/panacea-core:v2.2.0 \
  bash /root/scripts/panacea-core/init.sh
```

Then, the integration tests can be run with the following environment variables.
```bash
PANACEAD_ENABLED=true \
TENDERMINT_URL="http://localhost:26657" \
CHAIN_ID="chain-1" \
MNEMONIC="..." \
yarn test
```

For more details, please see the [CI script](.github/workflows/ci.yml).

## License

[Apache-2.0 License](LICENSE)
