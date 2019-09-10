import { expect } from 'chai';
import Account from '../../src/account';
import Tx from '../../src/tx';
import { test } from '../../src/config';

describe('ACCOUNT', () => {
  describe('constructor', () => {
    it('generates default ACCOUNT object', () => {
      const account = new Account();
      expect(account.sequence).to.be.equal(0);
      expect(account.account_number).to.be.equal(0);
      expect(account.privateKey).to.be.null;
      expect(account.publicKey).to.be.null;
      expect(account.address).to.be.null;
    });

    it('generates ACCOUNT object with given data', () => {
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

    it('generates ACCOUNT object with private key', () => {
      const account = new Account({
        privateKey: test.ACCOUNT.privKey,
      });
      expect(account.privateKey).to.be.equal(test.ACCOUNT.privKey);
      expect(account.publicKey).to.be.equal(test.ACCOUNT.pubKey);
      expect(account.address).to.be.equal(test.ACCOUNT.address);
    });

    it('generates ACCOUNT object with public key', () => {
      const account = new Account({
        publicKey: test.ACCOUNT.pubKey,
      });
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(test.ACCOUNT.pubKey);
      expect(account.address).to.be.equal(test.ACCOUNT.address);
    });

    it('generates ACCOUNT object with public key', () => {
      const account = new Account({
        address: test.ACCOUNT.address,
      });
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(test.ACCOUNT.address);
    });

    // it('generates ACCOUNT object from blockchain', () => {});
  });

  describe('increaseSequence', () => {
    it('increases ACCOUNT\'s sequence', () => {
      const account = new Account();
      expect(account.sequence).to.be.equal(0);

      account.increaseSequence();
      expect(account.sequence).to.be.equal(1);
    });
  });

  describe('setPrivateKey', () => {
    it('sets ACCOUNT\'s private key', () => {
      const account = new Account();
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(null);

      account.setPrivateKey(test.ACCOUNT.privKey);
      expect(account.privateKey).to.be.equal(test.ACCOUNT.privKey);
      expect(account.publicKey).to.be.equal(test.ACCOUNT.pubKey);
      expect(account.address).to.be.equal(test.ACCOUNT.address);
    });
  });

  describe('setPrivKeyFromMnemonic', () => {
    it('sets ACCOUNT\'s private key from mnemonic', () => {
      const account = new Account();
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(null);

      account.setPrivKeyFromMnemonic(test.ACCOUNT.mnemonic);
      expect(account.privateKey).to.be.equal(test.ACCOUNT.privKey);
      expect(account.publicKey).to.be.equal(test.ACCOUNT.pubKey);
      expect(account.address).to.be.equal(test.ACCOUNT.address);
    });
  });

  describe('setPublicKey', () => {
    it('sets ACCOUNT\'s public key', () => {
      const account = new Account();
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(null);

      account.setPublicKey(test.ACCOUNT.pubKey);
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(test.ACCOUNT.pubKey);
      expect(account.address).to.be.equal(test.ACCOUNT.address);
    });

    it('remain it\'s private key ' +
      'if private key is matched with public key', () => {
      const account = new Account({
        privateKey: test.ACCOUNT.privKey,
      });

      account.setPublicKey(test.ACCOUNT.pubKey);
      expect(account.privateKey).to.be.equal(test.ACCOUNT.privKey);
      expect(account.publicKey).to.be.equal(test.ACCOUNT.pubKey);
      expect(account.address).to.be.equal(test.ACCOUNT.address);

      account.setPublicKey(test.ANOTHER_ACCOUNT.pubKey);
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(test.ANOTHER_ACCOUNT.pubKey);
      expect(account.address).to.be.equal(test.ANOTHER_ACCOUNT.address);
    });
  });

  describe('setAddress', () => {
    it('sets ACCOUNT\'s address', () => {
      const account = new Account();
      account.setAddress(test.ANOTHER_ACCOUNT.address);
      expect(account.privateKey).to.be.equal(null);
      expect(account.publicKey).to.be.equal(null);
      expect(account.address).to.be.equal(test.ANOTHER_ACCOUNT.address);
    });
  });

  describe('sign', () => {
    it('signs transaction with ACCOUNT\'s private key', () => {
      let tx = new Tx(test.SIMPLE_TX);
      const signature = tx.sign(test.ACCOUNT.privKey);
      tx = new Tx(test.SIMPLE_TX); // reset tx

      const account = new Account({
        privateKey: test.ACCOUNT.privKey,
      });
      expect(account.sign(tx).signatures[0].signature).to.be.equal(signature);
    });
  });

  describe('signTxHash', () => {
    it('signs transactionHash with ACCOUNT\'s private key', () => {
      const account = new Account({
        privateKey: test.ACCOUNT.privKey,
      });
      const signature = account.signTxHash(test.HASH);
      expect(signature).to.be.equal(test.SIGNATURE.signature);
    });
  });
});
