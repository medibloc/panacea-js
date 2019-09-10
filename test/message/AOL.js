import { expect } from 'chai';
import config, { test } from '../../src/config';
import { AOL } from '../../src/message';

describe('AOL message', () => {
  describe('CreateTopic', () => {
    it('throws an error without required parameters', () => {
      expect(() => new AOL.CreateTopic()).to.throw();
    });

    it('generates default message object', () => {
      const msg = new AOL.CreateTopic(test.MESSAGE.AOL.CREATE_TOPIC);

      expect(msg.type).to.be.equal(config.MSG_TYPE.AOL.CREATE_TOPIC);
      expect(msg.value.topic_name).to.be.equal(test.MESSAGE.AOL.CREATE_TOPIC.topicName);
      expect(msg.value.description).to.be.equal(test.MESSAGE.AOL.CREATE_TOPIC.description);
      expect(msg.value.owner_address).to.be.equal(test.MESSAGE.AOL.CREATE_TOPIC.ownerAddress);
    });
  });

  describe('AddWriter', () => {
    it('throws an error without required parameters', () => {
      expect(() => new AOL.AddWriter()).to.throw();
    });

    it('generates addWriter message object', () => {
      const msg = new AOL.AddWriter(test.MESSAGE.AOL.ADD_WRITER);

      expect(msg.type).to.be.equal(config.MSG_TYPE.AOL.ADD_WRITER);
      expect(msg.value.topic_name).to.be.equal(test.MESSAGE.AOL.ADD_WRITER.topicName);
      expect(msg.value.moniker).to.be.equal(test.MESSAGE.AOL.ADD_WRITER.moniker);
      expect(msg.value.description).to.be.equal(test.MESSAGE.AOL.ADD_WRITER.description);
      expect(msg.value.writer_address).to.be.equal(test.MESSAGE.AOL.ADD_WRITER.writerAddress);
      expect(msg.value.owner_address).to.be.equal(test.MESSAGE.AOL.ADD_WRITER.ownerAddress);
    });
  });

  describe('AddRecord', () => {
    it('throws an error without required parameters', () => {
      expect(() => new AOL.AddRecord()).to.throw();
    });

    it('generates addRecord message object', () => {
      const msg = new AOL.AddRecord(test.MESSAGE.AOL.ADD_RECORD);

      expect(msg.type).to.be.equal(config.MSG_TYPE.AOL.ADD_RECORD);
      expect(msg.value.topic_name).to.be.equal(test.MESSAGE.AOL.ADD_RECORD.topicName);
      expect(msg.value.key).to.be
        .equal(Buffer.from(test.MESSAGE.AOL.ADD_RECORD.key).toString('base64'));
      expect(msg.value.value).to.be
        .equal(Buffer.from(test.MESSAGE.AOL.ADD_RECORD.value).toString('base64'));
      expect(msg.value.writer_address).to.be.equal(test.MESSAGE.AOL.ADD_RECORD.writerAddress);
      expect(msg.value.owner_address).to.be.equal(test.MESSAGE.AOL.ADD_RECORD.ownerAddress);
      expect(msg.value.fee_payer_address).to.be.equal(test.MESSAGE.AOL.ADD_RECORD.feePayerAddress);
    });
  });

  describe('DeleteWriter', () => {
    it('throws an error without required parameters', () => {
      expect(() => new AOL.DeleteWriter()).to.throw();
    });

    it('generates deleteWriter message object', () => {
      const msg = new AOL.DeleteWriter(test.MESSAGE.AOL.DELETE_WRITER);

      expect(msg.type).to.be.equal(config.MSG_TYPE.AOL.DELETE_WRITER);
      expect(msg.value.topic_name).to.be.equal(test.MESSAGE.AOL.DELETE_WRITER.topicName);
      expect(msg.value.writer_address).to.be.equal(test.MESSAGE.AOL.DELETE_WRITER.writerAddress);
      expect(msg.value.owner_address).to.be.equal(test.MESSAGE.AOL.DELETE_WRITER.ownerAddress);
    });
  });
});
