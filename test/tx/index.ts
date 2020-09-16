import config, { test } from '../../src/config';
import { Tx, BaseMessage as Msg, Fee } from '../../src';

describe('Transaction', () => {
  describe('constructor', () => {
    it('generates default tx structure', () => {
      const tx = new Tx(test.TX);

      expect(tx.chain_id).toEqual(test.TX.chainId);
      expect(tx.account_number).toEqual(`${test.TX.accountNumber}`);
      expect(tx.sequence).toEqual(`${test.TX.sequence}`);
      expect(tx.msgs).toEqual([]);
      expect(tx.memo).toEqual(test.TX.memo);
      expect(tx.fee).toBeNull();
      expect(tx.signatures).toEqual([]);
    });

    it('generates tx structure with message', () => {
      const tx = new Tx({
        ...test.TX,
        msg: new Msg(test.MESSAGE.BASE),
      });

      expect(Array.isArray(tx.msgs)).toBe(true);
      expect(tx.msgs).toHaveLength(1);
      expect(tx.msgs[0].type).toEqual(config.MSG_TYPE.BASE.SEND);
    });

    it('generates tx structure with multiple messages', () => {
      const tx = new Tx({
        ...test.TX,
        msg: [
          new Msg(test.MESSAGE.BASE),
          new Msg(test.MESSAGE.BASE),
        ],
      });

      expect(Array.isArray(tx.msgs)).toBe(true);
      expect(tx.msgs).toHaveLength(2);
      expect(tx.msgs[0].type).toEqual(config.MSG_TYPE.BASE.SEND);
      expect(tx.msgs[1].type).toEqual(config.MSG_TYPE.BASE.SEND);
    });

    it('generates tx structure with fee', () => {
      const fee = new Fee();
      fee.setFee('10000umed');
      const tx = new Tx({
        ...test.TX,
        msg: [
          new Msg(test.MESSAGE.BASE),
          new Msg(test.MESSAGE.BASE),
        ],
        fee,
      });

      expect(typeof tx.fee).toBe('object');
      expect(Array.isArray(tx.fee!.amount)).toBe(true);
      expect(tx.fee!.amount).toHaveLength(1);
      expect(typeof +tx.fee!.gas).toBe('number');
    });
  });

  describe('addMsgs', () => {
    it('add messages in the structure', () => {
      const tx = new Tx(test.TX);
      expect(Array.isArray(tx.msgs)).toBe(true);
      expect(tx.msgs).toHaveLength(0);

      const msg = new Msg(test.MESSAGE.BASE);
      tx.addMsgs(msg);
      expect(Array.isArray(tx.msgs)).toBe(true);
      expect(tx.msgs).toHaveLength(1);
      expect(tx.msgs[0].type).toEqual(msg.type);

      tx.addMsgs(msg, msg);
      expect(Array.isArray(tx.msgs)).toBe(true);
      expect(tx.msgs).toHaveLength(3);
    });
  });

  describe('signingData', () => {
    it('generates serialized transaction hex string', () => {
      const tx = new Tx(test.TX);
      const signingData = tx.signingData();
      expect(typeof signingData).toBe('string');
      expect(signingData).toEqual(test.SERIALIZED_TX);
    });
  });

  describe('calculateHash', () => {
    it('generates transaction hash string', () => {
      const tx = new Tx(test.TX);
      const hash = tx.calculateHash();
      expect(typeof hash).toBe('string');
      expect(hash).toHaveLength(64);
      expect(hash).toEqual(test.HASH);
    });
  });

  describe('sign', () => {
    it('generates signature', () => {
      const tx = new Tx(test.TX);
      const signature = tx.sign(test.SIGNING_PRIVKEY);
      expect(signature).toEqual(test.SIGNATURE.signature);
      expect(Array.isArray(tx.signatures)).toBe(true);
      expect(tx.signatures).toHaveLength(1);
      expect(tx.signatures[0]).toEqual(test.SIGNATURE);
    });
  });

  describe('addSignature', () => {
    it('add signature to tx.signatures', () => {
      let tx = new Tx(test.TX);
      const signature = tx.sign(test.SIGNING_PRIVKEY);

      // reset tx
      tx = new Tx(test.TX);
      expect(Array.isArray(tx.signatures)).toBe(true);
      expect(tx.signatures).toHaveLength(0);
      tx.addSignature(test.SIGNING_PUBKEY, signature);
      expect(Array.isArray(tx.signatures)).toBe(true);
      expect(tx.signatures).toHaveLength(1);
      expect(tx.signatures[0].signature).toEqual(signature);
    });
  });

  describe('convertToBroadcastTx', () => {
    it('converts tx structure to broadcast tx structure', () => {
      const tx = new Tx(test.TX);
      const msg = new Msg(test.MESSAGE.BASE);
      tx.addMsgs(msg);
      const fee = new Fee();
      fee.setFee('10000umed');
      tx.setFee(fee);

      tx.sign(test.SIGNING_PRIVKEY);


      const broadcastTx = tx.convertToBroadcastTx();
      expect(broadcastTx.mode).toEqual('sync'); // default mode
      expect(broadcastTx.tx.msg).toEqual(tx.msgs);
      expect(broadcastTx.tx.fee).toEqual(fee);
      expect(broadcastTx.tx.signatures).toEqual(tx.signatures);
      expect(broadcastTx.tx.memo).toEqual(tx.memo);
    });
  });
});
