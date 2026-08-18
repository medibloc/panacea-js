import {
  calculateFee,
  defaultRegistryTypes,
  DeliverTxResponse,
  GasPrice,
  SigningStargateClient,
  SigningStargateClientOptions,
  StdFee,
} from "@cosmjs/stargate";
import {
  DirectSecp256k1HdWalletOptions,
  GeneratedType,
  OfflineSigner,
  Registry,
} from "@cosmjs/proto-signing";
import { PanaceaClient } from "./panacea-client";
import { CometClient, connectComet } from "@cosmjs/tendermint-rpc";
import {
  MsgAddRecordRequest,
  MsgAddWriterRequest,
  MsgCreateTopicRequest,
  MsgDeleteWriterRequest,
} from "../proto/panacea/aol/v2/tx";
import { stringToPath } from "@cosmjs/crypto";
import {
  MsgCreateDIDRequest,
  MsgDeactivateDIDRequest,
  MsgUpdateDIDRequest,
} from "../proto/panacea/did/v2/tx";
import {
  MsgBurnPNFTRequest,
  MsgCreateDenomRequest,
  MsgDeleteDenomRequest,
  MsgMintPNFTRequest,
  MsgTransferDenomRequest,
  MsgTransferPNFTRequest,
  MsgUpdateDenomRequest,
} from "../proto/panacea/pnft/v2/tx";
import {
  MsgBurnRequest,
  MsgCreateClassRequest,
  MsgMintRequest,
  MsgRevokeRequest,
  MsgUpdateControllerRequest,
} from "../proto/panacea/nft/v1/tx";
import { MsgSend } from "cosmjs-types/cosmos/nft/v1beta1/tx";

export const panaceaDefaultGasPrice = GasPrice.fromString("5umed");

export const panaceaWalletOpts: Partial<DirectSecp256k1HdWalletOptions> = {
  hdPaths: [stringToPath("m/44'/371'/0'/0/0")],
  prefix: "panacea",
};

export interface Msg<T> {
  typeUrl: string;
  value: T;
}

export class SigningPanaceaClient extends SigningStargateClient {
  static msgTypeCreateTopic = "/panacea.aol.v2.MsgCreateTopicRequest";
  static msgTypeAddWriter = "/panacea.aol.v2.MsgAddWriterRequest";
  static msgTypeDeleteWriter = "/panacea.aol.v2.MsgDeleteWriterRequest";
  static msgTypeAddRecord = "/panacea.aol.v2.MsgAddRecordRequest";
  static msgTypeCreateDid = "/panacea.did.v2.MsgCreateDIDRequest";
  static msgTypeUpdateDid = "/panacea.did.v2.MsgUpdateDIDRequest";
  static msgTypeDeactivateDid = "/panacea.did.v2.MsgDeactivateDIDRequest";
  static msgTypeCreateNftClass = "/panacea.nft.v1.MsgCreateClassRequest";
  static msgTypeUpdateNftController =
    "/panacea.nft.v1.MsgUpdateControllerRequest";
  static msgTypeMintNft = "/panacea.nft.v1.MsgMintRequest";
  static msgTypeTransferNft = "/cosmos.nft.v1beta1.MsgSend";
  static msgTypeRevokeNft = "/panacea.nft.v1.MsgRevokeRequest";
  static msgTypeBurnNft = "/panacea.nft.v1.MsgBurnRequest";
  static msgTypeCreateDenom = "/panacea.pnft.v2.MsgCreateDenomRequest";
  static msgTypeUpdateDenom = "/panacea.pnft.v2.MsgUpdateDenomRequest";
  static msgTypeTransferDenom = "/panacea.pnft.v2.MsgTransferDenomRequest";
  static msgTypeDeleteDenom = "/panacea.pnft.v2.MsgDeleteDenomRequest";
  static msgTypeMintPnft = "/panacea.pnft.v2.MsgMintPNFTRequest";
  static msgTypeTransferPnft = "/panacea.pnft.v2.MsgTransferPNFTRequest";
  static msgTypeBurnPnft = "/panacea.pnft.v2.MsgBurnPNFTRequest";

