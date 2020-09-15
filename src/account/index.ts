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
import {base} from '../utils';
import {Transaction} from '../tx';
import {Coin} from "../coin";
import {plainToClass, Transform, Type} from "class-transformer";

export class Account {
  @Transform(v => Number(v), { toClassOnly: true })
  public account_number: number;
  @Transform(v => Number(v), { toClassOnly: true })
  public sequence: number;
  @Type(() => Coin)
  public coins: Coin[];
  public privateKey: string;
  public publicKey: string;
  public address: string;

  constructor(account_number = 0, sequence = 0, coins: Coin[] = [], privateKey = '', publicKey = '', address = '') {
    this.account_number = account_number;
    this.sequence = sequence;
    this.coins = coins;
    this.privateKey = privateKey;
    this.publicKey = this.privateKey ? getPublicKeyFromPrivateKey(this.privateKey) : publicKey;
    this.address = this.publicKey ? getAddressFromPublicKey(this.publicKey, DEFAULT_PREFIX) : address;
  }

  static fromPlain(plain: Record<string, any>): Account {
    return plainToClass(Account, plain);
  }

  increaseSequence(): void {
    this.sequence += 1;
  }

  setPrivateKey(privateKey: string): void {
    if (!base.isHex(privateKey)) {
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

    this.setPrivateKey(getPrivateKeyFromMnemonic(mnemonic));
  }

  setPrivKeyFromEntropy(entropy: string): void {
    this.setPrivKeyFromMnemonic(entropyToMnemonic(entropy));
  }

  setPublicKey(publicKey: string): void {
    if (!base.isHex(publicKey)) {
      throw new Error('public key should be hexadecimal');
    }

    if (this.publicKey === publicKey) {
      return;
    }
    this.privateKey = '';
    this.publicKey = publicKey;
    this.address = getAddressFromPublicKey(publicKey, DEFAULT_PREFIX);
  }

  setAddress(address: string): void {
    if (this.address !== address) {
      this.privateKey = '';
      this.publicKey = '';
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
