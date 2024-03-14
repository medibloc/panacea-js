/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.aol.v2";

/** MsgCreateTopic defines the Msg/CreateTopic request type. */
export interface MsgCreateTopicRequest {
  topicName: string;
  description: string;
  ownerAddress: string;
}

/** MsgCreateTopicResponse defines the Msg/CreateTopic response type. */
export interface MsgCreateTopicResponse {
}

/** MsgAddWriter defines the Msg/AddWriter request type. */
export interface MsgAddWriterRequest {
  topicName: string;
  moniker: string;
  description: string;
  writerAddress: string;
  ownerAddress: string;
}

/** MsgAddWriter defines the Msg/AddWriter response type. */
export interface MsgAddWriterResponse {
}

/** MsgDeleteWriter defines the Msg/DeleteWriter request type. */
export interface MsgDeleteWriterRequest {
  topicName: string;
  writerAddress: string;
  ownerAddress: string;
}

/** MsgDeleteWriter defines the Msg/DeleteWriter response type. */
export interface MsgDeleteWriterResponse {
}

/** MsgAddRecord defines the Msg/AddRecord request type. */
export interface MsgAddRecordRequest {
  topicName: string;
  key: Uint8Array;
  value: Uint8Array;
  writerAddress: string;
  ownerAddress: string;
  feePayerAddress: string;
}

/** MsgAddRecordResponse defines the Msg/AddRecordResponse response type. */
export interface MsgAddRecordResponse {
  ownerAddress: string;
  topicName: string;
  offset: Long;
}

function createBaseMsgCreateTopicRequest(): MsgCreateTopicRequest {
  return { topicName: "", description: "", ownerAddress: "" };
}

