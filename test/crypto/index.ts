import 'reflect-metadata';  // for class-transformer
import * as fs from 'fs';
import * as bip39 from 'bip39';
import { PRIVKEY_LEN, PRIVKEY_MAX } from '../../src/config/default';
import { utils, crypto } from '../../src';

const { sha256 } = utils;

const sample = {
  mnemonic: 'liar hope only nuclear ostrich element between virtual burger test section enemy future film shrug degree pear length husband kingdom candy shine code boring',
  privateKey: '760168b706263c24116818a9733a2fb812ba459260df956cb3b61e8d03c0cecb',
  publicKey: '0396d48740da95824d7ba1cd0c0106fe04347a7a7196c716a8263bf63c2cdb70ce',
  publicKeyHash: 'b2103dca16e97c520c9f99a5edd78f7ada0d768f',
  address: 'test1kggrmjska979yrylnxj7m4u00tdq6a50rrx0th',
  prefix: 'test',

  message: '0123456789abcdef',
  signature: '16bad29429a7b37d9dcd0800a9fa0a2e9a4edf7c53a3b9ac207ba7aff1b549a33a7dfcc2238ea76cce77998e3dd367493c1c530259c8971d05b8b11624c7bc3d',
};

describe('crypto', () => {
  describe('generateKeyStore', () => {
    it('generates json format key', () => {
      const keyStore = crypto.generateKeyStore(sample.privateKey, 'password123');
      expect(typeof keyStore).toBe('object');
    });
  });

  describe('getPrivateKeyFromKeyStore', () => {
    it('get private key from key store', () => {
      const keyStore = crypto.generateKeyStore(sample.privateKey, 'password123');
      expect(() => crypto.getPrivateKeyFromKeyStore(keyStore, '')).toThrow();
      expect(crypto.getPrivateKeyFromKeyStore(keyStore, 'password123')).toEqual(sample.privateKey);
    });
    it('get private key from the Web3 Secret Storage standard format', () => {
      // the standard test case is from https://github.com/ethereum/wiki/wiki/Web3-Secret-Storage-Definition#test-vectors
      const jsonStr = fs.readFileSync(`${__dirname}/testdata/keystore_web3.json`).toString();
      expect(crypto.getPrivateKeyFromKeyStore(JSON.parse(jsonStr), 'testpassword')).toEqual('7a28b5ba57c53603b0b07b56bba752f7784bf506fa95edc395f5cf6c7514fe9d');
    });
    it('get private key from the legacy format which uses aes-256-ctr and sha3-keccak512', () => {
      const jsonStr = fs.readFileSync(`${__dirname}/testdata/keystore_legacy.json`).toString();
      expect(crypto.getPrivateKeyFromKeyStore(JSON.parse(jsonStr), 'testpassword')).toEqual('cb011405894895c814432f1556b52bb054720a9b2a6ffaf3792a45f911b50dff');
    });
    it('get private key from the old legacy format which uses aes-256-ctr and sha1-256', () => {
      const jsonStr = fs.readFileSync(`${__dirname}/testdata/keystore_old_legacy.json`).toString();
      expect(crypto.getPrivateKeyFromKeyStore(JSON.parse(jsonStr), 'testpassword')).toEqual('83bf913f1ef05c242a60784eaaf90576aaf664ed9c834cff9018bbd8ba92cd66');
    });
  });

  describe('generateMnemonic', () => {
    it('generates a valid mnemonic words', () => {
      const mnemonic = crypto.generateMnemonic();
      const mnemonicWords = mnemonic.split(' ');
      expect(mnemonicWords).toHaveLength(24);
      expect(bip39.validateMnemonic(mnemonic)).toBe(true);
    });
  });

  describe('validateMnemonic', () => {
    it('validates mnemonic', () => {
      const invalidLengthMnemonicWords = sample.mnemonic.split(' ').slice(0, -1);
      const invalidLengthMnemonic = invalidLengthMnemonicWords.join(' ');
      expect(crypto.validateMnemonic(invalidLengthMnemonic)).toBe(false);

      const invalidWordMnemonicWords = sample.mnemonic.split(' ').slice(0, -1);
      invalidWordMnemonicWords.push('medibloc');
      const invalidWordMnemonic = invalidWordMnemonicWords.join(' ');
      expect(crypto.validateMnemonic(invalidWordMnemonic)).toBe(false);

      expect(crypto.validateMnemonic(sample.mnemonic)).toBe(true);
    });
  });

  describe('getPrivateKeyFromMnemonic', () => {
    it('generates private key from mnemonic', () => {
      const privKey = crypto.getPrivateKeyFromMnemonic(sample.mnemonic);
      expect(privKey).toEqual(sample.privateKey);
    });
  });

  describe('generatePrivateKey', () => {
    it('generates a valid private key', () => {
      const privKey = crypto.generatePrivateKey();
      expect(privKey).toHaveLength(2 * PRIVKEY_LEN);
      expect(parseInt(privKey, 16)).toBeLessThan(parseInt(PRIVKEY_MAX, 16));
      expect(parseInt(privKey, 16)).toBeGreaterThan(0);
    });
  });

  describe('getAddressFromPrivateKey', () => {
    it('throws an error if entered private key value is invalid', () => {
      expect(() => crypto.getPublicKeyFromPrivateKey('')).toThrow();
      expect(() => crypto.getPublicKeyFromPrivateKey(sample.privateKey.slice(1))).toThrow();
      expect(() => crypto.getPublicKeyFromPrivateKey(`z${sample.privateKey.slice(1)}`)).toThrow();
    });
    it('generates a valid public key', () => {
      const pubKey = crypto.getPublicKeyFromPrivateKey(sample.privateKey);
      expect(pubKey).toEqual(sample.publicKey);
    });
  });

  describe('getAddressFromPrivateKey', () => {
    it('generates address with hrp from private key', () => {
      const address = crypto.getAddressFromPrivateKey(sample.privateKey, sample.prefix);
      const checkSum = address.slice(-6);
      const hrp = address.slice(0, sample.prefix.length + 1);
      const hashPart = address.slice(sample.prefix.length + 1, -6);
      expect(hrp).toEqual(`${sample.prefix}1`);

      const diffPrefix = sample.prefix + sample.prefix;
      const diffHrpAddress = crypto.getAddressFromPrivateKey(sample.privateKey, diffPrefix);
      const diffCheckSum = diffHrpAddress.slice(-6);
      const diffHrp = diffHrpAddress.slice(0, diffPrefix.length + 1);
      const diffHashPart = diffHrpAddress.slice(diffPrefix.length + 1, -6);

      expect(diffCheckSum).not.toEqual(checkSum);
      expect(diffHrp).not.toEqual(`${sample.prefix}1`);
      expect(diffHashPart).toEqual(hashPart);
    });
  });

  describe('getAddressFromPublicKey', () => {
    it('generates address with hrp from public key', () => {
      const address = crypto.getAddressFromPublicKey(sample.publicKey, sample.prefix);
      expect(address).toEqual(sample.address);
    });
  });

  describe('checkAddress', () => {
    it('checks address', () => {
      expect(crypto.checkAddress(sample.address, sample.prefix)).toBe(true);
      expect(crypto.checkAddress(sample.address, `${sample.prefix}wrong`)).toBe(false);
      expect(crypto.checkAddress(sample.address.slice(0, -1), sample.prefix)).toBe(false);
    });
  });

  describe('encodeAddress', () => {
    it('encodes public key to bech32 format', () => {
      const address = crypto.encodeAddress(sample.publicKeyHash, sample.prefix);
      expect(address).toEqual(sample.address);
    });
  });

  describe('decodeAddress', () => {
    it('decodes an address from bech32 format', () => {
      const pubKeyHash = crypto.decodeAddress(sample.address).toString('hex');
      expect(pubKeyHash).toEqual(sample.publicKeyHash);
    });
  });

  describe('generateSignature', () => {
    it('generates signature', () => {
      const sig = crypto.generateSignature(sample.message, sample.privateKey);
      expect(sig).toEqual(sample.signature);
    });
  });

  describe('generateSignatureFromHash', () => {
    it('generates signature', () => {
      const sig = crypto.generateSignatureFromHash(sha256(sample.message), sample.privateKey);
      expect(sig).toEqual(sample.signature);
    });
  });

  describe('verifySignature', () => {
    it('verifies signature', () => {
      const result = crypto.verifySignature(sample.signature, sample.message, sample.publicKey);
      expect(result).toBe(true);

      const invalidResult = crypto.verifySignature(sample.signature, '123456789abc', sample.publicKey);
      expect(invalidResult).toBe(false);
    });
  });
});
