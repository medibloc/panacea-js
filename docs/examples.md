# Examples

## Sending tokens

```ts
import { panaceaWalletOpts, SigningPanaceaClient } from "@medibloc/panacea-js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";

const mnemonic = "bulb rail ...";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, panaceaWalletOpts);
const [firstAccount] = await wallet.getAccounts();

const tendermintRpcEndpoint = "http://localhost:26657";
const client = await SigningPanaceaClient.connectWithSigner(tendermintRpcEndpoint, wallet);

const recipient = "panacea1e7hl0w63tankr6pefugk96wvr6s990z350t6xs";
const amount = {
  denom: "umed",
  amount: "123456789",
};
const fee = {
  amount: [{
    denom: "umed",
    amount: "1000000",
  }],
  gas: "200000",
};

// or, you can set the fee as "auto"
const result = await client.sendTokens(firstAccount.address, recipient, [amount], fee, "memo");
assertIsDeliverTxSuccess(result);
```

## Creating AOL topics and adding records

```ts
import { panaceaWalletOpts, SigningPanaceaClient } from "@medibloc/panacea-js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";
import { TextEncoder } from "util";
import Long from "long";

const mnemonic = "bulb rail ...";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, panaceaWalletOpts);
const [firstAccount] = await wallet.getAccounts();
console.log(firstAccount);

const tendermintRpcEndpoint = "http://localhost:26657";
const client = await SigningPanaceaClient.connectWithSigner(tendermintRpcEndpoint, wallet);

const topicName = "topic-1";

const createTopicReq = {
  ownerAddress: firstAccount.address,
  topicName: topicName,
  description: "description",
};
let result = await client.createTopic(createTopicReq, "auto", "memo");
assertIsDeliverTxSuccess(result);

const topic = await client.getPanaceaClient().getTopic(ownerAddress, topicName);
console.log(topic);

const addWriterReq = {
  ownerAddress: ownerAddress,
  writerAddress: ownerAddress,
  topicName: topicName,
  moniker: "moniker",
  description: "description",
};
result = await client.addWriter(addWriterReq, "auto", "memo");
assertIsDeliverTxSuccess(result);

const writer = await client.getPanaceaClient().getWriter(ownerAddress, topicName, writerAddress);
console.log(writer);

// Encode key and value as you want
const addRecordReq = {
  key: new TextEncoder().encode("key1"),
  value: new TextEncoder().encode("value1"),
  topicName: topicName,
  ownerAddress: ownerAddress,
  writerAddress: ownerAddress,
  feePayerAddress: "",
}
result = await client.addRecord(addRecordReq, "auto", "memo");
assertIsDeliverTxSuccess(result);

const record = await client.getPanaceaClient().getRecord(ownerAddress, topicName, Long.fromInt(0));
console.log(record);
```

If you want to use a `feePayerAddress` along with the `writerAddress`, please use the `GroupSigningPanaceaClient`.
```ts
import { GroupSigningPanaceaClient } from "@medibloc/panacea-js";

// Some lines were skipped ...

const feePayerWallet = await DirectSecp256k1HdWallet.fromMnemonic("...", panaceaWalletOpts);
const writerWallet = await DirectSecp256k1HdWallet.fromMnemonic("...", panaceaWalletOpts);

const tendermintRpcEndpoint = "http://localhost:26657";
const client = await GroupSigningPanaceaClient.connectWithSigner(tendermintRpcEndpoint, [feePayerWallet, writerWallet]);

const result = await client.addRecordWithFeePayer(ownerAddress, topicName, key, value, writerAddress, feePayerAddress, "auto", "");
```

## Creating DIDs

```ts
import { panaceaWalletOpts, SigningPanaceaClient, Secp256k1, DidUtil } from "@medibloc/panacea-js";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { assertIsDeliverTxSuccess } from "@cosmjs/stargate";

const mnemonic = "bulb rail ...";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, panaceaWalletOpts);
const [ firstAccount ] = await wallet.getAccounts();
console.log(firstAccount);

const tendermintRpcEndpoint = "http://localhost:26657";
const client = await SigningPanaceaClient.connectWithSigner(tendermintRpcEndpoint, wallet);

const privKey = Secp256k1.generatePrivateKey();
const pubKeyCompressed = Secp256k1.getPublicKeyCompressed(privKey);

const did = DidUtil.getDid(pubKeyCompressed);
const verificationMethodId = `${ did }#key1`;
const didDocument = {
    contexts: {
        values: [ 'https://www.w3.org/ns/did/v1' ],
    },
    id: did,
    controller: undefined,
    verificationMethods: [
        {
            id: verificationMethodId,
            type: 'EcdsaSecp256k1VerificationKey2019',
            controller: did,
            publicKeyBase58: DidUtil.getPublicKeyBase58(pubKeyCompressed),
        },
    ],
    authentications: [
        {
            verificationMethodId: verificationMethodId,
            verificationMethod: undefined,
        }
    ],
    assertionMethods: [],
    keyAgreements: [],
    capabilityInvocations: [],
    capabilityDelegations: [],
    services: [],
};

const signature = DidUtil.signDidDocument(privKey, didDocument);

const createDidReq = {
  did: didDocument.id,
  document: didDocument,
  verificationMethodId: didDocument.verificationMethods[0].id,
  signature: signature,
  fromAddress: firstAccount.address,
};

const result = await client.createDid(createDidReq, "auto");
assertIsDeliverTxSuccess(result);

