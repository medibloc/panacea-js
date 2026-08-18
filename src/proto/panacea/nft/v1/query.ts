/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { ClassRecord, LiveNFTRecord, NFTRecord } from "./nft";

export const protobufPackage = "panacea.nft.v1";

/** QueryClassRecordRequest requests one class and its policy. */
export interface QueryClassRecordRequest {
  classId: string;
}

/** QueryClassRecordResponse returns one class and its policy. */
export interface QueryClassRecordResponse {
  classRecord: ClassRecord | undefined;
}

/** QueryNFTRecordRequest requests one live or burned NFT record. */
export interface QueryNFTRecordRequest {
  classId: string;
  nftId: string;
}

/** QueryNFTRecordResponse returns one live NFT or burn tombstone. */
export interface QueryNFTRecordResponse {
  nftRecord: NFTRecord | undefined;
}

/** QueryNFTRecordsRequest lists live NFT records by class, owner, or both. */
export interface QueryNFTRecordsRequest {
  classId: string;
  owner: string;
  /**
   * pagination accepts key, limit, and reverse. A zero limit defaults to 100;
   * limits above 100, non-zero offset, or count_total=true are rejected.
   */
  pagination: PageRequest | undefined;
}

/** QueryNFTRecordsResponse returns live NFT records and an opaque cursor. */
export interface QueryNFTRecordsResponse {
  nftRecords: LiveNFTRecord[];
  pagination: PageResponse | undefined;
}

function createBaseQueryClassRecordRequest(): QueryClassRecordRequest {
  return { classId: "" };
}

