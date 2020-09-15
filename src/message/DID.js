import { MSG_TYPE } from '../config/default';
import { checkParams } from '../utils/validate';

const { DID } = MSG_TYPE;

class CreateDID {
  constructor(data) {
    const requiredParams = ['did', 'document', 'verificationMethodId', 'signature', 'fromAddress'];
    checkParams(requiredParams, data);

    this.type = DID.CREATE_DID;
    this.value = {
      did: data.did,
      document: data.document,
      verification_method_id: data.verificationMethodId,
      signature: data.signature,
      from_address: data.fromAddress,
    };
  }
}

class UpdateDID {
  constructor(data) {
    const requiredParams = ['did', 'document', 'verificationMethodId', 'signature', 'fromAddress'];
    checkParams(requiredParams, data);

    this.type = DID.UPDATE_DID;
    this.value = {
      did: data.did,
      document: data.document,
      verification_method_id: data.verificationMethodId,
      signature: data.signature,
      from_address: data.fromAddress,
    };
  }
}

class DeactivateDID {
  constructor(data) {
    const requiredParams = ['did', 'verificationMethodId', 'signature', 'fromAddress'];
    checkParams(requiredParams, data);

    this.type = DID.DEACTIVATE_DID;
    this.value = {
      did: data.did,
      verification_method_id: data.verificationMethodId,
      signature: data.signature,
      from_address: data.fromAddress,
    };
  }
}

const InitialSequence = 0;

export {
  CreateDID,
  UpdateDID,
  DeactivateDID,
  InitialSequence,
};
