import {
  DeliverTxResponse,
  defaultRegistryTypes,
  GasPrice,
  SigningStargateClient,
  StdFee
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { GeneratedType, OfflineSigner, Registry } from "@cosmjs/proto-signing";
import { SigningStargateClientOptions } from "@cosmjs/stargate/build/signingstargateclient";
import { PanaceaClient } from "./panacea-client";
import { stringToPath } from "@cosmjs/crypto";
import { MsgAddRecord, MsgAddWriter, MsgCreateTopic, MsgDeleteWriter } from "./proto/panacea/aol/v2/tx";
import { MsgCreateDID, MsgDeactivateDID, MsgUpdateDID } from "./proto/panacea/did/v2/tx";
import { MsgIssueToken } from "./proto/panacea/token/v2/tx";
import { DIDDocument } from "./proto/panacea/did/v2/did";
import { IntProto } from "./proto/cosmos/base/v1beta1/coin";

/**
 * A default gas price for all transactions (Panacea & Stargate), when a user doesn't specify it.
 */
export const panaceaDefaultGasPrice = GasPrice.fromString("5umed");

/**
 * Options for creating HD Wallet (e.g. DirectSecp256k1HdWallet) for Panacea.
 */
export const panaceaWalletOpts = {
  hdPaths: [stringToPath("m/44'/371'/0'/0/0")],
  prefix: "panacea",
}

/**
 * A class for executing transactions to Panacea.
 * It extends SigningStargateClient, so that you can call Stargate general transactions as well, such as sendTokens.
 */
export class SigningPanaceaClient extends SigningStargateClient {
  protected static msgTypeCreateTopic = "/panacea.aol.v2.MsgCreateTopic";
  protected static msgTypeAddWriter = "/panacea.aol.v2.MsgAddWriter";
  protected static msgTypeDeleteWriter = "/panacea.aol.v2.MsgDeleteWriter";
  protected static msgTypeAddRecord = "/panacea.aol.v2.MsgAddRecord";
  protected static msgTypeCreateDid = "/panacea.did.v2.MsgCreateDID";
  protected static msgTypeUpdateDid = "/panacea.did.v2.MsgUpdateDID";
  protected static msgTypeDeactivateDid = "/panacea.did.v2.MsgDeactivateDID";
  protected static msgTypeIssueToken = "/panacea.token.v2.MsgIssueToken";

  private static panaceaRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
    [SigningPanaceaClient.msgTypeCreateTopic, MsgCreateTopic],
    [SigningPanaceaClient.msgTypeAddWriter, MsgAddWriter],
    [SigningPanaceaClient.msgTypeDeleteWriter, MsgDeleteWriter],
    [SigningPanaceaClient.msgTypeAddRecord, MsgAddRecord],
    [SigningPanaceaClient.msgTypeCreateDid, MsgCreateDID],
    [SigningPanaceaClient.msgTypeUpdateDid, MsgUpdateDID],
    [SigningPanaceaClient.msgTypeDeactivateDid, MsgDeactivateDID],
    [SigningPanaceaClient.msgTypeIssueToken, MsgIssueToken],
  ];

  constructor(tmClient: Tendermint34Client | undefined, signer: OfflineSigner, options: SigningStargateClientOptions) {
    // Before calling super(), set Panacea default options if not specified.
    if (!options.gasPrice) {
      options = { ...options, gasPrice: panaceaDefaultGasPrice };
    }
    if (!options.registry) {
      const registry = new Registry([...defaultRegistryTypes, ...SigningPanaceaClient.panaceaRegistryTypes])
      options = { ...options, registry: registry};
    }

    super(tmClient, signer, options);
  }

  /**
   * Creates a SigningPanaceaClient.
   * Note that it is important to specify options.gasPrice. If not, the default gas price will be used.
   */
  static async connectWithSigner(endpoint: string, signer: OfflineSigner, options: SigningStargateClientOptions = {}): Promise<SigningPanaceaClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SigningPanaceaClient(tmClient, signer, options);
  }

  /**
   * Returns a PanaceaClient which can be used for querying Panacea.
   */
  getPanaceaClient(): PanaceaClient {
    return new PanaceaClient(this.forceGetTmClient(), {});
  }

  async createTopic(ownerAddress: string, topicName: string, description: string, fee: StdFee | "auto", memo?: string): Promise<DeliverTxResponse> {
    const msg = {
      typeUrl: SigningPanaceaClient.msgTypeCreateTopic,
      value: {
        topicName: topicName,
        description: description,
        ownerAddress: ownerAddress,
      },
    };
    return this.signAndBroadcast(ownerAddress, [msg], fee, memo);
  }

  async addWriter(ownerAddress: string, topicName: string, writerAddress: string, moniker: string, description: string, fee: StdFee | "auto", memo?: string): Promise<DeliverTxResponse> {
    const msg = {
      typeUrl: SigningPanaceaClient.msgTypeAddWriter,
      value: {
        topicName: topicName,
        moniker: moniker,
        description: description,
        writerAddress: writerAddress,
        ownerAddress: ownerAddress,
      },
    };
    return this.signAndBroadcast(ownerAddress, [msg], fee, memo);
  }

  async deleteWriter(ownerAddress: string, topicName: string, writerAddress: string, fee: StdFee | "auto", memo?: string): Promise<DeliverTxResponse> {
    const msg = {
      typeUrl: SigningPanaceaClient.msgTypeDeleteWriter,
      value: {
        topicName: topicName,
        writerAddress: writerAddress,
        ownerAddress: ownerAddress,
      },
    };
    return this.signAndBroadcast(ownerAddress, [msg], fee, memo);
  }

  async addRecord(ownerAddress: string, topicName: string, key: Uint8Array, value: Uint8Array, writerAddress: string, fee: StdFee | "auto", memo?: string): Promise<DeliverTxResponse> {
    const msg = {
      typeUrl: SigningPanaceaClient.msgTypeAddRecord,
      value: {
        topicName: topicName,
        key: key,
        value: value,
        writerAddress: writerAddress,
        ownerAddress: ownerAddress,
      },
    };
    return this.signAndBroadcast(writerAddress, [msg], fee, memo);
  }

  async createDid(didDocument: DIDDocument, verficationMethodId: string, signature: Uint8Array, fromAddress: string, fee: StdFee | "auto", memo?: string): Promise<DeliverTxResponse> {
    const msg = {
      typeUrl: SigningPanaceaClient.msgTypeCreateDid,
      value: {
        did: didDocument.id,
        document: didDocument,
        verificationMethodId:  verficationMethodId,
        signature: signature,
        fromAddress: fromAddress,
      },
    };
    return this.signAndBroadcast(fromAddress, [msg], fee, memo);
  }

  async updateDid(didDocument: DIDDocument, verficationMethodId: string, signature: Uint8Array, fromAddress: string, fee: StdFee | "auto", memo?: string): Promise<DeliverTxResponse> {
    const msg = {
      typeUrl: SigningPanaceaClient.msgTypeUpdateDid,
      value: {
        did: didDocument.id,
        document: didDocument,
        verificationMethodId:  verficationMethodId,
        signature: signature,
        fromAddress: fromAddress,
      },
    };
    return this.signAndBroadcast(fromAddress, [msg], fee, memo);
  }

  async deactivateDid(did: string, verficationMethodId: string, signature: Uint8Array, fromAddress: string, fee: StdFee | "auto", memo?: string): Promise<DeliverTxResponse> {
    const msg = {
      typeUrl: SigningPanaceaClient.msgTypeDeactivateDid,
      value: {
        did: did,
        verificationMethodId:  verficationMethodId,
        signature: signature,
        fromAddress: fromAddress,
      },
    };
    return this.signAndBroadcast(fromAddress, [msg], fee, memo);
  }

  async issueToken(name: string, shortSymbol: string, totalSupplyMicro: IntProto, mintable: boolean, ownerAddress: string, fee: StdFee | "auto", memo?: string): Promise<DeliverTxResponse> {
    const msg = {
      typeUrl: SigningPanaceaClient.msgTypeIssueToken,
      value: {
        name: name,
        shortSymbol: shortSymbol,
        totalSupplyMicro: totalSupplyMicro,
        mintable: mintable,
        ownerAddress: ownerAddress,
      },
    };
    return this.signAndBroadcast(ownerAddress, [msg], fee, memo);
  }
}
