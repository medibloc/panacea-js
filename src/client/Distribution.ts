import {Client} from './Client';
import { APIS } from '../config/default';
import {Transaction} from '../tx';

const { DISTRIBUTION } = APIS;

export class Distribution extends Client {
  constructor(serverUrl: string) {
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
  getDelegatorRewards(delegatorAddr: string): any {
    return this.getRequest(DISTRIBUTION.delegatorReward, [delegatorAddr]);
  }

  getDelegatorRewardFromValidator(delegatorAddr: string, validatorAddr: string): any {
    return this.getRequest(DISTRIBUTION.delegatorRewardByValidator, [delegatorAddr, validatorAddr]);
  }

  getDelegatorWithdrawAddress(delegatorAddr: string): any {
    return this.getRequest(DISTRIBUTION.delegatorWithdrawAddress, [delegatorAddr]);
  }

  getValidatorDistributionInfo(validatorAddr: string): any {
    return this.getRequest(DISTRIBUTION.validatorDistributionInfo, [validatorAddr]);
  }

  getValidatorOutstandingReward(validatorAddr: string): any {
    return this.getRequest(DISTRIBUTION.validatorOutstandingRewards, [validatorAddr]);
  }

  getValidatorReward(validatorAddr: string): any {
    return this.getRequest(DISTRIBUTION.validatorReward, [validatorAddr]);
  }

  getCommunityPoolBalance(): any {
    return this.getRequest(DISTRIBUTION.communityPool);
  }

  getDistributionParams(): any {
    return this.getRequest(DISTRIBUTION.params);
  }

  /**
   * POST
   * */
  generateWithdrawRewardsTx(delegatorAddr: string, tx: Transaction): any {
    return this.postRequest(DISTRIBUTION.delegatorReward, [delegatorAddr], tx);
  }

  generateWithdrawRewardTx(delegatorAddr: string, validatorAddr: string, tx: Transaction): any {
    return this.postRequest(
      DISTRIBUTION.delegatorRewardByValidator,
      [delegatorAddr, validatorAddr], tx,
    );
  }

  getnerateReplaceWithdrawAddrTx(delegatorAddr: string, tx: Transaction): any {
    return this.postRequest(DISTRIBUTION.delegatorWithdrawAddress, [delegatorAddr], tx);
  }

  generateWithdrawValidatorRewardTx(validatorAddr: string, tx: Transaction): any {
    return this.postRequest(DISTRIBUTION.validatorReward, [validatorAddr], tx);
  }
}
