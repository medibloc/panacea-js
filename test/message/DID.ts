import { expect } from 'chai';
import config, { test } from '../../src/config';
import { Message } from '../../';

const { DID } = Message;

describe('DID message', () => {
  describe('CreateDID', () => {
    it('generates createDID message object', () => {
      const msg = new DID.CreateDID(test.MESSAGE.DID.CREATE_DID);

      expect(msg.type).to.be.equal(config.MSG_TYPE.DID.CREATE_DID);
      expect(msg.value.did).to.be.equal(test.MESSAGE.DID.CREATE_DID.did);
      expect(msg.value.document).to.be.equal(test.MESSAGE.DID.CREATE_DID.document);
      expect(msg.value.verification_method_id).to.be.equal(test.MESSAGE.DID.CREATE_DID.verificationMethodId);
      expect(msg.value.signature).to.be.equal(test.MESSAGE.DID.CREATE_DID.signature);
      expect(msg.value.from_address).to.be.equal(test.MESSAGE.DID.CREATE_DID.fromAddress);
    });
  });

  describe('UpdateDID', () => {
    it('generates updateDID message object', () => {
      const msg = new DID.UpdateDID(test.MESSAGE.DID.UPDATE_DID);

      expect(msg.type).to.be.equal(config.MSG_TYPE.DID.UPDATE_DID);
      expect(msg.value.did).to.be.equal(test.MESSAGE.DID.UPDATE_DID.did);
      expect(msg.value.document).to.be.equal(test.MESSAGE.DID.UPDATE_DID.document);
      expect(msg.value.verification_method_id).to.be.equal(test.MESSAGE.DID.UPDATE_DID.verificationMethodId);
      expect(msg.value.signature).to.be.equal(test.MESSAGE.DID.UPDATE_DID.signature);
      expect(msg.value.from_address).to.be.equal(test.MESSAGE.DID.UPDATE_DID.fromAddress);
    });
  });

  describe('DeactivateDID', () => {
    it('generates deactivateDID message object', () => {
      const msg = new DID.DeactivateDID(test.MESSAGE.DID.DEACTIVATE_DID);

      expect(msg.type).to.be.equal(config.MSG_TYPE.DID.DEACTIVATE_DID);
      expect(msg.value.did).to.be.equal(test.MESSAGE.DID.DEACTIVATE_DID.did);
      expect(msg.value.verification_method_id).to.be.equal(test.MESSAGE.DID.DEACTIVATE_DID.verificationMethodId);
      expect(msg.value.signature).to.be.equal(test.MESSAGE.DID.DEACTIVATE_DID.signature);
      expect(msg.value.from_address).to.be.equal(test.MESSAGE.DID.DEACTIVATE_DID.fromAddress);
    });
  });
});
