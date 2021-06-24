import { panacead, pendingWithoutPanacead } from "./testutils";
import { panaceaWalletOpts, SigningPanaceaClient } from "./signing-panacea-client";
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { v4 as uuidv4 } from "uuid";
import { TextEncoder } from "util";
import Long from "long";

describe("SigningPanaceaClient", () => {
  pendingWithoutPanacead();

  let wallet: DirectSecp256k1HdWallet;

  beforeAll(async () => {
    wallet = await DirectSecp256k1HdWallet.fromMnemonic(panacead.genesisAccountMnemonic, panaceaWalletOpts);
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
        expect(topic.description).toEqual("description!");
      });
    });

    describe("addWriter", () => {
      it("works", async () => {
        const writerAddress = ownerAddress;
        const res = await client.addWriter(ownerAddress, topicName, writerAddress, "jack", "hello", "memo!");
        expect(res).toBeTruthy();

        const writer = await client.getPanaceaClient().getWriter(ownerAddress, topicName, writerAddress);
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
});
