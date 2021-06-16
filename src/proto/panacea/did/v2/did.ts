/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.did.v2";

export interface Strings {
  values: string[];
}

export interface DIDDocument {
  contexts: Strings | undefined;
  ID: string;
  controller: Strings | undefined;
  verificationMethods: VerificationMethod[];
  authentications: VerificationRelationship[];
  assertionMethods: VerificationRelationship[];
  keyAgreements: VerificationRelationship[];
  capabilityInvocations: VerificationRelationship[];
  capabilityDelegations: VerificationRelationship[];
  services: Service[];
}

export interface VerificationMethod {
  ID: string;
  type: string;
  controller: string;
  pubKeyBase58: string;
}

export interface VerificationRelationship {
  verificationMethodID: string;
  dedicatedVerificationMethod: VerificationMethod | undefined;
}

export interface Service {
  ID: string;
  type: string;
  serviceEndpoint: string;
}

export interface DIDDocumentWithSeq {
  document: DIDDocument | undefined;
  seq: Long;
}

const baseStrings: object = { values: "" };

export const Strings = {
  encode(
    message: Strings,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.values) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Strings {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStrings } as Strings;
    message.values = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.values.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Strings {
    const message = { ...baseStrings } as Strings;
    message.values = [];
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(String(e));
      }
    }
    return message;
  },

  toJSON(message: Strings): unknown {
    const obj: any = {};
    if (message.values) {
      obj.values = message.values.map((e) => e);
    } else {
      obj.values = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<Strings>): Strings {
    const message = { ...baseStrings } as Strings;
    message.values = [];
    if (object.values !== undefined && object.values !== null) {
      for (const e of object.values) {
        message.values.push(e);
      }
    }
    return message;
  },
};

const baseDIDDocument: object = { ID: "" };

