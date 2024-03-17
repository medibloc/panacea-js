/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "panacea.pnft.v2";

export interface Pnft {
  denomId: string;
  id: string;
  name: string;
  description: string;
  uri: string;
  uriHash: string;
  data: string;
  creator: string;
  owner: string;
  createdAt: Date | undefined;
}

export interface PNFTMeta {
  name: string;
  description: string;
  creator: string;
  createdAt: Date | undefined;
  data: string;
}

function createBasePnft(): Pnft {
  return {
    denomId: "",
    id: "",
    name: "",
    description: "",
    uri: "",
    uriHash: "",
    data: "",
    creator: "",
    owner: "",
    createdAt: undefined,
  };
}

export const Pnft = {
  encode(message: Pnft, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.uri !== "") {
      writer.uint32(42).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(50).string(message.uriHash);
    }
    if (message.data !== "") {
      writer.uint32(58).string(message.data);
    }
    if (message.creator !== "") {
      writer.uint32(66).string(message.creator);
    }
    if (message.owner !== "") {
      writer.uint32(74).string(message.owner);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Pnft {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePnft();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.uriHash = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.data = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pnft {
    return {
      denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      uri: isSet(object.uri) ? globalThis.String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? globalThis.String(object.uriHash) : "",
      data: isSet(object.data) ? globalThis.String(object.data) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
    };
  },

  toJSON(message: Pnft): unknown {
    const obj: any = {};
    if (message.denomId !== "") {
      obj.denomId = message.denomId;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.uri !== "") {
      obj.uri = message.uri;
    }
    if (message.uriHash !== "") {
      obj.uriHash = message.uriHash;
    }
    if (message.data !== "") {
      obj.data = message.data;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Pnft>, I>>(base?: I): Pnft {
    return Pnft.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Pnft>, I>>(object: I): Pnft {
    const message = createBasePnft();
    message.denomId = object.denomId ?? "";
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = object.data ?? "";
    message.creator = object.creator ?? "";
    message.owner = object.owner ?? "";
    message.createdAt = object.createdAt ?? undefined;
    return message;
  },
};

function createBasePNFTMeta(): PNFTMeta {
  return { name: "", description: "", creator: "", createdAt: undefined, data: "" };
}

export const PNFTMeta = {
  encode(message: PNFTMeta, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(34).fork()).ldelim();
    }
    if (message.data !== "") {
      writer.uint32(42).string(message.data);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PNFTMeta {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePNFTMeta();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
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

          message.creator = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.data = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PNFTMeta {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      data: isSet(object.data) ? globalThis.String(object.data) : "",
    };
  },

  toJSON(message: PNFTMeta): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.data !== "") {
      obj.data = message.data;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PNFTMeta>, I>>(base?: I): PNFTMeta {
    return PNFTMeta.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<PNFTMeta>, I>>(object: I): PNFTMeta {
    const message = createBasePNFTMeta();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.creator = object.creator ?? "";
    message.createdAt = object.createdAt ?? undefined;
    message.data = object.data ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(Math.trunc(date.getTime() / 1_000));
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
