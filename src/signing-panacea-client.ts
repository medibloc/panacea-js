import {
  BroadcastTxResponse,
  buildFeeTable, defaultRegistryTypes,
  FeeTable,
  GasLimits,
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

/**
 * A default gas price for all transactions (Panacea & Stargate), when a user doesn't specify it.
 */
export const panaceaDefaultGasPrice = GasPrice.fromString("5umed");

/**
 * A default gas limits table for only Panacea transactions, when a user doesn't specify it.
 *
 * For example, when executing a createTopic Tx, the fee would be `gasLimits.createTopic * gasPrice`.
 */
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

/**
 * A fee table for only Panacea transactions.
 */
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

/**
 * Options for creating HD Wallet (e.g. DirectSecp256k1HdWallet) for Panacea.
 */
export const panaceaWalletOpts = {
  hdPaths: [stringToPath("m/44'/371'/0'/0/0")],
  prefix: "panacea",
}

/**
 * Options for creating a SigningPanaceaClient.
 * It extends the SigningStargateClientOptions, but contains additional Panacea-specific options.
 */
export interface SigningPanaceaClientOptions extends SigningStargateClientOptions {
  readonly panaceaGasLimits?: Partial<GasLimits<PanaceaFeeTable>>
}

const msgTypeCreateTopic = "/panacea.aol.v2.MsgCreateTopic";
const msgTypeAddWriter = "/panacea.aol.v2.MsgAddWriter";
const msgTypeDeleteWriter = "/panacea.aol.v2.MsgDeleteWriter";
const msgTypeAddRecord = "/panacea.aol.v2.MsgAddRecord";

const panaceaRegistryTypes: ReadonlyArray<[string, GeneratedType]> = [
  [msgTypeCreateTopic, MsgCreateTopic],
  [msgTypeAddWriter, MsgAddWriter],
  [msgTypeDeleteWriter, MsgDeleteWriter],
  [msgTypeAddRecord, MsgAddRecord],
];

/**
 * A class for executing transactions to Panacea.
 * It extends SigningStargateClient, so that you can call Stargate general transactions as well, such as sendTokens.
 */
export class SigningPanaceaClient extends SigningStargateClient {
  readonly panaceaFees: PanaceaFeeTable;

  constructor(tmClient: Tendermint34Client | undefined, signer: OfflineSigner, options: SigningPanaceaClientOptions) {
    // Before calling super(), set Panacea default options if not specified.
    if (!options.gasPrice) {
      options = { ...options, gasPrice: panaceaDefaultGasPrice };
    }
    if (!options.registry) {
      const registry = new Registry([...defaultRegistryTypes, ...panaceaRegistryTypes])
      options = { ...options, registry: registry};
    }

    super(tmClient, signer, options);

    // Build a PanaceaFeeTable
    const { panaceaGasLimits = panaceaDefaultGasLimits } = options; // Use the default one, if not specified
    this.panaceaFees = buildFeeTable(options.gasPrice, panaceaDefaultGasLimits, panaceaGasLimits)
  }

  /**
   * Creates a SigningPanaceaClient.
   * Note that it is important to specify options.gasPrice. If not, the default gas price will be used.
   */
  static async connectWithSigner(endpoint: string, signer: OfflineSigner, options: SigningPanaceaClientOptions = {}): Promise<SigningPanaceaClient> {
    const tmClient = await Tendermint34Client.connect(endpoint);
    return new SigningPanaceaClient(tmClient, signer, options);
  }

  /**
   * Returns a PanaceaClient which can be used for querying Panacea.
   */
  getPanaceaClient(): PanaceaClient {
    return new PanaceaClient(this.forceGetTmClient());
  }

  async createTopic(ownerAddress: string, topicName: string, description: string, memo?: string): Promise<BroadcastTxResponse> {
    const msg = {
      typeUrl: msgTypeCreateTopic,
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
      typeUrl: msgTypeAddWriter,
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
      typeUrl: msgTypeDeleteWriter,
      value: {
        topicName: topicName,
        writerAddress: writerAddress,
        ownerAddress: ownerAddress,
      }
    }
    return this.signAndBroadcast(ownerAddress, [msg], this.panaceaFees.deleteWriter, memo);
  }

  // TODO: Accept a feePayerAddress and use it for the group signing.
  async addRecord(ownerAddress: string, topicName: string, key: Uint8Array, value: Uint8Array, writerAddress: string, memo?: string): Promise<BroadcastTxResponse> {
    const msg = {
      typeUrl: msgTypeAddRecord,
      value: {
        topicName: topicName,
        key: key,
        value: value,
        writerAddress: writerAddress,
        ownerAddress: ownerAddress,
      }
    }
    return this.signAndBroadcast(writerAddress, [msg], this.panaceaFees.addWriter, memo);
  }

  // TODO: implement x/did, x/token transactions
}
