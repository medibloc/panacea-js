import Client from './Client';
import { APIS } from '../../config';

const { DISTRIBUTION } = APIS;

class Distribution extends Client {
  constructor(serverUrl) {
    super(serverUrl);
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
    return this.postRequest(DISTRIBUTION.delegatorRewardByValidator, [delegatorAddr, validatorAddr], tx);
  }

  getnerateReplaceWithdrawAddrTx(delegatorAddr, tx) {
    return this.postRequest(DISTRIBUTION.delegatorWithdrawAddress, [delegatorAddr], tx);
  }

  generateWithdrawValidatorRewardTx(validatorAddr, tx) {
    return this.postRequest(DISTRIBUTION.validatorReward, [validatorAddr], tx);
  }
}

export default Distribution;
