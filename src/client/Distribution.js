import Client from './Client';
import { APIS } from '../../config';

const { DISTRIBUTION } = APIS;

class Distribution extends Client {
  constructor(serverUrl) {
    super(serverUrl);
  }

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
}

export default Distribution;
