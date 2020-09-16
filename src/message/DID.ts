import { MSG_TYPE } from '../config/default';
import { checkParams } from '../utils/validate';
import {Expose, Transform, Type} from 'class-transformer';

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

/**
 * The return-type of the DID GET operation
 */
export class DIDDocumentWithSeq {
  @Expose()
  @Type(() => DIDDocument)
  public readonly document: DIDDocument;
  @Expose()
  @Transform(s => Number(s), {toClassOnly: true})
  @Transform(n => n.toString(), {toPlainOnly: true})
  public readonly sequence: number;

  constructor(document: DIDDocument, sequence: number) {
    this.document = document;
    this.sequence = sequence;
  }
}

export class DIDDocument {
  @Expose()
  public readonly id: string;
  @Expose()
  @Type(() => DIDPubKey)
  public publicKey: DIDPubKey[];
  @Expose()
  public authentication: string[];

  constructor(id: string, publicKey: DIDPubKey[], authentication: string[]) {
    this.id = id;
    this.publicKey = publicKey;
    this.authentication = authentication;
  }
}

export class DIDPubKey {
  @Expose()
  public id: string;
  @Expose()
  public type: string;
  @Expose()
  public publicKeyBase58: string;

  constructor(id: string, type: string, publicKeyBase58: string) {
    this.id = id;
    this.type = type;
    this.publicKeyBase58 = publicKeyBase58;
  }
}

export const InitialSequence = 0;

/**
 * Can be serialized for generating a signature for authenticating the DID ownership.
 * The data can be anything, but the sequence must be specified for preventing replay-attacks.
 */
export class DIDSignable {
  @Expose()
  public readonly data: any;
  @Expose()
  @Transform(s => Number(s), {toClassOnly: true})
  @Transform(n => n.toString(), {toPlainOnly: true})
  public readonly sequence: number;

  constructor(data: any, sequence: number) {
    this.data = data;
    this.sequence = sequence;
  }
}
