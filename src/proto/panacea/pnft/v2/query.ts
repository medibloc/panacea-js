/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { PageRequest, PageResponse } from "../../../cosmos/base/query/v1beta1/pagination";
import { Denom } from "./denom";
import { Pnft } from "./pnft";

export const protobufPackage = "panacea.pnft.v2";

/** QueryDenomsRequest is the response type for the Query RPC method. */
export interface QueryDenomsRequest {
  pagination: PageRequest | undefined;
}

/** QueryDenomsResponse is the response type for the Query RPC method. */
export interface QueryDenomsResponse {
  denoms: Denom[];
  pagination: PageResponse | undefined;
}

/** QueryDenomsByOwnerRequest is the response type for the Query RPC method. */
export interface QueryDenomsByOwnerRequest {
  owner: string;
}

/** QueryDenomsByOwnerResponse is the response type for the Query RPC method. */
export interface QueryDenomsByOwnerResponse {
  denoms: Denom[];
}

/** QueryDenomRequest is the response type for the Query RPC method. */
export interface QueryDenomRequest {
  id: string;
}

/** QueryDenomResponse is the response type for the Query RPC method. */
export interface QueryDenomResponse {
  denom: Denom | undefined;
}

/** QueryPNFTsRequest is the response type for the Query RPC method. */
export interface QueryPNFTsRequest {
  denomId: string;
}

/** QueryPNFTsResponse is the response type for the Query RPC method. */
export interface QueryPNFTsResponse {
  pnfts: Pnft[];
}

/** QueryPNFTsRequest is the response type for the Query RPC method. */
export interface QueryPNFTsByDenomOwnerRequest {
  denomId: string;
  owner: string;
}

/** QueryPNFTsResponse is the response type for the Query RPC method. */
export interface QueryPNFTsByDenomOwnerResponse {
  pnfts: Pnft[];
}

/** QueryPNFTRequest is the response type for the Query RPC method. */
export interface QueryPNFTRequest {
  denomId: string;
  id: string;
}

/** QueryPNFTResponse is the response type for the Query RPC method. */
export interface QueryPNFTResponse {
  pnft: Pnft | undefined;
}

function createBaseQueryDenomsRequest(): QueryDenomsRequest {
  return { pagination: undefined };
}

