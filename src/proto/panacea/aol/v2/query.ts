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

/** this line is used by starport scaffolding # 3 */
export interface QueryGetTopicRequest {
  ownerAddress: string;
  topicName: string;
}

export interface QueryGetTopicResponse {
  Topic: Topic | undefined;
}

export interface QueryListTopicsRequest {
  ownerAddress: string;
  pagination: PageRequest | undefined;
}

export interface QueryListTopicsResponse {
  topicNames: string[];
  pagination: PageResponse | undefined;
}

export interface QueryGetWriterRequest {
  ownerAddress: string;
  topicName: string;
  writerAddress: string;
}

export interface QueryGetWriterResponse {
  Writer: Writer | undefined;
}

export interface QueryListWritersRequest {
  ownerAddress: string;
  topicName: string;
  pagination: PageRequest | undefined;
}

export interface QueryListWritersResponse {
  writerAddresses: string[];
  pagination: PageResponse | undefined;
}

export interface QueryGetRecordRequest {
  ownerAddress: string;
  topicName: string;
  offset: Long;
}

export interface QueryGetRecordResponse {
  Record: Record | undefined;
}

const baseQueryGetTopicRequest: object = { ownerAddress: "", topicName: "" };

export const QueryGetTopicRequest = {
  encode(
    message: QueryGetTopicRequest,
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetTopicRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetTopicRequest } as QueryGetTopicRequest;
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

  fromJSON(object: any): QueryGetTopicRequest {
    const message = { ...baseQueryGetTopicRequest } as QueryGetTopicRequest;
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

  toJSON(message: QueryGetTopicRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.topicName !== undefined && (obj.topicName = message.topicName);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetTopicRequest>): QueryGetTopicRequest {
    const message = { ...baseQueryGetTopicRequest } as QueryGetTopicRequest;
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

const baseQueryGetTopicResponse: object = {};

export const QueryGetTopicResponse = {
  encode(
    message: QueryGetTopicResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Topic !== undefined) {
      Topic.encode(message.Topic, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetTopicResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetTopicResponse } as QueryGetTopicResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Topic = Topic.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetTopicResponse {
    const message = { ...baseQueryGetTopicResponse } as QueryGetTopicResponse;
    if (object.Topic !== undefined && object.Topic !== null) {
      message.Topic = Topic.fromJSON(object.Topic);
    } else {
      message.Topic = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetTopicResponse): unknown {
    const obj: any = {};
    message.Topic !== undefined &&
      (obj.Topic = message.Topic ? Topic.toJSON(message.Topic) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetTopicResponse>
  ): QueryGetTopicResponse {
    const message = { ...baseQueryGetTopicResponse } as QueryGetTopicResponse;
    if (object.Topic !== undefined && object.Topic !== null) {
      message.Topic = Topic.fromPartial(object.Topic);
    } else {
      message.Topic = undefined;
    }
    return message;
  },
};

const baseQueryListTopicsRequest: object = { ownerAddress: "" };

export const QueryListTopicsRequest = {
  encode(
    message: QueryListTopicsRequest,
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryListTopicsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryListTopicsRequest } as QueryListTopicsRequest;
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

  fromJSON(object: any): QueryListTopicsRequest {
    const message = { ...baseQueryListTopicsRequest } as QueryListTopicsRequest;
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

  toJSON(message: QueryListTopicsRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.pagination !== undefined &&
      (obj.pagination = message.pagination
        ? PageRequest.toJSON(message.pagination)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryListTopicsRequest>
  ): QueryListTopicsRequest {
    const message = { ...baseQueryListTopicsRequest } as QueryListTopicsRequest;
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

const baseQueryListTopicsResponse: object = { topicNames: "" };

export const QueryListTopicsResponse = {
  encode(
    message: QueryListTopicsResponse,
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryListTopicsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryListTopicsResponse,
    } as QueryListTopicsResponse;
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

  fromJSON(object: any): QueryListTopicsResponse {
    const message = {
      ...baseQueryListTopicsResponse,
    } as QueryListTopicsResponse;
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

  toJSON(message: QueryListTopicsResponse): unknown {
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

  fromPartial(
    object: DeepPartial<QueryListTopicsResponse>
  ): QueryListTopicsResponse {
    const message = {
      ...baseQueryListTopicsResponse,
    } as QueryListTopicsResponse;
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

const baseQueryGetWriterRequest: object = {
  ownerAddress: "",
  topicName: "",
  writerAddress: "",
};

export const QueryGetWriterRequest = {
  encode(
    message: QueryGetWriterRequest,
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetWriterRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetWriterRequest } as QueryGetWriterRequest;
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

  fromJSON(object: any): QueryGetWriterRequest {
    const message = { ...baseQueryGetWriterRequest } as QueryGetWriterRequest;
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

  toJSON(message: QueryGetWriterRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.writerAddress !== undefined &&
      (obj.writerAddress = message.writerAddress);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetWriterRequest>
  ): QueryGetWriterRequest {
    const message = { ...baseQueryGetWriterRequest } as QueryGetWriterRequest;
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

const baseQueryGetWriterResponse: object = {};

export const QueryGetWriterResponse = {
  encode(
    message: QueryGetWriterResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Writer !== undefined) {
      Writer.encode(message.Writer, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetWriterResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetWriterResponse } as QueryGetWriterResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Writer = Writer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetWriterResponse {
    const message = { ...baseQueryGetWriterResponse } as QueryGetWriterResponse;
    if (object.Writer !== undefined && object.Writer !== null) {
      message.Writer = Writer.fromJSON(object.Writer);
    } else {
      message.Writer = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetWriterResponse): unknown {
    const obj: any = {};
    message.Writer !== undefined &&
      (obj.Writer = message.Writer ? Writer.toJSON(message.Writer) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetWriterResponse>
  ): QueryGetWriterResponse {
    const message = { ...baseQueryGetWriterResponse } as QueryGetWriterResponse;
    if (object.Writer !== undefined && object.Writer !== null) {
      message.Writer = Writer.fromPartial(object.Writer);
    } else {
      message.Writer = undefined;
    }
    return message;
  },
};

const baseQueryListWritersRequest: object = { ownerAddress: "", topicName: "" };

export const QueryListWritersRequest = {
  encode(
    message: QueryListWritersRequest,
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

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryListWritersRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryListWritersRequest,
    } as QueryListWritersRequest;
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

  fromJSON(object: any): QueryListWritersRequest {
    const message = {
      ...baseQueryListWritersRequest,
    } as QueryListWritersRequest;
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

  toJSON(message: QueryListWritersRequest): unknown {
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

  fromPartial(
    object: DeepPartial<QueryListWritersRequest>
  ): QueryListWritersRequest {
    const message = {
      ...baseQueryListWritersRequest,
    } as QueryListWritersRequest;
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

const baseQueryListWritersResponse: object = { writerAddresses: "" };

export const QueryListWritersResponse = {
  encode(
    message: QueryListWritersResponse,
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
  ): QueryListWritersResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseQueryListWritersResponse,
    } as QueryListWritersResponse;
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

  fromJSON(object: any): QueryListWritersResponse {
    const message = {
      ...baseQueryListWritersResponse,
    } as QueryListWritersResponse;
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

  toJSON(message: QueryListWritersResponse): unknown {
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

  fromPartial(
    object: DeepPartial<QueryListWritersResponse>
  ): QueryListWritersResponse {
    const message = {
      ...baseQueryListWritersResponse,
    } as QueryListWritersResponse;
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

const baseQueryGetRecordRequest: object = {
  ownerAddress: "",
  topicName: "",
  offset: Long.UZERO,
};

export const QueryGetRecordRequest = {
  encode(
    message: QueryGetRecordRequest,
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
  ): QueryGetRecordRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetRecordRequest } as QueryGetRecordRequest;
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

  fromJSON(object: any): QueryGetRecordRequest {
    const message = { ...baseQueryGetRecordRequest } as QueryGetRecordRequest;
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

  toJSON(message: QueryGetRecordRequest): unknown {
    const obj: any = {};
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    message.topicName !== undefined && (obj.topicName = message.topicName);
    message.offset !== undefined &&
      (obj.offset = (message.offset || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRecordRequest>
  ): QueryGetRecordRequest {
    const message = { ...baseQueryGetRecordRequest } as QueryGetRecordRequest;
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

const baseQueryGetRecordResponse: object = {};

export const QueryGetRecordResponse = {
  encode(
    message: QueryGetRecordResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.Record !== undefined) {
      Record.encode(message.Record, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): QueryGetRecordResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetRecordResponse } as QueryGetRecordResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.Record = Record.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetRecordResponse {
    const message = { ...baseQueryGetRecordResponse } as QueryGetRecordResponse;
    if (object.Record !== undefined && object.Record !== null) {
      message.Record = Record.fromJSON(object.Record);
    } else {
      message.Record = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetRecordResponse): unknown {
    const obj: any = {};
    message.Record !== undefined &&
      (obj.Record = message.Record ? Record.toJSON(message.Record) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<QueryGetRecordResponse>
  ): QueryGetRecordResponse {
    const message = { ...baseQueryGetRecordResponse } as QueryGetRecordResponse;
    if (object.Record !== undefined && object.Record !== null) {
      message.Record = Record.fromPartial(object.Record);
    } else {
      message.Record = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  Topic(request: QueryGetTopicRequest): Promise<QueryGetTopicResponse>;
  Topics(request: QueryListTopicsRequest): Promise<QueryListTopicsResponse>;
  Writer(request: QueryGetWriterRequest): Promise<QueryGetWriterResponse>;
  Writers(request: QueryListWritersRequest): Promise<QueryListWritersResponse>;
  Record(request: QueryGetRecordRequest): Promise<QueryGetRecordResponse>;
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
  Topic(request: QueryGetTopicRequest): Promise<QueryGetTopicResponse> {
    const data = QueryGetTopicRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Topic", data);
    return promise.then((data) =>
      QueryGetTopicResponse.decode(new _m0.Reader(data))
    );
  }

  Topics(request: QueryListTopicsRequest): Promise<QueryListTopicsResponse> {
    const data = QueryListTopicsRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Topics", data);
    return promise.then((data) =>
      QueryListTopicsResponse.decode(new _m0.Reader(data))
    );
  }

  Writer(request: QueryGetWriterRequest): Promise<QueryGetWriterResponse> {
    const data = QueryGetWriterRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Writer", data);
    return promise.then((data) =>
      QueryGetWriterResponse.decode(new _m0.Reader(data))
    );
  }

  Writers(request: QueryListWritersRequest): Promise<QueryListWritersResponse> {
    const data = QueryListWritersRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Writers", data);
    return promise.then((data) =>
      QueryListWritersResponse.decode(new _m0.Reader(data))
    );
  }

  Record(request: QueryGetRecordRequest): Promise<QueryGetRecordResponse> {
    const data = QueryGetRecordRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.aol.v2.Query", "Record", data);
    return promise.then((data) =>
      QueryGetRecordResponse.decode(new _m0.Reader(data))
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
