/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.aol.v2";

/** Topic defines a topic type. */
export interface Writer {
  moniker: string;
  description: string;
  nanoTimestamp: Long;
}

function createBaseWriter(): Writer {
  return { moniker: "", description: "", nanoTimestamp: Long.ZERO };
}

export const Writer = {
  encode(message: Writer, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.moniker !== "") {
      writer.uint32(10).string(message.moniker);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (!message.nanoTimestamp.equals(Long.ZERO)) {
      writer.uint32(24).int64(message.nanoTimestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Writer {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.moniker = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.nanoTimestamp = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Writer {
    return {
      moniker: isSet(object.moniker) ? globalThis.String(object.moniker) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      nanoTimestamp: isSet(object.nanoTimestamp) ? Long.fromValue(object.nanoTimestamp) : Long.ZERO,
    };
  },

  toJSON(message: Writer): unknown {
    const obj: any = {};
    if (message.moniker !== "") {
      obj.moniker = message.moniker;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (!message.nanoTimestamp.equals(Long.ZERO)) {
      obj.nanoTimestamp = (message.nanoTimestamp || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Writer>, I>>(base?: I): Writer {
    return Writer.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Writer>, I>>(object: I): Writer {
    const message = createBaseWriter();
    message.moniker = object.moniker ?? "";
    message.description = object.description ?? "";
    message.nanoTimestamp = (object.nanoTimestamp !== undefined && object.nanoTimestamp !== null)
      ? Long.fromValue(object.nanoTimestamp)
      : Long.ZERO;
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