export const QueryDenomsRequest = {
  encode(message: QueryDenomsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): QueryDenomsRequest {
    return { pagination: isSet(object.pagination) ? PageRequest.fromJSON(object.pagination) : undefined };
  },

  toJSON(message: QueryDenomsRequest): unknown {
    const obj: any = {};
    if (message.pagination !== undefined) {
      obj.pagination = PageRequest.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomsRequest>, I>>(base?: I): QueryDenomsRequest {
    return QueryDenomsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomsRequest>, I>>(object: I): QueryDenomsRequest {
    const message = createBaseQueryDenomsRequest();
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageRequest.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomsResponse(): QueryDenomsResponse {
  return { denoms: [], pagination: undefined };
}

export const QueryDenomsResponse = {
  encode(message: QueryDenomsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denoms) {
      Denom.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denoms.push(Denom.decode(reader, reader.uint32()));
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

  fromJSON(object: any): QueryDenomsResponse {
    return {
      denoms: globalThis.Array.isArray(object?.denoms) ? object.denoms.map((e: any) => Denom.fromJSON(e)) : [],
      pagination: isSet(object.pagination) ? PageResponse.fromJSON(object.pagination) : undefined,
    };
  },

  toJSON(message: QueryDenomsResponse): unknown {
    const obj: any = {};
    if (message.denoms?.length) {
      obj.denoms = message.denoms.map((e) => Denom.toJSON(e));
    }
    if (message.pagination !== undefined) {
      obj.pagination = PageResponse.toJSON(message.pagination);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomsResponse>, I>>(base?: I): QueryDenomsResponse {
    return QueryDenomsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomsResponse>, I>>(object: I): QueryDenomsResponse {
    const message = createBaseQueryDenomsResponse();
    message.denoms = object.denoms?.map((e) => Denom.fromPartial(e)) || [];
    message.pagination = (object.pagination !== undefined && object.pagination !== null)
      ? PageResponse.fromPartial(object.pagination)
      : undefined;
    return message;
  },
};

function createBaseQueryDenomsByOwnerRequest(): QueryDenomsByOwnerRequest {
  return { owner: "" };
}

export const QueryDenomsByOwnerRequest = {
  encode(message: QueryDenomsByOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsByOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsByOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomsByOwnerRequest {
    return { owner: isSet(object.owner) ? globalThis.String(object.owner) : "" };
  },

  toJSON(message: QueryDenomsByOwnerRequest): unknown {
    const obj: any = {};
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomsByOwnerRequest>, I>>(base?: I): QueryDenomsByOwnerRequest {
    return QueryDenomsByOwnerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomsByOwnerRequest>, I>>(object: I): QueryDenomsByOwnerRequest {
    const message = createBaseQueryDenomsByOwnerRequest();
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseQueryDenomsByOwnerResponse(): QueryDenomsByOwnerResponse {
  return { denoms: [] };
}

export const QueryDenomsByOwnerResponse = {
  encode(message: QueryDenomsByOwnerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.denoms) {
      Denom.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomsByOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomsByOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denoms.push(Denom.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomsByOwnerResponse {
    return { denoms: globalThis.Array.isArray(object?.denoms) ? object.denoms.map((e: any) => Denom.fromJSON(e)) : [] };
  },

  toJSON(message: QueryDenomsByOwnerResponse): unknown {
    const obj: any = {};
    if (message.denoms?.length) {
      obj.denoms = message.denoms.map((e) => Denom.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomsByOwnerResponse>, I>>(base?: I): QueryDenomsByOwnerResponse {
    return QueryDenomsByOwnerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomsByOwnerResponse>, I>>(object: I): QueryDenomsByOwnerResponse {
    const message = createBaseQueryDenomsByOwnerResponse();
    message.denoms = object.denoms?.map((e) => Denom.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryDenomRequest(): QueryDenomRequest {
  return { id: "" };
}

export const QueryDenomRequest = {
  encode(message: QueryDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: QueryDenomRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomRequest>, I>>(base?: I): QueryDenomRequest {
    return QueryDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomRequest>, I>>(object: I): QueryDenomRequest {
    const message = createBaseQueryDenomRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryDenomResponse(): QueryDenomResponse {
  return { denom: undefined };
}

export const QueryDenomResponse = {
  encode(message: QueryDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denom !== undefined) {
      Denom.encode(message.denom, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryDenomResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denom = Denom.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryDenomResponse {
    return { denom: isSet(object.denom) ? Denom.fromJSON(object.denom) : undefined };
  },

  toJSON(message: QueryDenomResponse): unknown {
    const obj: any = {};
    if (message.denom !== undefined) {
      obj.denom = Denom.toJSON(message.denom);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryDenomResponse>, I>>(base?: I): QueryDenomResponse {
    return QueryDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryDenomResponse>, I>>(object: I): QueryDenomResponse {
    const message = createBaseQueryDenomResponse();
    message.denom = (object.denom !== undefined && object.denom !== null) ? Denom.fromPartial(object.denom) : undefined;
    return message;
  },
};

function createBaseQueryPNFTsRequest(): QueryPNFTsRequest {
  return { denomId: "" };
}

export const QueryPNFTsRequest = {
  encode(message: QueryPNFTsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPNFTsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPNFTsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPNFTsRequest {
    return { denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "" };
  },

  toJSON(message: QueryPNFTsRequest): unknown {
    const obj: any = {};
    if (message.denomId !== "") {
      obj.denomId = message.denomId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPNFTsRequest>, I>>(base?: I): QueryPNFTsRequest {
    return QueryPNFTsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPNFTsRequest>, I>>(object: I): QueryPNFTsRequest {
    const message = createBaseQueryPNFTsRequest();
    message.denomId = object.denomId ?? "";
    return message;
  },
};

function createBaseQueryPNFTsResponse(): QueryPNFTsResponse {
  return { pnfts: [] };
}

export const QueryPNFTsResponse = {
  encode(message: QueryPNFTsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pnfts) {
      Pnft.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPNFTsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPNFTsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pnfts.push(Pnft.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPNFTsResponse {
    return { pnfts: globalThis.Array.isArray(object?.pnfts) ? object.pnfts.map((e: any) => Pnft.fromJSON(e)) : [] };
  },

  toJSON(message: QueryPNFTsResponse): unknown {
    const obj: any = {};
    if (message.pnfts?.length) {
      obj.pnfts = message.pnfts.map((e) => Pnft.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPNFTsResponse>, I>>(base?: I): QueryPNFTsResponse {
    return QueryPNFTsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPNFTsResponse>, I>>(object: I): QueryPNFTsResponse {
    const message = createBaseQueryPNFTsResponse();
    message.pnfts = object.pnfts?.map((e) => Pnft.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryPNFTsByDenomOwnerRequest(): QueryPNFTsByDenomOwnerRequest {
  return { denomId: "", owner: "" };
}

export const QueryPNFTsByDenomOwnerRequest = {
  encode(message: QueryPNFTsByDenomOwnerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPNFTsByDenomOwnerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPNFTsByDenomOwnerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPNFTsByDenomOwnerRequest {
    return {
      denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
    };
  },

  toJSON(message: QueryPNFTsByDenomOwnerRequest): unknown {
    const obj: any = {};
    if (message.denomId !== "") {
      obj.denomId = message.denomId;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPNFTsByDenomOwnerRequest>, I>>(base?: I): QueryPNFTsByDenomOwnerRequest {
    return QueryPNFTsByDenomOwnerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPNFTsByDenomOwnerRequest>, I>>(
    object: I,
  ): QueryPNFTsByDenomOwnerRequest {
    const message = createBaseQueryPNFTsByDenomOwnerRequest();
    message.denomId = object.denomId ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseQueryPNFTsByDenomOwnerResponse(): QueryPNFTsByDenomOwnerResponse {
  return { pnfts: [] };
}

export const QueryPNFTsByDenomOwnerResponse = {
  encode(message: QueryPNFTsByDenomOwnerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.pnfts) {
      Pnft.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPNFTsByDenomOwnerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPNFTsByDenomOwnerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pnfts.push(Pnft.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPNFTsByDenomOwnerResponse {
    return { pnfts: globalThis.Array.isArray(object?.pnfts) ? object.pnfts.map((e: any) => Pnft.fromJSON(e)) : [] };
  },

  toJSON(message: QueryPNFTsByDenomOwnerResponse): unknown {
    const obj: any = {};
    if (message.pnfts?.length) {
      obj.pnfts = message.pnfts.map((e) => Pnft.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPNFTsByDenomOwnerResponse>, I>>(base?: I): QueryPNFTsByDenomOwnerResponse {
    return QueryPNFTsByDenomOwnerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPNFTsByDenomOwnerResponse>, I>>(
    object: I,
  ): QueryPNFTsByDenomOwnerResponse {
    const message = createBaseQueryPNFTsByDenomOwnerResponse();
    message.pnfts = object.pnfts?.map((e) => Pnft.fromPartial(e)) || [];
    return message;
  },
};

function createBaseQueryPNFTRequest(): QueryPNFTRequest {
  return { denomId: "", id: "" };
}

export const QueryPNFTRequest = {
  encode(message: QueryPNFTRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPNFTRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPNFTRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPNFTRequest {
    return {
      denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
    };
  },

  toJSON(message: QueryPNFTRequest): unknown {
    const obj: any = {};
    if (message.denomId !== "") {
      obj.denomId = message.denomId;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPNFTRequest>, I>>(base?: I): QueryPNFTRequest {
    return QueryPNFTRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPNFTRequest>, I>>(object: I): QueryPNFTRequest {
    const message = createBaseQueryPNFTRequest();
    message.denomId = object.denomId ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseQueryPNFTResponse(): QueryPNFTResponse {
  return { pnft: undefined };
}

export const QueryPNFTResponse = {
  encode(message: QueryPNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pnft !== undefined) {
      Pnft.encode(message.pnft, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueryPNFTResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueryPNFTResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pnft = Pnft.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueryPNFTResponse {
    return { pnft: isSet(object.pnft) ? Pnft.fromJSON(object.pnft) : undefined };
  },

  toJSON(message: QueryPNFTResponse): unknown {
    const obj: any = {};
    if (message.pnft !== undefined) {
      obj.pnft = Pnft.toJSON(message.pnft);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueryPNFTResponse>, I>>(base?: I): QueryPNFTResponse {
    return QueryPNFTResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueryPNFTResponse>, I>>(object: I): QueryPNFTResponse {
    const message = createBaseQueryPNFTResponse();
    message.pnft = (object.pnft !== undefined && object.pnft !== null) ? Pnft.fromPartial(object.pnft) : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service. */
export interface Query {
  /** Denoms returns denom list. */
  Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse>;
  DenomsByOwner(request: QueryDenomsByOwnerRequest): Promise<QueryDenomsByOwnerResponse>;
  /** Denom returns denom detail. */
  Denom(request: QueryDenomRequest): Promise<QueryDenomResponse>;
  PNFTs(request: QueryPNFTsRequest): Promise<QueryPNFTsResponse>;
  PNFTsByDenomOwner(request: QueryPNFTsByDenomOwnerRequest): Promise<QueryPNFTsByDenomOwnerResponse>;
  PNFT(request: QueryPNFTRequest): Promise<QueryPNFTResponse>;
}

export const QueryServiceName = "panacea.pnft.v2.Query";
export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || QueryServiceName;
    this.rpc = rpc;
    this.Denoms = this.Denoms.bind(this);
    this.DenomsByOwner = this.DenomsByOwner.bind(this);
    this.Denom = this.Denom.bind(this);
    this.PNFTs = this.PNFTs.bind(this);
    this.PNFTsByDenomOwner = this.PNFTsByDenomOwner.bind(this);
    this.PNFT = this.PNFT.bind(this);
  }
  Denoms(request: QueryDenomsRequest): Promise<QueryDenomsResponse> {
    const data = QueryDenomsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Denoms", data);
    return promise.then((data) => QueryDenomsResponse.decode(_m0.Reader.create(data)));
  }

  DenomsByOwner(request: QueryDenomsByOwnerRequest): Promise<QueryDenomsByOwnerResponse> {
    const data = QueryDenomsByOwnerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DenomsByOwner", data);
    return promise.then((data) => QueryDenomsByOwnerResponse.decode(_m0.Reader.create(data)));
  }

  Denom(request: QueryDenomRequest): Promise<QueryDenomResponse> {
    const data = QueryDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Denom", data);
    return promise.then((data) => QueryDenomResponse.decode(_m0.Reader.create(data)));
  }

  PNFTs(request: QueryPNFTsRequest): Promise<QueryPNFTsResponse> {
    const data = QueryPNFTsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PNFTs", data);
    return promise.then((data) => QueryPNFTsResponse.decode(_m0.Reader.create(data)));
  }

  PNFTsByDenomOwner(request: QueryPNFTsByDenomOwnerRequest): Promise<QueryPNFTsByDenomOwnerResponse> {
    const data = QueryPNFTsByDenomOwnerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PNFTsByDenomOwner", data);
    return promise.then((data) => QueryPNFTsByDenomOwnerResponse.decode(_m0.Reader.create(data)));
  }

  PNFT(request: QueryPNFTRequest): Promise<QueryPNFTResponse> {
    const data = QueryPNFTRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "PNFT", data);
    return promise.then((data) => QueryPNFTResponse.decode(_m0.Reader.create(data)));
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
