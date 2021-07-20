/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DIDDocumentWithSeq } from "../../../panacea/did/v2/did";

export const protobufPackage = "panacea.did.v2";

/** QueryDIDRequest is the request type for the Query/DIDDocumentWithSeq RPC method. */
export interface QueryDIDRequest {
  /** NOTE: Using base64 due to the URI path cannot contain colons. */
  didBase64: string;
}

/** QueryDIDResponse is the response type for the Query/DIDDocumentWithSeq RPC method. */
export interface QueryDIDResponse {
  didDocumentWithSeq: DIDDocumentWithSeq | undefined;
}

const baseQueryDIDRequest: object = { didBase64: "" };

export const QueryDIDRequest = {
  encode(
    message: QueryDIDRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.didBase64 !== "") {
      writer.uint32(10).string(message.didBase64);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDIDRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryDIDRequest } as QueryDIDRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.didBase64 = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDIDRequest {
    const message = { ...baseQueryDIDRequest } as QueryDIDRequest;
    if (object.didBase64 !== undefined && object.didBase64 !== null) {
      message.didBase64 = String(object.didBase64);
    } else {
      message.didBase64 = "";
    }
    return message;
  },

  toJSON(message: QueryDIDRequest): unknown {
    const obj: any = {};
    message.didBase64 !== undefined && (obj.didBase64 = message.didBase64);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryDIDRequest>): QueryDIDRequest {
    const message = { ...baseQueryDIDRequest } as QueryDIDRequest;
    if (object.didBase64 !== undefined && object.didBase64 !== null) {
      message.didBase64 = object.didBase64;
    } else {
      message.didBase64 = "";
    }
    return message;
  },
};

const baseQueryDIDResponse: object = {};

export const QueryDIDResponse = {
  encode(
    message: QueryDIDResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.didDocumentWithSeq !== undefined) {
      DIDDocumentWithSeq.encode(
        message.didDocumentWithSeq,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDIDResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryDIDResponse } as QueryDIDResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.didDocumentWithSeq = DIDDocumentWithSeq.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDIDResponse {
    const message = { ...baseQueryDIDResponse } as QueryDIDResponse;
    if (
      object.didDocumentWithSeq !== undefined &&
      object.didDocumentWithSeq !== null
    ) {
      message.didDocumentWithSeq = DIDDocumentWithSeq.fromJSON(
        object.didDocumentWithSeq
      );
    } else {
      message.didDocumentWithSeq = undefined;
    }
    return message;
  },

  toJSON(message: QueryDIDResponse): unknown {
    const obj: any = {};
    message.didDocumentWithSeq !== undefined &&
      (obj.didDocumentWithSeq = message.didDocumentWithSeq
        ? DIDDocumentWithSeq.toJSON(message.didDocumentWithSeq)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryDIDResponse>): QueryDIDResponse {
    const message = { ...baseQueryDIDResponse } as QueryDIDResponse;
    if (
      object.didDocumentWithSeq !== undefined &&
      object.didDocumentWithSeq !== null
    ) {
      message.didDocumentWithSeq = DIDDocumentWithSeq.fromPartial(
        object.didDocumentWithSeq
      );
    } else {
      message.didDocumentWithSeq = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** DID returns a DID Document with a sequence number. */
  DID(request: QueryDIDRequest): Promise<QueryDIDResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DID = this.DID.bind(this);
  }
  DID(request: QueryDIDRequest): Promise<QueryDIDResponse> {
    const data = QueryDIDRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.did.v2.Query", "DID", data);
    return promise.then((data) =>
      QueryDIDResponse.decode(new _m0.Reader(data))
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
