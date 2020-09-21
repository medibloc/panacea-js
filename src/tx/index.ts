import is from "is_js";
import {sortJsonProperties} from '../utils/encoding';
import base from '../utils';
import {generateSignatureFromHash, getPublicKeyFromPrivateKey,} from '../crypto';
import {BROADCAST_MODE} from '../config/default';
import {Fee} from "../coin";


export default class Transaction {
  public sequence: string; //TODO @youngjoon-lee: to be number
  public account_number: string; //TODO @youngjoon-lee: to be number
  public chain_id: string;
  public msgs: any[];    //TODO @youngjoon-lee: to be Message[]
  public memo: string;
  public fee: Fee;       //TODO @youngjoon-lee: to be optional, not null
  public signatures: any[];  //TODO @youngjoon-lee: to be Signature[]

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: any) {
    if (!data.chainId) {
      throw new Error('chain id should not be null');
    }

    let msg = data.msg ? [data.msg] : [];
    if (is.array(data.msg)) ({ msg } = data);

    this.sequence = `${data.sequence}` || '0';
    this.account_number = `${data.accountNumber}` || '0';
    this.chain_id = data.chainId;
    this.msgs = msg;
    this.memo = data.memo || '';
    this.fee = data.fee || null;
    this.signatures = data.signatures || [];
  }

  addMsgs(...msgs: any): void {
    // I hope you fully understand the importance of the message's sequence
    this.msgs = [...this.msgs, ...msgs];
  }

  setFee(fee: Fee): void {
    this.fee = fee;
  }

  signingData(): string {
    const sortedJsonTx = sortJsonProperties({
      fee: this.fee,
      memo: this.memo,
      msgs: this.msgs.map(msg => sortJsonProperties(msg)),
      sequence: this.sequence.toString(),
      account_number: this.account_number.toString(),
      chain_id: this.chain_id,
    });
    const serializedTx = JSON.stringify(sortedJsonTx);
    return Buffer.from(serializedTx).toString('hex');
  }

  calculateHash(): string {
    const signingData = this.signingData();
    return base.sha256(signingData);
  }

  sign(privateKey: string): string {
    if (!privateKey) {
      throw new Error('private key should not be null');
    }

    const hash = this.calculateHash();
    const signatureHex = generateSignatureFromHash(hash, privateKey);
    const signatureBase64 = Buffer.from(signatureHex, 'hex').toString('base64');
    this.addSignature(getPublicKeyFromPrivateKey(privateKey), signatureBase64);
    return signatureBase64;
  }

  addSignature(pubKey: string, signature: string): void {
    const pubKeyBase64 = Buffer.from(pubKey, 'hex').toString('base64');
    //TODO @youngjoon-lee: to be a class Signature
    this.signatures.push({
      pub_key: {
        type: 'tendermint/PubKeySecp256k1', // It only supports secp256k1 curve only
        value: pubKeyBase64,
      },
      signature,
    });
  }

  //TODO @youngjoon-lee: return a BroadcastTx object (to be defined)
  convertToBroadcastTx(mode = 'sync'): Record<string, any> {
    if (!BROADCAST_MODE.includes(mode)) {
      throw new Error(`Invalid broadcast mode : ${mode}`);
    }

    const broadcastTx = {
      tx: {
        msg: this.msgs,
        fee: this.fee,
        signatures: this.signatures,
        memo: this.memo,
      },
      mode,
    };
    return broadcastTx;
  }
}
