import 'reflect-metadata';  // for class-transformer
import { Coin } from '../../src';
import { DEFAULT_DENOM } from '../../src/config/default';

describe('coin', () => {
  describe('constructor', () => {
    it('generates default coin object', () => {
      let coin = new Coin();
      expect(coin.denom).toEqual(DEFAULT_DENOM);
      expect(coin.amount).toEqual('0');

      const amount = 123456789;
      coin = new Coin(amount);
      expect(coin.denom).toEqual(DEFAULT_DENOM);
      expect(coin.amount).toEqual(`${amount}`);
      expect(coin.amount).not.toEqual(amount);

      const anotherDenom = 'test';
      coin = new Coin(`${amount}${anotherDenom}`);
      expect(coin.denom).toEqual(anotherDenom);
      expect(coin.denom).not.toEqual(DEFAULT_DENOM);
      expect(coin.amount).toEqual(`${amount}`);
      expect(coin.amount).not.toEqual(amount);
    });
  });

  describe('parseCoin', () => {
    it('throws error if argument is invalid', () => {
      expect(() => Coin.parseCoin(DEFAULT_DENOM)).toThrow();
    });

    it('generates object containing amount and denom fields', () => {
      const amount = 123456789;
      const coin = Coin.parseCoin(`${amount}${DEFAULT_DENOM}`);
      expect(coin.amount).toEqual(`${amount}`);
      expect(coin.denom).toEqual(DEFAULT_DENOM);
    });
  });
});
