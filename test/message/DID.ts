import 'reflect-metadata';  // for class-transformer
import config, { test } from '../../src/config';
import { Message } from '../../src';
import {classToPlain, plainToClass} from "class-transformer";

const { DID } = Message;

describe('DID message', () => {
  describe('CreateDID', () => {
    it('generates createDID message object', () => {
      const msg = new DID.CreateDID(test.MESSAGE.DID.CREATE_DID);

      expect(msg.type).toEqual(config.MSG_TYPE.DID.CREATE_DID);
      expect(msg.value.did).toEqual(test.MESSAGE.DID.CREATE_DID.did);
      expect(msg.value.document).toEqual(test.MESSAGE.DID.CREATE_DID.document);
      expect(msg.value.verification_method_id).toEqual(test.MESSAGE.DID.CREATE_DID.verificationMethodId);
      expect(msg.value.signature).toEqual(test.MESSAGE.DID.CREATE_DID.signature);
      expect(msg.value.from_address).toEqual(test.MESSAGE.DID.CREATE_DID.fromAddress);
    });
  });

  describe('UpdateDID', () => {
    it('generates updateDID message object', () => {
      const msg = new DID.UpdateDID(test.MESSAGE.DID.UPDATE_DID);

      expect(msg.type).toEqual(config.MSG_TYPE.DID.UPDATE_DID);
      expect(msg.value.did).toEqual(test.MESSAGE.DID.UPDATE_DID.did);
      expect(msg.value.document).toEqual(test.MESSAGE.DID.UPDATE_DID.document);
      expect(msg.value.verification_method_id).toEqual(test.MESSAGE.DID.UPDATE_DID.verificationMethodId);
      expect(msg.value.signature).toEqual(test.MESSAGE.DID.UPDATE_DID.signature);
      expect(msg.value.from_address).toEqual(test.MESSAGE.DID.UPDATE_DID.fromAddress);
    });
  });

  describe('DeactivateDID', () => {
    it('generates deactivateDID message object', () => {
      const msg = new DID.DeactivateDID(test.MESSAGE.DID.DEACTIVATE_DID);

      expect(msg.type).toEqual(config.MSG_TYPE.DID.DEACTIVATE_DID);
      expect(msg.value.did).toEqual(test.MESSAGE.DID.DEACTIVATE_DID.did);
      expect(msg.value.verification_method_id).toEqual(test.MESSAGE.DID.DEACTIVATE_DID.verificationMethodId);
      expect(msg.value.signature).toEqual(test.MESSAGE.DID.DEACTIVATE_DID.signature);
      expect(msg.value.from_address).toEqual(test.MESSAGE.DID.DEACTIVATE_DID.fromAddress);
    });
  });

  describe('DID classes transformation', () => {
    it('converts a DIDDocumentWithSeq to the plain object', () => {
      const docWithSeq = new Message.DID.DIDDocumentWithSeq(test.SIMPLE_DID_DOC, 100);
      expect(classToPlain(docWithSeq)).toEqual({
        document: test.SIMPLE_DID_DOC_PLAIN,
        sequence: '100',
      });
    });

    it('converts a plain object to the DIDDocumentWithSeq', () => {
      const plain = {
        document: test.SIMPLE_DID_DOC_PLAIN,
        sequence: '100',
      }
      const expected = new Message.DID.DIDDocumentWithSeq(test.SIMPLE_DID_DOC, 100);
      expect(plainToClass(Message.DID.DIDDocumentWithSeq, plain, {excludeExtraneousValues: true})).toEqual(expected);
    });
  });
});