export const QueryClassRecordRequest = {
  encode(message: QueryClassRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassRecordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClassRecordRequest {
    return { classId: isSet(object.classId) ? globalThis.String(object.classId) : "" };
  },

  toJSON(message: QueryClassRecordRequest): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClassRecordRequest>, I>>(base?: I): QueryClassRecordRequest {
    return QueryClassRecordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClassRecordRequest>, I>>(object: I): QueryClassRecordRequest {
    const message = createBaseQueryClassRecordRequest();
    message.classId = object.classId ?? "";
    return message;
  },
};

function createBaseQueryClassRecordResponse(): QueryClassRecordResponse {
  return { classRecord: undefined };
}

export const QueryClassRecordResponse = {
  encode(message: QueryClassRecordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classRecord !== undefined) {
      ClassRecord.encode(message.classRecord, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryClassRecordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryClassRecordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classRecord = ClassRecord.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryClassRecordResponse {
    return { classRecord: isSet(object.classRecord) ? ClassRecord.fromJSON(object.classRecord) : undefined };
  },

  toJSON(message: QueryClassRecordResponse): unknown {
    const obj: any = {};
    if (message.classRecord !== undefined) {
      obj.classRecord = ClassRecord.toJSON(message.classRecord);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryClassRecordResponse>, I>>(base?: I): QueryClassRecordResponse {
    return QueryClassRecordResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryClassRecordResponse>, I>>(object: I): QueryClassRecordResponse {
    const message = createBaseQueryClassRecordResponse();
    message.classRecord = (object.classRecord !== undefined && object.classRecord !== null)
      ? ClassRecord.fromPartial(object.classRecord)
      : undefined;
    return message;
  },
};

function createBaseQueryNFTRecordRequest(): QueryNFTRecordRequest {
  return { classId: "", nftId: "" };
}

export const QueryNFTRecordRequest = {
  encode(message: QueryNFTRecordRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.nftId !== "") {
      writer.uint32(18).string(message.nftId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTRecordRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTRecordRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nftId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryNFTRecordRequest {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      nftId: isSet(object.nftId) ? globalThis.String(object.nftId) : "",
    };
  },

  toJSON(message: QueryNFTRecordRequest): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.nftId !== "") {
      obj.nftId = message.nftId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryNFTRecordRequest>, I>>(base?: I): QueryNFTRecordRequest {
    return QueryNFTRecordRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryNFTRecordRequest>, I>>(object: I): QueryNFTRecordRequest {
    const message = createBaseQueryNFTRecordRequest();
    message.classId = object.classId ?? "";
    message.nftId = object.nftId ?? "";
    return message;
  },
};

function createBaseQueryNFTRecordResponse(): QueryNFTRecordResponse {
  return { nftRecord: undefined };
}

export const QueryNFTRecordResponse = {
  encode(message: QueryNFTRecordResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nftRecord !== undefined) {
      NFTRecord.encode(message.nftRecord, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTRecordResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTRecordResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nftRecord = NFTRecord.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryNFTRecordResponse {
    return { nftRecord: isSet(object.nftRecord) ? NFTRecord.fromJSON(object.nftRecord) : undefined };
  },

  toJSON(message: QueryNFTRecordResponse): unknown {
    const obj: any = {};
    if (message.nftRecord !== undefined) {
      obj.nftRecord = NFTRecord.toJSON(message.nftRecord);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryNFTRecordResponse>, I>>(base?: I): QueryNFTRecordResponse {
    return QueryNFTRecordResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryNFTRecordResponse>, I>>(object: I): QueryNFTRecordResponse {
    const message = createBaseQueryNFTRecordResponse();
    message.nftRecord = (object.nftRecord !== undefined && object.nftRecord !== null)
      ? NFTRecord.fromPartial(object.nftRecord)
      : undefined;
    return message;
  },
};

function createBaseQueryNFTRecordsRequest(): QueryNFTRecordsRequest {
  return { classId: "", owner: "", pagination: undefined };
}

export const QueryNFTRecordsRequest = {
  encode(message: QueryNFTRecordsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTRecordsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTRecordsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
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

  fromJSON(object: any): QueryNFTRecordsRequest {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryNFTRecordsRequest): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryNFTRecordsRequest>, I>>(base?: I): QueryNFTRecordsRequest {
    return QueryNFTRecordsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryNFTRecordsRequest>, I>>(object: I): QueryNFTRecordsRequest {
    const message = createBaseQueryNFTRecordsRequest();
    message.classId = object.classId ?? "";
    message.owner = object.owner ?? "";
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryNFTRecordsResponse(): QueryNFTRecordsResponse {
  return { nftRecords: [], pagination: undefined };
}

export const QueryNFTRecordsResponse = {
  encode(message: QueryNFTRecordsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.nftRecords) {
      LiveNFTRecord.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryNFTRecordsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryNFTRecordsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nftRecords.push(LiveNFTRecord.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryNFTRecordsResponse {
    return {
      nftRecords: globalThis.Array.isArray(object?.nftRecords)
        ? object.nftRecords.map((e: any) => LiveNFTRecord.fromJSON(e))
        : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryNFTRecordsResponse): unknown {
    const obj: any = {};
    if (message.nftRecords?.length) {
      obj.nftRecords = message.nftRecords.map((e) => LiveNFTRecord.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryNFTRecordsResponse>, I>>(base?: I): QueryNFTRecordsResponse {
    return QueryNFTRecordsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryNFTRecordsResponse>, I>>(object: I): QueryNFTRecordsResponse {
    const message = createBaseQueryNFTRecordsResponse();
    message.nftRecords = object.nftRecords?.map((e) => LiveNFTRecord.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

/** Query defines the Panacea NFT query service. */
export interface Query {
  ClassRecord(request: QueryClassRecordRequest): Promise<QueryClassRecordResponse>;
  NFTRecord(request: QueryNFTRecordRequest): Promise<QueryNFTRecordResponse>;
  NFTRecords(request: QueryNFTRecordsRequest): Promise<QueryNFTRecordsResponse>;
}

export const QueryServiceName = "panacea.nft.v1.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.ClassRecord = this.ClassRecord.bind(this);
    this.NFTRecord = this.NFTRecord.bind(this);
    this.NFTRecords = this.NFTRecords.bind(this);
  }
  ClassRecord(request: QueryClassRecordRequest): Promise<QueryClassRecordResponse> {
    const data = QueryClassRecordRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ClassRecord", data);
    return promise.then((data) => QueryClassRecordResponse.decode(_m0.Reader.create(data)));
  }

  NFTRecord(request: QueryNFTRecordRequest): Promise<QueryNFTRecordResponse> {
    const data = QueryNFTRecordRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NFTRecord", data);
    return promise.then((data) => QueryNFTRecordResponse.decode(_m0.Reader.create(data)));
  }

  NFTRecords(request: QueryNFTRecordsRequest): Promise<QueryNFTRecordsResponse> {
    const data = QueryNFTRecordsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "NFTRecords", data);
    return promise.then((data) => QueryNFTRecordsResponse.decode(_m0.Reader.create(data)));
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
