import { MSG_TYPE } from '../config/default';
import { checkParams } from '../utils/validate';

const { DID } = MSG_TYPE;

export class CreateDID {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
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

export class UpdateDID {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
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

export class DeactivateDID {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
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

export class DIDDocument {
  public id: string;
  public publicKey: Record<string, any>[]; //TODO @youngjoon-lee: use the DIDPubKey export class
  public authentication: string[];

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
    this.id = data.id;
    this.publicKey = data.publicKey;
    this.authentication = data.authentication;
  }
}

export class DIDPubKey {
  public id: string;
  public type: string;
  public publicKeyBase58: string;

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
    this.id = data.id;
    this.type = data.type;
    this.publicKeyBase58 = data.publicKeyBase58;
  }
}

export const InitialSequence = 0;
