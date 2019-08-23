import { expect } from 'chai';
import Account from '../../src/account';

describe('account', () => {
  describe('constructor', () => {
    it('generates default account object', () => {
      const account = new Account();
      expect(account.sequence).to.be.equal(0);
      expect(account.account_number).to.be.equal(0);
      expect(account.privateKey).to.be.null;
      expect(account.publicKey).to.be.null;
      expect(account.address).to.be.null;
    });

    it('generates account object with given data', () => {
      const sample = {
        sequence: 1,
        accountNumber: 5,
        coins: [{
          denom: 'test',
          amount: '123',
        }],
      };
      const account = new Account(sample);
      expect(account.sequence).to.be.equal(sample.sequence);
      expect(account.account_number).to.be.equal(sample.accountNumber);
      expect(account.privateKey).to.be.null;
      expect(account.publicKey).to.be.null;
      expect(account.address).to.be.null;
    });

    it('generates account object with private key', () => {
      // const
      // const account = new Account(sample);
      // expect(account.sequence).to.be.equal(sample.sequence);
      // expect(account.account_number).to.be.equal(sample.accountNumber);
      // expect(account.privateKey).to.be.null;
      // expect(account.publicKey).to.be.null;
      // expect(account.address).to.be.null;
    });

    it('generates account object from blockchain', () => {

    });
  });
});
