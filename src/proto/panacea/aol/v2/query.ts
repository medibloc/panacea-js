/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Record } from "./record";
import { Topic } from "./topic";
import { Writer } from "./writer";

export const protobufPackage = "panacea.aol.v2";

/** QueryTopicRequest is the request type for the Query/Topic RPC method. */
export interface QueryTopicRequest {
  ownerAddress: string;
  topicName: string;
}

/** QueryTopicResponse is the response type for the Query/Topic RPC method. */
export interface QueryTopicResponse {
  topic: Topic | undefined;
}

/** QueryTopicsRequest is the request type for the Query/Topics RPC method. */
export interface QueryTopicsRequest {
  ownerAddress: string;
  pagination: PageRequest | undefined;
}

/** QueryTopicsResponse is the response type for the Query/Topics RPC method. */
export interface QueryTopicsResponse {
  topicNames: string[];
  pagination: PageResponse | undefined;
}

/** QueryWriterRequest is the request type for the Query/Writer RPC method. */
export interface QueryWriterRequest {
  ownerAddress: string;
  topicName: string;
  writerAddress: string;
}

/** QueryWriterResponse is the response type for the Query/Writer RPC method. */
export interface QueryWriterResponse {
  writer: Writer | undefined;
}

/** QueryWritersRequest is the request type for the Query/Writers RPC method. */
export interface QueryWritersRequest {
  ownerAddress: string;
  topicName: string;
  pagination: PageRequest | undefined;
}

/** QueryWritersResponse is the response type for the Query/Writers RPC method. */
export interface QueryWritersResponse {
  writerAddresses: string[];
  pagination: PageResponse | undefined;
}

/** QueryRecordRequest is the request type for the Query/Record RPC method. */
export interface QueryRecordRequest {
  ownerAddress: string;
  topicName: string;
  offset: Long;
}

/** QueryRecordResponse is the response type for the Query/Record RPC method. */
export interface QueryRecordResponse {
  record: Record | undefined;
}

function createBaseQueryTopicRequest(): QueryTopicRequest {
  return { ownerAddress: "", topicName: "" };
}

