import 'reflect-metadata';  // for class-transformer
import { Fee } from '../../src';
import { DEFAULT_DENOM, DEFAULT_GAS } from '../../src/config/default';

describe('fee', () => {
  describe('constructor', () => {
    it('generates default fee object', () => {
      const fee = new Fee();
      expect(fee.amount).toEqual(null);
      expect(fee.gas).toEqual(DEFAULT_GAS);
    });
  });

  describe('setGasLimit', () => {
    it('sets gas field', () => {
      const fee = new Fee();
      const gasLimit = 123456789;
      fee.setGasLimit(gasLimit);
      expect(fee.gas).toEqual(`${gasLimit}`);
    });

    it('sets gas price', () => {
      const price = 10;
      const gasPrice = `${price}${DEFAULT_DENOM}`;
      const fee = new Fee();

      fee.setGasPrice(gasPrice);
      expect(Array.isArray(fee.amount)).toBe(true);
      expect(fee.amount).toHaveLength(1);
      expect(fee.amount![0].amount).toEqual(`${price * +fee.gas}`);
      expect(fee.amount![0].denom).toEqual(DEFAULT_DENOM);

      const anotherDenom = 'test';
      const anotherGasPrice = `${price}${anotherDenom}`;
      fee.setGasPrice(anotherGasPrice);
      expect(Array.isArray(fee.amount!)).toBe(true);
      expect(fee.amount!).toHaveLength(2);
      expect(fee.amount![0].amount).toEqual(`${price * +fee.gas}`);
      expect(fee.amount![0].denom).toEqual(DEFAULT_DENOM);
      expect(fee.amount![1].amount).toEqual(`${price * +fee.gas}`);
      expect(fee.amount![1].denom).toEqual(anotherDenom);
    });
  });

  describe('setFee', () => {
    it('sets fee', () => {
      const amount = 123456789;
      const coin = `${amount}${DEFAULT_DENOM}`;
      const fee = new Fee();
      fee.setFee(coin);

      expect(Array.isArray(fee.amount!)).toBe(true);
      expect(fee.amount!).toHaveLength(1);
      expect(fee.amount![0].amount).toEqual(`${amount}`);
      expect(fee.amount![0].denom).toEqual(DEFAULT_DENOM);
    });
  });
});
