import config, { test } from '../../src/config';
import { Message } from '../../src';

const { DID } = Message;

describe('DID message', () => {
  describe('CreateDID', () => {
    it('generates createDID message object', () => {
      const msg = new DID.CreateDID(test.MESSAGE.DID.CREATE_DID);

      expect(msg.type).toEqual(config.MSG_TYPE.DID.CREATE_DID);
      expect(msg.value.did).toEqual(test.MESSAGE.DID.CREATE_DID.did);
      expect(msg.value.document).toEqual(test.MESSAGE.DID.CREATE_DID.document);
      expect(msg.value.sig_key_id).toEqual(test.MESSAGE.DID.CREATE_DID.sigKeyId);
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
      expect(msg.value.sig_key_id).toEqual(test.MESSAGE.DID.UPDATE_DID.sigKeyId);
      expect(msg.value.signature).toEqual(test.MESSAGE.DID.UPDATE_DID.signature);
      expect(msg.value.from_address).toEqual(test.MESSAGE.DID.UPDATE_DID.fromAddress);
    });
  });

  describe('DeactivateDID', () => {
    it('generates deactivateDID message object', () => {
      const msg = new DID.DeactivateDID(test.MESSAGE.DID.DEACTIVATE_DID);

      expect(msg.type).toEqual(config.MSG_TYPE.DID.DEACTIVATE_DID);
      expect(msg.value.did).toEqual(test.MESSAGE.DID.DEACTIVATE_DID.did);
      expect(msg.value.sig_key_id).toEqual(test.MESSAGE.DID.DEACTIVATE_DID.sigKeyId);
      expect(msg.value.signature).toEqual(test.MESSAGE.DID.DEACTIVATE_DID.signature);
      expect(msg.value.from_address).toEqual(test.MESSAGE.DID.DEACTIVATE_DID.fromAddress);
    });
  });
});
