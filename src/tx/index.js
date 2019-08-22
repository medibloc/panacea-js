import is from 'is_js';
import { sortJsonProperties } from '../utils/encoding';
import { sha256 } from '../utils';
import {
  generateSignatureFromHash,
  getPublicKeyFromPrivateKey
} from '../crypto';
import { BROADCAST_MODE } from '../../config';


class Transaction {
  constructor(data) {
    if (!data.chainId) {
      throw new Error("chain id should not be null");
    }

    let msg = data.msg ? [data.msg] : [];
    if (is.array(data.msg)) msg = data.msg;

    this.sequence = data.sequence || 0;
    this.account_number = data.accountNumber || '0';
    this.chain_id = data.chainId;
    this.msgs = msg;
    this.memo = data.memo || "";
    this.fee = data.fee;
    this.signatures = data.signatures || [];
  }

  addMsgs(...msgs) {
    // I hope you fully understand the importance of the message's sequence
    this.msgs = [...this.msgs, ...msgs];
  }

  signingData() {
    const sortedJsonTx = sortJsonProperties({
      fee: this.fee,
      memo: this.memo,
      msgs: this.msgs.map(msg => sortJsonProperties(msg)),
      sequence: this.sequence.toString(),
      account_number: this.account_number.toString(),
      chain_id: this.chain_id,
    });
    const serializedTx = JSON.stringify(sortedJsonTx);
    const serializedTxHex = Buffer.from(serializedTx).toString('hex');
    return serializedTxHex;
  }

  calculateHash() {
    const signingData = this.signingData();
    return sha256(signingData);
  }

  sign(privateKey) {
    if (!privateKey){
      throw new Error("private key should not be null")
    }

    const hash = this.calculateHash();
    const signatureHex = generateSignatureFromHash(hash, privateKey);
    const signatureBase64 = Buffer.from(signatureHex, 'hex').toString('base64');
    this.addSignature(getPublicKeyFromPrivateKey(privateKey), signatureBase64);
    return signatureBase64;
  }

  addSignature(pubKey, signature) {
    const pubKeyBase64 = Buffer.from(pubKey, 'hex').toString('base64');
    this.signatures.push({
      pub_key: {
        type: "tendermint/PubKeySecp256k1", // It only supports secp256k1 curve only
        value: pubKeyBase64,
      },
      signature,
    });
  }

  convertToBroadcastTx(mode = 'sync') {
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

export default Transaction;
