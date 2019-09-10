import Client from './Client';
import { APIS, QUERY, QUERY_LIST } from '../config/default';

const { STAKING } = APIS;
const { CANDIDATES_STATES } = QUERY_LIST;

class Staking extends Client {
  constructor(serverUrl) {
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
  getDelagatorInfo(delegatorAddr) {
    return this.getRequest(STAKING.delegator, [delegatorAddr]);
  }

  getDelegatorInfoFromValidator(delegatorAddr, validatorAddr) {
    return this.getRequest(STAKING.delegatorInfoFromValidator, [delegatorAddr, validatorAddr]);
  }

  getDelegatorUnbondingInfo(delegatorAddr) {
    return this.getRequest(STAKING.delegatorUnbonding, [delegatorAddr]);
  }

  getDelegatorUnbondingInfoFromValidator(delegatorAddr, validatorAddr) {
    return this.getRequest(STAKING.delegatorUnbondingFromValidator, [delegatorAddr, validatorAddr]);
  }

  getRedelegations() {
    return this.getRequest(STAKING.redelegations);
  }

  getValidatorsFromDelegator(delegatorAddr) {
    return this.getRequest(STAKING.validatorsFromDelegator, [delegatorAddr]);
  }

  getValidatorFromDelegator(delegatorAddr, validatorAddr) {
    return this.getRequest(STAKING.validatorFromDelegator, [delegatorAddr, validatorAddr]);
  }

  getDelegatorStakingTxs(delegatorAddr) {
    return this.getRequest(STAKING.delegatorTxs, [delegatorAddr]);
  }

  getCandidates(opts = { status: '', page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    if (!CANDIDATES_STATES.includes(opts.status)) throw new Error(`invalid validator status : ${opts.status}`);
    return this.getRequest(STAKING.candidates, null, opts);
  }

  getValidator(validatorAddr) {
    return this.getRequest(STAKING.validator, [validatorAddr]);
  }

  getDelegatorsByValidator(validatorAddr) {
    return this.getRequest(STAKING.delegatorsByValidator, [validatorAddr]);
  }

  getUnbondingDelegatorsByValidator(validatorAddr) {
    return this.getRequest(STAKING.unbondingDelegatorsByValidator, [validatorAddr]);
  }

  getStakingPool() {
    return this.getRequest(STAKING.stakingPool);
  }

  getStakingParams() {
    return this.getRequest(STAKING.params);
  }

  /**
   * POST
   * */
  generateDelegateTx(delegatorAddr, tx) {
    return this.postRequest(STAKING.delegator, [delegatorAddr], tx);
  }

  generateUnbondingTx(delegatorAddr, tx) {
    return this.postRequest(STAKING.delegatorUnbonding, [delegatorAddr], tx);
  }

  generateRedelegateTx(delegatorAddr, tx) {
    return this.postRequest(STAKING.redelegation, [delegatorAddr], tx);
  }
}

export default Staking;
