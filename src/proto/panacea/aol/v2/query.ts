/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Topic } from "../../../panacea/aol/v2/topic";
import {
  PageRequest,
  PageResponse,
} from "../../../cosmos/base/query/v1beta1/pagination";
import { Writer } from "../../../panacea/aol/v2/writer";
import { Record } from "../../../panacea/aol/v2/record";

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

const baseQueryTopicRequest: object = { ownerAddress: "", topicName: "" };

export const QueryTopicRequest = {
  encode(
    message: QueryTopicRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    if (message.topicName !== "") {
      writer.uint32(18).string(message.topicName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopicRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTopicRequest } as QueryTopicRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ownerAddress = reader.string();
          break;
        case 2:
          message.topicName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTopicRequest {
    const message = { ...baseQueryTopicRequest } as QueryTopicRequest;
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
    return message;
  },

  toJSON(message: QueryTopicRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.topicName !== undefined && (obj.topicName = message.topicName);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryTopicRequest>): QueryTopicRequest {
    const message = { ...baseQueryTopicRequest } as QueryTopicRequest;
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
    return message;
  },
};

const baseQueryTopicResponse: object = {};

export const QueryTopicResponse = {
  encode(
    message: QueryTopicResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.topic !== undefined) {
      Topic.encode(message.topic, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopicResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTopicResponse } as QueryTopicResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topic = Topic.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTopicResponse {
    const message = { ...baseQueryTopicResponse } as QueryTopicResponse;
    if (object.topic !== undefined && object.topic !== null) {
      message.topic = Topic.fromJSON(object.topic);
    } else {
      message.topic = undefined;
    }
    return message;
  },

  toJSON(message: QueryTopicResponse): unknown {
    const obj: any = {};
    message.topic !== undefined &&
      (obj.topic = message.topic ? Topic.toJSON(message.topic) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryTopicResponse>): QueryTopicResponse {
    const message = { ...baseQueryTopicResponse } as QueryTopicResponse;
    if (object.topic !== undefined && object.topic !== null) {
      message.topic = Topic.fromPartial(object.topic);
    } else {
      message.topic = undefined;
    }
    return message;
  },
};

const baseQueryTopicsRequest: object = { ownerAddress: "" };

export const QueryTopicsRequest = {
  encode(
    message: QueryTopicsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ownerAddress !== "") {
      writer.uint32(10).string(message.ownerAddress);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopicsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTopicsRequest } as QueryTopicsRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ownerAddress = reader.string();
          break;
        case 2:
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTopicsRequest {
    const message = { ...baseQueryTopicsRequest } as QueryTopicsRequest;
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = String(object.ownerAddress);
    } else {
      message.ownerAddress = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryTopicsRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryTopicsRequest>): QueryTopicsRequest {
    const message = { ...baseQueryTopicsRequest } as QueryTopicsRequest;
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = object.ownerAddress;
    } else {
      message.ownerAddress = "";
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryTopicsResponse: object = { topicNames: "" };

export const QueryTopicsResponse = {
  encode(
    message: QueryTopicsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.topicNames) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryTopicsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryTopicsResponse } as QueryTopicsResponse;
    message.topicNames = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.topicNames.push(reader.string());
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryTopicsResponse {
    const message = { ...baseQueryTopicsResponse } as QueryTopicsResponse;
    message.topicNames = [];
    if (object.topicNames !== undefined && object.topicNames !== null) {
      for (const e of object.topicNames) {
        message.topicNames.push(String(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryTopicsResponse): unknown {
    const obj: any = {};
    if (message.topicNames) {
      obj.topicNames = message.topicNames.map((e) => e);
    } else {
      obj.topicNames = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryTopicsResponse>): QueryTopicsResponse {
    const message = { ...baseQueryTopicsResponse } as QueryTopicsResponse;
    message.topicNames = [];
    if (object.topicNames !== undefined && object.topicNames !== null) {
      for (const e of object.topicNames) {
        message.topicNames.push(e);
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryWriterRequest: object = {
  ownerAddress: "",
  topicName: "",
  writerAddress: "",
};

export const QueryWriterRequest = {
  encode(
    message: QueryWriterRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryWriterRequest } as QueryWriterRequest;
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
          message.writerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryWriterRequest {
    const message = { ...baseQueryWriterRequest } as QueryWriterRequest;
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
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = String(object.writerAddress);
    } else {
      message.writerAddress = "";
    }
    return message;
  },

  toJSON(message: QueryWriterRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.writerAddress !== undefined &&
      (obj.writerAddress = message.writerAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryWriterRequest>): QueryWriterRequest {
    const message = { ...baseQueryWriterRequest } as QueryWriterRequest;
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
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = object.writerAddress;
    } else {
      message.writerAddress = "";
    }
    return message;
  },
};

const baseQueryWriterResponse: object = {};

export const QueryWriterResponse = {
  encode(
    message: QueryWriterResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.writer !== undefined) {
      Writer.encode(message.writer, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryWriterResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryWriterResponse } as QueryWriterResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.writer = Writer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryWriterResponse {
    const message = { ...baseQueryWriterResponse } as QueryWriterResponse;
    if (object.writer !== undefined && object.writer !== null) {
      message.writer = Writer.fromJSON(object.writer);
    } else {
      message.writer = undefined;
    }
    return message;
  },

  toJSON(message: QueryWriterResponse): unknown {
    const obj: any = {};
    message.writer !== undefined &&
      (obj.writer = message.writer ? Writer.toJSON(message.writer) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryWriterResponse>): QueryWriterResponse {
    const message = { ...baseQueryWriterResponse } as QueryWriterResponse;
    if (object.writer !== undefined && object.writer !== null) {
      message.writer = Writer.fromPartial(object.writer);
    } else {
      message.writer = undefined;
    }
    return message;
  },
};

const baseQueryWritersRequest: object = { ownerAddress: "", topicName: "" };

export const QueryWritersRequest = {
  encode(
    message: QueryWritersRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryWritersRequest } as QueryWritersRequest;
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
          message.pagination = PageRequest.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryWritersRequest {
    const message = { ...baseQueryWritersRequest } as QueryWritersRequest;
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
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryWritersRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryWritersRequest>): QueryWritersRequest {
    const message = { ...baseQueryWritersRequest } as QueryWritersRequest;
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
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryWritersResponse: object = { writerAddresses: "" };

export const QueryWritersResponse = {
  encode(
    message: QueryWritersResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.writerAddresses) {
      writer.uint32(10).string(v!);
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(
        message.pagination,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryWritersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryWritersResponse } as QueryWritersResponse;
    message.writerAddresses = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.writerAddresses.push(reader.string());
          break;
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryWritersResponse {
    const message = { ...baseQueryWritersResponse } as QueryWritersResponse;
    message.writerAddresses = [];
    if (
      object.writerAddresses !== undefined &&
      object.writerAddresses !== null
    ) {
      for (const e of object.writerAddresses) {
        message.writerAddresses.push(String(e));
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },

  toJSON(message: QueryWritersResponse): unknown {
    const obj: any = {};
    if (message.writerAddresses) {
      obj.writerAddresses = message.writerAddresses.map((e) => e);
    } else {
      obj.writerAddresses = [];
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageResponse.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryWritersResponse>): QueryWritersResponse {
    const message = { ...baseQueryWritersResponse } as QueryWritersResponse;
    message.writerAddresses = [];
    if (
      object.writerAddresses !== undefined &&
      object.writerAddresses !== null
    ) {
      for (const e of object.writerAddresses) {
        message.writerAddresses.push(e);
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination);
    } else {
      message.pagination = undefined;
    }
    return message;
  },
};

const baseQueryRecordRequest: object = {
  ownerAddress: "",
  topicName: "",
  offset: Long.UZERO,
};

export const QueryRecordRequest = {
  encode(
    message: QueryRecordRequest,
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

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRecordRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryRecordRequest } as QueryRecordRequest;
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

  fromJSON(object: any): QueryRecordRequest {
    const message = { ...baseQueryRecordRequest } as QueryRecordRequest;
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

  toJSON(message: QueryRecordRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.offset !== undefined &&
      (obj.offset = (message.offset || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryRecordRequest>): QueryRecordRequest {
    const message = { ...baseQueryRecordRequest } as QueryRecordRequest;
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

const baseQueryRecordResponse: object = {};

export const QueryRecordResponse = {
  encode(
    message: QueryRecordResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryRecordResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryRecordResponse } as QueryRecordResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = Record.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryRecordResponse {
    const message = { ...baseQueryRecordResponse } as QueryRecordResponse;
    if (object.record !== undefined && object.record !== null) {
      message.record = Record.fromJSON(object.record);
    } else {
      message.record = undefined;
    }
    return message;
  },

  toJSON(message: QueryRecordResponse): unknown {
    const obj: any = {};
    message.record !== undefined &&
      (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryRecordResponse>): QueryRecordResponse {
    const message = { ...baseQueryRecordResponse } as QueryRecordResponse;
    if (object.record !== undefined && object.record !== null) {
      message.record = Record.fromPartial(object.record);
    } else {
      message.record = undefined;
    }
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

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Topic = this.Topic.bind(this);
    this.Topics = this.Topics.bind(this);
    this.Writer = this.Writer.bind(this);
    this.Writers = this.Writers.bind(this);
    this.Record = this.Record.bind(this);
  }
  Topic(request: QueryTopicRequest): Promise<QueryTopicResponse> {
    const data = QueryTopicRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Topic", data);
    return promise.then((data) =>
      QueryTopicResponse.decode(new _m0.Reader(data))
    );
  }

  Topics(request: QueryTopicsRequest): Promise<QueryTopicsResponse> {
    const data = QueryTopicsRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Topics", data);
    return promise.then((data) =>
      QueryTopicsResponse.decode(new _m0.Reader(data))
    );
  }

  Writer(request: QueryWriterRequest): Promise<QueryWriterResponse> {
    const data = QueryWriterRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Writer", data);
    return promise.then((data) =>
      QueryWriterResponse.decode(new _m0.Reader(data))
    );
  }

  Writers(request: QueryWritersRequest): Promise<QueryWritersResponse> {
    const data = QueryWritersRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Writers", data);
    return promise.then((data) =>
      QueryWritersResponse.decode(new _m0.Reader(data))
    );
  }

  Record(request: QueryRecordRequest): Promise<QueryRecordResponse> {
    const data = QueryRecordRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Record", data);
    return promise.then((data) =>
      QueryRecordResponse.decode(new _m0.Reader(data))
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
