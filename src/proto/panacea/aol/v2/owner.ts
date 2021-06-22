/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.aol.v2";

export interface Owner {
  totalTopics: Long;
}

const baseOwner: object = { totalTopics: Long.UZERO };

export const Owner = {
  encode(message: Owner, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.totalTopics.isZero()) {
      writer.uint32(8).uint64(message.totalTopics);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Owner {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOwner } as Owner;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.totalTopics = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Owner {
    const message = { ...baseOwner } as Owner;
    if (object.totalTopics !== undefined && object.totalTopics !== null) {
      message.totalTopics = Long.fromString(object.totalTopics);
    } else {
      message.totalTopics = Long.UZERO;
    }
    return message;
  },

  toJSON(message: Owner): unknown {
    const obj: any = {};
    message.totalTopics !== undefined &&
      (obj.totalTopics = (message.totalTopics || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Owner>): Owner {
    const message = { ...baseOwner } as Owner;
    if (object.totalTopics !== undefined && object.totalTopics !== null) {
      message.totalTopics = object.totalTopics as Long;
    } else {
      message.totalTopics = Long.UZERO;
    }
    return message;
  },
};

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
