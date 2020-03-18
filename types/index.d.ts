// Type definitions for @medibloc/panacea-js 1.2
// Project: https://medibloc.org
// Definitions by: ggomma <https://github.com/me>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

interface IAccount {
  sequence?: number;
  account_number?: number;
  coins?: Array<ICoin>;
  privateKey?: string;
  publicKey?: string;
  address?: string;
}

export class Account implements IAccount {
  sequence?: number;
  account_number?: number;
  coins?: Array<ICoin>;
  privateKey?: string;
  publicKey?: string;
  address?: string;

  constructor(data?: {
    value?: IAccount,
    sequence?: string | number;
    accountNumber?: string | number;
    account_number?: string | number;
    privateKey?: string;
    publicKey?: string;
    address?: string;
    coins?: Array<ICoin>;
  });

  increaseSequence(): void;
  setAddress(address: string): void;
  setPrivKeyFromMnemonic(mnemonic: string): void;
  setPrivateKey(privateKey: string): void;
  setPublicKey(publicKey: string): void;
  sign(tx: Tx): Tx;
  signTxHash(txHash: string): string;
}

interface IFee {
  amount?: Array<ICoin>;
  gas: string | number;
}

export class Fee implements IFee {
  amount?: Array<ICoin>
  gas: string | number;

  constructor();

  addCoin(parsedCoin: ICoin): void;
  setFee(fee: string): void;
  setGasLimit(gasLimit: number | string): void;
  setGasPrice(price: string): void;
}

export type IMsg = BaseMessage | Message.AOL.AddRecord | Message.AOL.AddWriter | Message.AOL.CreateTopic | Message.AOL.DeleteWriter | Message.Distr.ModifyWithdrawAddress | Message.Distr.WithdrawReward | Message.Slashing.Unjail | Message.Staking.CreateValidator | Message.Staking.Delegate | Message.Staking.EditValidator | Message.Staking.Redelegate | Message.Staking.Undelegate

interface ISignature {
  pub_key: {
    type: 'tendermint/PubKeySecp256k1',
    value: string;
  };
  signature: string;
}

interface ITransaction {
  sequence: string;
  account_number: string;
  chain_id: string;
  msgs: Array<IMsg>;
  memo: string;
  fee?: IFee;
  signatures: Array<ISignature>;
}

interface IBroadcastTransaction {
  tx: {
    msg: Array<IMsg>;
    fee: IFee;
    signatures: Array<ISignature>;
    memo: string;
  };
  mode?: string;
}

export class Tx implements ITransaction {
  sequence: string;
  account_number: string;
  chain_id: string;
  msgs: Array<IMsg>;
  memo: string;
  fee?: IFee;
  signatures: Array<ISignature>;

  constructor(data: {
    chainId: string;
    msg?: IMsg | Array<IMsg>;
    sequence?: string | number;
    accountNumber?: string | number;
    memo?: string;
    fee?: IFee;
    signatures?: Array<ISignature>;
  });

  addMsgs(...msgs: Array<IMsg>): void;
  addSignature(pubKey: string, signature: string): void;
  calculateHash(): string;
  convertToBroadcastTx(mode?: string): IBroadcastTransaction;
  setFee(fee: IFee): void;
  sign(privateKey: string): string;
  signingData(): string;
}

export class BaseMessage {
  type: 'cosmos-sdk/MsgSend';
  value: {
    from_address: string;
    to_address: string;
    amount: Array<ICoin>;
  }

  constructor(data: {
    fromAddress: string;
    toAddress: string;
    amount: Array<ICoin>;
  })
}

export class BaseClient {
  serverUrl: string;

  constructor(serverUrl: string);

  getRequest: (url: string, params: Array<string>, query: object) => Promise<any>;
  postRequest: (url: string, params: Array<string>, data: object) => Promise<any>;
}

export class AccountClient extends BaseClient {
  constructor(serverUrl: string);

  getAccount: (address: string) => Promise<any>;
  getBalance: (address: string) => Promise<any>;
  generateTransferTx: (address: string, tx: IBroadcastTransaction) => Promise<any>;
}

export class AOLClient extends BaseClient {
  constructor(serverUrl: string);