  private static panaceaRegistryTypes: ReadonlyArray<[string, GeneratedType]> =
    [
      [SigningPanaceaClient.msgTypeCreateTopic, MsgCreateTopicRequest],
      [SigningPanaceaClient.msgTypeAddWriter, MsgAddWriterRequest],
      [SigningPanaceaClient.msgTypeDeleteWriter, MsgDeleteWriterRequest],
      [SigningPanaceaClient.msgTypeAddRecord, MsgAddRecordRequest],
      [SigningPanaceaClient.msgTypeCreateDid, MsgCreateDIDRequest],
      [SigningPanaceaClient.msgTypeUpdateDid, MsgUpdateDIDRequest],
      [SigningPanaceaClient.msgTypeDeactivateDid, MsgDeactivateDIDRequest],
      [SigningPanaceaClient.msgTypeCreateNftClass, MsgCreateClassRequest],
      [
        SigningPanaceaClient.msgTypeUpdateNftController,
        MsgUpdateControllerRequest,
      ],
      [SigningPanaceaClient.msgTypeMintNft, MsgMintRequest],
      [SigningPanaceaClient.msgTypeTransferNft, MsgSend],
      [SigningPanaceaClient.msgTypeRevokeNft, MsgRevokeRequest],
      [SigningPanaceaClient.msgTypeBurnNft, MsgBurnRequest],
      [SigningPanaceaClient.msgTypeCreateDenom, MsgCreateDenomRequest],
      [SigningPanaceaClient.msgTypeUpdateDenom, MsgUpdateDenomRequest],
      [SigningPanaceaClient.msgTypeTransferDenom, MsgTransferDenomRequest],
      [SigningPanaceaClient.msgTypeDeleteDenom, MsgDeleteDenomRequest],
      [SigningPanaceaClient.msgTypeMintPnft, MsgMintPNFTRequest],
      [SigningPanaceaClient.msgTypeTransferPnft, MsgTransferPNFTRequest],
      [SigningPanaceaClient.msgTypeBurnPnft, MsgBurnPNFTRequest],
    ];

  constructor(
    tmClient: CometClient | undefined,
    signer: OfflineSigner,
    options: SigningStargateClientOptions,
  ) {
    // Before calling super(), set Panacea default options if not specified.
    if (!options.gasPrice) {
      options = { ...options, gasPrice: panaceaDefaultGasPrice };
    }
    if (!options.registry) {
      const registry = new Registry([
        ...defaultRegistryTypes,
        ...SigningPanaceaClient.panaceaRegistryTypes,
      ]);
      options = { ...options, registry: registry };
    }

    super(tmClient, signer, options);
  }

  /**
   * Creates a SigningPanaceaClient.
   * Note that it is important to specify options.gasPrice. If not, the default gas price will be used.
   */
  static async connectWithSigner(
    endpoint: string,
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
  ) {
    const tmClient = await connectComet(endpoint);
    return new SigningPanaceaClient(tmClient, signer, options);
  }

  static async offline(
    signer: OfflineSigner,
    options: SigningStargateClientOptions = {},
  ): Promise<SigningPanaceaClient> {
    return new SigningPanaceaClient(undefined, signer, options);
  }

  /**
   * Returns a PanaceaClient which can be used for querying Panacea.
   */
  getPanaceaClient(): PanaceaClient {
    return new PanaceaClient(this.forceGetCometClient(), {});
  }

