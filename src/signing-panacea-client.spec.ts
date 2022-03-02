import { panacead, pendingWithoutPanacead } from "./testutils";
import { panaceaWalletOpts, SigningPanaceaClient } from "./signing-panacea-client";
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { v4 as uuidv4 } from "uuid";
import { TextEncoder } from "util";
import Long from "long";
import { DIDDocument } from "./proto/panacea/did/v2/did";
import { isBroadcastTxSuccess } from "@cosmjs/stargate";
import { Secp256k1 } from "./crypto/secp256k1";
import { DidUtil } from "./did/util";
import assert from "assert";

describe("SigningPanaceaClient", () => {
  pendingWithoutPanacead();

  let wallet: DirectSecp256k1HdWallet;

  beforeAll(async () => {
    wallet = await DirectSecp256k1HdWallet.fromMnemonic(panacead.mnemonic, panaceaWalletOpts);
  });

  describe("connectWithSigner", () => {
    it("works", async () => {
      const client = await SigningPanaceaClient.connectWithSigner(panacead.tendermintUrl, wallet);
      expect(client).toBeTruthy();
      client.disconnect();
    });
  });

  describe("AOL", () => {
    let ownerAddress: string;
    let topicName: string;
    let client: SigningPanaceaClient;

    beforeAll(async () => {
      const [firstAccount] = await wallet.getAccounts();
      ownerAddress = firstAccount.address;
      topicName = uuidv4();
    });

    beforeEach(async () => {
      client = await SigningPanaceaClient.connectWithSigner(panacead.tendermintUrl, wallet);
    });

    afterEach(() => {
      client.disconnect();
    });

    describe("createTopic", () => {
      it("works", async () => {
        const res = await client.createTopic(ownerAddress, topicName, "description!", "memo!");
        expect(res).toBeTruthy();

        const topic = await client.getPanaceaClient().getTopic(ownerAddress, topicName);
        assert(topic);
        expect(topic.description).toEqual("description!");
      });
    });

    describe("addWriter", () => {
      it("works", async () => {
        const writerAddress = ownerAddress;
        const res = await client.addWriter(ownerAddress, topicName, writerAddress, "jack", "hello", "memo!");
        expect(res).toBeTruthy();

        const writer = await client.getPanaceaClient().getWriter(ownerAddress, topicName, writerAddress);
        assert(writer);
        expect(writer.moniker).toEqual("jack");
        expect(writer.description).toEqual("hello");
      });
    });

    describe("addRecord", () => {
      it("works", async () => {
        // In this test, writer == owner
        const writerAddress = ownerAddress;
        const writerWallet = wallet;

        const key = new TextEncoder().encode("key1");
        const value = new TextEncoder().encode("value1");

        const writerClient = await SigningPanaceaClient.connectWithSigner(panacead.tendermintUrl, writerWallet);

        const res = await writerClient.addRecord(ownerAddress, topicName, key, value, writerAddress, "memo!");
        expect(res).toBeTruthy();

        const record = await client.getPanaceaClient().getRecord(ownerAddress, topicName, Long.fromInt(0));
        assert(record);
        expect(record.writerAddress).toEqual(writerAddress);
        expect(record.key).toEqual(key);
        expect(record.value).toEqual(value);

        writerClient.disconnect();
      });
    });

    describe("deleteWriter", () => {
      it("works", async () => {
        const writerAddress = ownerAddress;
        const res = await client.deleteWriter(ownerAddress, topicName, writerAddress, "memo!");
        expect(res).toBeTruthy();

        const writer = await client.getPanaceaClient().getWriter(ownerAddress, topicName, writerAddress);
        expect(writer).toBeNull();
      });
    });
  });

  describe("DID", () => {
    let fromAddress: string;
    let client: SigningPanaceaClient;

    beforeAll(async () => {
      const [firstAccount] = await wallet.getAccounts();
      fromAddress = firstAccount.address;
    });

    beforeEach(async () => {
      client = await SigningPanaceaClient.connectWithSigner(panacead.tendermintUrl, wallet);
    });

    afterEach(() => {
      client.disconnect();
    });

    it("createDid", async () => {
      const privKey = Secp256k1.generatePrivateKey();
      const didDocument = generateDidDocument(privKey);
      const signature = DidUtil.signDidDocument(privKey, didDocument);

      const res = await client.createDid(didDocument, didDocument.verificationMethods[0].id, signature, fromAddress);
      expect(isBroadcastTxSuccess(res)).toBeTruthy();

      const didDocumentWithSeq = await client.getPanaceaClient().getDid(didDocument.id);
      assert(didDocumentWithSeq);
      expect(didDocumentWithSeq.document).toEqual(didDocument);
    });

    describe("mutateDid", () => {
      let privKey: Uint8Array;
      let didDocument: DIDDocument;

      beforeEach(async () => {
        privKey = Secp256k1.generatePrivateKey();
        didDocument = generateDidDocument(privKey);
        const signature = DidUtil.signDidDocument(privKey, didDocument);

        const res = await client.createDid(didDocument, didDocument.verificationMethods[0].id, signature, fromAddress);
        expect(isBroadcastTxSuccess(res)).toBeTruthy();
      });

      it("updateDid", async () => {
        didDocument.assertionMethods.push({
          verificationMethodId: didDocument.verificationMethods[0].id,
          verificationMethod: undefined,
        });
        const signature = DidUtil.signDidDocument(privKey, didDocument);

        const res = await client.updateDid(didDocument, didDocument.verificationMethods[0].id, signature, fromAddress);
        expect(isBroadcastTxSuccess(res)).toBeTruthy();

        const didDocumentWithSeq = await client.getPanaceaClient().getDid(didDocument.id);
        assert(didDocumentWithSeq);
        expect(didDocumentWithSeq.document).toEqual(didDocument);
      });

      it("deactivateDid", async () => {
        const signature = DidUtil.signDid(privKey, didDocument.id);

        const res = await client.deactivateDid(didDocument.id, didDocument.verificationMethods[0].id, signature, fromAddress);
        expect(isBroadcastTxSuccess(res)).toBeTruthy();

        const didDocumentWithSeq = await client.getPanaceaClient().getDid(didDocument.id);
        expect(didDocumentWithSeq).toBeNull();
      });
    });
  });

  // TODO: Market Test
});

// A test utility function
function generateDidDocument(privKey: Uint8Array): DIDDocument {
  const pubKeyCompressed = Secp256k1.getPublicKeyCompressed(privKey);

  const did = DidUtil.getDid(pubKeyCompressed);
  const verificationMethodId = `${did}#key1`;
  return {
    contexts: {
      values: ['https://www.w3.org/ns/did/v1'],
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
  
}