/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.did.v2";

/** Strings defines a JSON-LD string array format which is marshalled to a single string if the array length is 1. */
export interface Strings {
  values: string[];
}

/**
 * DIDDocument defines a W3C DID Document
 *
 * NOTE: All 'json_name' and 'gogoproto.customtype' tags are for panacea-core to unmarshal the v1.3 genesis which is in the W3C JSON-LD format.
 *       On the other hand, the panacea-core and cosmos-sdk don't use those tags to marshal result to JSON (via grpc-gateway).
 */
export interface DIDDocument {
  contexts: Strings | undefined;
  id: string;
  controller: Strings | undefined;
  verificationMethods: VerificationMethod[];
  /** TODO: the repeated gogoproto.customtype has an issue: https://github.com/gogo/protobuf/issues/478 */
  authentications: VerificationRelationship[];
  assertionMethods: VerificationRelationship[];
  keyAgreements: VerificationRelationship[];
  capabilityInvocations: VerificationRelationship[];
  capabilityDelegations: VerificationRelationship[];
  services: Service[];
}

/** VerificationMethod defines a W3C verification method */
export interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyBase58: string;
}

/** VerificationRelationship defines a W3C verification relationship */
export interface VerificationRelationship {
  verificationMethodId: string | undefined;
  verificationMethod: VerificationMethod | undefined;
}

/** Service defines a service in the W3C DID Document. */
export interface Service {
  id: string;
  type: string;
  serviceEndpoint: string;
}

/** DIDDocumentWithSeq defines a message for DID Document with a sequence number for preventing replay attacks. */
export interface DIDDocumentWithSeq {
  document: DIDDocument | undefined;
  sequence: Long;
}