  getTopics: (ownerAddr: string) => Promise<any>;
  getTopic: (ownerAddr: string, topic: string) => Promise<any>;
  getWriters: (ownerAddr: string, topic: string) => Promise<any>;
  getWriter: (ownerAddr: string, topic: string, writerAddr: string) => Promise<any>;
  getRecord: (ownerAddr: string, topic: string, offset: string | number) => Promise<any>;
}

export class DistributionClient extends BaseClient {
  constructor(serverUrl: string);

  getDelegatorRewards: (delegatorAddr: string) => Promise<any>;
  getDelegatorRewardFromValidator: (delegatorAddr: string, validatorAddr: string) =>  Promise<any>;
  getDelegatorWithdrawAddress: (delegatorAddr: string) => Promise<any>;
  getValidatorDistributionInfo: (validatorAddr: string) => Promise<any>;
  getValidatorOutstandingReward: (validatorAddr: string) => Promise<any>;
  getValidatorReward: (validatorAddr: string) => Promise<any>;
  getCommunityPoolBalance: () => Promise<any>;
  getDistributionParams: () => Promise<any>;
  generateWithdrawRewardsTx: (delegatorAddr: string, tx: IBroadcastTransaction) => Promise<any>;
  generateWithdrawRewardTx: (delegatorAddr: string, validatorAddr: string, tx: IBroadcastTransaction) => Promise<any>;
  getnerateReplaceWithdrawAddrTx: (delegatorAddr: string, tx: IBroadcastTransaction) => Promise<any>;
  generateWithdrawValidatorRewardTx: (validatorAddr: string, tx: IBroadcastTransaction) => Promise<any>;
}

export class GovernanceClient extends BaseClient {
  constructor(serverUrl: string);

  getProposals: (opts: { voter: string, depositor: string, status: string }) => Promise<any>;
  getProposal: (proposalId: string | number) => Promise<any>;
  getProposer: (proposalId: string | number) => Promise<any>;
  getProposalDeposit: (proposalId: string | number) => Promise<any>;
  getProposalDepositFromDepositor: (proposalId: string | number, depositorAddr: string) => Promise<any>;
  getProposalVotes: (proposalId: string | number) => Promise<any>;
  getProposalVoteFromVoter: (proposalId: string | number, voterAddr: string) => Promise<any>;
  getProposalTally: (proposalId: string | number) => Promise<any>;
  getGovDepositParams: () => Promise<any>;
  getGovTallyParams: () => Promise<any>;
  getGovVoteParams: () => Promise<any>;
  generateProposalTx: (tx: IBroadcastTransaction) => Promise<any>;
  generateDepositToProposalTx: (proposalId: string | number, tx: IBroadcastTransaction) => Promise<any>;
  generateVoteToProposalTx: (proposalId: string | number, tx: IBroadcastTransaction) => Promise<any>;
}

export class MintingClient extends BaseClient {
  constructor(serverUrl: string);

  getMintParams: () => Promise<any>
  getInflation: () => Promise<any>
  getAnnualProvisions: () => Promise<any>
}

export class SlashingClient extends BaseClient {
  constructor(serverUrl: string);
 
  getValidatorSigningInfo: (validatorPubKey: string) => Promise<any>;
  getValidatorsSigningInfo: (opts: { page: string | number, limit: string | number }) => Promise<any>;
  getSlashingParams: () => Promise<any>;
  generateUnjailTx: (validatorAddr: string, tx: IBroadcastTransaction) => Promise<any>;
}

export class StakingClient extends BaseClient {
  constructor(serverUrl: string);

  getDelagatorInfo: (delegatorAddr: string) => Promise<any>;
  getDelegatorInfoFromValidator: (delegatorAddr: string, validatorAddr: string) => Promise<any>;
  getDelegatorUnbondingInfo: (delegatorAddr: string) => Promise<any>;
  getDelegatorUnbondingInfoFromValidator: (delegatorAddr: string, validatorAddr: string) => Promise<any>;
  getRedelegations: () => Promise<any>;
  getValidatorsFromDelegator: (delegatorAddr: string) => Promise<any>;
  getValidatorFromDelegator: (delegatorAddr: string, validatorAddr: string) => Promise<any>;
  getDelegatorStakingTxs: (delegatorAddr: string) => Promise<any>;
  getCandidates: (opts: { status: string, page: string | number, limit: string | number }) => Promise<any>;
  getValidator: (validatorAddr: string) => Promise<any>;
  getDelegatorsByValidator: (validatorAddr: string) => Promise<any>;
  getUnbondingDelegatorsByValidator: (validatorAddr: string) => Promise<any>;
  getStakingPool: () => Promise<any>;
  getStakingParams: () => Promise<any>;
  generateDelegateTx: (delegatorAddr: string, tx: IBroadcastTransaction) => Promise<any>;
  generateUnbondingTx: (delegatorAddr: string, tx: IBroadcastTransaction) => Promise<any>;
  generateRedelegateTx: (delegatorAddr: string, tx: IBroadcastTransaction) => Promise<any>;
}

