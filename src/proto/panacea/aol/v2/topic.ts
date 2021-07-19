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

const baseTopic: object = {
  description: "",
  totalRecords: Long.UZERO,
  totalWriters: Long.UZERO,
};

export const Topic = {
  encode(message: Topic, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (!message.totalRecords.isZero()) {
      writer.uint32(16).uint64(message.totalRecords);
    }
    if (!message.totalWriters.isZero()) {
      writer.uint32(24).uint64(message.totalWriters);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Topic {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTopic } as Topic;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.description = reader.string();
          break;
        case 2:
          message.totalRecords = reader.uint64() as Long;
          break;
        case 3:
          message.totalWriters = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Topic {
    const message = { ...baseTopic } as Topic;
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.totalRecords !== undefined && object.totalRecords !== null) {
      message.totalRecords = Long.fromString(object.totalRecords);
    } else {
      message.totalRecords = Long.UZERO;
    }
    if (object.totalWriters !== undefined && object.totalWriters !== null) {
      message.totalWriters = Long.fromString(object.totalWriters);
    } else {
      message.totalWriters = Long.UZERO;
    }
    return message;
  },

  toJSON(message: Topic): unknown {
    const obj: any = {};
    message.description !== undefined &&
      (obj.description = message.description);
    message.totalRecords !== undefined &&
      (obj.totalRecords = (message.totalRecords || Long.UZERO).toString());
    message.totalWriters !== undefined &&
      (obj.totalWriters = (message.totalWriters || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<Topic>): Topic {
    const message = { ...baseTopic } as Topic;
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.totalRecords !== undefined && object.totalRecords !== null) {
      message.totalRecords = object.totalRecords as Long;
    } else {
      message.totalRecords = Long.UZERO;
    }
    if (object.totalWriters !== undefined && object.totalWriters !== null) {
      message.totalWriters = object.totalWriters as Long;
    } else {
      message.totalWriters = Long.UZERO;
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
