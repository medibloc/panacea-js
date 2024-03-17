/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DIDDocumentWithSeq } from "./did";

export const protobufPackage = "panacea.did.v2";

/**
 * QueryDIDRequest is the request type for the Query/DIDDocumentWithSeq RPC
 * method.
 */
export interface QueryDIDRequest {
  /** NOTE: Using base64 due to the URI path cannot contain colons. */
  didBase64: string;
}

/**
 * QueryDIDResponse is the response type for the Query/DIDDocumentWithSeq RPC
 * method.
 */
export interface QueryDIDResponse {
  didDocumentWithSeq: DIDDocumentWithSeq | undefined;
}

function createBaseQueryDIDRequest(): QueryDIDRequest {
  return { didBase64: "" };
}

export const QueryDIDRequest = {
  encode(message: QueryDIDRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.didBase64 !== "") {
      writer.uint32(10).string(message.didBase64);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDIDRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDIDRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.didBase64 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDIDRequest {
    return { didBase64: isSet(object.didBase64) ? globalThis.String(object.didBase64) : "" };
  },

  toJSON(message: QueryDIDRequest): unknown {
    const obj: any = {};
    if (message.didBase64 !== "") {
      obj.didBase64 = message.didBase64;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDIDRequest>, I>>(base?: I): QueryDIDRequest {
    return QueryDIDRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDIDRequest>, I>>(object: I): QueryDIDRequest {
    const message = createBaseQueryDIDRequest();
    message.didBase64 = object.didBase64 ?? "";
    return message;
  },
};

function createBaseQueryDIDResponse(): QueryDIDResponse {
  return { didDocumentWithSeq: undefined };
}

export const QueryDIDResponse = {
  encode(message: QueryDIDResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.didDocumentWithSeq !== undefined) {
      DIDDocumentWithSeq.encode(message.didDocumentWithSeq, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDIDResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDIDResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.didDocumentWithSeq = DIDDocumentWithSeq.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDIDResponse {
    return {
      didDocumentWithSeq: isSet(object.didDocumentWithSeq)
        ? DIDDocumentWithSeq.fromJSON(object.didDocumentWithSeq)
        : undefined,
    };
  },

  toJSON(message: QueryDIDResponse): unknown {
    const obj: any = {};
    if (message.didDocumentWithSeq !== undefined) {
      obj.didDocumentWithSeq = DIDDocumentWithSeq.toJSON(message.didDocumentWithSeq);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDIDResponse>, I>>(base?: I): QueryDIDResponse {
    return QueryDIDResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDIDResponse>, I>>(object: I): QueryDIDResponse {
    const message = createBaseQueryDIDResponse();
    message.didDocumentWithSeq = (object.didDocumentWithSeq !== undefined && object.didDocumentWithSeq !== null)
      ? DIDDocumentWithSeq.fromPartial(object.didDocumentWithSeq)
      : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** DID returns a DID Document with a sequence number. */
  DID(request: QueryDIDRequest): Promise<QueryDIDResponse>;
}

export const QueryServiceName = "panacea.did.v2.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.DID = this.DID.bind(this);
  }
  DID(request: QueryDIDRequest): Promise<QueryDIDResponse> {
    const data = QueryDIDRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DID", data);
    return promise.then((data) => QueryDIDResponse.decode(_m0.Reader.create(data)));
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
