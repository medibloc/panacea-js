import 'reflect-metadata';  // for class-transformer
import config, { test } from '../../src/config';
import { Message } from '../../src';

const { AOL } = Message;

describe('AOL message', () => {
  describe('CreateTopic', () => {
    it('generates default message object', () => {
      const msg = new AOL.CreateTopic(test.MESSAGE.AOL.CREATE_TOPIC);

      expect(msg.type).toEqual(config.MSG_TYPE.AOL.CREATE_TOPIC);
      expect(msg.value.topic_name).toEqual(test.MESSAGE.AOL.CREATE_TOPIC.topicName);
      expect(msg.value.description).toEqual(test.MESSAGE.AOL.CREATE_TOPIC.description);
      expect(msg.value.owner_address).toEqual(test.MESSAGE.AOL.CREATE_TOPIC.ownerAddress);
    });
  });

  describe('AddWriter', () => {
    it('generates addWriter message object', () => {
      const msg = new AOL.AddWriter(test.MESSAGE.AOL.ADD_WRITER);

      expect(msg.type).toEqual(config.MSG_TYPE.AOL.ADD_WRITER);
      expect(msg.value.topic_name).toEqual(test.MESSAGE.AOL.ADD_WRITER.topicName);
      expect(msg.value.moniker).toEqual(test.MESSAGE.AOL.ADD_WRITER.moniker);
      expect(msg.value.description).toEqual(test.MESSAGE.AOL.ADD_WRITER.description);
      expect(msg.value.writer_address).toEqual(test.MESSAGE.AOL.ADD_WRITER.writerAddress);
      expect(msg.value.owner_address).toEqual(test.MESSAGE.AOL.ADD_WRITER.ownerAddress);
    });
  });

  describe('AddRecord', () => {
    it('generates addRecord message object', () => {
      const msg = new AOL.AddRecord(test.MESSAGE.AOL.ADD_RECORD);

      expect(msg.type).toEqual(config.MSG_TYPE.AOL.ADD_RECORD);
      expect(msg.value.topic_name).toEqual(test.MESSAGE.AOL.ADD_RECORD.topicName);
      expect(msg.value.key).toEqual(Buffer.from(test.MESSAGE.AOL.ADD_RECORD.key).toString('base64'));
      expect(msg.value.value).toEqual(Buffer.from(test.MESSAGE.AOL.ADD_RECORD.value).toString('base64'));
      expect(msg.value.writer_address).toEqual(test.MESSAGE.AOL.ADD_RECORD.writerAddress);
      expect(msg.value.owner_address).toEqual(test.MESSAGE.AOL.ADD_RECORD.ownerAddress);
      expect(msg.value.fee_payer_address).toEqual(test.MESSAGE.AOL.ADD_RECORD.feePayerAddress);
    });
  });

  describe('DeleteWriter', () => {
    it('generates deleteWriter message object', () => {
      const msg = new AOL.DeleteWriter(test.MESSAGE.AOL.DELETE_WRITER);

      expect(msg.type).toEqual(config.MSG_TYPE.AOL.DELETE_WRITER);
      expect(msg.value.topic_name).toEqual(test.MESSAGE.AOL.DELETE_WRITER.topicName);
      expect(msg.value.writer_address).toEqual(test.MESSAGE.AOL.DELETE_WRITER.writerAddress);
      expect(msg.value.owner_address).toEqual(test.MESSAGE.AOL.DELETE_WRITER.ownerAddress);
    });
  });
});
