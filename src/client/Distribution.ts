import Client from './Client';
import { APIS } from '../config/default';

const { DISTRIBUTION } = APIS;

export default class Distribution extends Client {
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
  //TODO @youngjoon-lee: use a proper type for Promise
  getDelegatorRewards(delegatorAddr: string): Promise<any> {
    return this.getRequest(DISTRIBUTION.delegatorReward, [delegatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getDelegatorRewardFromValidator(delegatorAddr: string, validatorAddr: string): Promise<any> {
    return this.getRequest(DISTRIBUTION.delegatorRewardByValidator, [delegatorAddr, validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getDelegatorWithdrawAddress(delegatorAddr: string): Promise<any> {
    return this.getRequest(DISTRIBUTION.delegatorWithdrawAddress, [delegatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getValidatorDistributionInfo(validatorAddr: string): Promise<any> {
    return this.getRequest(DISTRIBUTION.validatorDistributionInfo, [validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getValidatorOutstandingReward(validatorAddr: string): Promise<any> {
    return this.getRequest(DISTRIBUTION.validatorOutstandingRewards, [validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getValidatorReward(validatorAddr: string): Promise<any> {
    return this.getRequest(DISTRIBUTION.validatorReward, [validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getCommunityPoolBalance(): Promise<any> {
    return this.getRequest(DISTRIBUTION.communityPool);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getDistributionParams(): Promise<any> {
    return this.getRequest(DISTRIBUTION.params);
  }

  /**
   * POST
   * */
  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateWithdrawRewardsTx(delegatorAddr: string, tx: any): Promise<any> {
    return this.postRequest(DISTRIBUTION.delegatorReward, [delegatorAddr], tx);
  }

  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateWithdrawRewardTx(delegatorAddr: string, validatorAddr: string, tx: any): Promise<any> {
    return this.postRequest(
      DISTRIBUTION.delegatorRewardByValidator,
      [delegatorAddr, validatorAddr], tx,
    );
  }

  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  getnerateReplaceWithdrawAddrTx(delegatorAddr: string, tx: any): Promise<any> {
    return this.postRequest(DISTRIBUTION.delegatorWithdrawAddress, [delegatorAddr], tx);
  }

  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateWithdrawValidatorRewardTx(validatorAddr: string, tx: any): Promise<any> {
    return this.postRequest(DISTRIBUTION.validatorReward, [validatorAddr], tx);
  }
}
