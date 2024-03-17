import { SigningPanaceaClient } from "./signing-panacea-client";
import {
  AccountData,
  EncodeObject,
  encodePubkey,
  isOfflineDirectSigner,
  makeSignDoc,
  OfflineSigner,
  TxBodyEncodeObject,
} from "@cosmjs/proto-signing";
import {
  DeliverTxResponse,
  SignerData,
  SigningStargateClientOptions,
  StdFee,
} from "@cosmjs/stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc/build/tendermint37";
import { AuthInfo, SignerInfo, TxRaw } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { encodeSecp256k1Pubkey } from "@cosmjs/amino";
import { Int53 } from "@cosmjs/math";
import assert from "assert";
import { fromBase64 } from "@cosmjs/encoding";
import { Any } from "cosmjs-types/google/protobuf/any";
import { Coin } from "cosmjs-types/cosmos/base/v1beta1/coin";
import { SignMode } from "cosmjs-types/cosmos/tx/signing/v1beta1/signing";

/**
 * A class for executing transactions to Panacea with signing by multiple addresses (aka. Group Signing).
 * Note that the group signing is different with 'multisig'.
 *
 * This class extends SigningPanaceaClient, so that you can execute non-group-signing transactions as well.
 * Then, the first signer will be used for signing transactions.
 */
export class GroupSigningPanaceaClient extends SigningPanaceaClient {
  private readonly signers: OfflineSigner[];

  /**
   * Creates a GroupSigningPanaceaClient.
   *
   * signers must contain at least one OfflineDirectSigner. OfflineAminoSigner is not supported.
   *
   * For details about options, please see SigningPanaceaClient.connectWithSigner().
   */
  public static async connectWithSigners(
    endpoint: string,
    signers: OfflineSigner[],
    options: SigningStargateClientOptions = {},
  ): Promise<GroupSigningPanaceaClient> {
    const tmClient = await Tendermint37Client.connect(endpoint);
    return new GroupSigningPanaceaClient(tmClient, signers, options);
  }

  protected constructor(
    tmClient: Tendermint37Client | undefined,
    signers: OfflineSigner[],
    options: SigningStargateClientOptions,
  ) {
    // Use the first signer for SigningPanaceaClient
    super(tmClient, signers[0], options);

    if (signers.length === 0) {
      throw new Error("at least one signer must be set");
    }
    signers.forEach((signer) => {
      if (!isOfflineDirectSigner(signer)) {
        throw new Error(
          "signer must be OfflineDirectSigner. OfflineAminoSigner is not supported.",
        );
      }
    });
    this.signers = signers;
  }

  /**
   * Execute a AddRecord transaction.
   * The transaction is signed by both of feePayerAddress and writerAddress. The transaction fee is charged to feePayerAddress.
   *
   * Make sure that GroupSigningPanaceaClient was created with [feePayerSigner, writerSigner]. The order matters.
   */
  async addRecordWithFeePayer(
    ownerAddress: string,
    topicName: string,
    key: Uint8Array,
    value: Uint8Array,
    writerAddress: string,
    feePayerAddress: string,
    fee: StdFee,
    memo?: string,
  ): Promise<DeliverTxResponse> {
    const msg = {
      typeUrl: GroupSigningPanaceaClient.msgTypeAddRecord,
      value: {
        topicName: topicName,
        key: key,
        value: value,
        writerAddress: writerAddress,
        ownerAddress: ownerAddress,
        feePayerAddress: feePayerAddress,
      },
    };
    return this.groupSignAndBroadcast(
      [feePayerAddress, writerAddress],
      [msg],
      fee,
      memo,
    );
  }

  // Reference: https://github.com/cosmos/cosmjs/blob/06fbc34f72f12c30a396c3ca296f80eca9fa60b0/packages/stargate/src/signingstargateclient.ts#L280
  async groupSignAndBroadcast(
    signerAddresses: string[],
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo = "",
  ): Promise<DeliverTxResponse> {
    const txRaw = await this.groupSign(signerAddresses, messages, fee, memo);
    const txBytes = TxRaw.encode(txRaw).finish();
    return this.broadcastTx(
      txBytes,
      this.broadcastTimeoutMs,
      this.broadcastPollIntervalMs,
    );
  }