export const DIDDocument = {
  encode(
    message: DIDDocument,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.contexts !== undefined) {
      Strings.encode(message.contexts, writer.uint32(10).fork()).ldelim();
    }
    if (message.ID !== "") {
      writer.uint32(18).string(message.ID);
    }
    if (message.controller !== undefined) {
      Strings.encode(message.controller, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.verificationMethods) {
      VerificationMethod.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.authentications) {
      VerificationRelationship.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.assertionMethods) {
      VerificationRelationship.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.keyAgreements) {
      VerificationRelationship.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.capabilityInvocations) {
      VerificationRelationship.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    for (const v of message.capabilityDelegations) {
      VerificationRelationship.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.services) {
      Service.encode(v!, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DIDDocument {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDIDDocument } as DIDDocument;
    message.verificationMethods = [];
    message.authentications = [];
    message.assertionMethods = [];
    message.keyAgreements = [];
    message.capabilityInvocations = [];
    message.capabilityDelegations = [];
    message.services = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.contexts = Strings.decode(reader, reader.uint32());
          break;
        case 2:
          message.ID = reader.string();
          break;
        case 3:
          message.controller = Strings.decode(reader, reader.uint32());
          break;
        case 4:
          message.verificationMethods.push(
            VerificationMethod.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.authentications.push(
            VerificationRelationship.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.assertionMethods.push(
            VerificationRelationship.decode(reader, reader.uint32())
          );
          break;
        case 7:
          message.keyAgreements.push(
            VerificationRelationship.decode(reader, reader.uint32())
          );
          break;
        case 8:
          message.capabilityInvocations.push(
            VerificationRelationship.decode(reader, reader.uint32())
          );
          break;
        case 9:
          message.capabilityDelegations.push(
            VerificationRelationship.decode(reader, reader.uint32())
          );
          break;
        case 10:
          message.services.push(Service.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DIDDocument {
    const message = { ...baseDIDDocument } as DIDDocument;
    message.verificationMethods = [];
    message.authentications = [];
    message.assertionMethods = [];
    message.keyAgreements = [];
    message.capabilityInvocations = [];
    message.capabilityDelegations = [];
    message.services = [];
    if (object.contexts !== undefined && object.contexts !== null) {
      message.contexts = Strings.fromJSON(object.contexts);
    } else {
      message.contexts = undefined;
    }
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = String(object.ID);
    } else {
      message.ID = "";
    }
    if (object.controller !== undefined && object.controller !== null) {
      message.controller = Strings.fromJSON(object.controller);
    } else {
      message.controller = undefined;
    }
    if (
      object.verificationMethods !== undefined &&
      object.verificationMethods !== null
    ) {
      for (const e of object.verificationMethods) {
        message.verificationMethods.push(VerificationMethod.fromJSON(e));
      }
    }
    if (
      object.authentications !== undefined &&
      object.authentications !== null
    ) {
      for (const e of object.authentications) {
        message.authentications.push(VerificationRelationship.fromJSON(e));
      }
    }
    if (
      object.assertionMethods !== undefined &&
      object.assertionMethods !== null
    ) {
      for (const e of object.assertionMethods) {
        message.assertionMethods.push(VerificationRelationship.fromJSON(e));
      }
    }
    if (object.keyAgreements !== undefined && object.keyAgreements !== null) {
      for (const e of object.keyAgreements) {
        message.keyAgreements.push(VerificationRelationship.fromJSON(e));
      }
    }
    if (
      object.capabilityInvocations !== undefined &&
      object.capabilityInvocations !== null
    ) {
      for (const e of object.capabilityInvocations) {
        message.capabilityInvocations.push(
          VerificationRelationship.fromJSON(e)
        );
      }
    }
    if (
      object.capabilityDelegations !== undefined &&
      object.capabilityDelegations !== null
    ) {
      for (const e of object.capabilityDelegations) {
        message.capabilityDelegations.push(
          VerificationRelationship.fromJSON(e)
        );
      }
    }
    if (object.services !== undefined && object.services !== null) {
      for (const e of object.services) {
        message.services.push(Service.fromJSON(e));
      }
    }
    return message;
  },

  toJSON(message: DIDDocument): unknown {
    const obj: any = {};
    message.contexts !== undefined &&
      (obj.contexts = message.contexts
        ? Strings.toJSON(message.contexts)
        : undefined);
    message.ID !== undefined && (obj.ID = message.ID);
    message.controller !== undefined &&
      (obj.controller = message.controller
        ? Strings.toJSON(message.controller)
        : undefined);
    if (message.verificationMethods) {
      obj.verificationMethods = message.verificationMethods.map((e) =>
        e ? VerificationMethod.toJSON(e) : undefined
      );
    } else {
      obj.verificationMethods = [];
    }
    if (message.authentications) {
      obj.authentications = message.authentications.map((e) =>
        e ? VerificationRelationship.toJSON(e) : undefined
      );
    } else {
      obj.authentications = [];
    }
    if (message.assertionMethods) {
      obj.assertionMethods = message.assertionMethods.map((e) =>
        e ? VerificationRelationship.toJSON(e) : undefined
      );
    } else {
      obj.assertionMethods = [];
    }
    if (message.keyAgreements) {
      obj.keyAgreements = message.keyAgreements.map((e) =>
        e ? VerificationRelationship.toJSON(e) : undefined
      );
    } else {
      obj.keyAgreements = [];
    }
    if (message.capabilityInvocations) {
      obj.capabilityInvocations = message.capabilityInvocations.map((e) =>
        e ? VerificationRelationship.toJSON(e) : undefined
      );
    } else {
      obj.capabilityInvocations = [];
    }
    if (message.capabilityDelegations) {
      obj.capabilityDelegations = message.capabilityDelegations.map((e) =>
        e ? VerificationRelationship.toJSON(e) : undefined
      );
    } else {
      obj.capabilityDelegations = [];
    }
    if (message.services) {
      obj.services = message.services.map((e) =>
        e ? Service.toJSON(e) : undefined
      );
    } else {
      obj.services = [];
    }
    return obj;
  },

  fromPartial(object: DeepPartial<DIDDocument>): DIDDocument {
    const message = { ...baseDIDDocument } as DIDDocument;
    message.verificationMethods = [];
    message.authentications = [];
    message.assertionMethods = [];
    message.keyAgreements = [];
    message.capabilityInvocations = [];
    message.capabilityDelegations = [];
    message.services = [];
    if (object.contexts !== undefined && object.contexts !== null) {
      message.contexts = Strings.fromPartial(object.contexts);
    } else {
      message.contexts = undefined;
    }
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = object.ID;
    } else {
      message.ID = "";
    }
    if (object.controller !== undefined && object.controller !== null) {
      message.controller = Strings.fromPartial(object.controller);
    } else {
      message.controller = undefined;
    }
    if (
      object.verificationMethods !== undefined &&
      object.verificationMethods !== null
    ) {
      for (const e of object.verificationMethods) {
        message.verificationMethods.push(VerificationMethod.fromPartial(e));
      }
    }
    if (
      object.authentications !== undefined &&
      object.authentications !== null
    ) {
      for (const e of object.authentications) {
        message.authentications.push(VerificationRelationship.fromPartial(e));
      }
    }
    if (
      object.assertionMethods !== undefined &&
      object.assertionMethods !== null
    ) {
      for (const e of object.assertionMethods) {
        message.assertionMethods.push(VerificationRelationship.fromPartial(e));
      }
    }
    if (object.keyAgreements !== undefined && object.keyAgreements !== null) {
      for (const e of object.keyAgreements) {
        message.keyAgreements.push(VerificationRelationship.fromPartial(e));
      }
    }
    if (
      object.capabilityInvocations !== undefined &&
      object.capabilityInvocations !== null
    ) {
      for (const e of object.capabilityInvocations) {
        message.capabilityInvocations.push(
          VerificationRelationship.fromPartial(e)
        );
      }
    }
    if (
      object.capabilityDelegations !== undefined &&
      object.capabilityDelegations !== null
    ) {
      for (const e of object.capabilityDelegations) {
        message.capabilityDelegations.push(
          VerificationRelationship.fromPartial(e)
        );
      }
    }
    if (object.services !== undefined && object.services !== null) {
      for (const e of object.services) {
        message.services.push(Service.fromPartial(e));
      }
    }
    return message;
  },
};

const baseVerificationMethod: object = {
  ID: "",
  type: "",
  controller: "",
  pubKeyBase58: "",
};

export const VerificationMethod = {
  encode(
    message: VerificationMethod,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ID !== "") {
      writer.uint32(10).string(message.ID);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.controller !== "") {
      writer.uint32(26).string(message.controller);
    }
    if (message.pubKeyBase58 !== "") {
      writer.uint32(34).string(message.pubKeyBase58);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerificationMethod {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseVerificationMethod } as VerificationMethod;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ID = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.controller = reader.string();
          break;
        case 4:
          message.pubKeyBase58 = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VerificationMethod {
    const message = { ...baseVerificationMethod } as VerificationMethod;
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = String(object.ID);
    } else {
      message.ID = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (object.controller !== undefined && object.controller !== null) {
      message.controller = String(object.controller);
    } else {
      message.controller = "";
    }
    if (object.pubKeyBase58 !== undefined && object.pubKeyBase58 !== null) {
      message.pubKeyBase58 = String(object.pubKeyBase58);
    } else {
      message.pubKeyBase58 = "";
    }
    return message;
  },

  toJSON(message: VerificationMethod): unknown {
    const obj: any = {};
    message.ID !== undefined && (obj.ID = message.ID);
    message.type !== undefined && (obj.type = message.type);
    message.controller !== undefined && (obj.controller = message.controller);
    message.pubKeyBase58 !== undefined &&
      (obj.pubKeyBase58 = message.pubKeyBase58);
    return obj;
  },

  fromPartial(object: DeepPartial<VerificationMethod>): VerificationMethod {
    const message = { ...baseVerificationMethod } as VerificationMethod;
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = object.ID;
    } else {
      message.ID = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (object.controller !== undefined && object.controller !== null) {
      message.controller = object.controller;
    } else {
      message.controller = "";
    }
    if (object.pubKeyBase58 !== undefined && object.pubKeyBase58 !== null) {
      message.pubKeyBase58 = object.pubKeyBase58;
    } else {
      message.pubKeyBase58 = "";
    }
    return message;
  },
};

const baseVerificationRelationship: object = { verificationMethodID: "" };

export const VerificationRelationship = {
  encode(
    message: VerificationRelationship,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.verificationMethodID !== "") {
      writer.uint32(10).string(message.verificationMethodID);
    }
    if (message.dedicatedVerificationMethod !== undefined) {
      VerificationMethod.encode(
        message.dedicatedVerificationMethod,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): VerificationRelationship {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseVerificationRelationship,
    } as VerificationRelationship;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.verificationMethodID = reader.string();
          break;
        case 2:
          message.dedicatedVerificationMethod = VerificationMethod.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): VerificationRelationship {
    const message = {
      ...baseVerificationRelationship,
    } as VerificationRelationship;
    if (
      object.verificationMethodID !== undefined &&
      object.verificationMethodID !== null
    ) {
      message.verificationMethodID = String(object.verificationMethodID);
    } else {
      message.verificationMethodID = "";
    }
    if (
      object.dedicatedVerificationMethod !== undefined &&
      object.dedicatedVerificationMethod !== null
    ) {
      message.dedicatedVerificationMethod = VerificationMethod.fromJSON(
        object.dedicatedVerificationMethod
      );
    } else {
      message.dedicatedVerificationMethod = undefined;
    }
    return message;
  },

  toJSON(message: VerificationRelationship): unknown {
    const obj: any = {};
    message.verificationMethodID !== undefined &&
      (obj.verificationMethodID = message.verificationMethodID);
    message.dedicatedVerificationMethod !== undefined &&
      (obj.dedicatedVerificationMethod = message.dedicatedVerificationMethod
        ? VerificationMethod.toJSON(message.dedicatedVerificationMethod)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<VerificationRelationship>
  ): VerificationRelationship {
    const message = {
      ...baseVerificationRelationship,
    } as VerificationRelationship;
    if (
      object.verificationMethodID !== undefined &&
      object.verificationMethodID !== null
    ) {
      message.verificationMethodID = object.verificationMethodID;
    } else {
      message.verificationMethodID = "";
    }
    if (
      object.dedicatedVerificationMethod !== undefined &&
      object.dedicatedVerificationMethod !== null
    ) {
      message.dedicatedVerificationMethod = VerificationMethod.fromPartial(
        object.dedicatedVerificationMethod
      );
    } else {
      message.dedicatedVerificationMethod = undefined;
    }
    return message;
  },
};

const baseService: object = { ID: "", type: "", serviceEndpoint: "" };

export const Service = {
  encode(
    message: Service,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ID !== "") {
      writer.uint32(10).string(message.ID);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.serviceEndpoint !== "") {
      writer.uint32(26).string(message.serviceEndpoint);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Service {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseService } as Service;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ID = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.serviceEndpoint = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Service {
    const message = { ...baseService } as Service;
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = String(object.ID);
    } else {
      message.ID = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = String(object.type);
    } else {
      message.type = "";
    }
    if (
      object.serviceEndpoint !== undefined &&
      object.serviceEndpoint !== null
    ) {
      message.serviceEndpoint = String(object.serviceEndpoint);
    } else {
      message.serviceEndpoint = "";
    }
    return message;
  },

  toJSON(message: Service): unknown {
    const obj: any = {};
    message.ID !== undefined && (obj.ID = message.ID);
    message.type !== undefined && (obj.type = message.type);
    message.serviceEndpoint !== undefined &&
      (obj.serviceEndpoint = message.serviceEndpoint);
    return obj;
  },

  fromPartial(object: DeepPartial<Service>): Service {
    const message = { ...baseService } as Service;
    if (object.ID !== undefined && object.ID !== null) {
      message.ID = object.ID;
    } else {
      message.ID = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = "";
    }
    if (
      object.serviceEndpoint !== undefined &&
      object.serviceEndpoint !== null
    ) {
      message.serviceEndpoint = object.serviceEndpoint;
    } else {
      message.serviceEndpoint = "";
    }
    return message;
  },
};

const baseDIDDocumentWithSeq: object = { seq: Long.UZERO };

export const DIDDocumentWithSeq = {
  encode(
    message: DIDDocumentWithSeq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.document !== undefined) {
      DIDDocument.encode(message.document, writer.uint32(10).fork()).ldelim();
    }
    if (!message.seq.isZero()) {
      writer.uint32(16).uint64(message.seq);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DIDDocumentWithSeq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDIDDocumentWithSeq } as DIDDocumentWithSeq;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.document = DIDDocument.decode(reader, reader.uint32());
          break;
        case 2:
          message.seq = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DIDDocumentWithSeq {
    const message = { ...baseDIDDocumentWithSeq } as DIDDocumentWithSeq;
    if (object.document !== undefined && object.document !== null) {
      message.document = DIDDocument.fromJSON(object.document);
    } else {
      message.document = undefined;
    }
    if (object.seq !== undefined && object.seq !== null) {
      message.seq = Long.fromString(object.seq);
    } else {
      message.seq = Long.UZERO;
    }
    return message;
  },

  toJSON(message: DIDDocumentWithSeq): unknown {
    const obj: any = {};
    message.document !== undefined &&
      (obj.document = message.document
        ? DIDDocument.toJSON(message.document)
        : undefined);
    message.seq !== undefined &&
      (obj.seq = (message.seq || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<DIDDocumentWithSeq>): DIDDocumentWithSeq {
    const message = { ...baseDIDDocumentWithSeq } as DIDDocumentWithSeq;
    if (object.document !== undefined && object.document !== null) {
      message.document = DIDDocument.fromPartial(object.document);
    } else {
      message.document = undefined;
    }
    if (object.seq !== undefined && object.seq !== null) {
      message.seq = object.seq as Long;
    } else {
      message.seq = Long.UZERO;
    }
    return message;
  },
};

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
