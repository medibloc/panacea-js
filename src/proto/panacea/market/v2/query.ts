/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Deal } from "../../../panacea/market/v2/deal";

export const protobufPackage = "panacea.market.v2";

/** QueryDealRequest is the request type for Query/Deal RPC method. */
export interface QueryDealRequest {
  dealId: Long;
}

/** QueryDealResponse is the response type for the Query/Deal RPC method. */
export interface QueryDealResponse {
  deal: Deal | undefined;
}

const baseQueryDealRequest: object = { dealId: Long.UZERO };

export const QueryDealRequest = {
  encode(
    message: QueryDealRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.dealId.isZero()) {
      writer.uint32(8).uint64(message.dealId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDealRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryDealRequest } as QueryDealRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dealId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDealRequest {
    const message = { ...baseQueryDealRequest } as QueryDealRequest;
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = Long.fromString(object.dealId);
    } else {
      message.dealId = Long.UZERO;
    }
    return message;
  },

  toJSON(message: QueryDealRequest): unknown {
    const obj: any = {};
    message.dealId !== undefined &&
      (obj.dealId = (message.dealId || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<QueryDealRequest>): QueryDealRequest {
    const message = { ...baseQueryDealRequest } as QueryDealRequest;
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = object.dealId as Long;
    } else {
      message.dealId = Long.UZERO;
    }
    return message;
  },
};

const baseQueryDealResponse: object = {};

export const QueryDealResponse = {
  encode(
    message: QueryDealResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.deal !== undefined) {
      Deal.encode(message.deal, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDealResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseQueryDealResponse } as QueryDealResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deal = Deal.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryDealResponse {
    const message = { ...baseQueryDealResponse } as QueryDealResponse;
    if (object.deal !== undefined && object.deal !== null) {
      message.deal = Deal.fromJSON(object.deal);
    } else {
      message.deal = undefined;
    }
    return message;
  },

  toJSON(message: QueryDealResponse): unknown {
    const obj: any = {};
    message.deal !== undefined &&
      (obj.deal = message.deal ? Deal.toJSON(message.deal) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<QueryDealResponse>): QueryDealResponse {
    const message = { ...baseQueryDealResponse } as QueryDealResponse;
    if (object.deal !== undefined && object.deal !== null) {
      message.deal = Deal.fromPartial(object.deal);
    } else {
      message.deal = undefined;
    }
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Deal returns a Deal. */
  Deal(request: QueryDealRequest): Promise<QueryDealResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Deal = this.Deal.bind(this);
  }
  Deal(request: QueryDealRequest): Promise<QueryDealResponse> {
    const data = QueryDealRequest.encode(request).finish();
    const promise = this.rpc.request("panacea.market.v2.Query", "Deal", data);
    return promise.then((data) =>
      QueryDealResponse.decode(new _m0.Reader(data))
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
