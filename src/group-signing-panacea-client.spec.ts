import { panacead, pendingWithoutPanacead } from "./testutils";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { panaceaWalletOpts, SigningPanaceaClient } from "./signing-panacea-client";
import { GroupSigningPanaceaClient } from "./group-signing-panacea-client";
import { v4 as uuidv4 } from "uuid";
import { TextEncoder } from "util";
import Long from "long";
import { Secp256k1HdWallet } from "@cosmjs/amino";

describe("GroupSigningPanaceaClient", () => {
  pendingWithoutPanacead();

  let ownerWallet: DirectSecp256k1HdWallet;
  let writerWallet: DirectSecp256k1HdWallet;
  let feePayerWallet: DirectSecp256k1HdWallet;

  beforeAll(async () => {
    ownerWallet = await DirectSecp256k1HdWallet.fromMnemonic(panacead.genesisAccountMnemonic, panaceaWalletOpts);
    writerWallet = await DirectSecp256k1HdWallet.generate(24, panaceaWalletOpts);
    feePayerWallet = await DirectSecp256k1HdWallet.fromMnemonic(panacead.genesisAccountMnemonic, panaceaWalletOpts);
  });

  describe("connectWithSigners", () => {
    it("works", async () => {
      const client = await GroupSigningPanaceaClient.connectWithSigners(panacead.tendermintUrl, [feePayerWallet, writerWallet]);
      expect(client).toBeTruthy();
      client.disconnect();
    });

    it("doesn't work without signer", async () => {
      const fn = async () => {
        await GroupSigningPanaceaClient.connectWithSigners(panacead.tendermintUrl, []);
      }

      await expect(fn()).rejects.toThrow(Error);
    });

    it("doesn't work with OfflineAminoSigner", async () => {
      const wallet = await Secp256k1HdWallet.generate(24, panaceaWalletOpts);
      const fn = async () => {
        await GroupSigningPanaceaClient.connectWithSigners(panacead.tendermintUrl, [wallet]);
      }

      await expect(fn()).rejects.toThrow(Error);
    });
  });

  describe("AOL", () => {
    let ownerAddress: string;
    let writerAddress: string;
    let feePayerAddress: string;
    let topicName: string;

    beforeAll(async () => {
      const [firstOwnerAccount] = await ownerWallet.getAccounts();
      ownerAddress = firstOwnerAccount.address;
      const [firstWriterAccount] = await writerWallet.getAccounts();
      writerAddress = firstWriterAccount.address;
      const [firstFeePayerAccount] = await feePayerWallet.getAccounts();
      feePayerAddress = firstFeePayerAccount.address;

      const client = await SigningPanaceaClient.connectWithSigner(panacead.tendermintUrl, ownerWallet);
      const amount = {
        denom: "umed",
        amount: "5000000",
      }
      const res = await client.sendTokens(ownerAddress, writerAddress, [amount])
      expect(res).toBeTruthy();

      topicName = uuidv4();
    });

    describe("addRecord", () => {
      beforeAll(async () => {
        const client = await SigningPanaceaClient.connectWithSigner(panacead.tendermintUrl, ownerWallet);

        let res = await client.createTopic(ownerAddress, topicName, "", "");
        expect(res).toBeTruthy();

        res = await client.addWriter(ownerAddress, topicName, writerAddress, "", "", "");
        expect(res).toBeTruthy();

        client.disconnect();
      });

      it("works with a fee payer", async () => {
        const client = await GroupSigningPanaceaClient.connectWithSigners(panacead.tendermintUrl, [feePayerWallet, writerWallet]);

        const key = new TextEncoder().encode("key1");
        const value = new TextEncoder().encode("value1");

        const res = await client.addRecordWithFeePayer(ownerAddress, topicName, key, value, writerAddress, feePayerAddress, "");
        expect(res).toBeTruthy();

        const record = await client.getPanaceaClient().getRecord(ownerAddress, topicName, Long.fromInt(0));
        expect(record.writerAddress).toEqual(writerAddress);
        expect(record.key).toEqual(key);
        expect(record.value).toEqual(value);

        client.disconnect();
      });
    });
  });
});
