import axios from 'axios';
import { QUERY } from '../../config';

const PARAM = '<parameter>';
const apis = {
  nodeInfo: '/node_info',
  syncStatus: '/syncing',
  latestBlock: '/blocks/latest',
  block: `/blocks/${PARAM}`,
  latestValidatorSets: '/validatorsets/latest',
  validatorSets: `/validatorsets/${PARAM}`,
  tx: `/txs/${PARAM}`,
  txs: '/txs',
  balance: `/bank/balances/${PARAM}`,
  delegatorReward: `/distribution/delegators/${PARAM}/rewards`,
  delegatorRewardByValidator: `/distribution/delegators/${PARAM}/rewards/${PARAM}`,
  delegatorWithdrawAddress: `/distribution/delegators/${PARAM}/withdraw_address`,
  validatorDistributionInfo: `/distribution/validators/${PARAM}`,
  validatorOutstandingRewards: `/distribution/validators/${PARAM}/outstanding_rewards`,
  validatorReward: `/distribution/validators/${PARAM}/rewards`,
  communityPool: '/distribution/community_pool',
  distributionParams: '/distribution/parameters',
  delegator: `/staking/delegators/${PARAM}/delegations`,
  delegatorInfoFromValidator: `/staking/delegators/${PARAM}/delegations/${PARAM}`,
  delegatorUnbondingInfo: `/staking/delegators/${PARAM}/unbonding_delegations`,
  delegatorUnbondingInfoFromValidator: `/staking/delegators/${PARAM}/unbonding_delegations/${PARAM}`,
  redelegations: '/staking/redelegations',
  validatorsFromDelegator: `/staking/delegators/${PARAM}/validators`,
  validatorFromDelegator: `/staking/delegators/${PARAM}/validators/${PARAM}`,
  delegatorTxs: `/staking/delegators/${PARAM}/txs`,
  candidates: '/staking/validators',
  validator: `/staking/validators/${PARAM}`,
  delegatorsByValidator: `/staking/validators/${PARAM}/delegations`,
  unbondingDelegatorsByValidator: `/staking/validators/${PARAM}/unbonding_delegations`,
  stakingPool: '/staking/pool',
  stakingParams: '/staking/parameters',
  validatorSigningInfo: `/slashing/validators/${PARAM}/signing_info`,
  validatorsSigningInfo: '/slashing/signing_infos',
  slashingParams: '/slashing/parameters',
  proposals: '/gov/proposals',
  proposal: `/gov/proposals/${PARAM}`,
  proposer: `/gov/proposals/${PARAM}/proposer`,
  proposalDeposit: `/gov/proposals/${PARAM}/deposits`,
  proposalDepositFromDepositor: `/gov/proposals/${PARAM}/deposits/${PARAM}`,
  proposalVotes: `/gov/proposals/${PARAM}/votes`,
  proposalVoteFromVoter: `/gov/proposals/${PARAM}/votes/${PARAM}`,
  proposalTally: `/gov/proposals/${PARAM}/tally`,
  govDepositParams: '/gov/parameters/deposit',
  govTallyParams: '/gov/parameters/tallying',
  govVoteParams: '/gov/parameters/voting',
  mintParams: '/minting/parameters',
  inflation: '/minting/inflation',
  annualProvisions: '/minting/annual-provisions',
  topics: `/api/v1/aol/${PARAM}/topics`,
  topic: `/api/v1/aol/${PARAM}/topics/${PARAM}`,
  writers: `/api/v1/aol/${PARAM}/topics/${PARAM}/acl`,
  writer: `/api/v1/aol/${PARAM}/topics/${PARAM}/acl/${PARAM}`,
  record: `/api/v1/aol/${PARAM}/topics/${PARAM}/records/${PARAM}`,
  account: `/auth/accounts/${PARAM}`,
  nodeVersion: '/node_version',

};

const queryList = {
  candidatesStatus: ['bonded', 'unbonded', 'unbonding'],
};

class Client {
  constructor(serverUrl) {
    if (!serverUrl) {
      throw new Error('Panacea chain server should not be null');
    }

    this.serverUrl = serverUrl;
  }

  getRequest(url, params = [], query = {}) {
    // Inject params to the url
    if (!params) params = [];
    const paramsCount = (url.match(new RegExp(PARAM, 'g')) || []).length;
    if (paramsCount !== params.length) {
      throw new Error(`This request requires ${paramsCount} parameters in ${url}, but you entered ${params.length}`);
    }
    params.forEach((param) => {
      url = url.replace(PARAM, param);
    });

    // Remove empty query
    Object.keys(query).forEach((k) => {
      if (!query[k]) delete query[k];
    });

    return axios.get(this.serverUrl + url, { params: query })
      .then(({ data }) => data)
  }

