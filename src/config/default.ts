/**
 * Crypto
 */
export const DEFAULT_PREFIX = 'panacea';
export const PRIVKEY_LEN = 32; // 32bytes
export const PRIVKEY_MAX = 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140'; // based on https://en.bitcoin.it/wiki/Secp256k1
export const MNEMONIC_LEN = 256; // 256 bit entropy
export const DECODED_ADDR_LEN = 20; // 20 byte
export const HD_PATH = "44'/371'/0'/0/";
export const CURVE = 'secp256k1';

/**
 * TX
 */
export const BROADCAST_MODE = ['sync', 'async', 'block'];
export const QUERY = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
};
export const QUERY_LIST = {
  CANDIDATES_STATES: ['bonded', 'unbonded', 'unbonding'],
};
export const PARAM = '<parameter>';
export const APIS = {
  ACCOUNT: {
    account: `/auth/accounts/${PARAM}`,
    balance: `/bank/balances/${PARAM}`,
    transferTx: `/bank/accounts/${PARAM}/transfers`,
  },
  AOL: {
    topics: `/api/v1/aol/${PARAM}/topics`,
    topic: `/api/v1/aol/${PARAM}/topics/${PARAM}`,
    writers: `/api/v1/aol/${PARAM}/topics/${PARAM}/acl`,
    writer: `/api/v1/aol/${PARAM}/topics/${PARAM}/acl/${PARAM}`,
    record: `/api/v1/aol/${PARAM}/topics/${PARAM}/records/${PARAM}`,
  },
  DID: {
    did: `/api/v1/did/${PARAM}`,
  },
  DISTRIBUTION: {
    delegatorReward: `/distribution/delegators/${PARAM}/rewards`,
    delegatorRewardByValidator: `/distribution/delegators/${PARAM}/rewards/${PARAM}`,
    delegatorWithdrawAddress: `/distribution/delegators/${PARAM}/withdraw_address`,
    validatorDistributionInfo: `/distribution/validators/${PARAM}`,
    validatorOutstandingRewards: `/distribution/validators/${PARAM}/outstanding_rewards`,
    validatorReward: `/distribution/validators/${PARAM}/rewards`,
    communityPool: '/distribution/community_pool',
    params: '/distribution/parameters',
  },
  GOVERNANCE: {
    proposals: '/gov/proposals',
    proposal: `/gov/proposals/${PARAM}`,
    proposer: `/gov/proposals/${PARAM}/proposer`,
    proposalDeposit: `/gov/proposals/${PARAM}/deposits`,
    proposalDepositFromDepositor: `/gov/proposals/${PARAM}/deposits/${PARAM}`,
    proposalVotes: `/gov/proposals/${PARAM}/votes`,
    proposalVoteFromVoter: `/gov/proposals/${PARAM}/votes/${PARAM}`,
    proposalTally: `/gov/proposals/${PARAM}/tally`,
    depositParams: '/gov/parameters/deposit',
    tallyParams: '/gov/parameters/tallying',
    voteParams: '/gov/parameters/voting',
  },
  MINTING: {
    params: '/minting/parameters',
    inflation: '/minting/inflation',
    annualProvisions: '/minting/annual-provisions',
  },
  SLASHING: {
    validatorSigningInfo: `/slashing/validators/${PARAM}/signing_info`,
    validatorsSigningInfo: '/slashing/signing_infos',
    params: '/slashing/parameters',
    unjail: `/slashing/validators/${PARAM}/unjail`,
  },
  STAKING: {
    delegator: `/staking/delegators/${PARAM}/delegations`,
    delegatorInfoFromValidator: `/staking/delegators/${PARAM}/delegations/${PARAM}`,
    delegatorUnbonding: `/staking/delegators/${PARAM}/unbonding_delegations`,
    delegatorUnbondingFromValidator: `/staking/delegators/${PARAM}/unbonding_delegations/${PARAM}`,
    redelegations: '/staking/redelegations',
    validatorsFromDelegator: `/staking/delegators/${PARAM}/validators`,
    validatorFromDelegator: `/staking/delegators/${PARAM}/validators/${PARAM}`,
    delegatorTxs: `/staking/delegators/${PARAM}/txs`,
    candidates: '/staking/validators',
    validator: `/staking/validators/${PARAM}`,
    delegatorsByValidator: `/staking/validators/${PARAM}/delegations`,
    unbondingDelegatorsByValidator: `/staking/validators/${PARAM}/unbonding_delegations`,
    stakingPool: '/staking/pool',
    params: '/staking/parameters',
    redelegation: `/staking/delegators/${PARAM}/redelegations`,
  },
  TENDERMINT: {
    nodeInfo: '/node_info',
    syncStatus: '/syncing',
    latestBlock: '/blocks/latest',
    block: `/blocks/${PARAM}`,
    latestValidatorSets: '/validatorsets/latest',
    validatorSets: `/validatorsets/${PARAM}`,
    tx: `/txs/${PARAM}`,
    txs: '/txs',
    encodeTx: '/txs/encode',
  },
  VERSION: {
    version: '/version',
    nodeVersion: '/node_version',
  },
};

/**
 * Message
 * */
export const MSG_TYPE = {
  AOL: {
    CREATE_TOPIC: 'aol/MsgCreateTopic',
    ADD_WRITER: 'aol/MsgAddWriter',
    ADD_RECORD: 'aol/MsgAddRecord',
    DELETE_WRITER: 'aol/MsgDeleteWriter',
  },
  DID: {
    CREATE_DID: 'did/MsgCreateDID',
    UPDATE_DID: 'did/MsgUpdateDID',
    DEACTIVATE_DID: 'did/MsgDeactivateDID',
  },
  BASE: {
    SEND: 'cosmos-sdk/MsgSend',
  },
  DISTR: {
    WITHDRAW_DELEGATION_REWARD: 'cosmos-sdk/MsgWithdrawDelegationReward',
    MODIFY_WITHDRAW_ADDR: 'cosmos-sdk/MsgModifyWithdrawAddress',
  },
  STAKING: {
    CREATE_VALIDATOR: 'cosmos-sdk/MsgCreateValidator',
    EDIT_VALIDATOR: 'cosmos-sdk/MsgEditValidator',
    DELEGATE: 'cosmos-sdk/MsgDelegate',
    REDELEGATE: 'cosmos-sdk/MsgBeginRedelegate',
    UNDELEGATE: 'cosmos-sdk/MsgUndelegate',
  },
  SLASHING: {
    UNJAIL: 'cosmos-sdk/MsgUnjail',
  },
};

/**
 * Coin
 * */
export const DEFAULT_DENOM = 'umed';
export const DEFAULT_GAS = '200000';
