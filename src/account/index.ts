import {
  entropyToMnemonic,
  generateSignatureFromHash,
  getAddressFromPrivateKey,
  getAddressFromPublicKey,
  getPrivateKeyFromMnemonic,
  getPublicKeyFromPrivateKey,
  validateMnemonic,
} from '../crypto';
import {DEFAULT_PREFIX} from '../config/default';
import {isHex} from "../utils/base";
import Transaction from "../tx";
import Coin from "../coin";


export default class Account {
  public readonly account_number: number;
  public sequence: number;
  public coins: Coin[];
  public privateKey: string; //TODO @youngjoon-lee: make this optional, not null
  public publicKey: string;  //TODO @youngjoon-lee: make this optional, not null
  public address: string;    //TODO @youngjoon-lee: make this optional, not null

  // TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any> = {}) {
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

  increaseSequence(): void {
    this.sequence += 1;
  }

  setPrivateKey(privateKey: string): void {
    if (!isHex(privateKey)) {
      throw new Error('private key should be hexadecimal');
    }

    this.privateKey = privateKey;
    this.publicKey = getPublicKeyFromPrivateKey(privateKey);
    this.address = getAddressFromPrivateKey(privateKey, DEFAULT_PREFIX);
  }

  setPrivKeyFromMnemonic(mnemonic: string): void {
    if (!validateMnemonic(mnemonic)) {
      throw new Error('invalid mnemonic');
    }

    const privateKey = getPrivateKeyFromMnemonic(mnemonic);
    this.setPrivateKey(privateKey);
  }

  setPrivKeyFromEntropy(entropy: string): void {
    const mnemonic = entropyToMnemonic(entropy);
    this.setPrivKeyFromMnemonic(mnemonic);
  }

  setPublicKey(publicKey: string): void {
    if (!isHex(publicKey)) {
      throw new Error('public key should be hexadecimal');
    }

    if (this.publicKey === publicKey) return;
    this.privateKey = null;
    this.publicKey = publicKey;
    this.address = getAddressFromPublicKey(publicKey, DEFAULT_PREFIX);
  }

  setAddress(address: string): void {
    if (this.address !== address) {
      this.privateKey = null;
      this.publicKey = null;
      this.address = address;
    }
  }

  sign(tx: Transaction): Transaction {
    tx.sign(this.privateKey);
    return tx;
  }

  signTxHash(txHash: string): string {
    const signatureHex = generateSignatureFromHash(txHash, this.privateKey);
    return Buffer.from(signatureHex, 'hex').toString('base64');
  }
}

