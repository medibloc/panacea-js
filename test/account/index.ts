import 'reflect-metadata';  // for class-transformer
import { Account, Tx } from '../../src';
import { test } from '../../src/config';


describe('ACCOUNT', () => {
  describe('constructor', () => {
    it('generates default ACCOUNT object', () => {
      const account = new Account();
      expect(account.sequence).toEqual(0);
      expect(account.account_number).toEqual(0);
      expect(account.privateKey).toBeNull();
      expect(account.publicKey).toBeNull();
      expect(account.address).toBeNull();
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
      expect(account.sequence).toEqual(sample.sequence);
      expect(account.account_number).toEqual(sample.accountNumber);
      expect(account.privateKey).toBeNull();
      expect(account.publicKey).toBeNull();
      expect(account.address).toBeNull();
    });

    it('generates ACCOUNT object with private key', () => {
      const account = new Account({
        privateKey: test.ACCOUNT.privKey,
      });
      expect(account.privateKey).toEqual(test.ACCOUNT.privKey);
      expect(account.publicKey).toEqual(test.ACCOUNT.pubKey);
      expect(account.address).toEqual(test.ACCOUNT.address);
    });

    it('generates ACCOUNT object with public key', () => {
      const account = new Account({
        publicKey: test.ACCOUNT.pubKey,
      });
      expect(account.privateKey).toEqual(null);
      expect(account.publicKey).toEqual(test.ACCOUNT.pubKey);
      expect(account.address).toEqual(test.ACCOUNT.address);
    });

    it('generates ACCOUNT object with public key', () => {
      const account = new Account({
        address: test.ACCOUNT.address,
      });
      expect(account.privateKey).toEqual(null);
      expect(account.publicKey).toEqual(null);
      expect(account.address).toEqual(test.ACCOUNT.address);
    });

    // it('generates ACCOUNT object from blockchain', () => {});
  });

  describe('increaseSequence', () => {
    it('increases ACCOUNT\'s sequence', () => {
      const account = new Account();
      expect(account.sequence).toEqual(0);

      account.increaseSequence();
      expect(account.sequence).toEqual(1);
    });
  });

  describe('setPrivateKey', () => {
    it('sets ACCOUNT\'s private key', () => {
      const account = new Account();
      expect(account.privateKey).toEqual(null);
      expect(account.publicKey).toEqual(null);
      expect(account.address).toEqual(null);

      account.setPrivateKey(test.ACCOUNT.privKey);
      expect(account.privateKey).toEqual(test.ACCOUNT.privKey);
      expect(account.publicKey).toEqual(test.ACCOUNT.pubKey);
      expect(account.address).toEqual(test.ACCOUNT.address);
    });
  });

  describe('setPrivKeyFromMnemonic', () => {
    it('sets ACCOUNT\'s private key from mnemonic', () => {
      const account = new Account();
      expect(account.privateKey).toEqual(null);
      expect(account.publicKey).toEqual(null);
      expect(account.address).toEqual(null);

      account.setPrivKeyFromMnemonic(test.ACCOUNT.mnemonic);
      expect(account.privateKey).toEqual(test.ACCOUNT.privKey);
      expect(account.publicKey).toEqual(test.ACCOUNT.pubKey);
      expect(account.address).toEqual(test.ACCOUNT.address);
    });
  });

  describe('setPublicKey', () => {
    it('sets ACCOUNT\'s public key', () => {
      const account = new Account();
      expect(account.privateKey).toEqual(null);
      expect(account.publicKey).toEqual(null);
      expect(account.address).toEqual(null);

      account.setPublicKey(test.ACCOUNT.pubKey);
      expect(account.privateKey).toEqual(null);
      expect(account.publicKey).toEqual(test.ACCOUNT.pubKey);
      expect(account.address).toEqual(test.ACCOUNT.address);
    });

    it('remain it\'s private key ' +
      'if private key is matched with public key', () => {
      const account = new Account({
        privateKey: test.ACCOUNT.privKey,
      });

      account.setPublicKey(test.ACCOUNT.pubKey);
      expect(account.privateKey).toEqual(test.ACCOUNT.privKey);
      expect(account.publicKey).toEqual(test.ACCOUNT.pubKey);
      expect(account.address).toEqual(test.ACCOUNT.address);

      account.setPublicKey(test.ANOTHER_ACCOUNT.pubKey);
      expect(account.privateKey).toEqual(null);
      expect(account.publicKey).toEqual(test.ANOTHER_ACCOUNT.pubKey);
      expect(account.address).toEqual(test.ANOTHER_ACCOUNT.address);
    });
  });

  describe('setAddress', () => {
    it('sets ACCOUNT\'s address', () => {
      const account = new Account();
      account.setAddress(test.ANOTHER_ACCOUNT.address);
      expect(account.privateKey).toEqual(null);
      expect(account.publicKey).toEqual(null);
      expect(account.address).toEqual(test.ANOTHER_ACCOUNT.address);
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
      expect(account.sign(tx).signatures[0].signature).toEqual(signature);
    });
  });

  describe('signTxHash', () => {
    it('signs transactionHash with ACCOUNT\'s private key', () => {
      const account = new Account({
        privateKey: test.ACCOUNT.privKey,
      });
      const signature = account.signTxHash(test.HASH);
      expect(signature).toEqual(test.SIGNATURE.signature);
    });
  });
});
