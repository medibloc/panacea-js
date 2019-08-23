import { expect } from 'chai';
import Account from '../../src/account';
import Tx from '../../src/tx';
import { test } from '../../config';

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
      const account = new Account({
        privateKey: test.account.privKey,
      });
      expect(account.privateKey).to.be.equal(test.account.privKey);
      expect(account.publicKey).to.be.equal(test.account.pubKey);
      expect(account.address).to.be.equal(test.account.address);
    });

    it('generates account object with public key', () => {
      const account = new Account({
        publicKey: test.account.pubKey,
      });
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(test.account.pubKey);
      expect(account.address).to.be.equal(test.account.address);
    });

    it('generates account object with public key', () => {
      const account = new Account({
        address: test.account.address,
      });
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(test.account.address);
    });

    // it('generates account object from blockchain', () => {});
  });

  describe('increaseSequence', () => {
    it('increases account\'s sequence', () => {
      const account = new Account();
      expect(account.sequence).to.be.equal(0);

      account.increaseSequence();
      expect(account.sequence).to.be.equal(1);
    });
  });

  describe('setPrivateKey', () => {
    it('sets account\'s private key', () => {
      const account = new Account();
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(null);

      account.setPrivateKey(test.account.privKey);
      expect(account.privateKey).to.be.equal(test.account.privKey);
      expect(account.publicKey).to.be.equal(test.account.pubKey);
      expect(account.address).to.be.equal(test.account.address);
    });
  });

  describe('setPrivKeyFromMnemonic', () => {
    it('sets account\'s private key from mnemonic', () => {
      const account = new Account();
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(null);

      account.setPrivKeyFromMnemonic(test.account.mnemonic);
      expect(account.privateKey).to.be.equal(test.account.privKey);
      expect(account.publicKey).to.be.equal(test.account.pubKey);
      expect(account.address).to.be.equal(test.account.address);
    });
  });

  describe('setPublicKey', () => {
    it('sets account\'s public key', () => {
      const account = new Account();
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(null);

      account.setPublicKey(test.account.pubKey);
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(test.account.pubKey);
      expect(account.address).to.be.equal(test.account.address);
    });

    it('remain it\'s private key ' +
      'if private key is matched with public key', () => {
      const account = new Account({
        privateKey: test.account.privKey,
      });

      account.setPublicKey(test.account.pubKey);
      expect(account.privateKey).to.be.equal(test.account.privKey);
      expect(account.publicKey).to.be.equal(test.account.pubKey);
      expect(account.address).to.be.equal(test.account.address);

      account.setPublicKey(test.anotherAccount.pubKey);
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(test.anotherAccount.pubKey);
      expect(account.address).to.be.equal(test.anotherAccount.address);
    });
  });

  describe('setAddress', () => {
    it('sets account\'s address', () => {
      const account = new Account();
      account.setAddress(test.anotherAccount.address);
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(test.anotherAccount.address);
    });
  });

  describe('sign', () => {
    it('signs transaction with account\'s private key', () => {
      let tx = new Tx(test.simpleTx);
      const signature = tx.sign(test.account.privKey);
      tx = new Tx(test.simpleTx); // reset tx

      const account = new Account({
        privateKey: test.account.privKey,
      });
      expect(account.sign(tx).signatures[0].signature).to.be.equal(signature);
    });
  });
});
