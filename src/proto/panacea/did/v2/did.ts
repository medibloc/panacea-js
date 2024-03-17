/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.did.v2";

/**
 * Strings defines a JSON-LD string array format which is marshalled to a single
 * string if the array length is 1.
 */
export interface Strings {
  values: string[];
}

/**
 * DIDDocument defines a W3C DID Document
 *
 * NOTE: All 'json_name' and 'gogoproto.customtype' tags are for panacea-core to
 * unmarshal the v1.3 genesis which is in the W3C JSON-LD format.
 *       On the other hand, the panacea-core and cosmos-sdk don't use those tags
 *       to marshal result to JSON (via grpc-gateway).
 */
export interface DIDDocument {
  contexts: Strings | undefined;
  id: string;
  controller: Strings | undefined;
  verificationMethods: VerificationMethod[];
  /**
   * TODO: the repeated gogoproto.customtype has an issue:
   * https://github.com/gogo/protobuf/issues/478
   */
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
  verificationMethodId?: string | undefined;
  verificationMethod?: VerificationMethod | undefined;
}

/** Service defines a service in the W3C DID Document. */
export interface Service {
  id: string;
  type: string;
  serviceEndpoint: string;
}

/**
 * DIDDocumentWithSeq defines a message for DID Document with a sequence number
 * for preventing replay attacks.
 */
export interface DIDDocumentWithSeq {
  document: DIDDocument | undefined;
  sequence: Long;
}

/**
 * DataWithSeq defines a message for data with a sequence number for preventing
 * replay attacks.
 */
export interface DataWithSeq {
  data: Uint8Array;
  sequence: Long;
}

function createBaseStrings(): Strings {
  return { values: [] };
}