  async createTopic(
    request: Partial<MsgCreateTopicRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgCreateTopicRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeCreateTopic,
      value: MsgCreateTopicRequest.create(request),
    };
    return this.signAndBroadcast(request.ownerAddress!, [msg], fee, memo);
  }

  async addWriter(
    request: Partial<MsgAddWriterRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ) {
    const msg: Msg<MsgAddWriterRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeAddWriter,
      value: MsgAddWriterRequest.create(request),
    };
    return this.signAndBroadcast(request.ownerAddress!, [msg], fee, memo);
  }

  async deleteWriter(
    request: Partial<MsgDeleteWriterRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgDeleteWriterRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeDeleteWriter,
      value: MsgDeleteWriterRequest.create(request),
    };
    return this.signAndBroadcast(request.ownerAddress!, [msg], fee, memo);
  }

  async addRecord(
    request: Partial<MsgAddRecordRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgAddRecordRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeAddRecord,
      value: MsgAddRecordRequest.create(request),
    };
    return this.signAndBroadcast(request.writerAddress!, [msg], fee, memo);
  }

  async createDid(
    request: Partial<MsgCreateDIDRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgCreateDIDRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeCreateDid,
      value: MsgCreateDIDRequest.create(request),
    };
    return this.signAndBroadcast(request.fromAddress!, [msg], fee, memo);
  }

  async updateDid(
    request: Partial<MsgUpdateDIDRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgUpdateDIDRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeUpdateDid,
      value: MsgUpdateDIDRequest.create(request),
    };
    return this.signAndBroadcast(request.fromAddress!, [msg], fee, memo);
  }

  async deactivateDid(
    request: Partial<MsgDeactivateDIDRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgDeactivateDIDRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeDeactivateDid,
      value: MsgDeactivateDIDRequest.create(request),
    };
    return this.signAndBroadcast(request.fromAddress!, [msg], fee, memo);
  }

  async createNftClass(
    request: Partial<MsgCreateClassRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgCreateClassRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeCreateNftClass,
      value: MsgCreateClassRequest.create(request),
    };
    return this.signAndBroadcast(request.creator!, [msg], fee, memo);
  }

  async updateNftController(
    request: Partial<MsgUpdateControllerRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgUpdateControllerRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeUpdateNftController,
      value: MsgUpdateControllerRequest.create(request),
    };
    return this.signAndBroadcast(request.controller!, [msg], fee, memo);
  }

  async mintNft(
    request: Partial<MsgMintRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgMintRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeMintNft,
      value: MsgMintRequest.create(request),
    };
    return this.signAndBroadcast(request.controller!, [msg], fee, memo);
  }

  async transferNft(
    request: Partial<MsgSend>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgSend> = {
      typeUrl: SigningPanaceaClient.msgTypeTransferNft,
      value: MsgSend.fromPartial(request),
    };
    return this.signAndBroadcast(request.sender!, [msg], fee, memo);
  }

  async revokeNft(
    request: Partial<MsgRevokeRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgRevokeRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeRevokeNft,
      value: MsgRevokeRequest.create(request),
    };
    return this.signAndBroadcast(request.controller!, [msg], fee, memo);
  }

  async burnNft(
    request: Partial<MsgBurnRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgBurnRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeBurnNft,
      value: MsgBurnRequest.create(request),
    };
    return this.signAndBroadcast(request.owner!, [msg], fee, memo);
  }

  async createDenom(
    request: Partial<MsgCreateDenomRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgCreateDenomRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeCreateDenom,
      value: MsgCreateDenomRequest.create(request),
    };
    return this.signAndBroadcast(request.creator!, [msg], fee, memo);
  }

  async updateDenom(
    request: Partial<MsgUpdateDenomRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgUpdateDenomRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeUpdateDenom,
      value: MsgUpdateDenomRequest.create(request),
    };
    return this.signAndBroadcast(request.updater!, [msg], fee, memo);
  }

  async transferDenom(
    request: Partial<MsgTransferDenomRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgTransferDenomRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeTransferDenom,
      value: MsgTransferDenomRequest.create(request),
    };
    return this.signAndBroadcast(request.sender!, [msg], fee, memo);
  }

  async deleteDenom(
    request: Partial<MsgDeleteDenomRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgDeleteDenomRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeDeleteDenom,
      value: MsgDeleteDenomRequest.create(request),
    };
    return this.signAndBroadcast(request.remover!, [msg], fee, memo);
  }

  async mintPNFT(
    request: Partial<MsgMintPNFTRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgMintPNFTRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeMintPnft,
      value: MsgMintPNFTRequest.create(request),
    };
    return this.signAndBroadcast(request.creator!, [msg], fee, memo);
  }

  async transferPNFT(
    request: Partial<MsgTransferPNFTRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgTransferPNFTRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeTransferPnft,
      value: MsgTransferPNFTRequest.create(request),
    };
    return this.signAndBroadcast(request.sender!, [msg], fee, memo);
  }

  async burnPNFT(
    request: Partial<MsgBurnPNFTRequest>,
    fee: StdFee | "auto",
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg: Msg<MsgBurnPNFTRequest> = {
      typeUrl: SigningPanaceaClient.msgTypeBurnPnft,
      value: MsgBurnPNFTRequest.create(request),
    };
    return this.signAndBroadcast(request.burner!, [msg], fee, memo);
  }

  createFee(gasLimit: number): StdFee {
    return calculateFee(gasLimit, panaceaDefaultGasPrice);
  }
}
