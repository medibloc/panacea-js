/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DIDDocument } from "./did";

export const protobufPackage = "panacea.did.v2";

/** MsgCreateDID defines the Msg/CreateDID request type. */
export interface MsgCreateDIDRequest {
  did: string;
  document: DIDDocument | undefined;
  verificationMethodId: string;
  signature: Uint8Array;
  fromAddress: string;
}

/** MsgCreateDIDResponse defines the Msg/CreateDID response type. */
export interface MsgCreateDIDResponse {
}

/** MsgUpdateDID defines the Msg/UpdateDID request type. */
export interface MsgUpdateDIDRequest {
  did: string;
  document: DIDDocument | undefined;
  verificationMethodId: string;
  signature: Uint8Array;
  fromAddress: string;
}

/** MsgUpdateDIDResponse defines the Msg/UpdateDID response type. */
export interface MsgUpdateDIDResponse {
}

/** MsgDeactivateDID defines the Msg/DeactivateDID request type. */
export interface MsgDeactivateDIDRequest {
  did: string;
  verificationMethodId: string;
  signature: Uint8Array;
  fromAddress: string;
}

/** MsgDeactivateDIDResponse defines the Msg/DeactivateDID response type. */
export interface MsgDeactivateDIDResponse {
}

function createBaseMsgCreateDIDRequest(): MsgCreateDIDRequest {
  return { did: "", document: undefined, verificationMethodId: "", signature: new Uint8Array(0), fromAddress: "" };
}

