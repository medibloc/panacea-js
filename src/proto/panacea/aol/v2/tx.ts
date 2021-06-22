/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.aol.v2";

export interface MsgCreateTopic {
  topicName: string;
  description: string;
  ownerAddress: string;
}

export interface MsgCreateTopicResponse {}

export interface MsgAddWriter {
  topicName: string;
  moniker: string;
  description: string;
  writerAddress: string;
  ownerAddress: string;
}

export interface MsgAddWriterResponse {}

export interface MsgDeleteWriter {
  topicName: string;
  writerAddress: string;
  ownerAddress: string;
}

export interface MsgDeleteWriterResponse {}

export interface MsgAddRecord {
  topicName: string;
  key: Uint8Array;
  value: Uint8Array;
  writerAddress: string;
  ownerAddress: string;
  feePayerAddress: string;
}

export interface MsgAddRecordResponse {
  ownerAddress: string;
  topicName: string;
  offset: Long;
}

const baseMsgCreateTopic: object = {
  topicName: "",
  description: "",
  ownerAddress: "",
};

export const MsgCreateTopic = {
  encode(
    message: MsgCreateTopic,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topicName !== "") {
      writer.uint32(10).string(message.topicName);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(26).string(message.ownerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateTopic {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateTopic } as MsgCreateTopic;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topicName = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.ownerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateTopic {
    const message = { ...baseMsgCreateTopic } as MsgCreateTopic;
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = String(object.topicName);
    } else {
      message.topicName = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = String(object.ownerAddress);
    } else {
      message.ownerAddress = "";
    }
    return message;
  },

  toJSON(message: MsgCreateTopic): unknown {
    const obj: any = {};
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.description !== undefined &&
      (obj.description = message.description);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateTopic>): MsgCreateTopic {
    const message = { ...baseMsgCreateTopic } as MsgCreateTopic;
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = object.topicName;
    } else {
      message.topicName = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = object.ownerAddress;
    } else {
      message.ownerAddress = "";
    }
    return message;
  },
};

const baseMsgCreateTopicResponse: object = {};

export const MsgCreateTopicResponse = {
  encode(
    _: MsgCreateTopicResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateTopicResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateTopicResponse } as MsgCreateTopicResponse;
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

  fromJSON(_: any): MsgCreateTopicResponse {
    const message = { ...baseMsgCreateTopicResponse } as MsgCreateTopicResponse;
    return message;
  },

  toJSON(_: MsgCreateTopicResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgCreateTopicResponse>): MsgCreateTopicResponse {
    const message = { ...baseMsgCreateTopicResponse } as MsgCreateTopicResponse;
    return message;
  },
};

const baseMsgAddWriter: object = {
  topicName: "",
  moniker: "",
  description: "",
  writerAddress: "",
  ownerAddress: "",
};

export const MsgAddWriter = {
  encode(
    message: MsgAddWriter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topicName !== "") {
      writer.uint32(10).string(message.topicName);
    }
    if (message.moniker !== "") {
      writer.uint32(18).string(message.moniker);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.writerAddress !== "") {
      writer.uint32(34).string(message.writerAddress);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(42).string(message.ownerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddWriter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddWriter } as MsgAddWriter;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topicName = reader.string();
          break;
        case 2:
          message.moniker = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.writerAddress = reader.string();
          break;
        case 5:
          message.ownerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddWriter {
    const message = { ...baseMsgAddWriter } as MsgAddWriter;
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = String(object.topicName);
    } else {
      message.topicName = "";
    }
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = String(object.moniker);
    } else {
      message.moniker = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = String(object.writerAddress);
    } else {
      message.writerAddress = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = String(object.ownerAddress);
    } else {
      message.ownerAddress = "";
    }
    return message;
  },

  toJSON(message: MsgAddWriter): unknown {
    const obj: any = {};
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.description !== undefined &&
      (obj.description = message.description);
    message.writerAddress !== undefined &&
      (obj.writerAddress = message.writerAddress);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddWriter>): MsgAddWriter {
    const message = { ...baseMsgAddWriter } as MsgAddWriter;
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = object.topicName;
    } else {
      message.topicName = "";
    }
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = object.moniker;
    } else {
      message.moniker = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = object.writerAddress;
    } else {
      message.writerAddress = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = object.ownerAddress;
    } else {
      message.ownerAddress = "";
    }
    return message;
  },
};

const baseMsgAddWriterResponse: object = {};