  getNodeInfo() { return this.getRequest(apis.nodeInfo); }
  getSyncStatus() { return this.getRequest(apis.syncStatus); }
  getLatestBlock() { return this.getRequest(apis.latestBlock); }
  getBlock(height) { return this.getRequest(apis.block, [height]); }
  getLatestValidatorSets() { return this.getRequest(apis.latestValidatorSets); }
  getValidatorSets(height) { return this.getRequest(apis.validatorSets, [height]); }
  getTx(hash) { return this.getRequest(apis.tx, [hash]); }
  getTxs(opts = { tags: '', page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    return this.getRequest(apis.txs, null, { ...opts.tags, page: opts.page, limit: opts.limit }); }
  getBalance(address) { return this.getRequest(apis.balance, [address]); }
  getDelegatorRewards(delegatorAddr) { return this.getRequest(apis.delegatorReward, [delegatorAddr]); }
  getDelegatorRewardFromValidator(delegatorAddr, validatorAddr) {
    return this.getRequest(apis.delegatorRewardByValidator, [delegatorAddr, validatorAddr]);
  }
  getDelegatorWithdrawAddress(delegatorAddr) { return this.getRequest(apis.delegatorWithdrawAddress, [delegatorAddr]); }
  getValidatorDistributionInfo(validatorAddr) { return this.getRequest(apis.validatorDistributionInfo, [validatorAddr]); }
  getValidatorOutstandingReward(validatorAddr) { return this.getRequest(apis.validatorOutstandingRewards, [validatorAddr]); }
  getValidatorReward(validatorAddr) { return this.getRequest(apis.validatorReward, [validatorAddr]); }
  getCommunityPoolBalance() { return this.getRequest(apis.communityPool); }
  getDistributionParams() { return this.getRequest(apis.distributionParams); }
  getDelagatorInfo(delegatorAddr) { return this.getRequest(apis.delegator, [delegatorAddr]); }
  getDelegatorInfoFromValidator(delegatorAddr, validatorAddr) {
    return this.getRequest(apis.delegatorInfoFromValidator, [delegatorAddr, validatorAddr]);
  }
  getDelegatorUnbondingInfo(delegatorAddr) { return this.getRequest(apis.delegatorUnbondingInfo, [delegatorAddr]); }
  getDelegatorUnbondingInfoFromValidator(delegatorAddr, validatorAddr) {
    return this.getRequest(apis.delegatorUnbondingInfoFromValidator, [delegatorAddr, validatorAddr]);
  }
  getRedelegations() { return this.getRequest(apis.redelegations); }
  getValidatorsFromDelegator(delegatorAddr) { return this.getRequest(apis.validatorsFromDelegator, [delegatorAddr]); }
  getValidatorFromDelegator(delegatorAddr, validatorAddr) {
    return this.getRequest(apis.validatorFromDelegator, [delegatorAddr, validatorAddr]);
  }
  getDelegatorStakingTxs(delegatorAddr) { return this.getRequest(apis.delegatorTxs, [delegatorAddr]); }
  getCandidates(opts = { status: '', page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    if (!queryList.candidatesStatus.includes(status)) throw new Error(`invalid validator status : ${status}`);
    return this.getRequest(apis.candidates, null, opts);
  }
  getValidator(validatorAddr) { return this.getRequest(apis.validator, [validatorAddr]); }
  getDelegatorsByValidator(validatorAddr) { return this.getRequest(apis.delegatorsByValidator, [validatorAddr]); }
  getUnbondingDelegatorsByValidator(validatorAddr) { return this.getRequest(apis.unbondingDelegatorsByValidator, [validatorAddr]); }
  getStakingPool() { return this.getRequest(apis.stakingPool); }
  getStakingParams() { return this.getRequest(apis.stakingParams); }
  getValidatorSigningInfo(validatorPubKey) { return this.getRequest(apis.validatorSigningInfo, [validatorPubKey]); }
  getValidatorsSigningInfo(opts = { page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    return this.getRequest(apis.validatorsSigningInfo, null, opts);
  }
  getSlashingParams() { return this.getRequest(apis.slashingParams); }
  getProposals(opts = { voter: '', depositor: '', status: '' }) { return this.getRequest(apis.proposals, null, opts) }
  getProposal(proposalId) { return this.getRequest(apis.proposal, [proposalId]); }
  getProposer(proposalId) { return this.getRequest(apis.proposer, [proposalId]); }
  getProposalDeposit(proposalId) { return this.getRequest(apis.proposalDeposit, [proposalId]); }
  getProposalDepositFromDepositor(proposalId, depositorAddr) {
    return this.getRequest(apis.proposalDepositFromDepositor, [proposalId, depositorAddr]);
  }
  getProposalVotes(proposalId) { return this.getRequest(apis.proposalVotes, [proposalId]); }
  getProposalVoteFromVoter(proposalId, voterAddr) { return this.getRequest(apis.proposalVoteFromVoter, [proposalId, voterAddr]); }
  getProposalTally(proposalId) { return this.getRequest(apis.proposalTally, [proposalId]); }
  getGovDepositParams() { return this.getRequest(apis.govDepositParams); }
  getGovTallyParams() { return this.getRequest(apis.govTallyParams); }
  getGovVoteParams() { return this.getRequest(apis.govVoteParams); }
  getMintParams() { return this.getRequest(apis.mintParams); }
  getInflation() { return this.getRequest(apis.inflation); }
  getAnnualProvisions() { return this.getRequest(apis.annualProvisions); }
  getTopics(ownerAddr) { return this.getRequest(apis.topics, [ownerAddr]); }
  getTopic(ownerAddr, topic) { return this.getRequest(apis.topic, [ownerAddr, topic]); }
  getWriters(ownerAddr, topic) { return this.getRequest(apis.writers, [ownerAddr, topic]); }
  getWriter(ownerAddr, topic, writerAddr) { return this.getRequest(apis.writer, [ownerAddr, topic, writerAddr]); }
  getRecord(ownerAddr, topic, offset) { return this.getRequest(apis.record, [ownerAddr, topic, offset]); }
  getAccount(address) { return this.getRequest(apis.account, [address]); }
  getVersion() { return this.getRequest(apis.version); }
  getNodeVersion() { return this.getRequest(apis.nodeVersion); }
}

export default Client;
