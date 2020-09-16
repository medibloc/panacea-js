import { MSG_TYPE } from '../config/default';
import { checkParams } from '../utils/validate';

const { DISTR } = MSG_TYPE;

export class WithdrawReward {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
    const requiredParams = ['delegatorAddress', 'delegatorAddress'];
    checkParams(requiredParams, data);

    this.type = DISTR.WITHDRAW_DELEGATION_REWARD;
    this.value = {
      // it can be an validator operator address to withdraw validator reward
      delegator_address: data.delegatorAddress,
      validator_address: data.validatorAddress,
    };
  }
}

export class ModifyWithdrawAddress {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
    const requiredParams = ['delegatorAddress', 'withdrawAddress'];
    checkParams(requiredParams, data);

    this.type = DISTR.MODIFY_WITHDRAW_ADDR;
    this.value = {
      delegator_address: data.delegatorAddress,
      withdraw_address: data.withdrawAddress,
    };
  }
}
