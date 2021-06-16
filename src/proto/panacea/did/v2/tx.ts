/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DIDDocument } from "../../../panacea/did/v2/did";

export const protobufPackage = "panacea.did.v2";

export interface MsgCreateDID {
  DID: string;
  document: DIDDocument | undefined;
  verificationMethodID: string;
  signature: Uint8Array;
  fromAddress: string;
}

export interface MsgCreateDIDResponse {}

export interface MsgUpdateDID {
  DID: string;
  document: DIDDocument | undefined;
  verificationMethodID: string;
  signature: Uint8Array;
  fromAddress: string;
}

export interface MsgUpdateDIDResponse {}

export interface MsgDeactivateDID {
  DID: string;
  verificationMethodID: string;
  signature: Uint8Array;
  fromAddress: string;
}

export interface MsgDeactivateDIDResponse {}

const baseMsgCreateDID: object = {
  DID: "",
  verificationMethodID: "",
  fromAddress: "",
};

export const MsgCreateDID = {
  encode(
    message: MsgCreateDID,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.DID !== "") {
      writer.uint32(10).string(message.DID);
    }
    if (message.document !== undefined) {
      DIDDocument.encode(message.document, writer.uint32(18).fork()).ldelim();
    }
    if (message.verificationMethodID !== "") {
      writer.uint32(26).string(message.verificationMethodID);
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    if (message.fromAddress !== "") {
      writer.uint32(42).string(message.fromAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateDID } as MsgCreateDID;
    message.signature = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.DID = reader.string();
          break;
        case 2:
          message.document = DIDDocument.decode(reader, reader.uint32());
          break;
        case 3:
          message.verificationMethodID = reader.string();
          break;
        case 4:
          message.signature = reader.bytes();
          break;
        case 5:
          message.fromAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDID {
    const message = { ...baseMsgCreateDID } as MsgCreateDID;
    message.signature = new Uint8Array();
    if (object.DID !== undefined && object.DID !== null) {
      message.DID = String(object.DID);
    } else {
      message.DID = "";
    }
    if (object.document !== undefined && object.document !== null) {
      message.document = DIDDocument.fromJSON(object.document);
    } else {
      message.document = undefined;
    }
    if (
      object.verificationMethodID !== undefined &&
      object.verificationMethodID !== null
    ) {
      message.verificationMethodID = String(object.verificationMethodID);
    } else {
      message.verificationMethodID = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = bytesFromBase64(object.signature);
    }
    if (object.fromAddress !== undefined && object.fromAddress !== null) {
      message.fromAddress = String(object.fromAddress);
    } else {
      message.fromAddress = "";
    }
    return message;
  },

  toJSON(message: MsgCreateDID): unknown {
    const obj: any = {};
    message.DID !== undefined && (obj.DID = message.DID);
    message.document !== undefined &&
      (obj.document = message.document
        ? DIDDocument.toJSON(message.document)
        : undefined);
    message.verificationMethodID !== undefined &&
      (obj.verificationMethodID = message.verificationMethodID);
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array()
      ));
    message.fromAddress !== undefined &&
      (obj.fromAddress = message.fromAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateDID>): MsgCreateDID {
    const message = { ...baseMsgCreateDID } as MsgCreateDID;
    if (object.DID !== undefined && object.DID !== null) {
      message.DID = object.DID;
    } else {
      message.DID = "";
    }
    if (object.document !== undefined && object.document !== null) {
      message.document = DIDDocument.fromPartial(object.document);
    } else {
      message.document = undefined;
    }
    if (
      object.verificationMethodID !== undefined &&
      object.verificationMethodID !== null
    ) {
      message.verificationMethodID = object.verificationMethodID;
    } else {
      message.verificationMethodID = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    } else {
      message.signature = new Uint8Array();
    }
    if (object.fromAddress !== undefined && object.fromAddress !== null) {
      message.fromAddress = object.fromAddress;
    } else {
      message.fromAddress = "";
    }
    return message;
  },
};

const baseMsgCreateDIDResponse: object = {};

export const MsgCreateDIDResponse = {
  encode(
    _: MsgCreateDIDResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateDIDResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateDIDResponse } as MsgCreateDIDResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgCreateDIDResponse {
    const message = { ...baseMsgCreateDIDResponse } as MsgCreateDIDResponse;
    return message;
  },

  toJSON(_: MsgCreateDIDResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgCreateDIDResponse>): MsgCreateDIDResponse {
    const message = { ...baseMsgCreateDIDResponse } as MsgCreateDIDResponse;
    return message;
  },
};

const baseMsgUpdateDID: object = {
  DID: "",
  verificationMethodID: "",
  fromAddress: "",
};

export const MsgUpdateDID = {
  encode(
    message: MsgUpdateDID,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.DID !== "") {
      writer.uint32(10).string(message.DID);
    }
    if (message.document !== undefined) {
      DIDDocument.encode(message.document, writer.uint32(18).fork()).ldelim();
    }
    if (message.verificationMethodID !== "") {
      writer.uint32(26).string(message.verificationMethodID);
    }
    if (message.signature.length !== 0) {
      writer.uint32(34).bytes(message.signature);
    }
    if (message.fromAddress !== "") {
      writer.uint32(42).string(message.fromAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateDID } as MsgUpdateDID;
    message.signature = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.DID = reader.string();
          break;
        case 2:
          message.document = DIDDocument.decode(reader, reader.uint32());
          break;
        case 3:
          message.verificationMethodID = reader.string();
          break;
        case 4:
          message.signature = reader.bytes();
          break;
        case 5:
          message.fromAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDID {
    const message = { ...baseMsgUpdateDID } as MsgUpdateDID;
    message.signature = new Uint8Array();
    if (object.DID !== undefined && object.DID !== null) {
      message.DID = String(object.DID);
    } else {
      message.DID = "";
    }
    if (object.document !== undefined && object.document !== null) {
      message.document = DIDDocument.fromJSON(object.document);
    } else {
      message.document = undefined;
    }
    if (
      object.verificationMethodID !== undefined &&
      object.verificationMethodID !== null
    ) {
      message.verificationMethodID = String(object.verificationMethodID);
    } else {
      message.verificationMethodID = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = bytesFromBase64(object.signature);
    }
    if (object.fromAddress !== undefined && object.fromAddress !== null) {
      message.fromAddress = String(object.fromAddress);
    } else {
      message.fromAddress = "";
    }
    return message;
  },

  toJSON(message: MsgUpdateDID): unknown {
    const obj: any = {};
    message.DID !== undefined && (obj.DID = message.DID);
    message.document !== undefined &&
      (obj.document = message.document
        ? DIDDocument.toJSON(message.document)
        : undefined);
    message.verificationMethodID !== undefined &&
      (obj.verificationMethodID = message.verificationMethodID);
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array()
      ));
    message.fromAddress !== undefined &&
      (obj.fromAddress = message.fromAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgUpdateDID>): MsgUpdateDID {
    const message = { ...baseMsgUpdateDID } as MsgUpdateDID;
    if (object.DID !== undefined && object.DID !== null) {
      message.DID = object.DID;
    } else {
      message.DID = "";
    }
    if (object.document !== undefined && object.document !== null) {
      message.document = DIDDocument.fromPartial(object.document);
    } else {
      message.document = undefined;
    }
    if (
      object.verificationMethodID !== undefined &&
      object.verificationMethodID !== null
    ) {
      message.verificationMethodID = object.verificationMethodID;
    } else {
      message.verificationMethodID = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    } else {
      message.signature = new Uint8Array();
    }
    if (object.fromAddress !== undefined && object.fromAddress !== null) {
      message.fromAddress = object.fromAddress;
    } else {
      message.fromAddress = "";
    }
    return message;
  },
};

const baseMsgUpdateDIDResponse: object = {};

export const MsgUpdateDIDResponse = {
  encode(
    _: MsgUpdateDIDResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgUpdateDIDResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgUpdateDIDResponse } as MsgUpdateDIDResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateDIDResponse {
    const message = { ...baseMsgUpdateDIDResponse } as MsgUpdateDIDResponse;
    return message;
  },

  toJSON(_: MsgUpdateDIDResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgUpdateDIDResponse>): MsgUpdateDIDResponse {
    const message = { ...baseMsgUpdateDIDResponse } as MsgUpdateDIDResponse;
    return message;
  },
};

const baseMsgDeactivateDID: object = {
  DID: "",
  verificationMethodID: "",
  fromAddress: "",
};

export const MsgDeactivateDID = {
  encode(
    message: MsgDeactivateDID,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.DID !== "") {
      writer.uint32(10).string(message.DID);
    }
    if (message.verificationMethodID !== "") {
      writer.uint32(18).string(message.verificationMethodID);
    }
    if (message.signature.length !== 0) {
      writer.uint32(26).bytes(message.signature);
    }
    if (message.fromAddress !== "") {
      writer.uint32(34).string(message.fromAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeactivateDID {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeactivateDID } as MsgDeactivateDID;
    message.signature = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.DID = reader.string();
          break;
        case 2:
          message.verificationMethodID = reader.string();
          break;
        case 3:
          message.signature = reader.bytes();
          break;
        case 4:
          message.fromAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeactivateDID {
    const message = { ...baseMsgDeactivateDID } as MsgDeactivateDID;
    message.signature = new Uint8Array();
    if (object.DID !== undefined && object.DID !== null) {
      message.DID = String(object.DID);
    } else {
      message.DID = "";
    }
    if (
      object.verificationMethodID !== undefined &&
      object.verificationMethodID !== null
    ) {
      message.verificationMethodID = String(object.verificationMethodID);
    } else {
      message.verificationMethodID = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = bytesFromBase64(object.signature);
    }
    if (object.fromAddress !== undefined && object.fromAddress !== null) {
      message.fromAddress = String(object.fromAddress);
    } else {
      message.fromAddress = "";
    }
    return message;
  },

  toJSON(message: MsgDeactivateDID): unknown {
    const obj: any = {};
    message.DID !== undefined && (obj.DID = message.DID);
    message.verificationMethodID !== undefined &&
      (obj.verificationMethodID = message.verificationMethodID);
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array()
      ));
    message.fromAddress !== undefined &&
      (obj.fromAddress = message.fromAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeactivateDID>): MsgDeactivateDID {
    const message = { ...baseMsgDeactivateDID } as MsgDeactivateDID;
    if (object.DID !== undefined && object.DID !== null) {
      message.DID = object.DID;
    } else {
      message.DID = "";
    }
    if (
      object.verificationMethodID !== undefined &&
      object.verificationMethodID !== null
    ) {
      message.verificationMethodID = object.verificationMethodID;
    } else {
      message.verificationMethodID = "";
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    } else {
      message.signature = new Uint8Array();
    }
    if (object.fromAddress !== undefined && object.fromAddress !== null) {
      message.fromAddress = object.fromAddress;
    } else {
      message.fromAddress = "";
    }
    return message;
  },
};

const baseMsgDeactivateDIDResponse: object = {};

export const MsgDeactivateDIDResponse = {
  encode(
    _: MsgDeactivateDIDResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeactivateDIDResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeactivateDIDResponse,
    } as MsgDeactivateDIDResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgDeactivateDIDResponse {
    const message = {
      ...baseMsgDeactivateDIDResponse,
    } as MsgDeactivateDIDResponse;
    return message;
  },

  toJSON(_: MsgDeactivateDIDResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeactivateDIDResponse>
  ): MsgDeactivateDIDResponse {
    const message = {
      ...baseMsgDeactivateDIDResponse,
    } as MsgDeactivateDIDResponse;
    return message;
  },
};

export interface Msg {
  CreateDID(request: MsgCreateDID): Promise<MsgCreateDIDResponse>;
  UpdateDID(request: MsgUpdateDID): Promise<MsgUpdateDIDResponse>;
  DeactivateDID(request: MsgDeactivateDID): Promise<MsgDeactivateDIDResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateDID = this.CreateDID.bind(this);
    this.UpdateDID = this.UpdateDID.bind(this);
    this.DeactivateDID = this.DeactivateDID.bind(this);
  }
  CreateDID(request: MsgCreateDID): Promise<MsgCreateDIDResponse> {
    const data = MsgCreateDID.encode(request).finish();
    const promise = this.rpc.request("panacea.did.v2.Msg", "CreateDID", data);
    return promise.then((data) =>
      MsgCreateDIDResponse.decode(new _m0.Reader(data))
    );
  }

  UpdateDID(request: MsgUpdateDID): Promise<MsgUpdateDIDResponse> {
    const data = MsgUpdateDID.encode(request).finish();
    const promise = this.rpc.request("panacea.did.v2.Msg", "UpdateDID", data);
    return promise.then((data) =>
      MsgUpdateDIDResponse.decode(new _m0.Reader(data))
    );
  }

  DeactivateDID(request: MsgDeactivateDID): Promise<MsgDeactivateDIDResponse> {
    const data = MsgDeactivateDID.encode(request).finish();
    const promise = this.rpc.request(
      "panacea.did.v2.Msg",
      "DeactivateDID",
      data
    );
    return promise.then((data) =>
      MsgDeactivateDIDResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