  // Reference: https://github.com/cosmos/cosmjs/blob/06fbc34f72f12c30a396c3ca296f80eca9fa60b0/packages/stargate/src/signingstargateclient.ts#L301
  public async groupSign(
    signerAddresses: string[],
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    explicitSignerDatas?: SignerData[],
  ): Promise<TxRaw> {
    let signerDatas: SignerData[];
    if (explicitSignerDatas) {
      signerDatas = explicitSignerDatas;
    } else {
      // Retrieve 'SignerData's from the chain.
      const chainId = await this.getChainId();
      signerDatas = await Promise.all(
        signerAddresses.map(async (address) => {
          const { accountNumber, sequence } = await this.getSequence(address);
          return {
            accountNumber: accountNumber,
            sequence: sequence,
            chainId: chainId,
          };
        }),
      );
    }

    return this.groupSignDirect(
      signerAddresses,
      messages,
      fee,
      memo,
      signerDatas,
    );
  }

  // Reference: https://github.com/cosmos/cosmjs/blob/06fbc34f72f12c30a396c3ca296f80eca9fa60b0/packages/stargate/src/signingstargateclient.ts#L370
  private async groupSignDirect(
    signerAddresses: string[],
    messages: readonly EncodeObject[],
    fee: StdFee,
    memo: string,
    signerDatas: SignerData[],
  ): Promise<TxRaw> {
    // Retrieve accounts from signers
    const accounts: AccountData[] = await Promise.all(
      signerAddresses.map(async (signerAddress, i) => {
        const account = (await this.signers[i].getAccounts()).find(
          (account) => account.address === signerAddress,
        );
        if (!account) {
          throw new Error("Failed to retrieve account from signer");
        }
        return account;
      }),
    );

    // Build authInfos
    const pubkeys = accounts.map((account) =>
      encodePubkey(encodeSecp256k1Pubkey(account.pubkey)),
    );
    const sequences = signerDatas.map((signerData) => signerData.sequence);
    const gasLimit = Int53.fromString(fee.gas).toNumber();
    const authInfoBytes = this.makeAuthInfoBytesForGroupSigning(
      pubkeys,
      fee.amount,
      gasLimit,
      sequences,
    );

    // Build an unsigned tx
    const txBodyEncodeObject: TxBodyEncodeObject = {
      typeUrl: "/cosmos.tx.v1beta1.TxBody",
      value: {
        messages: messages,
        memo: memo,
      },
    };
    const txBodyBytes = this.registry.encode(txBodyEncodeObject);

    // Create signatures for each signer
    const signatures: Uint8Array[] = await Promise.all(
      signerDatas.map(async (signerData, i) => {
        const signDoc = makeSignDoc(
          txBodyBytes,
          authInfoBytes,
          signerData.chainId,
          signerData.accountNumber,
        );

        const signer = this.signers[i];
        assert(isOfflineDirectSigner(signer));
        const { signature } = await signer.signDirect(
          signerAddresses[i],
          signDoc,
        );
        return fromBase64(signature.signature);
      }),
    );

    return TxRaw.fromPartial({
      bodyBytes: txBodyBytes,
      authInfoBytes: authInfoBytes,
      signatures: signatures,
    });
  }

  // Reference: https://github.com/cosmos/cosmjs/blob/bbb768a3df11665ccd1d58dcbf2e68ecc3ad9f3b/packages/proto-signing/src/signing.ts#L12
  private makeAuthInfoBytesForGroupSigning(
    pubkeys: readonly Any[],
    feeAmount: readonly Coin[],
    gasLimit: number,
    sequences: number[],
    signMode = SignMode.SIGN_MODE_DIRECT,
  ): Uint8Array {
    const authInfo = {
      signerInfos: pubkeys.map(
        (pubkey, index): SignerInfo => ({
          publicKey: pubkey,
          modeInfo: {
            single: { mode: signMode },
          },
          sequence: BigInt(sequences[index]),
        }),
      ),
      fee: {
        amount: [...feeAmount],
        gasLimit: BigInt(gasLimit),
      },
    };
    return AuthInfo.encode(AuthInfo.fromPartial(authInfo)).finish();
  }
}
