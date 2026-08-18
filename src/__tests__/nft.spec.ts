import { DirectSecp256k1HdWallet, EncodeObject } from "@cosmjs/proto-signing";
import { DeliverTxResponse } from "@cosmjs/stargate";
import Long from "long";
import { panaceaWalletOpts, SigningPanaceaClient } from "../client";
import { BasicNFTData, TransferPolicy } from "../nft";

class TestSigningPanaceaClient extends SigningPanaceaClient {
  encode(message: EncodeObject): Uint8Array {
    return this.registry.encode(message);
  }
}

describe("Panacea NFT client", () => {
  it("builds and registers every NFT transaction", async () => {
    const wallet = await DirectSecp256k1HdWallet.generate(
      24,
      panaceaWalletOpts,
    );
    const [{ address }] = await wallet.getAccounts();
    const client = new TestSigningPanaceaClient(undefined, wallet, {});
    const response = {} as DeliverTxResponse;
    const signAndBroadcast = jest
      .spyOn(client, "signAndBroadcast")
      .mockResolvedValue(response);
    const metadata = BasicNFTData.create({
      name: "Certificate",
      description: "Completion certificate",
    });
    const data = {
      typeUrl: "/panacea.nft.v1.BasicNFTData",
      value: BasicNFTData.encode(metadata).finish(),
    };

    await client.createNftClass(
      {
        creator: address,
        localClassId: "certificate",
        name: "Certificate",
        symbol: "CERT",
        transferPolicy: TransferPolicy.TRANSFER_POLICY_OWNER_TRANSFERABLE,
        revocable: true,
        maxSupply: Long.fromInt(10, true),
      },
      "auto",
    );
    await client.updateNftController(
      { classId: "class-id", controller: address, newController: address },
      "auto",
    );
    await client.mintNft(
      {
        classId: "class-id",
        nftId: "nft-id",
        controller: address,
        recipient: address,
        data,
      },
      "auto",
    );
    await client.transferNft(
      {
        classId: "class-id",
        id: "nft-id",
        sender: address,
        receiver: address,
      },
      "auto",
    );
    await client.revokeNft(
      { classId: "class-id", nftId: "nft-id", controller: address },
      "auto",
    );
    await client.burnNft(
      { classId: "class-id", nftId: "nft-id", owner: address },
      "auto",
    );

    expect(signAndBroadcast).toHaveBeenCalledTimes(6);
    expect(signAndBroadcast.mock.calls.map(([signer]) => signer)).toEqual([
      address,
      address,
      address,
      address,
      address,
      address,
    ]);

    const messages = signAndBroadcast.mock.calls.map(
      ([, [message]]) => message,
    );
    expect(messages.map(({ typeUrl }) => typeUrl)).toEqual([
      SigningPanaceaClient.msgTypeCreateNftClass,
      SigningPanaceaClient.msgTypeUpdateNftController,
      SigningPanaceaClient.msgTypeMintNft,
      SigningPanaceaClient.msgTypeTransferNft,
      SigningPanaceaClient.msgTypeRevokeNft,
      SigningPanaceaClient.msgTypeBurnNft,
    ]);
    messages.forEach((message) => expect(client.encode(message)).toBeTruthy());
    expect(BasicNFTData.decode(data.value)).toEqual(metadata);
  });
});
