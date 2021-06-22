/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DIDDocumentWithSeq } from "../../../panacea/did/v2/did";

export const protobufPackage = "panacea.did.v2";

/** this line is used by starport scaffolding # 3 */
export interface QueryGetDIDRequest {
  DID: string;
}

export interface QueryGetDIDResponse {
  DIDDocumentWithSeq: DIDDocumentWithSeq | undefined;
}

const baseQueryGetDIDRequest: object = { DID: "" };

export const QueryGetDIDRequest = {
  encode(
    message: QueryGetDIDRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.DID !== "") {
      writer.uint32(10).string(message.DID);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDIDRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetDIDRequest } as QueryGetDIDRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.DID = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryGetDIDRequest {
    const message = { ...baseQueryGetDIDRequest } as QueryGetDIDRequest;
    if (object.DID !== undefined && object.DID !== null) {
      message.DID = String(object.DID);
    } else {
      message.DID = "";
    }
    return message;
  },

  toJSON(message: QueryGetDIDRequest): unknown {
    const obj: any = {};
    message.DID !== undefined && (obj.DID = message.DID);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetDIDRequest>): QueryGetDIDRequest {
    const message = { ...baseQueryGetDIDRequest } as QueryGetDIDRequest;
    if (object.DID !== undefined && object.DID !== null) {
      message.DID = object.DID;
    } else {
      message.DID = "";
    }
    return message;
  },
};

const baseQueryGetDIDResponse: object = {};

export const QueryGetDIDResponse = {
  encode(
    message: QueryGetDIDResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.DIDDocumentWithSeq !== undefined) {
      DIDDocumentWithSeq.encode(
        message.DIDDocumentWithSeq,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryGetDIDResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryGetDIDResponse } as QueryGetDIDResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.DIDDocumentWithSeq = DIDDocumentWithSeq.decode(
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

  fromJSON(object: any): QueryGetDIDResponse {
    const message = { ...baseQueryGetDIDResponse } as QueryGetDIDResponse;
    if (
      object.DIDDocumentWithSeq !== undefined &&
      object.DIDDocumentWithSeq !== null
    ) {
      message.DIDDocumentWithSeq = DIDDocumentWithSeq.fromJSON(
        object.DIDDocumentWithSeq
      );
    } else {
      message.DIDDocumentWithSeq = undefined;
    }
    return message;
  },

  toJSON(message: QueryGetDIDResponse): unknown {
    const obj: any = {};
    message.DIDDocumentWithSeq !== undefined &&
      (obj.DIDDocumentWithSeq = message.DIDDocumentWithSeq
        ? DIDDocumentWithSeq.toJSON(message.DIDDocumentWithSeq)
        : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryGetDIDResponse>): QueryGetDIDResponse {
    const message = { ...baseQueryGetDIDResponse } as QueryGetDIDResponse;
    if (
      object.DIDDocumentWithSeq !== undefined &&
      object.DIDDocumentWithSeq !== null
    ) {
      message.DIDDocumentWithSeq = DIDDocumentWithSeq.fromPartial(
        object.DIDDocumentWithSeq
      );
    } else {
      message.DIDDocumentWithSeq = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  DIDDocumentWithSeq(request: QueryGetDIDRequest): Promise<QueryGetDIDResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.DIDDocumentWithSeq = this.DIDDocumentWithSeq.bind(this);
  }
  DIDDocumentWithSeq(
    request: QueryGetDIDRequest
  ): Promise<QueryGetDIDResponse> {
    const data = QueryGetDIDRequest.encode(request).finish();
    const promise = this.rpc.request(
      "panacea.did.v2.Query",
      "DIDDocumentWithSeq",
      data
    );
    return promise.then((data) =>
      QueryGetDIDResponse.decode(new _m0.Reader(data))
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
