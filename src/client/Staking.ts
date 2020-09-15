import Client from './Client';
import { APIS, QUERY, QUERY_LIST } from '../config/default';

const { STAKING } = APIS;
const { CANDIDATES_STATES } = QUERY_LIST;

export default class Staking extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getDelagatorInfo = this.getDelagatorInfo.bind(this);
    this.getDelegatorInfoFromValidator = this.getDelegatorInfoFromValidator.bind(this);
    this.getDelegatorUnbondingInfo = this.getDelegatorUnbondingInfo.bind(this);
    this.getDelegatorUnbondingInfoFromValidator =
      this.getDelegatorUnbondingInfoFromValidator.bind(this);
    this.getRedelegations = this.getRedelegations.bind(this);
    this.getValidatorsFromDelegator = this.getValidatorsFromDelegator.bind(this);
    this.getValidatorFromDelegator = this.getValidatorFromDelegator.bind(this);
    this.getDelegatorStakingTxs = this.getDelegatorStakingTxs.bind(this);
    this.getCandidates = this.getCandidates.bind(this);
    this.getValidator = this.getValidator.bind(this);
    this.getDelegatorsByValidator = this.getDelegatorsByValidator.bind(this);
    this.getUnbondingDelegatorsByValidator = this.getUnbondingDelegatorsByValidator.bind(this);
    this.getStakingPool = this.getStakingPool.bind(this);
    this.getStakingParams = this.getStakingParams.bind(this);
    this.generateDelegateTx = this.generateDelegateTx.bind(this);
    this.generateUnbondingTx = this.generateUnbondingTx.bind(this);
    this.generateRedelegateTx = this.generateRedelegateTx.bind(this);
  }

  /**
   * GET
   * */
  //TODO @youngjoon-lee: use a proper type for Promise
  getDelagatorInfo(delegatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.delegator, [delegatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getDelegatorInfoFromValidator(delegatorAddr: string, validatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.delegatorInfoFromValidator, [delegatorAddr, validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getDelegatorUnbondingInfo(delegatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.delegatorUnbonding, [delegatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getDelegatorUnbondingInfoFromValidator(delegatorAddr: string, validatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.delegatorUnbondingFromValidator, [delegatorAddr, validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getRedelegations(): Promise<any> {
    return this.getRequest(STAKING.redelegations);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getValidatorsFromDelegator(delegatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.validatorsFromDelegator, [delegatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getValidatorFromDelegator(delegatorAddr: string, validatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.validatorFromDelegator, [delegatorAddr, validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getDelegatorStakingTxs(delegatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.delegatorTxs, [delegatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getCandidates(opts = { status: '', page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }): Promise<any> {
    if (!CANDIDATES_STATES.includes(opts.status)) throw new Error(`invalid validator status : ${opts.status}`);
    return this.getRequest(STAKING.candidates, null, opts);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getValidator(validatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.validator, [validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getDelegatorsByValidator(validatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.delegatorsByValidator, [validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getUnbondingDelegatorsByValidator(validatorAddr: string): Promise<any> {
    return this.getRequest(STAKING.unbondingDelegatorsByValidator, [validatorAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getStakingPool(): Promise<any> {
    return this.getRequest(STAKING.stakingPool);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getStakingParams(): Promise<any> {
    return this.getRequest(STAKING.params);
  }

  /**
   * POST
   * */
  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateDelegateTx(delegatorAddr: string, tx: any): Promise<any> {
    return this.postRequest(STAKING.delegator, [delegatorAddr], tx);
  }

  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateUnbondingTx(delegatorAddr: string, tx: any): Promise<any> {
    return this.postRequest(STAKING.delegatorUnbonding, [delegatorAddr], tx);
  }

  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateRedelegateTx(delegatorAddr: string, tx: any): Promise<any> {
    return this.postRequest(STAKING.redelegation, [delegatorAddr], tx);
  }
}
