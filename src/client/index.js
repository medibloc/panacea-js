import axios from 'axios';
import { APIS, QUERY, PARAM } from '../../config';

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
      .catch(console.log)
  }

  getNodeInfo() { return this.getRequest(APIS.nodeInfo); }
  getSyncStatus() { return this.getRequest(APIS.syncStatus); }
  getLatestBlock() { return this.getRequest(APIS.latestBlock); }
  getBlock(height) { return this.getRequest(APIS.block, [height]); }
  getLatestValidatorSets() { return this.getRequest(APIS.latestValidatorSets); }
  getValidatorSets(height) { return this.getRequest(APIS.validatorSets, [height]); }
  getTx(hash) { return this.getRequest(APIS.tx, [hash]); }
  getTxs(opts = { tags: '', page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    return this.getRequest(APIS.txs, null, { ...opts.tags, page: opts.page, limit: opts.limit }); }
  getBalance(address) { return this.getRequest(APIS.balance, [address]); }
  getDelegatorRewards(delegatorAddr) { return this.getRequest(APIS.delegatorReward, [delegatorAddr]); }
  getDelegatorRewardFromValidator(delegatorAddr, validatorAddr) {
    return this.getRequest(APIS.delegatorRewardByValidator, [delegatorAddr, validatorAddr]);
  }
  getDelegatorWithdrawAddress(delegatorAddr) { return this.getRequest(APIS.delegatorWithdrawAddress, [delegatorAddr]); }
  getValidatorDistributionInfo(validatorAddr) { return this.getRequest(APIS.validatorDistributionInfo, [validatorAddr]); }
  getValidatorOutstandingReward(validatorAddr) { return this.getRequest(APIS.validatorOutstandingRewards, [validatorAddr]); }
  getValidatorReward(validatorAddr) { return this.getRequest(APIS.validatorReward, [validatorAddr]); }
  getCommunityPoolBalance() { return this.getRequest(APIS.communityPool); }
  getDistributionParams() { return this.getRequest(APIS.distributionParams); }
  getDelagatorInfo(delegatorAddr) { return this.getRequest(APIS.delegator, [delegatorAddr]); }
  getDelegatorInfoFromValidator(delegatorAddr, validatorAddr) {
    return this.getRequest(APIS.delegatorInfoFromValidator, [delegatorAddr, validatorAddr]);
  }
  getDelegatorUnbondingInfo(delegatorAddr) { return this.getRequest(APIS.delegatorUnbondingInfo, [delegatorAddr]); }
  getDelegatorUnbondingInfoFromValidator(delegatorAddr, validatorAddr) {
    return this.getRequest(APIS.delegatorUnbondingInfoFromValidator, [delegatorAddr, validatorAddr]);
  }
  getRedelegations() { return this.getRequest(APIS.redelegations); }
  getValidatorsFromDelegator(delegatorAddr) { return this.getRequest(APIS.validatorsFromDelegator, [delegatorAddr]); }
  getValidatorFromDelegator(delegatorAddr, validatorAddr) {
    return this.getRequest(APIS.validatorFromDelegator, [delegatorAddr, validatorAddr]);
  }
  getDelegatorStakingTxs(delegatorAddr) { return this.getRequest(APIS.delegatorTxs, [delegatorAddr]); }
  getCandidates(opts = { status: '', page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    if (!queryList.candidatesStatus.includes(opts.status)) throw new Error(`invalid validator status : ${opts.status}`);
    return this.getRequest(APIS.candidates, null, opts);
  }
  getValidator(validatorAddr) { return this.getRequest(APIS.validator, [validatorAddr]); }
  getDelegatorsByValidator(validatorAddr) { return this.getRequest(APIS.delegatorsByValidator, [validatorAddr]); }
  getUnbondingDelegatorsByValidator(validatorAddr) { return this.getRequest(APIS.unbondingDelegatorsByValidator, [validatorAddr]); }
  getStakingPool() { return this.getRequest(APIS.stakingPool); }
  getStakingParams() { return this.getRequest(APIS.stakingParams); }
  getValidatorSigningInfo(validatorPubKey) { return this.getRequest(APIS.validatorSigningInfo, [validatorPubKey]); }
  getValidatorsSigningInfo(opts = { page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    return this.getRequest(APIS.validatorsSigningInfo, null, opts);
  }
  getSlashingParams() { return this.getRequest(APIS.slashingParams); }
  getProposals(opts = { voter: '', depositor: '', status: '' }) { return this.getRequest(APIS.proposals, null, opts) }
  getProposal(proposalId) { return this.getRequest(APIS.proposal, [proposalId]); }
  getProposer(proposalId) { return this.getRequest(APIS.proposer, [proposalId]); }
  getProposalDeposit(proposalId) { return this.getRequest(APIS.proposalDeposit, [proposalId]); }
  getProposalDepositFromDepositor(proposalId, depositorAddr) {
    return this.getRequest(APIS.proposalDepositFromDepositor, [proposalId, depositorAddr]);
  }
  getProposalVotes(proposalId) { return this.getRequest(APIS.proposalVotes, [proposalId]); }
  getProposalVoteFromVoter(proposalId, voterAddr) { return this.getRequest(APIS.proposalVoteFromVoter, [proposalId, voterAddr]); }
  getProposalTally(proposalId) { return this.getRequest(APIS.proposalTally, [proposalId]); }
  getGovDepositParams() { return this.getRequest(APIS.govDepositParams); }
  getGovTallyParams() { return this.getRequest(APIS.govTallyParams); }
  getGovVoteParams() { return this.getRequest(APIS.govVoteParams); }
  getMintParams() { return this.getRequest(APIS.mintParams); }
  getInflation() { return this.getRequest(APIS.inflation); }
  getAnnualProvisions() { return this.getRequest(APIS.annualProvisions); }
  getTopics(ownerAddr) { return this.getRequest(APIS.topics, [ownerAddr]); }
  getTopic(ownerAddr, topic) { return this.getRequest(APIS.topic, [ownerAddr, topic]); }
  getWriters(ownerAddr, topic) { return this.getRequest(APIS.writers, [ownerAddr, topic]); }
  getWriter(ownerAddr, topic, writerAddr) { return this.getRequest(APIS.writer, [ownerAddr, topic, writerAddr]); }
  getRecord(ownerAddr, topic, offset) { return this.getRequest(APIS.record, [ownerAddr, topic, offset]); }
  getAccount(address) { return this.getRequest(APIS.account, [address]); }
  getVersion() { return this.getRequest(APIS.version); }
  getNodeVersion() { return this.getRequest(APIS.nodeVersion); }
}

export default Client;
