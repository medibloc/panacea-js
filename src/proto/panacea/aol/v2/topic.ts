/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.aol.v2";

/** Topic defines a topic type. */
export interface Topic {
  description: string;
  totalRecords: Long;
  totalWriters: Long;
}

function createBaseTopic(): Topic {
  return { description: "", totalRecords: Long.UZERO, totalWriters: Long.UZERO };
}

export const Topic = {
  encode(message: Topic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (!message.totalRecords.equals(Long.UZERO)) {
      writer.uint32(16).uint64(message.totalRecords);
    }
    if (!message.totalWriters.equals(Long.UZERO)) {
      writer.uint32(24).uint64(message.totalWriters);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Topic {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTopic();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.totalRecords = reader.uint64() as Long;
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.totalWriters = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Topic {
    return {
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      totalRecords: isSet(object.totalRecords) ? Long.fromValue(object.totalRecords) : Long.UZERO,
      totalWriters: isSet(object.totalWriters) ? Long.fromValue(object.totalWriters) : Long.UZERO,
    };
  },

  toJSON(message: Topic): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (!message.totalRecords.equals(Long.UZERO)) {
      obj.totalRecords = (message.totalRecords || Long.UZERO).toString();
    }
    if (!message.totalWriters.equals(Long.UZERO)) {
      obj.totalWriters = (message.totalWriters || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Topic>, I>>(base?: I): Topic {
    return Topic.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Topic>, I>>(object: I): Topic {
    const message = createBaseTopic();
    message.description = object.description ?? "";
    message.totalRecords = (object.totalRecords !== undefined && object.totalRecords !== null)
      ? Long.fromValue(object.totalRecords)
      : Long.UZERO;
    message.totalWriters = (object.totalWriters !== undefined && object.totalWriters !== null)
      ? Long.fromValue(object.totalWriters)
      : Long.UZERO;
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

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
