import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { panacead } from "./utils/test-utils";
import {
  panaceaWalletOpts,
  SigningPanaceaClient,
} from "../client/signing-panacea-client";
import { v4 } from "uuid";
import { PanaceaClient } from "../client/panacea-client";
import { Secp256k1 } from "../crypto";
import { DIDDocument } from "../proto/panacea/did/v2/did";
import { DidUtil } from "../did";
import { isDeliverTxSuccess } from "@cosmjs/stargate";
import assert from "assert";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";

jest.setTimeout(60000);

describe("", () => {
  let wallet: DirectSecp256k1HdWallet;

  beforeAll(async () => {
    wallet = await DirectSecp256k1HdWallet.fromMnemonic(
      panacead.mnemonic,
      panaceaWalletOpts,
    );
  });

  describe("AOL", () => {
    let ownerAddress: string;
    let topicName: string;
    let client: SigningPanaceaClient;

    beforeAll(async () => {
      const [firstAccount] = await wallet.getAccounts();
      ownerAddress = firstAccount.address;

      topicName = v4();
      client = await SigningPanaceaClient.connectWithSigner(
        panacead.tendermintUrl,
        wallet,
      );
    });

    afterAll(() => {
      client.disconnect();
    });

    it("All aol test", async () => {
      const createTopicReq = {
        ownerAddress: ownerAddress,
        topicName: topicName,
        description: "description!",
      };
      const createTopicRes = await client.createTopic(
        createTopicReq,
        client.createFee(200000),
        "memo!",
      );
      expect(createTopicRes).toBeTruthy();

      let topic = await client
        .getPanaceaClient()
        .getTopic(ownerAddress, topicName);
      expect(topic).toBeTruthy();
      expect(createTopicReq.description).toBe(topic?.description);
      expect(0).toBe(topic?.totalWriters.toNumber());
      expect(0).toBe(topic?.totalRecords.toNumber());

      const addWriterReq = {
        ownerAddress: ownerAddress,
        writerAddress: ownerAddress,
        topicName: topicName,
        moniker: "moniker",
        description: "my description",
      };
      const addWriterRes = await client.addWriter(
        addWriterReq,
        client.createFee(200000),
        "memo!",
      );
      expect(addWriterRes).toBeTruthy();

      topic = await client.getPanaceaClient().getTopic(ownerAddress, topicName);
      expect(topic).toBeTruthy();
      expect(createTopicReq.description).toBe(topic?.description);
      expect(1).toBe(topic?.totalWriters.toNumber());
      expect(0).toBe(topic?.totalRecords.toNumber());
      const writer = await client
        .getPanaceaClient()
        .getWriter(ownerAddress, topicName, ownerAddress);
      expect(addWriterReq.moniker).toBe(writer?.moniker);
      expect(addWriterReq.description).toBe(writer?.description);

      const key = new TextEncoder().encode("key1");
      const value = new TextEncoder().encode("value1");
      const addRecordRes = await client.addRecord(
        {
          key: key,
          value: value,
          topicName: topicName,
          ownerAddress: ownerAddress,
          writerAddress: ownerAddress,
          feePayerAddress: "",
        },
        client.createFee(200000),
        "memo!",
      );
      expect(addRecordRes).toBeTruthy();

      topic = await client.getPanaceaClient().getTopic(ownerAddress, topicName);
      expect(topic).toBeTruthy();
      expect(createTopicReq.description).toBe(topic?.description);
      expect(1).toBe(topic?.totalWriters.toNumber());
      expect(1).toBe(topic?.totalRecords.toNumber());

      const record = await client
        .getPanaceaClient()
        .getRecord(ownerAddress, topicName, 0);
      expect(record?.key.toString()).toBe(key.toString());
      expect(record?.value.toString()).toBe(value.toString());
      expect(record?.writerAddress).toBe(ownerAddress);
    });
  });

  describe("DID", () => {
    let fromAddress: string;
    let client: SigningPanaceaClient;
    let queryClient: PanaceaClient;
    let offlineClient: SigningPanaceaClient;

    beforeAll(async () => {
      const [firstAccount] = await wallet.getAccounts();
      fromAddress = firstAccount.address;
      client = await SigningPanaceaClient.connectWithSigner(
        panacead.tendermintUrl,
        wallet,
      );
      queryClient = await PanaceaClient.connect(panacead.tendermintUrl);
      offlineClient = await SigningPanaceaClient.offline(wallet);
    });

    afterEach(() => {
      client.disconnect();
    });

    it("All did test", async () => {
      const privKey = Secp256k1.generatePrivateKey();
      const didDocument = generateDidDocument(privKey);
      let signature = DidUtil.signDidDocument(privKey, didDocument);

      const createDidReq = {
        did: didDocument.id,
        document: didDocument,
        verificationMethodId: didDocument.verificationMethods[0].id,
        signature: signature,
        fromAddress: fromAddress,
      };
      let res = await client.createDid(createDidReq, "auto");
      console.log("create", res);
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      let getDIDDocumentWithSeq = await client
        .getPanaceaClient()
        .getDid(didDocument.id);
      assert(getDIDDocumentWithSeq);
      expect(getDIDDocumentWithSeq.document).toEqual(didDocument);

      didDocument.assertionMethods.push({
        verificationMethodId: didDocument.verificationMethods[0].id,
        verificationMethod: undefined,
      });
      signature = DidUtil.signDidDocument(
        privKey,
        didDocument,
        getDIDDocumentWithSeq.sequence,
      );

      const updateDidReq = {
        did: didDocument.id,
        document: didDocument,
        verificationMethodId: didDocument.verificationMethods[0].id,
        signature: signature,
        fromAddress: fromAddress,
      };
      res = await client.updateDid(updateDidReq, "auto");
      console.log("update", res);
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      getDIDDocumentWithSeq = await client
        .getPanaceaClient()
        .getDid(didDocument.id);
      console.log(getDIDDocumentWithSeq?.document?.verificationMethods);
      console.log(getDIDDocumentWithSeq?.sequence.toNumber());
      assert(getDIDDocumentWithSeq);
      expect(getDIDDocumentWithSeq.document).toEqual(didDocument);
    });

    it("create DID with offline signer", async () => {
      const privKey = Secp256k1.generatePrivateKey();
      const didDocument = generateDidDocument(privKey);
      const signature = DidUtil.signDidDocument(privKey, didDocument);
      const address = (await wallet.getAccounts())[0].address;

      const account = await queryClient.getAccount(address);
      expect(account).toBeTruthy();

      const createDidReq = {
        did: didDocument.id,
        document: didDocument,
        verificationMethodId: didDocument.verificationMethods[0].id,
        signature: signature,
        fromAddress: fromAddress,
      };

      const msg = {
        typeUrl: SigningPanaceaClient.msgTypeCreateDid,
        value: createDidReq,
      };

      const signerData = {
        accountNumber: account!.accountNumber,
        sequence: account!.sequence,
        chainId: await queryClient.getChainId(),
      };

      const fee = offlineClient.createFee(200000); // 5umed * 200000 = 1000000umed(1MED)
      const memo = "This is memo.";

      const txRaw = await offlineClient.sign(
        address,
        [msg],
        fee,
        memo,
        signerData,
      );
      const txBytes = TxRaw.encode(txRaw).finish();

      const res = await client.broadcastTx(txBytes, 300, 8000);
      expect(isDeliverTxSuccess(res)).toBeTruthy();
    });
  });

  describe("Pnft", () => {
    let fromAddress: string;
    let toAddress: string;
    let client: SigningPanaceaClient;

    beforeAll(async () => {
      const [firstAccount] = await wallet.getAccounts();
      fromAddress = firstAccount.address;
      client = await SigningPanaceaClient.connectWithSigner(
        panacead.tendermintUrl,
        wallet,
      );
      toAddress = (
        await (
          await DirectSecp256k1HdWallet.generate(24, panaceaWalletOpts)
        ).getAccounts()
      )[0].address;
    });

    afterEach(() => {
      client.disconnect();
    });

    it("All pnft test", async () => {
      const fee = client.createFee(200000);
      const denomId = v4();

      const createDenomReq = {
        id: denomId,
        name: "medibloc test create denom",
        symbol: "medibloc",
        description: "medibloc denom description",
        data: "no data",
        creator: fromAddress,
      };
      let res = await client.createDenom(createDenomReq, fee);
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      let denom = await client.getPanaceaClient().getDenom(denomId);
      expect(denom).toBeTruthy();
      expect(denom!.id).toBe(createDenomReq.id);
      expect(denom!.name).toBe(createDenomReq.name);
      expect(denom!.symbol).toBe(createDenomReq.symbol);
      expect(denom!.description).toBe(createDenomReq.description);
      expect(denom!.data).toBe(createDenomReq.data);
      expect(denom!.uri).toBe("");
      expect(denom!.uriHash).toBe("");
      expect(denom!.owner).toBe(fromAddress);

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
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      denom = await client.getPanaceaClient().getDenom(denomId);
      expect(denom).toBeTruthy();
      expect(denom!.id).toBe(updateDenomReq.id);
      expect(denom!.name).toBe(updateDenomReq.name);
      expect(denom!.symbol).toBe(updateDenomReq.symbol);
      expect(denom!.description).toBe(updateDenomReq.description);
      expect(denom!.data).toBe(updateDenomReq.data);
      expect(denom!.uri).toBe(updateDenomReq.uri);
      expect(denom!.uriHash).toBe(updateDenomReq.uriHash);
      expect(denom!.owner).toBe(fromAddress);

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
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      let pnft = await client.getPanaceaClient().getPnft(denomId, pnftId);
      expect(pnft).toBeTruthy();
      expect(pnft!.denomId).toBe(firstPnftReq.denomId);
      expect(pnft!.id).toBe(firstPnftReq.id);
      expect(pnft!.name).toBe(firstPnftReq.name);
      expect(pnft!.description).toBe(firstPnftReq.description);
      expect(pnft!.data).toBe(firstPnftReq.data);
      expect(pnft!.uri).toBe("");
      expect(pnft!.uriHash).toBe("");
      expect(pnft!.creator).toBe(fromAddress);
      expect(pnft!.owner).toBe(fromAddress);

      const transferPnftReq = {
        denomId: denomId,
        id: pnftId,
        sender: fromAddress,
        receiver: toAddress,
      };
      res = await client.transferPNFT(transferPnftReq, fee);
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      pnft = await client.getPanaceaClient().getPnft(denomId, pnftId);
      expect(pnft).toBeTruthy();
      expect(pnft!.denomId).toBe(firstPnftReq.denomId);
      expect(pnft!.id).toBe(firstPnftReq.id);
      expect(pnft!.name).toBe(firstPnftReq.name);
      expect(pnft!.description).toBe(firstPnftReq.description);
      expect(pnft!.data).toBe(firstPnftReq.data);
      expect(pnft!.uri).toBe("");
      expect(pnft!.uriHash).toBe("");
      expect(pnft!.creator).toBe(fromAddress);
      expect(pnft!.owner).toBe(toAddress);

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
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      const burnPnftReq = {
        denomId: denomId,
        id: secondPNftReq.id,
        burner: fromAddress,
      };

      res = await client.burnPNFT(burnPnftReq, fee);
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      pnft = await client.getPanaceaClient().getPnft(denomId, secondPNftReq.id);
      expect(pnft).toBeUndefined();
    });
  });
});

// A test utility function
function generateDidDocument(privKey: Uint8Array): DIDDocument {
  const pubKeyCompressed = Secp256k1.getPublicKeyCompressed(privKey);

  const did = DidUtil.getDid(pubKeyCompressed);
  const verificationMethodId = `${did}#key1`;
  return {
    contexts: {
      values: ["https://www.w3.org/ns/did/v1"],
    },
    id: did,
    controller: undefined,
    verificationMethods: [
      {
        id: verificationMethodId,
        type: "EcdsaSecp256k1VerificationKey2019",
        controller: did,
        publicKeyBase58: DidUtil.getPublicKeyBase58(pubKeyCompressed),
      },
    ],
    authentications: [
      {
        verificationMethodId: verificationMethodId,
        verificationMethod: undefined,
      },
    ],
    assertionMethods: [],
    keyAgreements: [],
    capabilityInvocations: [],
    capabilityDelegations: [],
    services: [],
  };
}