export const MsgCreateDIDRequest = {
  encode(message: MsgCreateDIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.document !== undefined) {
      DIDDocument.encode(message.document, writer.uint32(18).fork()).ldelim();
    }
    if (message.verificationMethodId !== "") {
      writer.uint32(26).string(message.verificationMethodId);
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    if (message.fromAddress !== "") {
      writer.uint32(42).string(message.fromAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDIDRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.document = DIDDocument.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.verificationMethodId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fromAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDIDRequest {
    return {
      did: isSet(object.did) ? globalThis.String(object.did) : "",
      document: isSet(object.document) ? DIDDocument.fromJSON(object.document) : undefined,
      verificationMethodId: isSet(object.verificationMethodId) ? globalThis.String(object.verificationMethodId) : "",
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
      fromAddress: isSet(object.fromAddress) ? globalThis.String(object.fromAddress) : "",
    };
  },

  toJSON(message: MsgCreateDIDRequest): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.document !== undefined) {
      obj.document = DIDDocument.toJSON(message.document);
    }
    if (message.verificationMethodId !== "") {
      obj.verificationMethodId = message.verificationMethodId;
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.fromAddress !== "") {
      obj.fromAddress = message.fromAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateDIDRequest>, I>>(base?: I): MsgCreateDIDRequest {
    return MsgCreateDIDRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateDIDRequest>, I>>(object: I): MsgCreateDIDRequest {
    const message = createBaseMsgCreateDIDRequest();
    message.did = object.did ?? "";
    message.document = (object.document !== undefined && object.document !== null)
      ? DIDDocument.fromPartial(object.document)
      : undefined;
    message.verificationMethodId = object.verificationMethodId ?? "";
    message.signature = object.signature ?? new Uint8Array(0);
    message.fromAddress = object.fromAddress ?? "";
    return message;
  },
};

function createBaseMsgCreateDIDResponse(): MsgCreateDIDResponse {
  return {};
}

export const MsgCreateDIDResponse = {
  encode(_: MsgCreateDIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDIDResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgCreateDIDResponse {
    return {};
  },

  toJSON(_: MsgCreateDIDResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateDIDResponse>, I>>(base?: I): MsgCreateDIDResponse {
    return MsgCreateDIDResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateDIDResponse>, I>>(_: I): MsgCreateDIDResponse {
    const message = createBaseMsgCreateDIDResponse();
    return message;
  },
};

function createBaseMsgUpdateDIDRequest(): MsgUpdateDIDRequest {
  return { did: "", document: undefined, verificationMethodId: "", signature: new Uint8Array(0), fromAddress: "" };
}

export const MsgUpdateDIDRequest = {
  encode(message: MsgUpdateDIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.document !== undefined) {
      DIDDocument.encode(message.document, writer.uint32(18).fork()).ldelim();
    }
    if (message.verificationMethodId !== "") {
      writer.uint32(26).string(message.verificationMethodId);
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    if (message.fromAddress !== "") {
      writer.uint32(42).string(message.fromAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDIDRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.document = DIDDocument.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.verificationMethodId = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.fromAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDIDRequest {
    return {
      did: isSet(object.did) ? globalThis.String(object.did) : "",
      document: isSet(object.document) ? DIDDocument.fromJSON(object.document) : undefined,
      verificationMethodId: isSet(object.verificationMethodId) ? globalThis.String(object.verificationMethodId) : "",
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
      fromAddress: isSet(object.fromAddress) ? globalThis.String(object.fromAddress) : "",
    };
  },

  toJSON(message: MsgUpdateDIDRequest): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.document !== undefined) {
      obj.document = DIDDocument.toJSON(message.document);
    }
    if (message.verificationMethodId !== "") {
      obj.verificationMethodId = message.verificationMethodId;
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.fromAddress !== "") {
      obj.fromAddress = message.fromAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDIDRequest>, I>>(base?: I): MsgUpdateDIDRequest {
    return MsgUpdateDIDRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDIDRequest>, I>>(object: I): MsgUpdateDIDRequest {
    const message = createBaseMsgUpdateDIDRequest();
    message.did = object.did ?? "";
    message.document = (object.document !== undefined && object.document !== null)
      ? DIDDocument.fromPartial(object.document)
      : undefined;
    message.verificationMethodId = object.verificationMethodId ?? "";
    message.signature = object.signature ?? new Uint8Array(0);
    message.fromAddress = object.fromAddress ?? "";
    return message;
  },
};

function createBaseMsgUpdateDIDResponse(): MsgUpdateDIDResponse {
  return {};
}

export const MsgUpdateDIDResponse = {
  encode(_: MsgUpdateDIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDIDResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateDIDResponse {
    return {};
  },

  toJSON(_: MsgUpdateDIDResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDIDResponse>, I>>(base?: I): MsgUpdateDIDResponse {
    return MsgUpdateDIDResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDIDResponse>, I>>(_: I): MsgUpdateDIDResponse {
    const message = createBaseMsgUpdateDIDResponse();
    return message;
  },
};

function createBaseMsgDeactivateDIDRequest(): MsgDeactivateDIDRequest {
  return { did: "", verificationMethodId: "", signature: new Uint8Array(0), fromAddress: "" };
}

export const MsgDeactivateDIDRequest = {
  encode(message: MsgDeactivateDIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.did !== "") {
      writer.uint32(10).string(message.did);
    }
    if (message.verificationMethodId !== "") {
      writer.uint32(18).string(message.verificationMethodId);
    }
    if (message.signature.length !== 0) {
      writer.uint32(26).bytes(message.signature);
    }
    if (message.fromAddress !== "") {
      writer.uint32(34).string(message.fromAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeactivateDIDRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateDIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.did = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.verificationMethodId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.signature = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.fromAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeactivateDIDRequest {
    return {
      did: isSet(object.did) ? globalThis.String(object.did) : "",
      verificationMethodId: isSet(object.verificationMethodId) ? globalThis.String(object.verificationMethodId) : "",
      signature: isSet(object.signature) ? bytesFromBase64(object.signature) : new Uint8Array(0),
      fromAddress: isSet(object.fromAddress) ? globalThis.String(object.fromAddress) : "",
    };
  },

  toJSON(message: MsgDeactivateDIDRequest): unknown {
    const obj: any = {};
    if (message.did !== "") {
      obj.did = message.did;
    }
    if (message.verificationMethodId !== "") {
      obj.verificationMethodId = message.verificationMethodId;
    }
    if (message.signature.length !== 0) {
      obj.signature = base64FromBytes(message.signature);
    }
    if (message.fromAddress !== "") {
      obj.fromAddress = message.fromAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeactivateDIDRequest>, I>>(base?: I): MsgDeactivateDIDRequest {
    return MsgDeactivateDIDRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeactivateDIDRequest>, I>>(object: I): MsgDeactivateDIDRequest {
    const message = createBaseMsgDeactivateDIDRequest();
    message.did = object.did ?? "";
    message.verificationMethodId = object.verificationMethodId ?? "";
    message.signature = object.signature ?? new Uint8Array(0);
    message.fromAddress = object.fromAddress ?? "";
    return message;
  },
};

function createBaseMsgDeactivateDIDResponse(): MsgDeactivateDIDResponse {
  return {};
}

export const MsgDeactivateDIDResponse = {
  encode(_: MsgDeactivateDIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeactivateDIDResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeactivateDIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgDeactivateDIDResponse {
    return {};
  },

  toJSON(_: MsgDeactivateDIDResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeactivateDIDResponse>, I>>(base?: I): MsgDeactivateDIDResponse {
    return MsgDeactivateDIDResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeactivateDIDResponse>, I>>(_: I): MsgDeactivateDIDResponse {
    const message = createBaseMsgDeactivateDIDResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** CreateDID defines a method for creating a DID. */
  CreateDID(request: MsgCreateDIDRequest): Promise<MsgCreateDIDResponse>;
  /** UpdateDID defines a method for updating a DID. */
  UpdateDID(request: MsgUpdateDIDRequest): Promise<MsgUpdateDIDResponse>;
  /** DeactivateDID defines a method for deactivating a DID. */
  DeactivateDID(request: MsgDeactivateDIDRequest): Promise<MsgDeactivateDIDResponse>;
}

export const MsgServiceName = "panacea.did.v2.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateDID = this.CreateDID.bind(this);
    this.UpdateDID = this.UpdateDID.bind(this);
    this.DeactivateDID = this.DeactivateDID.bind(this);
  }
  CreateDID(request: MsgCreateDIDRequest): Promise<MsgCreateDIDResponse> {
    const data = MsgCreateDIDRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateDID", data);
    return promise.then((data) => MsgCreateDIDResponse.decode(_m0.Reader.create(data)));
  }

  UpdateDID(request: MsgUpdateDIDRequest): Promise<MsgUpdateDIDResponse> {
    const data = MsgUpdateDIDRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateDID", data);
    return promise.then((data) => MsgUpdateDIDResponse.decode(_m0.Reader.create(data)));
  }

  DeactivateDID(request: MsgDeactivateDIDRequest): Promise<MsgDeactivateDIDResponse> {
    const data = MsgDeactivateDIDRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeactivateDID", data);
    return promise.then((data) => MsgDeactivateDIDResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
