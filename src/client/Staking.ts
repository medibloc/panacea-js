import {Client} from './Client';
import { APIS, QUERY, QUERY_LIST } from '../config/default';
import {Transaction} from '../tx';

const { STAKING } = APIS;
const { CANDIDATES_STATES } = QUERY_LIST;

export class Staking extends Client {
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
  getDelagatorInfo(delegatorAddr: string): any {
    return this.getRequest(STAKING.delegator, [delegatorAddr]);
  }

  getDelegatorInfoFromValidator(delegatorAddr: string, validatorAddr: string): any {
    return this.getRequest(STAKING.delegatorInfoFromValidator, [delegatorAddr, validatorAddr]);
  }

  getDelegatorUnbondingInfo(delegatorAddr: string): any {
    return this.getRequest(STAKING.delegatorUnbonding, [delegatorAddr]);
  }

  getDelegatorUnbondingInfoFromValidator(delegatorAddr: string, validatorAddr: string): any {
    return this.getRequest(STAKING.delegatorUnbondingFromValidator, [delegatorAddr, validatorAddr]);
  }

  getRedelegations(): any {
    return this.getRequest(STAKING.redelegations);
  }

  getValidatorsFromDelegator(delegatorAddr: string): any {
    return this.getRequest(STAKING.validatorsFromDelegator, [delegatorAddr]);
  }

  getValidatorFromDelegator(delegatorAddr: string, validatorAddr: string): any {
    return this.getRequest(STAKING.validatorFromDelegator, [delegatorAddr, validatorAddr]);
  }

  getDelegatorStakingTxs(delegatorAddr: string): any {
    return this.getRequest(STAKING.delegatorTxs, [delegatorAddr]);
  }

  getCandidates(opts = { status: '', page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }): any {
    if (!CANDIDATES_STATES.includes(opts.status)) throw new Error(`invalid validator status : ${opts.status}`);
    return this.getRequest(STAKING.candidates, [], opts);
  }

  getValidator(validatorAddr: string): any {
    return this.getRequest(STAKING.validator, [validatorAddr]);
  }

  getDelegatorsByValidator(validatorAddr: string): any {
    return this.getRequest(STAKING.delegatorsByValidator, [validatorAddr]);
  }

  getUnbondingDelegatorsByValidator(validatorAddr: string): any {
    return this.getRequest(STAKING.unbondingDelegatorsByValidator, [validatorAddr]);
  }

  getStakingPool(): any {
    return this.getRequest(STAKING.stakingPool);
  }

  getStakingParams(): any {
    return this.getRequest(STAKING.params);
  }

  /**
   * POST
   * */
  generateDelegateTx(delegatorAddr: string, tx: Transaction): any {
    return this.postRequest(STAKING.delegator, [delegatorAddr], tx);
  }

  generateUnbondingTx(delegatorAddr: string, tx: Transaction): any {
    return this.postRequest(STAKING.delegatorUnbonding, [delegatorAddr], tx);
  }

  generateRedelegateTx(delegatorAddr: string, tx: Transaction): any {
    return this.postRequest(STAKING.redelegation, [delegatorAddr], tx);
  }
}
