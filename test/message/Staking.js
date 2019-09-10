import { expect } from 'chai';
import config, { test } from '../../src/config';
import { Staking } from '../../src/message';

describe('Staking message', () => {
  describe('CreateValidator', () => {
    it('throws an error without required parameters', () => {
      expect(() => new Staking.CreateValidator()).to.throw();
    });

    it('generates createValidator message object', () => {
      const msg = new Staking.CreateValidator(test.MESSAGE.STAKING.CREATE_VALIDATOR);

      expect(msg.type).to.be.equal(config.MSG_TYPE.STAKING.CREATE_VALIDATOR);
      expect(msg.value.description).to.be
        .eql(test.MESSAGE.STAKING.CREATE_VALIDATOR.description);
      expect(msg.value.commission.rate).to.be
        .equal(test.MESSAGE.STAKING.CREATE_VALIDATOR.commission.rate);
      expect(msg.value.commission.max_rate).to.be
        .equal(test.MESSAGE.STAKING.CREATE_VALIDATOR.commission.maxRate);
      expect(msg.value.commission.max_change_rate).to.be
        .equal(test.MESSAGE.STAKING.CREATE_VALIDATOR.commission.maxChangeRate);
      expect(msg.value.min_self_delegation).to.be
        .equal(test.MESSAGE.STAKING.CREATE_VALIDATOR.minSelfDelegation);
      expect(msg.value.delegator_address).to.be
        .equal(test.MESSAGE.STAKING.CREATE_VALIDATOR.delegatorAddress);
      expect(msg.value.validator_address).to.be
        .equal(test.MESSAGE.STAKING.CREATE_VALIDATOR.validatorAddress);
      expect(msg.value.pubkey).to.be
        .equal(test.MESSAGE.STAKING.CREATE_VALIDATOR.pubKey);
      expect(msg.value.value.denom).to.be
        .equal(test.MESSAGE.STAKING.CREATE_VALIDATOR.value.denom);
      expect(msg.value.value.amount).to.be
        .equal(`${test.MESSAGE.STAKING.CREATE_VALIDATOR.value.amount}`);
    });
  });

  describe('EditValidator', () => {
    it('throws an error without required parameters', () => {
      expect(() => new Staking.EditValidator()).to.throw();
    });

    it('generates editValidator message object', () => {
      const msg = new Staking.EditValidator(test.MESSAGE.STAKING.EDIT_VALIDATOR);

      expect(msg.type).to.be.equal(config.MSG_TYPE.STAKING.EDIT_VALIDATOR);
      expect(msg.value.description.moniker).to.be
        .eql('[do-not-modify]');
      expect(msg.value.description.identity).to.be
        .equal(test.MESSAGE.STAKING.EDIT_VALIDATOR.description.identity);
      expect(msg.value.description.website).to.be
        .equal(test.MESSAGE.STAKING.EDIT_VALIDATOR.description.website);
      expect(msg.value.description.details).to.be
        .equal(test.MESSAGE.STAKING.EDIT_VALIDATOR.description.details);
      expect(msg.value.address).to.be
        .equal(test.MESSAGE.STAKING.EDIT_VALIDATOR.address);
      expect(msg.value.commission_rate).to.be
        .equal(test.MESSAGE.STAKING.EDIT_VALIDATOR.commissionRate);
      expect(msg.value.min_self_delegation).to.be
        .equal(test.MESSAGE.STAKING.EDIT_VALIDATOR.minSelfDelegation);
    });
  });

  describe('Delegate', () => {
    it('throws an error without required parameters', () => {
      expect(() => new Staking.Delegate()).to.throw();
    });

    it('generates delegate message object', () => {
      const msg = new Staking.Delegate(test.MESSAGE.STAKING.DELEGATE);

      expect(msg.type).to.be.equal(config.MSG_TYPE.STAKING.DELEGATE);
      expect(msg.value.delegator_address).to.be
        .equal(test.MESSAGE.STAKING.DELEGATE.delegatorAddress);
      expect(msg.value.validator_address).to.be
        .equal(test.MESSAGE.STAKING.DELEGATE.validatorAddress);
      expect(msg.value.amount.denom).to.be
        .equal(test.MESSAGE.STAKING.DELEGATE.amount.denom);
      expect(msg.value.amount.amount).to.be
        .equal(`${test.MESSAGE.STAKING.DELEGATE.amount.amount}`);
    });
  });

  describe('Redelegate', () => {
    it('throws an error without required parameters', () => {
      expect(() => new Staking.Redelegate()).to.throw();
    });

    it('generates redelegate message object', () => {
      const msg = new Staking.Redelegate(test.MESSAGE.STAKING.REDELEGATE);

      expect(msg.type).to.be.equal(config.MSG_TYPE.STAKING.REDELEGATE);
      expect(msg.value.delegator_address).to.be
        .equal(test.MESSAGE.STAKING.REDELEGATE.delegatorAddress);
      expect(msg.value.validator_src_address).to.be
        .equal(test.MESSAGE.STAKING.REDELEGATE.validatorSrcAddress);
      expect(msg.value.validator_dst_address).to.be
        .equal(test.MESSAGE.STAKING.REDELEGATE.validatorDstAddress);
      expect(msg.value.amount.denom).to.be
        .equal(test.MESSAGE.STAKING.REDELEGATE.amount.denom);
      expect(msg.value.amount.amount).to.be
        .equal(`${test.MESSAGE.STAKING.REDELEGATE.amount.amount}`);
    });
  });

  describe('Undelegate', () => {
    it('throws an error without required parameters', () => {
      expect(() => new Staking.Undelegate()).to.throw();
    });

    it('generates undelegate message object', () => {
      const msg = new Staking.Undelegate(test.MESSAGE.STAKING.UNDELEGATE);

      expect(msg.type).to.be.equal(config.MSG_TYPE.STAKING.UNDELEGATE);
      expect(msg.value.delegator_address).to.be
        .equal(test.MESSAGE.STAKING.UNDELEGATE.delegatorAddress);
      expect(msg.value.validator_address).to.be
        .equal(test.MESSAGE.STAKING.UNDELEGATE.validatorAddress);
      expect(msg.value.amount.denom).to.be
        .equal(test.MESSAGE.STAKING.UNDELEGATE.amount.denom);
      expect(msg.value.amount.amount).to.be
        .equal(`${test.MESSAGE.STAKING.UNDELEGATE.amount.amount}`);
    });
  });
});
