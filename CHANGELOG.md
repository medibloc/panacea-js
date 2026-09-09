# Changelog

## Unreleased

## [v2.3.2](https://github.com/medibloc/panacea-js/releases/tag/v2.3.2) - 2026-09-09

### Features

- Add HD wallet utilities for deriving a public branch xpub, deriving indexed
  Panacea addresses without private keys, and recreating the corresponding
  CosmJS wallet from a mnemonic.
- Support an optional BIP-39 passphrase while keeping the Panacea derivation
  path fixed at `m/44'/371'/0'/0/{index}`.

### Changed

- Add `@scure/bip32` v1.7.0 as an exact dependency for CommonJS-compatible
  BIP-32 public derivation.

## [v2.3.1](https://github.com/medibloc/panacea-js/releases/tag/v2.3.1) - 2026-08-21

### Changed

- Upgrade CosmJS from v0.32.3 to v0.34.1.
- Replace `secp256k1` with `@noble/curves`.
- Update runtime and transitive dependencies.

## [v2.3.0](https://github.com/medibloc/panacea-js/releases/tag/v2.3.0) - 2026-08-18

### Features

- Support Panacea Core v2.3.0 and CometBFT v0.38 RPC connections.
- Add Panacea NFT class, mint, transfer, revoke, burn, and query APIs.
- Vendor protobuf schemas from Panacea Core v2.3.0.

### Deprecated

- Legacy PNFT APIs are retained for Panacea Core v2.2.x compatibility. Panacea
  Core v2.3.0 removes PNFT queries and rejects legacy PNFT transactions; use
  the Panacea NFT APIs instead.

## [v2.2.1](https://github.com/medibloc/panacea-js/releases/tag/v2.2.1) - 2024-03-18

### Features

- Add offline signing and message creation APIs.
- Upgrade CosmJS to v0.32.3 and add PNFT support for Panacea Core v2.2.x.
- Publish the scoped `@medibloc/panacea-js` package with compiled TypeScript declarations.

## [v2.0.4](https://github.com/medibloc/panacea-js/releases/tag/v2.0.4) - 2023-07-05

### Features

- [\#71](https://github.com/medibloc/panacea-js/pull/71) feat: export jwt in index.ts

## [v2.0.3](https://github.com/medibloc/panacea-js/releases/tag/v2.0.3) - 2023-03-13

### Features

- [\#68](https://github.com/medibloc/panacea-js/pull/68) feat: add DID Auth in JWT

## [v2.0.2](https://github.com/medibloc/panacea-js/releases/tag/v2.0.2) - 2022-08-18

### Features

- [\#64](https://github.com/medibloc/panacea-js/pull/64) feat: implement a function to convert a mnemonic to a secp256k1 private key

## [v2.0.1](https://github.com/medibloc/panacea-js/releases/tag/v2.0.1) - 2022-06-03

### Features

- [\#60](https://github.com/medibloc/panacea-js/pull/60) feat: add explicit `fee` parameters

## [v2.0.0](https://github.com/medibloc/panacea-js/releases/tag/v2.0.0) - 2021-07-20

### Features

- [\#37](https://github.com/medibloc/panacea-js/pull/37) feat: Support Panacea v2 based on Cosmos v0.42 Stargate

## [v1.3.1](https://github.com/medibloc/panacea-js/releases/tag/v1.3.1) - 2020-11-25

### Bug fixes

- [\#24](https://github.com/medibloc/panacea-js/pull/24) Follow up the new Cosmos REST spec for DID operations

## [v1.3.0](https://github.com/medibloc/panacea-js/releases/tag/v1.3.0) - 2020-10-30

### Features

- [\#5](https://github.com/medibloc/panacea-js/pull/5)~[\#18](https://github.com/medibloc/panacea-js/pull/18) Support DID operations
- [\#11](https://github.com/medibloc/panacea-js/pull/11), [\#19](https://github.com/medibloc/panacea-js/pull/19) Switch to Typescript
- [\#22](https://github.com/medibloc/panacea-js/pull/22) Follow up the new Cosmos v0.36.0+ REST spec
