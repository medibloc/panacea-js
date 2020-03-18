import { expect } from 'chai';
import config, { test } from '../../src/config';
import { Message } from '../../';

const { Distr } = Message;

describe('Distribution message', () => {
  describe('WithdrawReward', () => {
    it('generates withdrawReward message object', () => {
      const msg = new Distr.WithdrawReward(test.MESSAGE.DISTR.WITHDRAW_REWARD);

      expect(msg.type).to.be.equal(config.MSG_TYPE.DISTR.WITHDRAW_DELEGATION_REWARD);
      expect(msg.value.delegator_address).to.be
        .equal(test.MESSAGE.DISTR.WITHDRAW_REWARD.delegatorAddress);
      expect(msg.value.validator_address).to.be
        .equal(test.MESSAGE.DISTR.WITHDRAW_REWARD.validatorAddress);
    });
  });

  describe('ModifyWithdrawAddress', () => {
    it('generates modifyWithdrawAddress message object', () => {
      const msg = new Distr.ModifyWithdrawAddress(test.MESSAGE.DISTR.MODIFY_WITHDRAW_ADDR);

      expect(msg.type).to.be.equal(config.MSG_TYPE.DISTR.MODIFY_WITHDRAW_ADDR);
      expect(msg.value.delegator_address).to.be
        .equal(test.MESSAGE.DISTR.MODIFY_WITHDRAW_ADDR.delegatorAddress);
      expect(msg.value.withdraw_address).to.be
        .equal(test.MESSAGE.DISTR.MODIFY_WITHDRAW_ADDR.withdrawAddress);
    });
  });
});
