import is from 'is_js';
import {
  getAddressFromPrivateKey,
  getAddressFromPublicKey, getPrivateKeyFromMnemonic,
  getPublicKeyFromPrivateKey, validateMnemonic
} from '../crypto';
import { DEFAULT_PREFIX } from '../../config';


class Account {
  constructor(data) {
    if (data.value) data = data.value; // In case that the data is from getAccount request

    this.sequence = +data.sequence || 0;
    this.account_number = data.account_number || (data.accountNumber || "0");
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
      this.address = data.address;
    }
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

  sign(tx) {
    tx.sign(this.privateKey);
    return tx;
  }
}

export default Account;