export class TendermintClient extends BaseClient {
  constructor(serverUrl: string);

  getNodeInfo: () => Promise<any>;
  getSyncStatus: () => Promise<any>;
  getLatestBlock: () => Promise<any>;
  getBlock: (height: number) => Promise<any>;
  getLatestValidatorSets: () => Promise<any>;
  getValidatorSets: (height: number) => Promise<any>;
  getTx: (hash: string) => Promise<any>;
  getTxs: (opts: { tags: string, page: string | number, limit: string | number }) => Promise<any>;
  broadcastTx: (data: IBroadcastTransaction) => Promise<any>;
  encodeTx: (data: IBroadcastTransaction) => Promise<any>;
}

export class VersionClient extends BaseClient {
  constructor(serverUrl: string);

  getVersion: () => Promise<any>;
  getNodeVersion: () => Promise<any>;
}

export class Client extends BaseClient {
  Account: AccountClient;
  AOL: AOLClient;
  Distribution: DistributionClient;
  Governance: GovernanceClient;
  Minting: MintingClient;
  Slashing: SlashingClient;
  Staking: StakingClient;
  Tendermint: TendermintClient;
  Version: VersionClient;

  constructor(serverUrl: string)
}

export class Coin implements ICoin {
  denom: string;
  amount: string;

  constructor(data?: string | number)
}

interface ICoin {
  denom: string;
  amount: string | number;
}

export namespace Coin {
  function parseCoin(coin: string): ICoin;
}

export namespace Message {
  namespace AOL {
    class AddRecord {
      type: 'aol/MsgAddRecord';
      value: {
        topic_name: string;
        key: string;
        value: string;
        writer_address: string;
        owner_address: string;
        fee_payer_address: string;
      }

      constructor(data: {
        topicName: string;
        key: string;
        value: string;
        writerAddress: string;
        ownerAddress: string;
        feePayerAddress?: string;
      })
    }

    class AddWriter { 
      type: 'aol/MsgAddWriter';
      value: {
        topic_name: string;
        moniker: string;
        description: string;
        writer_address: string;
        owner_address: string;
      }

      constructor(data: {
        topicName: string;
        moniker?: string;
        description?: string;
        writerAddress: string;
        ownerAddress: string;
      })
    }

    class CreateTopic {
      type: 'aol/MsgCreateTopic';
      value: {
        topic_name: string;
        description: string;
        owner_address: string;
      }

      constructor(data: {
        topicName: string;
        ownerAddress: string;
        description?: string;
      });
    }

    class DeleteWriter {
      type: 'aol/MsgDeleteWriter';
      value: {
        topic_name: string;
        writer_address: string;
        owner_address: string;
      }

      constructor(data: {
        topicName: string;
        writerAddress: string;
        ownerAddress: string;
      })
    }
  }

  namespace Distr {
    class ModifyWithdrawAddress {
      type: 'cosmos-sdk/MsgModifyWithdrawAddress';
      value: {
        delegator_address: string;
        withdraw_address: string;
      }
      
      constructor(data: {
        delegatorAddress: string;
        withdrawAddress: string;
      })
    }
      
    class WithdrawReward {
      type: 'cosmos-sdk/MsgWithdrawDelegationReward';
      value: {
        delegator_address: string;
        validator_address: string;
      }
      
      constructor(data: {
        delegatorAddress: string;
        validatorAddress: string;
      })
    }
  }

  namespace Slashing {
    class Unjail {
      type: 'cosmos-sdk/MsgUnjail';
      value: {
        address: string;
      }

      constructor(data: {
        address: string;
      })
    }
  }

  namespace Staking {
    class CreateValidator {
      type: 'cosmos-sdk/MsgCreateValidator';
      value: {
        description: {
          moniker: string;
          identity: string;
          website: string;
          details: string;
        };
        commission: {
          rate: string;
          max_rate: string;
          max_change_rate: string;
        };
        min_self_delegation: string;
        delegator_address: string;
        validator_address: string;
        pubkey: string;
        value: ICoin
      }