/** DataWithSeq defines a message for data with a sequence number for preventing replay attacks. */
export interface DataWithSeq {
  data: Uint8Array;
  sequence: Long;
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

const baseDIDDocument: object = { id: "" };

export const DIDDocument = {
  encode(
    message: DIDDocument,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.contexts !== undefined) {
      Strings.encode(message.contexts, writer.uint32(10).fork()).ldelim();
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
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
          message.id = reader.string();
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
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
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
    message.id !== undefined && (obj.id = message.id);
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
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
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
  id: "",
  type: "",
  controller: "",
  publicKeyBase58: "",
};

export const VerificationMethod = {
  encode(
    message: VerificationMethod,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.type !== "") {
      writer.uint32(18).string(message.type);
    }
    if (message.controller !== "") {
      writer.uint32(26).string(message.controller);
    }
    if (message.publicKeyBase58 !== "") {
      writer.uint32(34).string(message.publicKeyBase58);
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
          message.id = reader.string();
          break;
        case 2:
          message.type = reader.string();
          break;
        case 3:
          message.controller = reader.string();
          break;
        case 4:
          message.publicKeyBase58 = reader.string();
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
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
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
    if (
      object.publicKeyBase58 !== undefined &&
      object.publicKeyBase58 !== null
    ) {
      message.publicKeyBase58 = String(object.publicKeyBase58);
    } else {
      message.publicKeyBase58 = "";
    }
    return message;
  },

  toJSON(message: VerificationMethod): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.type !== undefined && (obj.type = message.type);
    message.controller !== undefined && (obj.controller = message.controller);
    message.publicKeyBase58 !== undefined &&
      (obj.publicKeyBase58 = message.publicKeyBase58);
    return obj;
  },

  fromPartial(object: DeepPartial<VerificationMethod>): VerificationMethod {
    const message = { ...baseVerificationMethod } as VerificationMethod;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
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
    if (
      object.publicKeyBase58 !== undefined &&
      object.publicKeyBase58 !== null
    ) {
      message.publicKeyBase58 = object.publicKeyBase58;
    } else {
      message.publicKeyBase58 = "";
    }
    return message;
  },
};

const baseVerificationRelationship: object = {};

export const VerificationRelationship = {
  encode(
    message: VerificationRelationship,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.verificationMethodId !== undefined) {
      writer.uint32(10).string(message.verificationMethodId);
    }
    if (message.verificationMethod !== undefined) {
      VerificationMethod.encode(
        message.verificationMethod,
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
          message.verificationMethodId = reader.string();
          break;
        case 2:
          message.verificationMethod = VerificationMethod.decode(
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
      object.verificationMethodId !== undefined &&
      object.verificationMethodId !== null
    ) {
      message.verificationMethodId = String(object.verificationMethodId);
    } else {
      message.verificationMethodId = undefined;
    }
    if (
      object.verificationMethod !== undefined &&
      object.verificationMethod !== null
    ) {
      message.verificationMethod = VerificationMethod.fromJSON(
        object.verificationMethod
      );
    } else {
      message.verificationMethod = undefined;
    }
    return message;
  },

  toJSON(message: VerificationRelationship): unknown {
    const obj: any = {};
    message.verificationMethodId !== undefined &&
      (obj.verificationMethodId = message.verificationMethodId);
    message.verificationMethod !== undefined &&
      (obj.verificationMethod = message.verificationMethod
        ? VerificationMethod.toJSON(message.verificationMethod)
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
      object.verificationMethodId !== undefined &&
      object.verificationMethodId !== null
    ) {
      message.verificationMethodId = object.verificationMethodId;
    } else {
      message.verificationMethodId = undefined;
    }
    if (
      object.verificationMethod !== undefined &&
      object.verificationMethod !== null
    ) {
      message.verificationMethod = VerificationMethod.fromPartial(
        object.verificationMethod
      );
    } else {
      message.verificationMethod = undefined;
    }
    return message;
  },
};

const baseService: object = { id: "", type: "", serviceEndpoint: "" };

export const Service = {
  encode(
    message: Service,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
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
          message.id = reader.string();
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
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
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
    message.id !== undefined && (obj.id = message.id);
    message.type !== undefined && (obj.type = message.type);
    message.serviceEndpoint !== undefined &&
      (obj.serviceEndpoint = message.serviceEndpoint);
    return obj;
  },

  fromPartial(object: DeepPartial<Service>): Service {
    const message = { ...baseService } as Service;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
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

const baseDIDDocumentWithSeq: object = { sequence: Long.UZERO };

export const DIDDocumentWithSeq = {
  encode(
    message: DIDDocumentWithSeq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.document !== undefined) {
      DIDDocument.encode(message.document, writer.uint32(10).fork()).ldelim();
    }
    if (!message.sequence.isZero()) {
      writer.uint32(16).uint64(message.sequence);
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
          message.sequence = reader.uint64() as Long;
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
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Long.fromString(object.sequence);
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },

  toJSON(message: DIDDocumentWithSeq): unknown {
    const obj: any = {};
    message.document !== undefined &&
      (obj.document = message.document
        ? DIDDocument.toJSON(message.document)
        : undefined);
    message.sequence !== undefined &&
      (obj.sequence = (message.sequence || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<DIDDocumentWithSeq>): DIDDocumentWithSeq {
    const message = { ...baseDIDDocumentWithSeq } as DIDDocumentWithSeq;
    if (object.document !== undefined && object.document !== null) {
      message.document = DIDDocument.fromPartial(object.document);
    } else {
      message.document = undefined;
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence as Long;
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },
};

const baseDataWithSeq: object = { sequence: Long.UZERO };

export const DataWithSeq = {
  encode(
    message: DataWithSeq,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (!message.sequence.isZero()) {
      writer.uint32(16).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataWithSeq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDataWithSeq } as DataWithSeq;
    message.data = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes();
          break;
        case 2:
          message.sequence = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataWithSeq {
    const message = { ...baseDataWithSeq } as DataWithSeq;
    message.data = new Uint8Array();
    if (object.data !== undefined && object.data !== null) {
      message.data = bytesFromBase64(object.data);
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = Long.fromString(object.sequence);
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },

  toJSON(message: DataWithSeq): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(
        message.data !== undefined ? message.data : new Uint8Array()
      ));
    message.sequence !== undefined &&
      (obj.sequence = (message.sequence || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<DataWithSeq>): DataWithSeq {
    const message = { ...baseDataWithSeq } as DataWithSeq;
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    } else {
      message.data = new Uint8Array();
    }
    if (object.sequence !== undefined && object.sequence !== null) {
      message.sequence = object.sequence as Long;
    } else {
      message.sequence = Long.UZERO;
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
}

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