export const MsgAddWriterResponse = {
  encode(
    _: MsgAddWriterResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgAddWriterResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddWriterResponse } as MsgAddWriterResponse;
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

  fromJSON(_: any): MsgAddWriterResponse {
    const message = { ...baseMsgAddWriterResponse } as MsgAddWriterResponse;
    return message;
  },

  toJSON(_: MsgAddWriterResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgAddWriterResponse>): MsgAddWriterResponse {
    const message = { ...baseMsgAddWriterResponse } as MsgAddWriterResponse;
    return message;
  },
};

const baseMsgDeleteWriter: object = {
  topicName: "",
  writerAddress: "",
  ownerAddress: "",
};

export const MsgDeleteWriter = {
  encode(
    message: MsgDeleteWriter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topicName !== "") {
      writer.uint32(10).string(message.topicName);
    }
    if (message.writerAddress !== "") {
      writer.uint32(18).string(message.writerAddress);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(26).string(message.ownerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteWriter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeleteWriter } as MsgDeleteWriter;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topicName = reader.string();
          break;
        case 2:
          message.writerAddress = reader.string();
          break;
        case 3:
          message.ownerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteWriter {
    const message = { ...baseMsgDeleteWriter } as MsgDeleteWriter;
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = String(object.topicName);
    } else {
      message.topicName = "";
    }
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = String(object.writerAddress);
    } else {
      message.writerAddress = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = String(object.ownerAddress);
    } else {
      message.ownerAddress = "";
    }
    return message;
  },

  toJSON(message: MsgDeleteWriter): unknown {
    const obj: any = {};
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.writerAddress !== undefined &&
      (obj.writerAddress = message.writerAddress);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeleteWriter>): MsgDeleteWriter {
    const message = { ...baseMsgDeleteWriter } as MsgDeleteWriter;
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = object.topicName;
    } else {
      message.topicName = "";
    }
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = object.writerAddress;
    } else {
      message.writerAddress = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = object.ownerAddress;
    } else {
      message.ownerAddress = "";
    }
    return message;
  },
};

const baseMsgDeleteWriterResponse: object = {};

export const MsgDeleteWriterResponse = {
  encode(
    _: MsgDeleteWriterResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeleteWriterResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeleteWriterResponse,
    } as MsgDeleteWriterResponse;
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

  fromJSON(_: any): MsgDeleteWriterResponse {
    const message = {
      ...baseMsgDeleteWriterResponse,
    } as MsgDeleteWriterResponse;
    return message;
  },

  toJSON(_: MsgDeleteWriterResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(
    _: DeepPartial<MsgDeleteWriterResponse>
  ): MsgDeleteWriterResponse {
    const message = {
      ...baseMsgDeleteWriterResponse,
    } as MsgDeleteWriterResponse;
    return message;
  },
};

const baseMsgAddRecord: object = {
  topicName: "",
  writerAddress: "",
  ownerAddress: "",
  feePayerAddress: "",
};

export const MsgAddRecord = {
  encode(
    message: MsgAddRecord,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topicName !== "") {
      writer.uint32(10).string(message.topicName);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(26).bytes(message.value);
    }
    if (message.writerAddress !== "") {
      writer.uint32(34).string(message.writerAddress);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(42).string(message.ownerAddress);
    }
    if (message.feePayerAddress !== "") {
      writer.uint32(50).string(message.feePayerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddRecord } as MsgAddRecord;
    message.key = new Uint8Array();
    message.value = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topicName = reader.string();
          break;
        case 2:
          message.key = reader.bytes();
          break;
        case 3:
          message.value = reader.bytes();
          break;
        case 4:
          message.writerAddress = reader.string();
          break;
        case 5:
          message.ownerAddress = reader.string();
          break;
        case 6:
          message.feePayerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddRecord {
    const message = { ...baseMsgAddRecord } as MsgAddRecord;
    message.key = new Uint8Array();
    message.value = new Uint8Array();
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = String(object.topicName);
    } else {
      message.topicName = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = String(object.writerAddress);
    } else {
      message.writerAddress = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = String(object.ownerAddress);
    } else {
      message.ownerAddress = "";
    }
    if (
      object.feePayerAddress !== undefined &&
      object.feePayerAddress !== null
    ) {
      message.feePayerAddress = String(object.feePayerAddress);
    } else {
      message.feePayerAddress = "";
    }
    return message;
  },

  toJSON(message: MsgAddRecord): unknown {
    const obj: any = {};
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array()
      ));
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.writerAddress !== undefined &&
      (obj.writerAddress = message.writerAddress);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.feePayerAddress !== undefined &&
      (obj.feePayerAddress = message.feePayerAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddRecord>): MsgAddRecord {
    const message = { ...baseMsgAddRecord } as MsgAddRecord;
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = object.topicName;
    } else {
      message.topicName = "";
    }
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = new Uint8Array();
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = object.writerAddress;
    } else {
      message.writerAddress = "";
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = object.ownerAddress;
    } else {
      message.ownerAddress = "";
    }
    if (
      object.feePayerAddress !== undefined &&
      object.feePayerAddress !== null
    ) {
      message.feePayerAddress = object.feePayerAddress;
    } else {
      message.feePayerAddress = "";
    }
    return message;
  },
};