export const MsgCreateTopicRequest = {
  encode(message: MsgCreateTopicRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateTopicRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateTopicRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topicName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.ownerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateTopicRequest {
    return {
      topicName: isSet(object.topicName) ? globalThis.String(object.topicName) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
    };
  },

  toJSON(message: MsgCreateTopicRequest): unknown {
    const obj: any = {};
    if (message.topicName !== "") {
      obj.topicName = message.topicName;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.ownerAddress !== "") {
      obj.ownerAddress = message.ownerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateTopicRequest>, I>>(base?: I): MsgCreateTopicRequest {
    return MsgCreateTopicRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateTopicRequest>, I>>(object: I): MsgCreateTopicRequest {
    const message = createBaseMsgCreateTopicRequest();
    message.topicName = object.topicName ?? "";
    message.description = object.description ?? "";
    message.ownerAddress = object.ownerAddress ?? "";
    return message;
  },
};

function createBaseMsgCreateTopicResponse(): MsgCreateTopicResponse {
  return {};
}

export const MsgCreateTopicResponse = {
  encode(_: MsgCreateTopicResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateTopicResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateTopicResponse();
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

  fromJSON(_: any): MsgCreateTopicResponse {
    return {};
  },

  toJSON(_: MsgCreateTopicResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateTopicResponse>, I>>(base?: I): MsgCreateTopicResponse {
    return MsgCreateTopicResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateTopicResponse>, I>>(_: I): MsgCreateTopicResponse {
    const message = createBaseMsgCreateTopicResponse();
    return message;
  },
};

function createBaseMsgAddWriterRequest(): MsgAddWriterRequest {
  return { topicName: "", moniker: "", description: "", writerAddress: "", ownerAddress: "" };
}

export const MsgAddWriterRequest = {
  encode(message: MsgAddWriterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddWriterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddWriterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topicName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.moniker = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.description = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.writerAddress = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ownerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddWriterRequest {
    return {
      topicName: isSet(object.topicName) ? globalThis.String(object.topicName) : "",
      moniker: isSet(object.moniker) ? globalThis.String(object.moniker) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      writerAddress: isSet(object.writerAddress) ? globalThis.String(object.writerAddress) : "",
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
    };
  },

  toJSON(message: MsgAddWriterRequest): unknown {
    const obj: any = {};
    if (message.topicName !== "") {
      obj.topicName = message.topicName;
    }
    if (message.moniker !== "") {
      obj.moniker = message.moniker;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.writerAddress !== "") {
      obj.writerAddress = message.writerAddress;
    }
    if (message.ownerAddress !== "") {
      obj.ownerAddress = message.ownerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddWriterRequest>, I>>(base?: I): MsgAddWriterRequest {
    return MsgAddWriterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddWriterRequest>, I>>(object: I): MsgAddWriterRequest {
    const message = createBaseMsgAddWriterRequest();
    message.topicName = object.topicName ?? "";
    message.moniker = object.moniker ?? "";
    message.description = object.description ?? "";
    message.writerAddress = object.writerAddress ?? "";
    message.ownerAddress = object.ownerAddress ?? "";
    return message;
  },
};

function createBaseMsgAddWriterResponse(): MsgAddWriterResponse {
  return {};
}

export const MsgAddWriterResponse = {
  encode(_: MsgAddWriterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddWriterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddWriterResponse();
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

  fromJSON(_: any): MsgAddWriterResponse {
    return {};
  },

  toJSON(_: MsgAddWriterResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddWriterResponse>, I>>(base?: I): MsgAddWriterResponse {
    return MsgAddWriterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddWriterResponse>, I>>(_: I): MsgAddWriterResponse {
    const message = createBaseMsgAddWriterResponse();
    return message;
  },
};

function createBaseMsgDeleteWriterRequest(): MsgDeleteWriterRequest {
  return { topicName: "", writerAddress: "", ownerAddress: "" };
}

export const MsgDeleteWriterRequest = {
  encode(message: MsgDeleteWriterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteWriterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteWriterRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topicName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.writerAddress = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.ownerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteWriterRequest {
    return {
      topicName: isSet(object.topicName) ? globalThis.String(object.topicName) : "",
      writerAddress: isSet(object.writerAddress) ? globalThis.String(object.writerAddress) : "",
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
    };
  },

  toJSON(message: MsgDeleteWriterRequest): unknown {
    const obj: any = {};
    if (message.topicName !== "") {
      obj.topicName = message.topicName;
    }
    if (message.writerAddress !== "") {
      obj.writerAddress = message.writerAddress;
    }
    if (message.ownerAddress !== "") {
      obj.ownerAddress = message.ownerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteWriterRequest>, I>>(base?: I): MsgDeleteWriterRequest {
    return MsgDeleteWriterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteWriterRequest>, I>>(object: I): MsgDeleteWriterRequest {
    const message = createBaseMsgDeleteWriterRequest();
    message.topicName = object.topicName ?? "";
    message.writerAddress = object.writerAddress ?? "";
    message.ownerAddress = object.ownerAddress ?? "";
    return message;
  },
};

function createBaseMsgDeleteWriterResponse(): MsgDeleteWriterResponse {
  return {};
}

export const MsgDeleteWriterResponse = {
  encode(_: MsgDeleteWriterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteWriterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteWriterResponse();
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

  fromJSON(_: any): MsgDeleteWriterResponse {
    return {};
  },

  toJSON(_: MsgDeleteWriterResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteWriterResponse>, I>>(base?: I): MsgDeleteWriterResponse {
    return MsgDeleteWriterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteWriterResponse>, I>>(_: I): MsgDeleteWriterResponse {
    const message = createBaseMsgDeleteWriterResponse();
    return message;
  },
};

function createBaseMsgAddRecordRequest(): MsgAddRecordRequest {
  return {
    topicName: "",
    key: new Uint8Array(0),
    value: new Uint8Array(0),
    writerAddress: "",
    ownerAddress: "",
    feePayerAddress: "",
  };
}

export const MsgAddRecordRequest = {
  encode(message: MsgAddRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddRecordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topicName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.writerAddress = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.ownerAddress = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.feePayerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddRecordRequest {
    return {
      topicName: isSet(object.topicName) ? globalThis.String(object.topicName) : "",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      writerAddress: isSet(object.writerAddress) ? globalThis.String(object.writerAddress) : "",
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
      feePayerAddress: isSet(object.feePayerAddress) ? globalThis.String(object.feePayerAddress) : "",
    };
  },

  toJSON(message: MsgAddRecordRequest): unknown {
    const obj: any = {};
    if (message.topicName !== "") {
      obj.topicName = message.topicName;
    }
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (message.writerAddress !== "") {
      obj.writerAddress = message.writerAddress;
    }
    if (message.ownerAddress !== "") {
      obj.ownerAddress = message.ownerAddress;
    }
    if (message.feePayerAddress !== "") {
      obj.feePayerAddress = message.feePayerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddRecordRequest>, I>>(base?: I): MsgAddRecordRequest {
    return MsgAddRecordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddRecordRequest>, I>>(object: I): MsgAddRecordRequest {
    const message = createBaseMsgAddRecordRequest();
    message.topicName = object.topicName ?? "";
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    message.writerAddress = object.writerAddress ?? "";
    message.ownerAddress = object.ownerAddress ?? "";
    message.feePayerAddress = object.feePayerAddress ?? "";
    return message;
  },
};

function createBaseMsgAddRecordResponse(): MsgAddRecordResponse {
  return { ownerAddress: "", topicName: "", offset: Long.UZERO };
}

export const MsgAddRecordResponse = {
  encode(message: MsgAddRecordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    if (message.topicName !== "") {
      writer.uint32(18).string(message.topicName);
    }
    if (!message.offset.equals(Long.UZERO)) {
      writer.uint32(24).uint64(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgAddRecordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAddRecordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ownerAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.topicName = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.offset = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgAddRecordResponse {
    return {
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
      topicName: isSet(object.topicName) ? globalThis.String(object.topicName) : "",
      offset: isSet(object.offset) ? Long.fromValue(object.offset) : Long.UZERO,
    };
  },

  toJSON(message: MsgAddRecordResponse): unknown {
    const obj: any = {};
    if (message.ownerAddress !== "") {
      obj.ownerAddress = message.ownerAddress;
    }
    if (message.topicName !== "") {
      obj.topicName = message.topicName;
    }
    if (!message.offset.equals(Long.UZERO)) {
      obj.offset = (message.offset || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAddRecordResponse>, I>>(base?: I): MsgAddRecordResponse {
    return MsgAddRecordResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgAddRecordResponse>, I>>(object: I): MsgAddRecordResponse {
    const message = createBaseMsgAddRecordResponse();
    message.ownerAddress = object.ownerAddress ?? "";
    message.topicName = object.topicName ?? "";
    message.offset = (object.offset !== undefined && object.offset !== null)
      ? Long.fromValue(object.offset)
      : Long.UZERO;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** CreateTopic defines a method for creating a topic. */
  CreateTopic(request: MsgCreateTopicRequest): Promise<MsgCreateTopicResponse>;
  /** AddWriter defines a method for adding a writer to the topic. */
  AddWriter(request: MsgAddWriterRequest): Promise<MsgAddWriterResponse>;
  /** DeleteWriter defines a method for deleting a writer to the topic. */
  DeleteWriter(request: MsgDeleteWriterRequest): Promise<MsgDeleteWriterResponse>;
  /**
   * AddRecord defines a method for adding a record to the topic with the
   * writer.
   */
  AddRecord(request: MsgAddRecordRequest): Promise<MsgAddRecordResponse>;
}

export const MsgServiceName = "panacea.aol.v2.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateTopic = this.CreateTopic.bind(this);
    this.AddWriter = this.AddWriter.bind(this);
    this.DeleteWriter = this.DeleteWriter.bind(this);
    this.AddRecord = this.AddRecord.bind(this);
  }
  CreateTopic(request: MsgCreateTopicRequest): Promise<MsgCreateTopicResponse> {
    const data = MsgCreateTopicRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateTopic", data);
    return promise.then((data) => MsgCreateTopicResponse.decode(_m0.Reader.create(data)));
  }

  AddWriter(request: MsgAddWriterRequest): Promise<MsgAddWriterResponse> {
    const data = MsgAddWriterRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddWriter", data);
    return promise.then((data) => MsgAddWriterResponse.decode(_m0.Reader.create(data)));
  }

  DeleteWriter(request: MsgDeleteWriterRequest): Promise<MsgDeleteWriterResponse> {
    const data = MsgDeleteWriterRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteWriter", data);
    return promise.then((data) => MsgDeleteWriterResponse.decode(_m0.Reader.create(data)));
  }

  AddRecord(request: MsgAddRecordRequest): Promise<MsgAddRecordResponse> {
    const data = MsgAddRecordRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "AddRecord", data);
    return promise.then((data) => MsgAddRecordResponse.decode(_m0.Reader.create(data)));
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
