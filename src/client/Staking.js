import Client from './Client';
import { APIS, QUERY, QUERY_LIST } from '../../config/default';

const { STAKING } = APIS;
const { CANDIDATES_STATES } = QUERY_LIST;

class Staking extends Client {
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
