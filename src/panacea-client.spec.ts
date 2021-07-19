import { panacead, pendingWithoutPanacead } from "./testutils";
import { PanaceaClient } from "./panacea-client";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { panaceaWalletOpts } from "./signing-panacea-client";

describe("PanaceaClient", () => {
  pendingWithoutPanacead();

  describe("connect", () => {
    it("works", async () => {
      const client = await PanaceaClient.connect(panacead.tendermintUrl);
      expect(client).toBeTruthy();
      client.disconnect();
    });
  });

  describe("AOL", () => {
    let ownerAddress: string;
    let client: PanaceaClient;

    beforeAll(async () => {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(panacead.genesisAccountMnemonic, panaceaWalletOpts);
      const [firstAddress] = await wallet.getAccounts();
      ownerAddress = firstAddress.address;
    });

    beforeEach(async () => {
      client = await PanaceaClient.connect(panacead.tendermintUrl);
    });

    afterEach(() => {
      client.disconnect();
    });

    describe("getTopic", () => {
      it("works for non-existent topic", async () => {
        const topic = await client.getTopic(ownerAddress, "unknown-topic");
        expect(topic).toBeNull();
      });
    });

    describe("getWriter", () => {
      it("works for non-existent topic", async () => {
        const topic = await client.getTopic(ownerAddress, "unknown-topic");
        expect(topic).toBeNull();
      });
    });

    describe("getRecord", () => {
      it("works for non-existent topic", async () => {
        const topic = await client.getTopic(ownerAddress, "unknown-topic");
        expect(topic).toBeNull();
      });
    });

    describe("getDid", () => {
      it("works for non-existent DID", async () => {
        const didDocumentWithSeq = await client.getDid("did:panacea:7Prd74ry1Uct87nZqL3ny7aR7Cg46JamVbJgk8azVgUm");
        expect(didDocumentWithSeq).toBeNull();
      });
    });
  });
});
