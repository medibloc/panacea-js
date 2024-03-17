/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.aol.v2";

/** Owner defines a owner type. */
export interface Owner {
  totalTopics: Long;
}

function createBaseOwner(): Owner {
  return { totalTopics: Long.UZERO };
}

export const Owner = {
  encode(message: Owner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.totalTopics.equals(Long.UZERO)) {
      writer.uint32(8).uint64(message.totalTopics);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Owner {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOwner();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.totalTopics = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Owner {
    return { totalTopics: isSet(object.totalTopics) ? Long.fromValue(object.totalTopics) : Long.UZERO };
  },

  toJSON(message: Owner): unknown {
    const obj: any = {};
    if (!message.totalTopics.equals(Long.UZERO)) {
      obj.totalTopics = (message.totalTopics || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Owner>, I>>(base?: I): Owner {
    return Owner.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Owner>, I>>(object: I): Owner {
    const message = createBaseOwner();
    message.totalTopics = (object.totalTopics !== undefined && object.totalTopics !== null)
      ? Long.fromValue(object.totalTopics)
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
