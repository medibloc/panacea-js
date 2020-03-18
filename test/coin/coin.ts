import { expect } from 'chai';
import { Coin } from '../../';
import { DEFAULT_DENOM } from '../../src/config/default';

describe('coin', () => {
  describe('constructor', () => {
    it('generates default coin object', () => {
      let coin = new Coin();
      expect(coin.denom).to.be.eql(DEFAULT_DENOM);
      expect(coin.amount).to.be.eql('0');

      const amount = 123456789;
      coin = new Coin(amount);
      expect(coin.denom).to.be.eql(DEFAULT_DENOM);
      expect(coin.amount).to.be.eql(`${amount}`).not.to.be.eql(amount);

      const anotherDenom = 'test';
      coin = new Coin(`${amount}${anotherDenom}`);
      expect(coin.denom).to.be.eql(anotherDenom).not.to.be.eql(DEFAULT_DENOM);
      expect(coin.amount).to.be.eql(`${amount}`).not.to.be.eql(amount);
    });
  });

  describe('parseCoin', () => {
    it('throws error if argument is invalid', () => {
      expect(() => Coin.parseCoin(DEFAULT_DENOM)).to.throw();
    });

    it('generates object containing amount and denom fields', () => {
      const amount = 123456789;
      const coin = Coin.parseCoin(`${amount}${DEFAULT_DENOM}`);
      expect(coin.amount).to.be.equal(`${amount}`);
      expect(coin.denom).to.be.equal(DEFAULT_DENOM);
    });
  });
});
