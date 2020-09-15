import {sortJsonProperties} from '../utils/encoding';
import {base} from '../utils';
import {generateSignatureFromHash, getPublicKeyFromPrivateKey,} from '../crypto';
import {BROADCAST_MODE} from '../config/default';
import {Transform, Type} from "class-transformer";
import {Message} from "../message";
import {Fee} from "../coin";


export class Transaction {
  @Transform(v => v.toString())
  public sequence: number;
  @Transform(v => v.toString())
  public account_number: number;
  public chain_id: string;
  @Type(() => Message)
  public msgs: Message[];
  public memo: string;
  public fee?: Fee;
  @Type(() => Signature)
  public signatures: Signature[]

  constructor(chain_id: string, sequence = 0, account_number = 0, msgs: Message[] = [], memo = '', fee?: Fee, signatures: Signature[] = []) {
    this.sequence = sequence;
    this.account_number = account_number;
    this.chain_id = chain_id;
    this.msgs = msgs;
    this.memo = memo;
    this.fee = fee;
    this.signatures = signatures;
  }

  addMsgs(msgs: Message[]): void {
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
      msgs: this.msgs,
      sequence: this.sequence,
      account_number: this.account_number,
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

  addSignature(pubKey: string, signatureBase64: string): void {
    const pubKeyBase64 = Buffer.from(pubKey, 'hex').toString('base64');
    this.signatures.push(new Signature(pubKeyBase64, signatureBase64))
  }

  convertToBroadcastTx(mode = 'sync'): BroadcastTx {
    return new BroadcastTx(this.msgs, this.signatures, this.memo, mode, this.fee);
  }
}

export class Signature {
  @Type(() => SignaturePubKey)
  readonly pub_key: SignaturePubKey
  readonly signature: string;

  constructor(pubKeyBase64: string, signatureBase64: string) {
    this.pub_key = new SignaturePubKey(pubKeyBase64);
    this.signature = signatureBase64;
  }
}

class SignaturePubKey {
  readonly type: string = 'tendermint/PubKeySecp256k1';
  readonly value: string;

  constructor(valueBase64: string) {
    this.value = valueBase64;
  }
}

export class BroadcastTx {
  @Type(() => InnerBroadcastTx)
  public tx: InnerBroadcastTx;
  public mode: string;

  constructor(msgs: Message[], signatures: Signature[], memo: string, mode = 'sync', fee?: Fee) {
    if (!BROADCAST_MODE.includes(mode)) {
      throw new Error(`Invalid broadcast mode : ${mode}`);
    }

    this.tx = new InnerBroadcastTx(msgs, signatures, memo, fee);
    this.mode = mode;
  }
}

class InnerBroadcastTx {
  @Type(() => Message)
  public msg: Message[];
  public fee?: Fee;
  @Type(() => Signature)
  public signatures: Signature[];
  public memo: string;

  constructor(msgs: Message[], signatures: Signature[], memo: string, fee?: Fee) {
    this.msg = msgs;
    this.fee = fee;
    this.signatures = signatures;
    this.memo = memo;
  }
}
