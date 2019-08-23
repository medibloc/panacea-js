import { MSG_TYPE } from '../../config/default';
import { checkParams } from '../utils/validate';

const { STAKING } = MSG_TYPE;

class CreateValidator {
  constructor(data) {
    const requiredParams = [
      'description', 'commission', 'minSelfDelegation', 'delegatorAddress', 'validatorAddress', 'pubKey', 'value',
      'description.moniker',
      'commission.rate', 'commission.maxRate', 'commission.maxChangeRate',
      'value.denom', 'value.amount',
    ];
    checkParams(requiredParams, data);

    this.type = STAKING.CREATE_VALIDATOR;
    this.value = {
      description: {
        moniker: data.description.moniker,
        identity: data.description.identity || '',
        website: data.description.website || '',
        details: data.description.details || '',
      },
      commission: {
        rate: data.commission.rate, // "1.000000000000000000"
        max_rate: data.commission.maxRate, // "1.000000000000000000"
        max_change_rate: data.commission.maxChangeRate, // "1.000000000000000000"
      },
      min_self_delegation: data.minSelfDelegation, // "1"
      // TODO @ggomma check signer is identical with delegator address
      delegator_address: data.delegatorAddress,
      validator_address: data.validatorAddress,
      pubkey: data.pubKey,
      value: {
        denom: data.value.denom,
        amount: `${data.value.amount}`,
      },
    };
  }
}

class EditValidator {
  constructor(data) {
    const requiredParams = ['address'];
    checkParams(requiredParams, data);

    const DO_NOT_MODIFY = '[do-not-modify]'; // defined in cosmose-sdk

    this.type = STAKING.EDIT_VALIDATOR;

    const description = {
      moniker: DO_NOT_MODIFY,
      identity: DO_NOT_MODIFY,
      website: DO_NOT_MODIFY,
      details: DO_NOT_MODIFY,
    };
    Object.keys(data.description).forEach((k) => {
      if (data.description[k]) description[k] = data.description[k];
    });

    this.value = {
      description,
      address: data.address,
      commission_rate: data.commissionRate || null,
      min_self_delegation: data.minSelfDelegation || null,
    };
  }
}

class Delegate {
  constructor(data) {
    const requiredParams = [
      'delegatorAddress', 'validatorAddress', 'amount', 'amount.denom', 'amount.amount',
    ];
    checkParams(requiredParams, data);

    this.type = STAKING.DELEGATE;
    this.value = {
      delegator_address: data.delegatorAddress,
      validator_address: data.validatorAddress,
      amount: {
        denom: data.amount.denom,
        amount: `${data.amount.amount}`,
      },
    };
  }
}

class Redelegate {
  constructor(data) {
    const requiredParams = [
      'delegatorAddress', 'validatorSrcAddress', 'validatorDstAddress', 'amount.denom', 'amount.amount',
    ];
    checkParams(requiredParams, data);

    this.type = STAKING.REDELEGATE;
    this.value = {
      delegator_address: data.delegatorAddress,
      validator_src_address: data.validatorSrcAddress,
      validator_dst_address: data.validatorDstAddress,
      amount: {
        denom: data.amount.denom,
        amount: `${data.amount.amount}`,
      },
    };
  }
}

class Undelegate {
  constructor(data) {
    const requiredParams = [
      'delegatorAddress', 'validatorAddress', 'amount.denom', 'amount.amount',
    ];
    checkParams(requiredParams, data);

    this.type = STAKING.UNDELEGATE;
    this.value = {
      delegator_address: data.delegatorAddress,
      validator_address: data.validatorAddress,
      amount: {
        denom: data.amount.denom,
        amount: `${data.amount.amount}`,
      },
    };
  }
}

export {
  CreateValidator,
  EditValidator,
  Delegate,
  Redelegate,
  Undelegate,
};