const didDocumentWithSeq = await client.getPanaceaClient().getDid(didDocument.id);
console.log(didDocumentWithSeq);
```

## DID Authentication using JWT

### Issuing DID Auth JWT

```ts
import { Secp256k1, DidUtil, DidAuthJwt } from "@medibloc/panacea-js";

// First, prepare a private key and a DID document.
// This example assumes that you specify at least one 'authentication' method in the DID document as below.
const privKey = Secp256k1.generatePrivateKey();
const pubKeyCompressed = Secp256k1.getPublicKeyCompressed(privKey);
const did = DidUtil.getDid(pubKeyCompressed);
const verificationMethodId = `${ did }#key1`;
const didDocument = {
    contexts: {
        values: [ 'https://www.w3.org/ns/did/v1' ],
    },
    id: did,
    controller: undefined,
    verificationMethods: [
        {
            id: verificationMethodId,
            type: 'EcdsaSecp256k1VerificationKey2019',
            controller: did,
            publicKeyBase58: DidUtil.getPublicKeyBase58(pubKeyCompressed),
        },
    ],
    authentications: [
        {
            verificationMethodId: verificationMethodId,
            verificationMethod: undefined,
        }
    ],
    assertionMethods: [],
    keyAgreements: [],
    capabilityInvocations: [],
    capabilityDelegations: [],
    services: [],
};

const jwt = await DidAuthJwt.issue(
  didDocument.id,
  privKey,
  didDocument.authentications[0].verificationMethodId!, // You must use a method speicified in the 'authentications'
  "this is a challenge",
  3, // expirationSec
);
```

### Verifying DID Auth JWT

```ts
import { DidUtil, DidAuthJwt } from "@medibloc/panacea-js";

const jwt: string = "..."; // A JWT issued by a client

// This example assumes that you already retrieved a DID document from Panacea.
const didDocument = {
    contexts: {
        values: [ 'https://www.w3.org/ns/did/v1' ],
    },
    id: did,
    controller: undefined,
    verificationMethods: [
        {
            id: verificationMethodId,
            type: 'EcdsaSecp256k1VerificationKey2019',
            controller: did,
            publicKeyBase58: DidUtil.getPublicKeyBase58(pubKeyCompressed),
        },
    ],
    authentications: [
        {
            verificationMethodId: verificationMethodId,
            verificationMethod: undefined,
        }
    ],
    assertionMethods: [],
    keyAgreements: [],
    capabilityInvocations: [],
    capabilityDelegations: [],
    services: [],
};

await DidAuthJwt.verify(jwt, didDocument, "this is a challenge");
```

## Convert mnemonic to Secp256k1 privateKey

```ts
import { Secp256k1 as CryptoSecp256k1, stringToPath } from "@cosmjs/crypto";
import { Secp256k1 } from "@medibloc/panacea-js";

const mnemonic = "bulb rail ...";
const hdPath = stringToPath("m/44'/371'/0'/0/0");

const privateKey = await Secp256k1.parseMnemonicToPrivateKey(mnemonic, hdPath);
const {pubkey} = await CryptoSecp256k1.makeKeypair(privateKey);
```

### Pnft

```ts
const mnemonic = "bulb rail ...";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, panaceaWalletOpts);
const [ firstAccount ] = await wallet.getAccounts();
console.log(firstAccount);
const fromAddress = firstAccount.address;

const tendermintRpcEndpoint = "http://localhost:26657";
const client = await SigningPanaceaClient.connectWithSigner(tendermintRpcEndpoint, wallet);

const createDenomReq = {
  id: denomId,
  name: "medibloc test create denom",
  symbol: "medibloc",
  description: "medibloc denom description",
  data: "no data",
  creator: fromAddress,
};
let res = await client.createDenom(createDenomReq, fee);
console.log(res)

let denom = await client.getPanaceaClient().getDenom(denomId);
console.log(denom);

const updateDenomReq = {
  id: denomId,
  name: "mediboc test update denom",
  symbol: "medibloc limited",
  description: "change denom test",
  uri: "medibloc uri",
  uriHash: "medibloc uri hash",
  data: "clean",
  updater: fromAddress,
};
res = await client.updateDenom(updateDenomReq, fee);
console.log(res);

denom = await client.getPanaceaClient().getDenom(denomId);
console.log(denom);

const pnftId = v4();
const firstPnftReq = {
  denomId: denomId,
  id: pnftId,
  name: "medibloc test nft",
  description: "This is medibloc first nft",
  data: "no data",
  creator: fromAddress,
};
res = await client.mintPNFT(firstPnftReq, fee);
console.log(res);

let pnft = await client.getPanaceaClient().getPnft(denomId, pnftId);
console.log(pnft);

const transferPnftReq = {
  denomId: denomId,
  id: pnftId,
  sender: fromAddress,
  receiver: toAddress,
};
res = await client.transferPNFT(transferPnftReq, fee);
console.log(res);

pnft = await client.getPanaceaClient().getPnft(denomId, pnftId);
console.log(pnft);

////////////////////// Burn Pnft////////////////////////

const secondPNftReq = {
  denomId: denomId,
  id: v4(),
  name: "medibloc test nft",
  description: "This is medibloc first nft",
  data: "no data",
  creator: fromAddress,
};
res = await client.mintPNFT(secondPNftReq, fee);
console.log(res);

const burnPnftReq = {
  denomId: denomId,
  id: secondPNftReq.id,
  burner: fromAddress,
};

res = await client.burnPNFT(burnPnftReq, fee);
console.log(res);

pnft = await client.getPanaceaClient().getPnft(denomId, secondPNftReq.id);
console.log(pnft);
```
