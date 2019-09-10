import is from 'is_js';
import {
  generateSignatureFromHash,
  getAddressFromPrivateKey,
  getAddressFromPublicKey, getPrivateKeyFromMnemonic,
  getPublicKeyFromPrivateKey, validateMnemonic,
} from '../crypto';
import { DEFAULT_PREFIX } from '../config/default';


class Account {
  constructor(data = {}) {
    // eslint-disable-next-line no-param-reassign
    if (data.value) data = data.value; // In case that the data is from getAccount request

    this.sequence = +data.sequence || 0;
    this.account_number = data.account_number
      || (data.accountNumber || 0);
    this.coins = data.coins || [];

    this.privateKey = data.privateKey || null;
    if (data.privateKey) {
      this.publicKey = getPublicKeyFromPrivateKey(data.privateKey);
    } else {
      this.publicKey = data.publicKey || null;
    }

    if (this.publicKey) {
      this.address = getAddressFromPublicKey(this.publicKey, DEFAULT_PREFIX);
    } else {
      this.address = data.address || null;
    }
  }

  increaseSequence() {
    this.sequence += 1;
  }

  setPrivateKey(privateKey) {
    if (!is.hexadecimal(privateKey)) {
      throw new Error('private key should be hexadecimal');
    }

    this.privateKey = privateKey;
    this.publicKey = getPublicKeyFromPrivateKey(privateKey);
    this.address = getAddressFromPrivateKey(privateKey, DEFAULT_PREFIX);
  }

  setPrivKeyFromMnemonic(mnemonic) {
    if (!validateMnemonic(mnemonic)) {
      throw new Error('invalid mnemonic');
    }

    const privateKey = getPrivateKeyFromMnemonic(mnemonic);
    this.setPrivateKey(privateKey);
  }

  setPublicKey(publicKey) {
    if (!is.hexadecimal(publicKey)) {
      throw new Error('public key should be hexadecimal');
    }

    if (this.publicKey === publicKey) return;
    this.privateKey = null;
    this.publicKey = publicKey;
    this.address = getAddressFromPublicKey(publicKey, DEFAULT_PREFIX);
  }

  setAddress(address) {
    if (this.address !== address) {
      this.privateKey = null;
      this.publicKey = null;
      this.address = address;
    }
  }

  sign(tx) {
    tx.sign(this.privateKey);
    return tx;
  }

  signTxHash(txHash) {
    const signatureHex = generateSignatureFromHash(txHash, this.privateKey);
    const signatureBase64 = Buffer.from(signatureHex, 'hex').toString('base64');
    return signatureBase64;
  }
}

export default Account;
