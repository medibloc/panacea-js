import {
  BroadcastTxResponse,
  buildFeeTable,
  FeeTable,
  GasLimits,
  GasPrice,
  SigningStargateClient,
  StdFee
} from "@cosmjs/stargate";
import { Tendermint34Client } from "@cosmjs/tendermint-rpc";
import { EncodeObject, OfflineSigner } from "@cosmjs/proto-signing";
import { SigningStargateClientOptions } from "@cosmjs/stargate/build/signingstargateclient";
import { TxRaw } from "@cosmjs/stargate/build/codec/cosmos/tx/v1beta1/tx";
import { PanaceaClient } from "panaceaclient";

export const panaceaDefaultGasPrice = GasPrice.fromString("5umed");
export const panaceaDefaultGasLimits: GasLimits<PanaceaFeeTable> = {
  createTopic: 200000,
  addWriter: 200000,
  deleteWriter: 200000,
  addRecord: 200000,
  createDid: 200000,
  updateDid: 200000,
  deactivateDid: 200000,
  issueToken: 200000,
}

export interface PanaceaFeeTable extends FeeTable {
  readonly createTopic: StdFee;
  readonly addWriter: StdFee;
  readonly deleteWriter: StdFee;
  readonly addRecord: StdFee;
  readonly createDid: StdFee;
  readonly updateDid: StdFee;
  readonly deactivateDid: StdFee;
  readonly issueToken: StdFee;
}

export interface SigningPanaceaClientOptions extends SigningStargateClientOptions {
  readonly panaceaGasLimits?: Partial<GasLimits<PanaceaFeeTable>>
}

export class SigningPanaceaClient extends SigningStargateClient {
  readonly panaceaFees: PanaceaFeeTable;

  constructor(tmClient: Tendermint34Client | undefined, signer: OfflineSigner, options: SigningPanaceaClientOptions) {
    // Set gasPrice as the Panacea default one, only if gasPrice isn't specified in the options.
    options = options.gasPrice ? options : { ...options, gasPrice: panaceaDefaultGasPrice }
    super(tmClient, signer, options);

    const { panaceaGasLimits = panaceaDefaultGasLimits } = options; // Use the default one, if not specified
    this.panaceaFees = buildFeeTable(options.gasPrice, panaceaDefaultGasLimits, panaceaGasLimits)
  }

  static async connectWithSigner(endpoint: string, signer: OfflineSigner, options: SigningPanaceaClientOptions = {}): Promise<SigningPanaceaClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SigningPanaceaClient(tmClient, signer, options);
  }

  getPanaceaClient(): PanaceaClient {
    return new PanaceaClient(this.forceGetTmClient());
  }

  async createTopic(ownerAddress: string, topicName: string, description: string, memo?: string): Promise<BroadcastTxResponse> {
    const msg = {
      typeUrl: "/panacea.aol.v2.MsgCreateTopic",
      value: {
        topicName: topicName,
        description: description,
        ownerAddress: ownerAddress,
      },
    };
    return this.signAndBroadcast(ownerAddress, [msg], this.panaceaFees.createTopic, memo);
  }

  async addWriter(ownerAddress: string, topicName: string, writerAddress: string, moniker: string, description: string, memo?: string): Promise<BroadcastTxResponse> {
    const msg = {
      typeUrl: "/panacea.aol.v2.MsgAddWriter",
      value: {
        topicName: topicName,
        moniker: moniker,
        description: description,
        writerAddress: writerAddress,
        ownerAddress: ownerAddress,
      }
    }
    return this.signAndBroadcast(ownerAddress, [msg], this.panaceaFees.addWriter, memo);
  }

  async deleteWriter(ownerAddress: string, topicName: string, writerAddress: string, memo?: string): Promise<BroadcastTxResponse> {
    const msg = {
      typeUrl: "/panacea.aol.v2.MsgDeleteWriter",
      value: {
        topicName: topicName,
        writerAddress: writerAddress,
        ownerAddress: ownerAddress,
      }
    }
    return this.signAndBroadcast(ownerAddress, [msg], this.panaceaFees.deleteWriter, memo);
  }

  async addRecord(ownerAddress: string, topicName: string, key: Uint8Array, value: Uint8Array, writerAddress: string, feePayerAddress: string, memo?: string): Promise<BroadcastTxResponse> {
    const msg = {
      typeUrl: "/panacea.aol.v2.MsgAddRecord",
      value: {
        topicName: topicName,
        key: key,
        value: value,
        writerAddress: writerAddress,
        ownerAddress: ownerAddress,
        feePayerAddress: feePayerAddress,
      }
    }

    const signers = feePayerAddress ? [feePayerAddress, writerAddress] : [writerAddress];
    return this.signAndBroadcastMultiSigners(signers, [msg], this.panaceaFees.addRecord, memo);
  }

  private async signAndBroadcastMultiSigners(signerAddresses: string[], messages: readonly EncodeObject[], fee: StdFee, memo?: string): Promise<BroadcastTxResponse> {
    let txRaw: TxRaw = null;
    for (const signerAddress of signerAddresses) {
      const signedTxRaw = await this.sign(signerAddress, messages, fee, memo);
      if (!txRaw) {
        txRaw = signedTxRaw;
      } else {
        txRaw.signatures.push(signedTxRaw.signatures[0]);
      }
    }

    return this.broadcastTx(TxRaw.encode(txRaw).finish(), this.broadcastTimeoutMs, this.broadcastPollIntervalMs);
  }

}