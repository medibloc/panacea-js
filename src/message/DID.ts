import { MSG_TYPE } from '../config/default';
import { checkParams } from '../utils/validate';
import {classToPlain, Expose, plainToClass, Transform, Type} from 'class-transformer';
import is from "is_js"

const { DID } = MSG_TYPE;

export class CreateDID {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
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

export class UpdateDID {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
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

export class DeactivateDID {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
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
  @Expose({name: '@context'})
  @Transform(v => (Array.isArray(v) ? v : [v]), {toClassOnly: true})
  @Transform(v => (v.length === 1 ? v[0] : v), {toPlainOnly: true})
  public contexts: string[];

  @Expose()
  public readonly id: string;

  @Expose()
  @Type(() => DIDVerificationMethod)
  public verificationMethod: DIDVerificationMethod[];

  @Expose()
  // NOTE: @Transform shouldn't be used along with @Type, if you want '{excludeExtraneousValues: true}'.
  @Transform(l => l.map(DIDAuthentication.fromPlain), {toClassOnly: true})
  @Transform(l => l.map(DIDAuthentication.toPlain), {toPlainOnly: true})
  public authentication: DIDAuthentication[];

  constructor(contexts: string[], id: string, verificationMethod: DIDVerificationMethod[], authentication: DIDAuthentication[]) {
    this.contexts = contexts;
    this.id = id;
    this.verificationMethod = verificationMethod;
    this.authentication = authentication;
  }
}

export class DIDVerificationMethod {
  @Expose()
  public id: string;
  @Expose()
  public type: string;
  @Expose()
  public controller: string;
  @Expose()
  public publicKeyBase58: string;

  constructor(id: string, type: string, controller: string, publicKeyBase58: string) {
    this.id = id;
    this.type = type;
    this.controller = controller;
    this.publicKeyBase58 = publicKeyBase58;
  }
}

export class DIDAuthentication {
  public veriMethodID: string;
  public dedicatedVeriMethod?: DIDVerificationMethod;

  constructor(veriMethodID: string, dedicatedVeriMethod?: DIDVerificationMethod) {
    if (dedicatedVeriMethod && (veriMethodID !== dedicatedVeriMethod.id)) {
      throw new Error(`id(${veriMethodID}) is different from the ID(${dedicatedVeriMethod.id}) of the dedicated verification method`);
    }

    this.veriMethodID = veriMethodID;
    this.dedicatedVeriMethod = dedicatedVeriMethod;
  }

  // This class cannot be simply transformed by class-transformer annotations
  static fromPlain(plain: string | Record<string, any>): DIDAuthentication {
    if (is.string(plain)) {
      return new DIDAuthentication(plain as string);
    }

    const veriMethod = plainToClass(DIDVerificationMethod, plain, {excludeExtraneousValues: true});
    return new DIDAuthentication(veriMethod.id, veriMethod);
  }

  // This class cannot be simply transformed by class-transformer annotations
  static toPlain(obj: DIDAuthentication): string | Record<string, any> {
    if (obj.dedicatedVeriMethod) {
      return classToPlain(obj.dedicatedVeriMethod);
    }
    return obj.veriMethodID;
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
