import { expect } from 'chai';
import config, { test } from '../../src/config';
import Tx from '../../src/tx';
import Msg from '../../src/message';
import { Fee } from '../../src/coin';

describe('Transaction', () => {
  describe('constructor', () => {
    it('throws an error without chain id', () => {
      expect(() => new Tx()).to.throw();
    });

    it('generates default tx structure', () => {
      const tx = new Tx(test.TX);

      expect(tx.chain_id).to.be.equal(test.TX.chainId);
      expect(tx.account_number).to.be.equal(`${test.TX.accountNumber}`);
      expect(tx.sequence).to.be.equal(`${test.TX.sequence}`);
      expect(tx.msgs).to.be.eql([]);
      expect(tx.memo).to.be.equal(test.TX.memo);
      expect(tx.fee).to.be.null;
      expect(tx.signatures).to.be.eql([]);
    });

    it('generates tx structure with message', () => {
      const tx = new Tx({
        ...test.TX,
        msg: new Msg(test.MESSAGE.BASE),
      });

      expect(tx.msgs).to.be.an('array').lengthOf(1);
      expect(tx.msgs[0].type).to.be.equal(config.MSG_TYPE.BASE.SEND);
    });

    it('generates tx structure with multiple messages', () => {
      const tx = new Tx({
        ...test.TX,
        msg: [
          new Msg(test.MESSAGE.BASE),
          new Msg(test.MESSAGE.BASE),
        ],
      });

      expect(tx.msgs).to.be.an('array').lengthOf(2);
      expect(tx.msgs[0].type).to.be.equal(config.MSG_TYPE.BASE.SEND);
      expect(tx.msgs[1].type).to.be.equal(config.MSG_TYPE.BASE.SEND);
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

      expect(tx.fee).to.be.an('object');
      expect(tx.fee.amount).to.be.an('array').lengthOf(1);
      expect(+tx.fee.gas).to.be.a('number');
    });
  });

  describe('addMsgs', () => {
    it('add messages in the structure', () => {
      const tx = new Tx(test.TX);
      expect(tx.msgs).to.be.an('array').lengthOf(0);

      const msg = new Msg(test.MESSAGE.BASE);
      tx.addMsgs(msg);
      expect(tx.msgs).to.be.an('array').lengthOf(1);
      expect(tx.msgs[0].type).to.be.equal(msg.type);

      tx.addMsgs(msg, msg);
      expect(tx.msgs).to.be.an('array').lengthOf(3);
    });
  });

  describe('signingData', () => {
    it('generates serialized transaction hex string', () => {
      const tx = new Tx(test.TX);
      const signingData = tx.signingData();
      expect(signingData).to.be.a('string');
      expect(signingData).to.be.equal(test.SERIALIZED_TX);
    });
  });

  describe('calculateHash', () => {
    it('generates transaction hash string', () => {
      const tx = new Tx(test.TX);
      const hash = tx.calculateHash();
      expect(hash).to.be.a('string').lengthOf(64);
      expect(hash).to.be.equal(test.HASH);
    });
  });

  describe('sign', () => {
    it('generates signature', () => {
      const tx = new Tx(test.TX);
      const signature = tx.sign(test.SIGNING_PRIVKEY);
      expect(signature).to.be.equal(test.SIGNATURE.signature);
      expect(tx.signatures).to.be.an('array').lengthOf(1);
      expect(tx.signatures[0]).to.be.eql(test.SIGNATURE);
    });
  });

  describe('addSignature', () => {
    it('add signature to tx.signatures', () => {
      let tx = new Tx(test.TX);
      const signature = tx.sign(test.SIGNING_PRIVKEY);

      // reset tx
      tx = new Tx(test.TX);
      expect(tx.signatures).to.be.an('array').lengthOf(0);
      tx.addSignature(test.SIGNING_PUBKEY, signature);
      expect(tx.signatures).to.be.an('array').lengthOf(1);
      expect(tx.signatures[0].signature).to.be.eql(signature);
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
      expect(broadcastTx.mode).to.be.equal('sync'); // default mode
      expect(broadcastTx.tx.msg).to.be.eql(tx.msgs);
      expect(broadcastTx.tx.fee).to.be.eql(fee);
      expect(broadcastTx.tx.signatures).to.be.eql(tx.signatures);
      expect(broadcastTx.tx.memo).to.be.eql(tx.memo);
    });
  });
});