      constructor(data: {
        description: {
          moniker: string;
          identity?: string;
          website?: string;
          details?: string;
        };
        commission: {
          rate: string;
          maxRate: string;
          maxChangeRate: string;
        };
        minSelfDelegation: string;
        delegatorAddress: string;
        validatorAddress: string;
        pubKey: string;
        value: ICoin;
      })
    }

    class Delegate {
      type: 'cosmos-sdk/MsgDelegate';
      value: {
        delegator_address: string;
        validator_address: string;
        amount: ICoin;
      }

      constructor(data: {
        delegatorAddress: string;
        validatorAddress: string;
        amount: ICoin;
      })
    }

    class EditValidator {
      type: 'cosmos-sdk/MsgEditValidator';
      value: {
        description: {
          moniker: string;
          identity: string;
          website: string;
          details: string;
        };
        address: string;
        commission_rate?: string;
        min_self_delegation?: string
      }

      constructor(data: {
        description: {
          moniker?: string;
          identity?: string;
          website?: string;
          details?: string;
        };
        address: string;
        commissionRate?: string;
        minSelfDelegation?: string;
      })
    }

    class Redelegate {
      type: 'cosmos-sdk/MsgBeginRedelegate';
      value: {
        delegator_address: string;
        validator_src_address: string;
        validator_dst_address: string;
        amount: ICoin;
      }

      constructor(data: {
        delegatorAddress: string;
        validatorSrcAddress: string;
        validatorDstAddress: string;
        amount: ICoin;
      })
    }

    class Undelegate {
      type: 'cosmos-sdk/MsgUndelegate';
      value: {
        delegator_address: string;
        validator_address: string;
        amount: ICoin;
      }

      constructor(data: {
        delegatorAddress: string;
        validatorAddress: string;
        amount: ICoin;
      })
    }
  }
}

export namespace crypto {
  function checkAddress(address: string, hrp: string): boolean;
  function decodeAddress(value: string): Buffer;
  function encodeAddress(value: string, prefix?: string, type?: string): string;
  function generateKeyStore(privateKeyHex: string, password?: string): object;
  function generateMnemonic(): string;
  function generatePrivateKey(): string;
  function generateSignature(signBytesHex: string, privateKey: string | Buffer): string;
  function generateSignatureFromHash(signHash: string, privateKey: string | Buffer): string;
  function getAddressFromPrivateKey(privateKeyHex: string, prefix: string): string;
  function getAddressFromPublicKey(publicKeyHex: string, prefix: string): string;
  function getPrivateKeyFromKeyStore(keystore: object, password?: string): string;
  function getPrivateKeyFromMnemonic(mnemonic: string, derive?: boolean, index?: number, password?: string): string;
  function getPublicKeyFromPrivateKey(privateKeyHex: string): string;
  function validateMnemonic(mnemonic: string): boolean;
  function verifySignature(sigHex: string, signBytesHex: string, publicKeyHex: string): boolean;
}

export namespace utils {
  function ab2hexstring(arr: any): any;
  function ab2str(buf: any): any;
  function ensureHex(str: any): void;
  function hexXor(str1: any, str2: any): any;
  function hexstring2ab(str: any): any;
  function hexstring2str(hexstring: any): any;
  function int2hex(num: any): any;
  function isHex(str: any): any;
  function num2VarInt(num: any): any;
  function num2hexstring(num: any, ...args: any[]): any;
  function reverseArray(arr: any): any;
  function reverseHex(hex: any): any;
  function sha256(hex: any): any;
  function sha256ripemd160(hex: any): any;
  function sha3(hex: any): any;
  function str2ab(str: any): any;
  function str2hexstring(str: any): any;

  namespace encoding {
      function sortJsonProperties(jsonTx: any): any;
  }

  namespace validate {
      function checkParams(...args: any[]): any;
  }
}

interface IEncodedTx {
  type: string;
  value: {
    msg: Array<IMsg>;
    fee: IFee;
    signatures: Array<ISignature>;
    memo: string;
  }
}

export namespace encoding {
  function encodeTx(decodedTx: IEncodedTx): string;
  function decodeTx(encodedTxString: string): IEncodedTx;
}
