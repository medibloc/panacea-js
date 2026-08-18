import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { panacead } from "../utils/test-utils";
import {
  panaceaWalletOpts,
  SigningPanaceaClient,
} from '../client';
import { v4 } from "uuid";
import { PanaceaClient } from '../client';
import { Secp256k1 } from "../crypto";
import { DIDDocument } from "../proto/panacea/did/v2/did";
import { DidUtil } from "../did";
import { isDeliverTxSuccess } from "@cosmjs/stargate";
import assert from "assert";
import { TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import Long from "long";
import {
  BasicNFTData,
  LiveNFTStatus,
  TransferPolicy,
} from "../nft";

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
      console.log(`create topic. ownerAddress(${ownerAddress}), topicName(${topicName})`);
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
      console.log(`create topic success. ownerAddress(${ownerAddress}), topicName(${topicName})`);

      console.log(`add writer. ownerAddress(${ownerAddress}), writer(${ownerAddress}) topicName(${topicName})`);
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
      console.log(`add writer success. ownerAddress(${ownerAddress}), writer(${ownerAddress}) topicName(${topicName})`);

      const key = new TextEncoder().encode("key1");
      const value = new TextEncoder().encode("value1");

      console.log(`add record. ownerAddress(${ownerAddress}), writer(${ownerAddress}) topicName(${topicName}) key(${key.toString()}) value(${value.toString()})`);
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
      console.log(`add record success. ownerAddress(${ownerAddress}), writer(${ownerAddress}) topicName(${topicName}) key(${key.toString()}) value(${value.toString()})`);
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

      console.log(`create did. did(${didDocument.id}) verificationMethodId(${didDocument.verificationMethods[0].id})`);
      const createDidReq = {
        did: didDocument.id,
        document: didDocument,
        verificationMethodId: didDocument.verificationMethods[0].id,
        signature: signature,
        fromAddress: fromAddress,
      };
      let res = await client.createDid(createDidReq, "auto");
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
      console.log(`create did success. did(${didDocument.id}) verificationMethodId(${didDocument.verificationMethods[0].id})`);

      console.log(`update did. did(${didDocument.id}) verificationMethodId(${didDocument.verificationMethods[0].id})`);
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
      console.log(`update did success. did(${didDocument.id}) verificationMethodId(${didDocument.verificationMethods[0].id})`);
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

  describe("NFT", () => {
    let fromAddress: string;
    let toAddress: string;
    let client: SigningPanaceaClient;
    let toClient: SigningPanaceaClient;

    beforeAll(async () => {
      const [firstAccount] = await wallet.getAccounts();
      fromAddress = firstAccount.address;
      client = await SigningPanaceaClient.connectWithSigner(
        panacead.tendermintUrl,
        wallet,
      );
      const toWallet = await DirectSecp256k1HdWallet.generate(
        24,
        panaceaWalletOpts,
      );
      toAddress = (await toWallet.getAccounts())[0].address;
      toClient = await SigningPanaceaClient.connectWithSigner(
        panacead.tendermintUrl,
        toWallet,
      );

      const fundResult = await client.sendTokens(
        fromAddress,
        toAddress,
        [{ denom: "umed", amount: "5000000" }],
        "auto",
      );
      expect(isDeliverTxSuccess(fundResult)).toBeTruthy();
    });

    afterAll(() => {
      client.disconnect();
      toClient.disconnect();
    });

    it("creates, mints, transfers, revokes, and burns an NFT", async () => {
      const fee = client.createFee(500000);
      const suffix = v4().replace(/-/g, "");
      const localClassId = `sdk.${suffix}`;
      const classId = `${fromAddress}:${localClassId}`;
      const nftId = `certificate.${suffix}`;
      const metadata = BasicNFTData.create({
        name: "Certificate",
        description: "Panacea JS integration test",
        imageUri: "https://example.test/certificate.png",
      });
      const data = {
        typeUrl: "/panacea.nft.v1.BasicNFTData",
        value: BasicNFTData.encode(metadata).finish(),
      };

      let res = await client.createNftClass(
        {
          creator: fromAddress,
          localClassId,
          name: "SDK Certificate",
          symbol: "SDKCERT",
          description: "Panacea JS integration test class",
          uri: "https://example.test/class.json",
          uriHash: `sha256:${"a".repeat(64)}`,
          transferPolicy:
            TransferPolicy.TRANSFER_POLICY_OWNER_TRANSFERABLE,
          revocable: true,
          maxSupply: Long.fromInt(2, true),
        },
        fee,
      );
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      const classRecord = await client
        .getPanaceaClient()
        .getNftClassRecord(classId);
      expect(classRecord?.class?.id).toBe(classId);
      expect(classRecord?.policy?.controller).toBe(fromAddress);
      expect(classRecord?.policy?.transferPolicy).toBe(
        TransferPolicy.TRANSFER_POLICY_OWNER_TRANSFERABLE,
      );

      res = await client.mintNft(
        {
          classId,
          nftId,
          controller: fromAddress,
          recipient: fromAddress,
          uri: "https://example.test/certificate.json",
          uriHash: `sha256:${"b".repeat(64)}`,
          data,
        },
        fee,
      );
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      let record = await client.getPanaceaClient().getNftRecord(classId, nftId);
      expect(record?.live?.owner).toBe(fromAddress);
      expect(record?.live?.status).toBe(
        LiveNFTStatus.LIVE_NFT_STATUS_ACTIVE,
      );
      expect(BasicNFTData.decode(record!.live!.nft!.data!.value)).toEqual(
        metadata,
      );

      const records = await client
        .getPanaceaClient()
        .getNftRecords({ classId, owner: fromAddress });
      expect(records.nftRecords.map(({ nft }) => nft?.id)).toContain(nftId);

      res = await client.transferNft(
        { classId, id: nftId, sender: fromAddress, receiver: toAddress },
        fee,
      );
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      record = await client.getPanaceaClient().getNftRecord(classId, nftId);
      expect(record?.live?.owner).toBe(toAddress);

      res = await client.revokeNft(
        { classId, nftId, controller: fromAddress },
        fee,
      );
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      record = await client.getPanaceaClient().getNftRecord(classId, nftId);
      expect(record?.live?.status).toBe(
        LiveNFTStatus.LIVE_NFT_STATUS_REVOKED,
      );
      expect(record?.live?.revocation?.revokedBy).toBe(fromAddress);

      res = await toClient.burnNft(
        { classId, nftId, owner: toAddress },
        fee,
      );
      expect(isDeliverTxSuccess(res)).toBeTruthy();

      record = await client.getPanaceaClient().getNftRecord(classId, nftId);
      expect(record?.live).toBeUndefined();
      expect(record?.burnTombstone?.burnedBy).toBe(toAddress);
      expect(
        BasicNFTData.decode(record!.burnTombstone!.data!.value),
      ).toEqual(metadata);
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
