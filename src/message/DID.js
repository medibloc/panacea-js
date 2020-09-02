import { MSG_TYPE } from '../config/default';
import { checkParams } from '../utils/validate';

const { DID } = MSG_TYPE;

class CreateDID {
  constructor(data) {
    const requiredParams = ['did', 'document', 'sigKeyId', 'signature', 'fromAddress'];
    checkParams(requiredParams, data);

    this.type = DID.CREATE_DID;
    this.value = {
      did: data.did,
      document: data.document,
      sig_key_id: data.sigKeyId,
      signature: data.signature,
      from_address: data.fromAddress,
    };
  }
}

class UpdateDID {
  constructor(data) {
    const requiredParams = ['did', 'document', 'sigKeyId', 'signature', 'fromAddress'];
    checkParams(requiredParams, data);

    this.type = DID.UPDATE_DID;
    this.value = {
      did: data.did,
      document: data.document,
      sig_key_id: data.sigKeyId,
      signature: data.signature,
      from_address: data.fromAddress,
    };
  }
}

class DeactivateDID {
  constructor(data) {
    const requiredParams = ['did', 'sigKeyId', 'signature', 'fromAddress'];
    checkParams(requiredParams, data);

    this.type = DID.DEACTIVATE_DID;
    this.value = {
      did: data.did,
      sig_key_id: data.sigKeyId,
      signature: data.signature,
      from_address: data.fromAddress,
    };
  }
}

class DIDDocument {
  constructor(data) {
    this.id = data.id;
    this.publicKey = data.publicKey;
    this.authentication = data.authentication;
  }
}

class DIDPubKey {
  constructor(data) {
    this.id = data.id;
    this.type = data.type;
    this.publicKeyBase58 = data.publicKeyBase58;
  }
}

const InitialSequence = 0;

export {
  CreateDID,
  UpdateDID,
  DeactivateDID,
  DIDDocument,
  DIDPubKey,
  InitialSequence,
};
