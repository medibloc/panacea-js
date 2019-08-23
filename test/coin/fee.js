import { expect } from 'chai';
import { Fee } from '../../src/coin';
import { DEFAULT_DENOM, DEFAULT_GAS } from '../../config';

describe('fee', () => {
  describe('constructor', () => {
    it('generates default fee object', () => {
      const fee = new Fee();
      expect(fee.amount).to.be.eql(null);
      expect(fee.gas).to.be.eql(DEFAULT_GAS);
    });
  });

  describe('setGasLimit', () => {
    it('throws an error for invalid gas limit', () => {
      const fee = new Fee();
      expect(() => fee.setGasLimit("invalid Gas Limit")).to.throw();
    });

    it('sets gas field', () => {
      const fee = new Fee();
      const gasLimit = 123456789;
      fee.setGasLimit(gasLimit);
      expect(fee.gas).to.be.eql(`${gasLimit}`);
    });

    it('sets gas price', () => {
      const price = 10;
      const gasPrice = `${price}${DEFAULT_DENOM}`;
      const fee = new Fee();

      fee.setGasPrice(gasPrice);
      expect(fee.amount).to.be.an('array').lengthOf(1);
      expect(fee.amount[0].amount).to.be.eql(`${price * fee.gas}`);
      expect(fee.amount[0].denom).to.be.eql(DEFAULT_DENOM);

      const anotherDenom = 'test';
      const anotherGasPrice = `${price}${anotherDenom}`;
      fee.setGasPrice(anotherGasPrice);
      expect(fee.amount).to.be.an('array').lengthOf(2);
      expect(fee.amount[0].amount).to.be.eql(`${price * fee.gas}`);
      expect(fee.amount[0].denom).to.be.eql(DEFAULT_DENOM);
      expect(fee.amount[1].amount).to.be.eql(`${price * fee.gas}`);
      expect(fee.amount[1].denom).to.be.eql(anotherDenom);
    });
  });

  describe('setFee', () => {
    it('sets fee', () => {
      const amount = 123456789;
      const coin = `${amount}${DEFAULT_DENOM}`;
      const fee = new Fee();
      fee.setFee(coin);

      expect(fee.amount).to.be.an('array').lengthOf(1);
      expect(fee.amount[0].amount).to.be.eql(`${amount}`);
      expect(fee.amount[0].denom).to.be.eql(DEFAULT_DENOM);
    });
  });
});
