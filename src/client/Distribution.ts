import Client from './Client';
import { APIS } from '../config/default';

const { DISTRIBUTION } = APIS;

class Distribution extends Client {
  constructor(serverUrl) {
    super(serverUrl);

    this.getDelegatorRewards = this.getDelegatorRewards.bind(this);
    this.getDelegatorRewardFromValidator = this.getDelegatorRewardFromValidator.bind(this);
    this.getDelegatorWithdrawAddress = this.getDelegatorWithdrawAddress.bind(this);
    this.getValidatorDistributionInfo = this.getValidatorDistributionInfo.bind(this);
    this.getValidatorOutstandingReward = this.getValidatorOutstandingReward.bind(this);
    this.getValidatorReward = this.getValidatorReward.bind(this);
    this.getCommunityPoolBalance = this.getCommunityPoolBalance.bind(this);
    this.getDistributionParams = this.getDistributionParams.bind(this);
    this.generateWithdrawRewardsTx = this.generateWithdrawRewardsTx.bind(this);
    this.generateWithdrawRewardTx = this.generateWithdrawRewardTx.bind(this);
    this.getnerateReplaceWithdrawAddrTx = this.getnerateReplaceWithdrawAddrTx.bind(this);
    this.generateWithdrawValidatorRewardTx = this.generateWithdrawValidatorRewardTx.bind(this);
  }

  /**
   * GET
   * */
  getDelegatorRewards(delegatorAddr) {
    return this.getRequest(DISTRIBUTION.delegatorReward, [delegatorAddr]);
  }

  getDelegatorRewardFromValidator(delegatorAddr, validatorAddr) {
    return this.getRequest(DISTRIBUTION.delegatorRewardByValidator, [delegatorAddr, validatorAddr]);
  }

  getDelegatorWithdrawAddress(delegatorAddr) {
    return this.getRequest(DISTRIBUTION.delegatorWithdrawAddress, [delegatorAddr]);
  }

  getValidatorDistributionInfo(validatorAddr) {
    return this.getRequest(DISTRIBUTION.validatorDistributionInfo, [validatorAddr]);
  }

  getValidatorOutstandingReward(validatorAddr) {
    return this.getRequest(DISTRIBUTION.validatorOutstandingRewards, [validatorAddr]);
  }

  getValidatorReward(validatorAddr) {
    return this.getRequest(DISTRIBUTION.validatorReward, [validatorAddr]);
  }

  getCommunityPoolBalance() {
    return this.getRequest(DISTRIBUTION.communityPool);
  }

  getDistributionParams() {
    return this.getRequest(DISTRIBUTION.params);
  }

  /**
   * POST
   * */
  generateWithdrawRewardsTx(delegatorAddr, tx) {
    return this.postRequest(DISTRIBUTION.delegatorReward, [delegatorAddr], tx);
  }

  generateWithdrawRewardTx(delegatorAddr, validatorAddr, tx) {
    return this.postRequest(
      DISTRIBUTION.delegatorRewardByValidator,
      [delegatorAddr, validatorAddr], tx,
    );
  }

  getnerateReplaceWithdrawAddrTx(delegatorAddr, tx) {
    return this.postRequest(DISTRIBUTION.delegatorWithdrawAddress, [delegatorAddr], tx);
  }

  generateWithdrawValidatorRewardTx(validatorAddr, tx) {
    return this.postRequest(DISTRIBUTION.validatorReward, [validatorAddr], tx);
  }
}

export default Distribution;
