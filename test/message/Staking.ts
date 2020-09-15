import config, { test } from '../../src/config';
import { Message } from '../../src';

const { Staking } = Message;

describe('Staking message', () => {
  describe('CreateValidator', () => {
    it('generates createValidator message object', () => {
      const msg = new Staking.CreateValidator(test.MESSAGE.STAKING.CREATE_VALIDATOR);

      expect(msg.type).toEqual(config.MSG_TYPE.STAKING.CREATE_VALIDATOR);
      expect(msg.value.description).toEqual(test.MESSAGE.STAKING.CREATE_VALIDATOR.description);
      expect(msg.value.commission.rate).toEqual(test.MESSAGE.STAKING.CREATE_VALIDATOR.commission.rate);
      expect(msg.value.commission.max_rate).toEqual(test.MESSAGE.STAKING.CREATE_VALIDATOR.commission.maxRate);
      expect(msg.value.commission.max_change_rate).toEqual(test.MESSAGE.STAKING.CREATE_VALIDATOR.commission.maxChangeRate);
      expect(msg.value.min_self_delegation).toEqual(test.MESSAGE.STAKING.CREATE_VALIDATOR.minSelfDelegation);
      expect(msg.value.delegator_address).toEqual(test.MESSAGE.STAKING.CREATE_VALIDATOR.delegatorAddress);
      expect(msg.value.validator_address).toEqual(test.MESSAGE.STAKING.CREATE_VALIDATOR.validatorAddress);
      expect(msg.value.pubkey).toEqual(test.MESSAGE.STAKING.CREATE_VALIDATOR.pubKey);
      expect(msg.value.value.denom).toEqual(test.MESSAGE.STAKING.CREATE_VALIDATOR.value.denom);
      expect(msg.value.value.amount).toEqual(`${test.MESSAGE.STAKING.CREATE_VALIDATOR.value.amount}`);
    });
  });

  describe('EditValidator', () => {
    it('generates editValidator message object', () => {
      const msg = new Staking.EditValidator(test.MESSAGE.STAKING.EDIT_VALIDATOR);

      expect(msg.type).toEqual(config.MSG_TYPE.STAKING.EDIT_VALIDATOR);
      expect(msg.value.description.moniker).toEqual('[do-not-modify]');
      expect(msg.value.description.identity).toEqual(test.MESSAGE.STAKING.EDIT_VALIDATOR.description.identity);
      expect(msg.value.description.website).toEqual(test.MESSAGE.STAKING.EDIT_VALIDATOR.description.website);
      expect(msg.value.description.details).toEqual(test.MESSAGE.STAKING.EDIT_VALIDATOR.description.details);
      expect(msg.value.address).toEqual(test.MESSAGE.STAKING.EDIT_VALIDATOR.address);
      expect(msg.value.commission_rate).toEqual(test.MESSAGE.STAKING.EDIT_VALIDATOR.commissionRate);
      expect(msg.value.min_self_delegation).toEqual(test.MESSAGE.STAKING.EDIT_VALIDATOR.minSelfDelegation);
    });
  });

  describe('Delegate', () => {
    it('generates delegate message object', () => {
      const msg = new Staking.Delegate(test.MESSAGE.STAKING.DELEGATE);

      expect(msg.type).toEqual(config.MSG_TYPE.STAKING.DELEGATE);
      expect(msg.value.delegator_address).toEqual(test.MESSAGE.STAKING.DELEGATE.delegatorAddress);
      expect(msg.value.validator_address).toEqual(test.MESSAGE.STAKING.DELEGATE.validatorAddress);
      expect(msg.value.amount.denom).toEqual(test.MESSAGE.STAKING.DELEGATE.amount.denom);
      expect(msg.value.amount.amount).toEqual(`${test.MESSAGE.STAKING.DELEGATE.amount.amount}`);
    });
  });

  describe('Redelegate', () => {
    it('generates redelegate message object', () => {
      const msg = new Staking.Redelegate(test.MESSAGE.STAKING.REDELEGATE);

      expect(msg.type).toEqual(config.MSG_TYPE.STAKING.REDELEGATE);
      expect(msg.value.delegator_address).toEqual(test.MESSAGE.STAKING.REDELEGATE.delegatorAddress);
      expect(msg.value.validator_src_address).toEqual(test.MESSAGE.STAKING.REDELEGATE.validatorSrcAddress);
      expect(msg.value.validator_dst_address).toEqual(test.MESSAGE.STAKING.REDELEGATE.validatorDstAddress);
      expect(msg.value.amount.denom).toEqual(test.MESSAGE.STAKING.REDELEGATE.amount.denom);
      expect(msg.value.amount.amount).toEqual(`${test.MESSAGE.STAKING.REDELEGATE.amount.amount}`);
    });
  });

  describe('Undelegate', () => {
    it('generates undelegate message object', () => {
      const msg = new Staking.Undelegate(test.MESSAGE.STAKING.UNDELEGATE);

      expect(msg.type).toEqual(config.MSG_TYPE.STAKING.UNDELEGATE);
      expect(msg.value.delegator_address).toEqual(test.MESSAGE.STAKING.UNDELEGATE.delegatorAddress);
      expect(msg.value.validator_address).toEqual(test.MESSAGE.STAKING.UNDELEGATE.validatorAddress);
      expect(msg.value.amount.denom).toEqual(test.MESSAGE.STAKING.UNDELEGATE.amount.denom);
      expect(msg.value.amount.amount).toEqual(`${test.MESSAGE.STAKING.UNDELEGATE.amount.amount}`);
    });
  });
});