export const QueryTopicRequest = {
  encode(message: QueryTopicRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    if (message.topicName !== "") {
      writer.uint32(18).string(message.topicName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopicRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTopicRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTopicRequest {
    return {
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
      topicName: isSet(object.topicName) ? globalThis.String(object.topicName) : "",
    };
  },

  toJSON(message: QueryTopicRequest): unknown {
    const obj: any = {};
    if (message.ownerAddress !== "") {
      obj.ownerAddress = message.ownerAddress;
    }
    if (message.topicName !== "") {
      obj.topicName = message.topicName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTopicRequest>, I>>(base?: I): QueryTopicRequest {
    return QueryTopicRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTopicRequest>, I>>(object: I): QueryTopicRequest {
    const message = createBaseQueryTopicRequest();
    message.ownerAddress = object.ownerAddress ?? "";
    message.topicName = object.topicName ?? "";
    return message;
  },
};

function createBaseQueryTopicResponse(): QueryTopicResponse {
  return { topic: undefined };
}

export const QueryTopicResponse = {
  encode(message: QueryTopicResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.topic !== undefined) {
      Topic.encode(message.topic, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopicResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTopicResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topic = Topic.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTopicResponse {
    return { topic: isSet(object.topic) ? Topic.fromJSON(object.topic) : undefined };
  },

  toJSON(message: QueryTopicResponse): unknown {
    const obj: any = {};
    if (message.topic !== undefined) {
      obj.topic = Topic.toJSON(message.topic);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTopicResponse>, I>>(base?: I): QueryTopicResponse {
    return QueryTopicResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTopicResponse>, I>>(object: I): QueryTopicResponse {
    const message = createBaseQueryTopicResponse();
    message.topic = (object.topic !== undefined && object.topic !== null) ? Topic.fromPartial(object.topic) : undefined;
    return message;
  },
};

function createBaseQueryTopicsRequest(): QueryTopicsRequest {
  return { ownerAddress: "", pagination: undefined };
}

export const QueryTopicsRequest = {
  encode(message: QueryTopicsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopicsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTopicsRequest();
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

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTopicsRequest {
    return {
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryTopicsRequest): unknown {
    const obj: any = {};
    if (message.ownerAddress !== "") {
      obj.ownerAddress = message.ownerAddress;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTopicsRequest>, I>>(base?: I): QueryTopicsRequest {
    return QueryTopicsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTopicsRequest>, I>>(object: I): QueryTopicsRequest {
    const message = createBaseQueryTopicsRequest();
    message.ownerAddress = object.ownerAddress ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryTopicsResponse(): QueryTopicsResponse {
  return { topicNames: [], pagination: undefined };
}

export const QueryTopicsResponse = {
  encode(message: QueryTopicsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.topicNames) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopicsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryTopicsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.topicNames.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryTopicsResponse {
    return {
      topicNames: globalThis.Array.isArray(object?.topicNames)
        ? object.topicNames.map((e: any) => globalThis.String(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryTopicsResponse): unknown {
    const obj: any = {};
    if (message.topicNames?.length) {
      obj.topicNames = message.topicNames;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryTopicsResponse>, I>>(base?: I): QueryTopicsResponse {
    return QueryTopicsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryTopicsResponse>, I>>(object: I): QueryTopicsResponse {
    const message = createBaseQueryTopicsResponse();
    message.topicNames = object.topicNames?.map((e) => e) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryWriterRequest(): QueryWriterRequest {
  return { ownerAddress: "", topicName: "", writerAddress: "" };
}

export const QueryWriterRequest = {
  encode(message: QueryWriterRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    if (message.topicName !== "") {
      writer.uint32(18).string(message.topicName);
    }
    if (message.writerAddress !== "") {
      writer.uint32(26).string(message.writerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWriterRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWriterRequest();
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
          if (tag !== 26) {
            break;
          }

          message.writerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryWriterRequest {
    return {
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
      topicName: isSet(object.topicName) ? globalThis.String(object.topicName) : "",
      writerAddress: isSet(object.writerAddress) ? globalThis.String(object.writerAddress) : "",
    };
  },

  toJSON(message: QueryWriterRequest): unknown {
    const obj: any = {};
    if (message.ownerAddress !== "") {
      obj.ownerAddress = message.ownerAddress;
    }
    if (message.topicName !== "") {
      obj.topicName = message.topicName;
    }
    if (message.writerAddress !== "") {
      obj.writerAddress = message.writerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryWriterRequest>, I>>(base?: I): QueryWriterRequest {
    return QueryWriterRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryWriterRequest>, I>>(object: I): QueryWriterRequest {
    const message = createBaseQueryWriterRequest();
    message.ownerAddress = object.ownerAddress ?? "";
    message.topicName = object.topicName ?? "";
    message.writerAddress = object.writerAddress ?? "";
    return message;
  },
};

function createBaseQueryWriterResponse(): QueryWriterResponse {
  return { writer: undefined };
}

export const QueryWriterResponse = {
  encode(message: QueryWriterResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.writer !== undefined) {
      Writer.encode(message.writer, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWriterResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWriterResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.writer = Writer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryWriterResponse {
    return { writer: isSet(object.writer) ? Writer.fromJSON(object.writer) : undefined };
  },

  toJSON(message: QueryWriterResponse): unknown {
    const obj: any = {};
    if (message.writer !== undefined) {
      obj.writer = Writer.toJSON(message.writer);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryWriterResponse>, I>>(base?: I): QueryWriterResponse {
    return QueryWriterResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryWriterResponse>, I>>(object: I): QueryWriterResponse {
    const message = createBaseQueryWriterResponse();
    message.writer = (object.writer !== undefined && object.writer !== null)
      ? Writer.fromPartial(object.writer)
      : undefined;
    return message;
  },
};

function createBaseQueryWritersRequest(): QueryWritersRequest {
  return { ownerAddress: "", topicName: "", pagination: undefined };
}

export const QueryWritersRequest = {
  encode(message: QueryWritersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    if (message.topicName !== "") {
      writer.uint32(18).string(message.topicName);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWritersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWritersRequest();
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
          if (tag !== 26) {
            break;
          }

          message.pagination = PageRequest.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryWritersRequest {
    return {
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
      topicName: isSet(object.topicName) ? globalThis.String(object.topicName) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryWritersRequest): unknown {
    const obj: any = {};
    if (message.ownerAddress !== "") {
      obj.ownerAddress = message.ownerAddress;
    }
    if (message.topicName !== "") {
      obj.topicName = message.topicName;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryWritersRequest>, I>>(base?: I): QueryWritersRequest {
    return QueryWritersRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryWritersRequest>, I>>(object: I): QueryWritersRequest {
    const message = createBaseQueryWritersRequest();
    message.ownerAddress = object.ownerAddress ?? "";
    message.topicName = object.topicName ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryWritersResponse(): QueryWritersResponse {
  return { writerAddresses: [], pagination: undefined };
}

export const QueryWritersResponse = {
  encode(message: QueryWritersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.writerAddresses) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWritersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryWritersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.writerAddresses.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.pagination = PageResponse.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryWritersResponse {
    return {
      writerAddresses: globalThis.Array.isArray(object?.writerAddresses)
        ? object.writerAddresses.map((e: any) => globalThis.String(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryWritersResponse): unknown {
    const obj: any = {};
    if (message.writerAddresses?.length) {
      obj.writerAddresses = message.writerAddresses;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryWritersResponse>, I>>(base?: I): QueryWritersResponse {
    return QueryWritersResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryWritersResponse>, I>>(object: I): QueryWritersResponse {
    const message = createBaseQueryWritersResponse();
    message.writerAddresses = object.writerAddresses?.map((e) => e) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryRecordRequest(): QueryRecordRequest {
  return { ownerAddress: "", topicName: "", offset: Long.UZERO };
}

export const QueryRecordRequest = {
  encode(message: QueryRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRecordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecordRequest();
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

  fromJSON(object: any): QueryRecordRequest {
    return {
      ownerAddress: isSet(object.ownerAddress) ? globalThis.String(object.ownerAddress) : "",
      topicName: isSet(object.topicName) ? globalThis.String(object.topicName) : "",
      offset: isSet(object.offset) ? Long.fromValue(object.offset) : Long.UZERO,
    };
  },

  toJSON(message: QueryRecordRequest): unknown {
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

  create<I extends Exact<DeepPartial<QueryRecordRequest>, I>>(base?: I): QueryRecordRequest {
    return QueryRecordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRecordRequest>, I>>(object: I): QueryRecordRequest {
    const message = createBaseQueryRecordRequest();
    message.ownerAddress = object.ownerAddress ?? "";
    message.topicName = object.topicName ?? "";
    message.offset = (object.offset !== undefined && object.offset !== null)
      ? Long.fromValue(object.offset)
      : Long.UZERO;
    return message;
  },
};

function createBaseQueryRecordResponse(): QueryRecordResponse {
  return { record: undefined };
}

export const QueryRecordResponse = {
  encode(message: QueryRecordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRecordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryRecordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.record = Record.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryRecordResponse {
    return { record: isSet(object.record) ? Record.fromJSON(object.record) : undefined };
  },

  toJSON(message: QueryRecordResponse): unknown {
    const obj: any = {};
    if (message.record !== undefined) {
      obj.record = Record.toJSON(message.record);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryRecordResponse>, I>>(base?: I): QueryRecordResponse {
    return QueryRecordResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryRecordResponse>, I>>(object: I): QueryRecordResponse {
    const message = createBaseQueryRecordResponse();
    message.record = (object.record !== undefined && object.record !== null)
      ? Record.fromPartial(object.record)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Topic returns topic details. */
  Topic(request: QueryTopicRequest): Promise<QueryTopicResponse>;
  /** Topics returns topic names. */
  Topics(request: QueryTopicsRequest): Promise<QueryTopicsResponse>;
  /** Writer returns writer details. */
  Writer(request: QueryWriterRequest): Promise<QueryWriterResponse>;
  /** Writers returns writer addresses. */
  Writers(request: QueryWritersRequest): Promise<QueryWritersResponse>;
  /** Record returns record details. */
  Record(request: QueryRecordRequest): Promise<QueryRecordResponse>;
}

export const QueryServiceName = "panacea.aol.v2.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Topic = this.Topic.bind(this);
    this.Topics = this.Topics.bind(this);
    this.Writer = this.Writer.bind(this);
    this.Writers = this.Writers.bind(this);
    this.Record = this.Record.bind(this);
  }
  Topic(request: QueryTopicRequest): Promise<QueryTopicResponse> {
    const data = QueryTopicRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Topic", data);
    return promise.then((data) => QueryTopicResponse.decode(_m0.Reader.create(data)));
  }

  Topics(request: QueryTopicsRequest): Promise<QueryTopicsResponse> {
    const data = QueryTopicsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Topics", data);
    return promise.then((data) => QueryTopicsResponse.decode(_m0.Reader.create(data)));
  }

  Writer(request: QueryWriterRequest): Promise<QueryWriterResponse> {
    const data = QueryWriterRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Writer", data);
    return promise.then((data) => QueryWriterResponse.decode(_m0.Reader.create(data)));
  }

  Writers(request: QueryWritersRequest): Promise<QueryWritersResponse> {
    const data = QueryWritersRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Writers", data);
    return promise.then((data) => QueryWritersResponse.decode(_m0.Reader.create(data)));
  }

  Record(request: QueryRecordRequest): Promise<QueryRecordResponse> {
    const data = QueryRecordRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Record", data);
    return promise.then((data) => QueryRecordResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
