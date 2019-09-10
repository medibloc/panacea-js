import { expect } from 'chai';
import config, { test } from '../../src/config';
import { Slashing } from '../../src/message';

describe('Slashing message', () => {
  describe('Unjail', () => {
    it('throws an error without required parameters', () => {
      expect(() => new Slashing.Unjail()).to.throw();
    });

    it('generates unjail message object', () => {
      const msg = new Slashing.Unjail(test.MESSAGE.SLASHING.UNJAIL);

      expect(msg.type).to.be.equal(config.MSG_TYPE.SLASHING.UNJAIL);
      expect(msg.value.address).to.be
        .equal(test.MESSAGE.SLASHING.UNJAIL.address);
    });
  });
});