const baseMsgAddRecordResponse: object = {
  ownerAddress: "",
  topicName: "",
  offset: Long.UZERO,
};

export const MsgAddRecordResponse = {
  encode(
    message: MsgAddRecordResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    if (message.topicName !== "") {
      writer.uint32(18).string(message.topicName);
    }
    if (!message.offset.isZero()) {
      writer.uint32(24).uint64(message.offset);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgAddRecordResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgAddRecordResponse } as MsgAddRecordResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ownerAddress = reader.string();
          break;
        case 2:
          message.topicName = reader.string();
          break;
        case 3:
          message.offset = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAddRecordResponse {
    const message = { ...baseMsgAddRecordResponse } as MsgAddRecordResponse;
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = String(object.ownerAddress);
    } else {
      message.ownerAddress = "";
    }
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = String(object.topicName);
    } else {
      message.topicName = "";
    }
    if (object.offset !== undefined && object.offset !== null) {
      message.offset = Long.fromString(object.offset);
    } else {
      message.offset = Long.UZERO;
    }
    return message;
  },

  toJSON(message: MsgAddRecordResponse): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.offset !== undefined &&
      (obj.offset = (message.offset || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<MsgAddRecordResponse>): MsgAddRecordResponse {
    const message = { ...baseMsgAddRecordResponse } as MsgAddRecordResponse;
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = object.ownerAddress;
    } else {
      message.ownerAddress = "";
    }
    if (object.topicName !== undefined && object.topicName !== null) {
      message.topicName = object.topicName;
    } else {
      message.topicName = "";
    }
    if (object.offset !== undefined && object.offset !== null) {
      message.offset = object.offset as Long;
    } else {
      message.offset = Long.UZERO;
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateTopic(request: MsgCreateTopic): Promise<MsgCreateTopicResponse>;
  AddWriter(request: MsgAddWriter): Promise<MsgAddWriterResponse>;
  DeleteWriter(request: MsgDeleteWriter): Promise<MsgDeleteWriterResponse>;
  AddRecord(request: MsgAddRecord): Promise<MsgAddRecordResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateTopic = this.CreateTopic.bind(this);
    this.AddWriter = this.AddWriter.bind(this);
    this.DeleteWriter = this.DeleteWriter.bind(this);
    this.AddRecord = this.AddRecord.bind(this);
  }
  CreateTopic(request: MsgCreateTopic): Promise<MsgCreateTopicResponse> {
    const data = MsgCreateTopic.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Msg", "CreateTopic", data);
    return promise.then((data) =>
      MsgCreateTopicResponse.decode(new _m0.Reader(data))
    );
  }

  AddWriter(request: MsgAddWriter): Promise<MsgAddWriterResponse> {
    const data = MsgAddWriter.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Msg", "AddWriter", data);
    return promise.then((data) =>
      MsgAddWriterResponse.decode(new _m0.Reader(data))
    );
  }

  DeleteWriter(request: MsgDeleteWriter): Promise<MsgDeleteWriterResponse> {
    const data = MsgDeleteWriter.encode(request).finish();
    const promise = this.rpc.request(
      "panacea.aol.v2.Msg",
      "DeleteWriter",
      data
    );
    return promise.then((data) =>
      MsgDeleteWriterResponse.decode(new _m0.Reader(data))
    );
  }

  AddRecord(request: MsgAddRecord): Promise<MsgAddRecordResponse> {
    const data = MsgAddRecord.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Msg", "AddRecord", data);
    return promise.then((data) =>
      MsgAddRecordResponse.decode(new _m0.Reader(data))
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
