import { PanaceaClient } from "../client/panacea-client";
import { panacead } from "./utils/test-utils";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { panaceaWalletOpts } from "../client/signing-panacea-client";

describe("Panacea client", () => {
  it("connect", async () => {
    const client = await PanaceaClient.connect(panacead.tendermintUrl);
    expect(client).toBeTruthy();
  });

  describe("AOL", () => {
    let ownerAddress: string;
    let client: PanaceaClient;

    beforeAll(async () => {
      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        panacead.mnemonic,
        panaceaWalletOpts,
      );
      const [firstAddress] = await wallet.getAccounts();
      ownerAddress = firstAddress.address;
      client = await PanaceaClient.connect(panacead.tendermintUrl);
    });

    afterAll(async () => {
      client.disconnect();
    });

    describe("getTopic", () => {
      it("works for non-existent topic", async () => {
        const topic = await client.getTopic(ownerAddress, "unknown-topic");
        expect(topic).toBeUndefined();
      });
    });
  });
});