export const Strings = {
  encode(message: Strings, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.values) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Strings {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStrings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.values.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Strings {
    return {
      values: globalThis.Array.isArray(object?.values) ? object.values.map((e: any) => globalThis.String(e)) : [],
    };
  },

  toJSON(message: Strings): unknown {
    const obj: any = {};
    if (message.values?.length) {
      obj.values = message.values;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Strings>, I>>(base?: I): Strings {
    return Strings.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Strings>, I>>(object: I): Strings {
    const message = createBaseStrings();
    message.values = object.values?.map((e) => e) || [];
    return message;
  },
};

function createBaseDIDDocument(): DIDDocument {
  return {
    contexts: undefined,
    id: "",
    controller: undefined,
    verificationMethods: [],
    authentications: [],
    assertionMethods: [],
    keyAgreements: [],
    capabilityInvocations: [],
    capabilityDelegations: [],
    services: [],
  };
}

export const DIDDocument = {
  encode(message: DIDDocument, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDIDDocument();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.contexts = Strings.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.controller = Strings.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.verificationMethods.push(VerificationMethod.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.authentications.push(VerificationRelationship.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.assertionMethods.push(VerificationRelationship.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.keyAgreements.push(VerificationRelationship.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.capabilityInvocations.push(VerificationRelationship.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.capabilityDelegations.push(VerificationRelationship.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.services.push(Service.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DIDDocument {
    return {
      contexts: isSet(object["@context"]) ? Strings.fromJSON(object["@context"]) : undefined,
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      controller: isSet(object.controller) ? Strings.fromJSON(object.controller) : undefined,
      verificationMethods: globalThis.Array.isArray(object?.verificationMethod)
        ? object.verificationMethod.map((e: any) => VerificationMethod.fromJSON(e))
        : [],
      authentications: globalThis.Array.isArray(object?.authentication)
        ? object.authentication.map((e: any) => VerificationRelationship.fromJSON(e))
        : [],
      assertionMethods: globalThis.Array.isArray(object?.assertionMethod)
        ? object.assertionMethod.map((e: any) => VerificationRelationship.fromJSON(e))
        : [],
      keyAgreements: globalThis.Array.isArray(object?.keyAgreement)
        ? object.keyAgreement.map((e: any) => VerificationRelationship.fromJSON(e))
        : [],
      capabilityInvocations: globalThis.Array.isArray(object?.capabilityInvocation)
        ? object.capabilityInvocation.map((e: any) => VerificationRelationship.fromJSON(e))
        : [],
      capabilityDelegations: globalThis.Array.isArray(object?.capabilityDelegation)
        ? object.capabilityDelegation.map((e: any) => VerificationRelationship.fromJSON(e))
        : [],
      services: globalThis.Array.isArray(object?.service) ? object.service.map((e: any) => Service.fromJSON(e)) : [],
    };
  },

  toJSON(message: DIDDocument): unknown {
    const obj: any = {};
    if (message.contexts !== undefined) {
      obj["@context"] = Strings.toJSON(message.contexts);
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.controller !== undefined) {
      obj.controller = Strings.toJSON(message.controller);
    }
    if (message.verificationMethods?.length) {
      obj.verificationMethod = message.verificationMethods.map((e) => VerificationMethod.toJSON(e));
    }
    if (message.authentications?.length) {
      obj.authentication = message.authentications.map((e) => VerificationRelationship.toJSON(e));
    }
    if (message.assertionMethods?.length) {
      obj.assertionMethod = message.assertionMethods.map((e) => VerificationRelationship.toJSON(e));
    }
    if (message.keyAgreements?.length) {
      obj.keyAgreement = message.keyAgreements.map((e) => VerificationRelationship.toJSON(e));
    }
    if (message.capabilityInvocations?.length) {
      obj.capabilityInvocation = message.capabilityInvocations.map((e) => VerificationRelationship.toJSON(e));
    }
    if (message.capabilityDelegations?.length) {
      obj.capabilityDelegation = message.capabilityDelegations.map((e) => VerificationRelationship.toJSON(e));
    }
    if (message.services?.length) {
      obj.service = message.services.map((e) => Service.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DIDDocument>, I>>(base?: I): DIDDocument {
    return DIDDocument.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DIDDocument>, I>>(object: I): DIDDocument {
    const message = createBaseDIDDocument();
    message.contexts = (object.contexts !== undefined && object.contexts !== null)
      ? Strings.fromPartial(object.contexts)
      : undefined;
    message.id = object.id ?? "";
    message.controller = (object.controller !== undefined && object.controller !== null)
      ? Strings.fromPartial(object.controller)
      : undefined;
    message.verificationMethods = object.verificationMethods?.map((e) => VerificationMethod.fromPartial(e)) || [];
    message.authentications = object.authentications?.map((e) => VerificationRelationship.fromPartial(e)) || [];
    message.assertionMethods = object.assertionMethods?.map((e) => VerificationRelationship.fromPartial(e)) || [];
    message.keyAgreements = object.keyAgreements?.map((e) => VerificationRelationship.fromPartial(e)) || [];
    message.capabilityInvocations = object.capabilityInvocations?.map((e) => VerificationRelationship.fromPartial(e)) ||
      [];
    message.capabilityDelegations = object.capabilityDelegations?.map((e) => VerificationRelationship.fromPartial(e)) ||
      [];
    message.services = object.services?.map((e) => Service.fromPartial(e)) || [];
    return message;
  },
};

function createBaseVerificationMethod(): VerificationMethod {
  return { id: "", type: "", controller: "", publicKeyBase58: "" };
}

export const VerificationMethod = {
  encode(message: VerificationMethod, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerificationMethod();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.controller = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.publicKeyBase58 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerificationMethod {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      controller: isSet(object.controller) ? globalThis.String(object.controller) : "",
      publicKeyBase58: isSet(object.publicKeyBase58) ? globalThis.String(object.publicKeyBase58) : "",
    };
  },

  toJSON(message: VerificationMethod): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.controller !== "") {
      obj.controller = message.controller;
    }
    if (message.publicKeyBase58 !== "") {
      obj.publicKeyBase58 = message.publicKeyBase58;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerificationMethod>, I>>(base?: I): VerificationMethod {
    return VerificationMethod.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerificationMethod>, I>>(object: I): VerificationMethod {
    const message = createBaseVerificationMethod();
    message.id = object.id ?? "";
    message.type = object.type ?? "";
    message.controller = object.controller ?? "";
    message.publicKeyBase58 = object.publicKeyBase58 ?? "";
    return message;
  },
};

function createBaseVerificationRelationship(): VerificationRelationship {
  return { verificationMethodId: undefined, verificationMethod: undefined };
}

export const VerificationRelationship = {
  encode(message: VerificationRelationship, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.verificationMethodId !== undefined) {
      writer.uint32(10).string(message.verificationMethodId);
    }
    if (message.verificationMethod !== undefined) {
      VerificationMethod.encode(message.verificationMethod, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): VerificationRelationship {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVerificationRelationship();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.verificationMethodId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.verificationMethod = VerificationMethod.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VerificationRelationship {
    return {
      verificationMethodId: isSet(object.verificationMethodId)
        ? globalThis.String(object.verificationMethodId)
        : undefined,
      verificationMethod: isSet(object.verificationMethod)
        ? VerificationMethod.fromJSON(object.verificationMethod)
        : undefined,
    };
  },

  toJSON(message: VerificationRelationship): unknown {
    const obj: any = {};
    if (message.verificationMethodId !== undefined) {
      obj.verificationMethodId = message.verificationMethodId;
    }
    if (message.verificationMethod !== undefined) {
      obj.verificationMethod = VerificationMethod.toJSON(message.verificationMethod);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VerificationRelationship>, I>>(base?: I): VerificationRelationship {
    return VerificationRelationship.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VerificationRelationship>, I>>(object: I): VerificationRelationship {
    const message = createBaseVerificationRelationship();
    message.verificationMethodId = object.verificationMethodId ?? undefined;
    message.verificationMethod = (object.verificationMethod !== undefined && object.verificationMethod !== null)
      ? VerificationMethod.fromPartial(object.verificationMethod)
      : undefined;
    return message;
  },
};

function createBaseService(): Service {
  return { id: "", type: "", serviceEndpoint: "" };
}

export const Service = {
  encode(message: Service, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseService();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.type = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.serviceEndpoint = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Service {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      type: isSet(object.type) ? globalThis.String(object.type) : "",
      serviceEndpoint: isSet(object.serviceEndpoint) ? globalThis.String(object.serviceEndpoint) : "",
    };
  },

  toJSON(message: Service): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.type !== "") {
      obj.type = message.type;
    }
    if (message.serviceEndpoint !== "") {
      obj.serviceEndpoint = message.serviceEndpoint;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Service>, I>>(base?: I): Service {
    return Service.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Service>, I>>(object: I): Service {
    const message = createBaseService();
    message.id = object.id ?? "";
    message.type = object.type ?? "";
    message.serviceEndpoint = object.serviceEndpoint ?? "";
    return message;
  },
};

function createBaseDIDDocumentWithSeq(): DIDDocumentWithSeq {
  return { document: undefined, sequence: Long.UZERO };
}

export const DIDDocumentWithSeq = {
  encode(message: DIDDocumentWithSeq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.document !== undefined) {
      DIDDocument.encode(message.document, writer.uint32(10).fork()).ldelim();
    }
    if (!message.sequence.equals(Long.UZERO)) {
      writer.uint32(16).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DIDDocumentWithSeq {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDIDDocumentWithSeq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.document = DIDDocument.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sequence = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DIDDocumentWithSeq {
    return {
      document: isSet(object.document) ? DIDDocument.fromJSON(object.document) : undefined,
      sequence: isSet(object.sequence) ? Long.fromValue(object.sequence) : Long.UZERO,
    };
  },

  toJSON(message: DIDDocumentWithSeq): unknown {
    const obj: any = {};
    if (message.document !== undefined) {
      obj.document = DIDDocument.toJSON(message.document);
    }
    if (!message.sequence.equals(Long.UZERO)) {
      obj.sequence = (message.sequence || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DIDDocumentWithSeq>, I>>(base?: I): DIDDocumentWithSeq {
    return DIDDocumentWithSeq.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DIDDocumentWithSeq>, I>>(object: I): DIDDocumentWithSeq {
    const message = createBaseDIDDocumentWithSeq();
    message.document = (object.document !== undefined && object.document !== null)
      ? DIDDocument.fromPartial(object.document)
      : undefined;
    message.sequence = (object.sequence !== undefined && object.sequence !== null)
      ? Long.fromValue(object.sequence)
      : Long.UZERO;
    return message;
  },
};

function createBaseDataWithSeq(): DataWithSeq {
  return { data: new Uint8Array(0), sequence: Long.UZERO };
}

export const DataWithSeq = {
  encode(message: DataWithSeq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (!message.sequence.equals(Long.UZERO)) {
      writer.uint32(16).uint64(message.sequence);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DataWithSeq {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDataWithSeq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.sequence = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DataWithSeq {
    return {
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(0),
      sequence: isSet(object.sequence) ? Long.fromValue(object.sequence) : Long.UZERO,
    };
  },

  toJSON(message: DataWithSeq): unknown {
    const obj: any = {};
    if (message.data.length !== 0) {
      obj.data = base64FromBytes(message.data);
    }
    if (!message.sequence.equals(Long.UZERO)) {
      obj.sequence = (message.sequence || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DataWithSeq>, I>>(base?: I): DataWithSeq {
    return DataWithSeq.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DataWithSeq>, I>>(object: I): DataWithSeq {
    const message = createBaseDataWithSeq();
    message.data = object.data ?? new Uint8Array(0);
    message.sequence = (object.sequence !== undefined && object.sequence !== null)
      ? Long.fromValue(object.sequence)
      : Long.UZERO;
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
