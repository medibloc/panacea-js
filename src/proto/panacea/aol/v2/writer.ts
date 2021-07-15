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

const baseWriter: object = {
  moniker: "",
  description: "",
  nanoTimestamp: Long.ZERO,
};

export const Writer = {
  encode(
    message: Writer,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.moniker !== "") {
      writer.uint32(10).string(message.moniker);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (!message.nanoTimestamp.isZero()) {
      writer.uint32(24).int64(message.nanoTimestamp);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Writer {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseWriter } as Writer;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.moniker = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.nanoTimestamp = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Writer {
    const message = { ...baseWriter } as Writer;
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = String(object.moniker);
    } else {
      message.moniker = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.nanoTimestamp !== undefined && object.nanoTimestamp !== null) {
      message.nanoTimestamp = Long.fromString(object.nanoTimestamp);
    } else {
      message.nanoTimestamp = Long.ZERO;
    }
    return message;
  },

  toJSON(message: Writer): unknown {
    const obj: any = {};
    message.moniker !== undefined && (obj.moniker = message.moniker);
    message.description !== undefined &&
      (obj.description = message.description);
    message.nanoTimestamp !== undefined &&
      (obj.nanoTimestamp = (message.nanoTimestamp || Long.ZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Writer>): Writer {
    const message = { ...baseWriter } as Writer;
    if (object.moniker !== undefined && object.moniker !== null) {
      message.moniker = object.moniker;
    } else {
      message.moniker = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.nanoTimestamp !== undefined && object.nanoTimestamp !== null) {
      message.nanoTimestamp = object.nanoTimestamp as Long;
    } else {
      message.nanoTimestamp = Long.ZERO;
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
