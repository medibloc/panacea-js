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

const ownerAddress = firstAccount.address;
const topicName = "topic-1"
let result = await client.createTopic(ownerAddress, topicName, "description", "auto", "memo");
assertIsDeliverTxSuccess(result);

const topic = await client.getPanaceaClient().getTopic(ownerAddress, topicName);
console.log(topic);

const writerAddress = ownerAddress;
result = await client.addWriter(ownerAddress, topicName, writerAddress, "moniker", "description", "auto", "memo");
assertIsDeliverTxSuccess(result);

const writer = await client.getPanaceaClient().getWriter(ownerAddress, topicName, writerAddress);
console.log(writer);

// Encode key and value as you want
const key = new TextEncoder().encode("key1");
const value = new TextEncoder().encode("value1");
result = await client.addRecord(ownerAddress, topicName, key, value, writerAddress, "auto", "memo");
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

const result = await client.createDid(didDocument, verificationMethodId, signature, firstAccount.address, "auto");
assertIsDeliverTxSuccess(result);

const didDocumentWithSeq = await client.getPanaceaClient().getDid(didDocument.id);
console.log(didDocumentWithSeq);
```

## Convert mnemonic to Secp256k1 privateKey

```ts
import {Secp256k1 as CryptoSecp256k1, stringToPath, sha256} from "@cosmjs/crypto";
import {panacead} from "../testutils";
import {TextEncoder} from "util";
import {Secp256k1} from "./secp256k1";

const body = "testBody";
const hashedBody = sha256(new TextEncoder().encode(body));
const mnemonic = "bulb rail ...";
const hdPath = stringToPath("m/44'/371'/0'/0/0");

const privateKey = await Secp256k1.parseMnemonicToPrivateKey(panacead.mnemonic, hdPath);
const {pubkey} = await CryptoSecp256k1.makeKeypair(privateKey);

const signature = await CryptoSecp256k1.createSignature(hashedBody, privateKey)
console.log(CryptoSecp256k1.verifySignature(signature, hashedBody, pubkey))
```