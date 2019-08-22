import { MSG_TYPE } from '../../config';
import { checkParams } from '../utils/validate';

const { DISTR } = MSG_TYPE;

class WithdrawReward {
  constructor(data) {
    const requiredParams = ['delegatorAddress', 'delegatorAddress'];
    checkParams(requiredParams, data);

    this.type = DISTR.WITHDRAW_DELEGATION_REWARD;
    this.value = {
      delegator_address: data.delegatorAddress, // it can be an validator operator address to withdraw validator reward
      validator_address: data.validatorAddress,
    }
  }
}

class ModifyWithdrawAddress {
  constructor(data) {
    const requiredParams = ['delegatorAddress', 'withdrawAddress'];
    checkParams(requiredParams, data);

    this.type = DISTR.MODIFY_WITHDRAW_ADDR;
    this.value = {
      delegator_address: data.delegatorAddress,
      withdraw_address: data.withdrawAddress,
    }
  }
}

export {
  WithdrawReward,
  ModifyWithdrawAddress,
};
