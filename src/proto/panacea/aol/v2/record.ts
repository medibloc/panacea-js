/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.aol.v2";

export interface Record {
  key: Uint8Array;
  value: Uint8Array;
  nanoTimestamp: Long;
  writerAddress: string;
}

const baseRecord: object = { nanoTimestamp: Long.ZERO, writerAddress: "" };

export const Record = {
  encode(
    message: Record,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    if (!message.nanoTimestamp.isZero()) {
      writer.uint32(24).int64(message.nanoTimestamp);
    }
    if (message.writerAddress !== "") {
      writer.uint32(34).string(message.writerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Record {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRecord } as Record;
    message.key = new Uint8Array();
    message.value = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.bytes();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        case 3:
          message.nanoTimestamp = reader.int64() as Long;
          break;
        case 4:
          message.writerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Record {
    const message = { ...baseRecord } as Record;
    message.key = new Uint8Array();
    message.value = new Uint8Array();
    if (object.key !== undefined && object.key !== null) {
      message.key = bytesFromBase64(object.key);
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = bytesFromBase64(object.value);
    }
    if (object.nanoTimestamp !== undefined && object.nanoTimestamp !== null) {
      message.nanoTimestamp = Long.fromString(object.nanoTimestamp);
    } else {
      message.nanoTimestamp = Long.ZERO;
    }
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = String(object.writerAddress);
    } else {
      message.writerAddress = "";
    }
    return message;
  },

  toJSON(message: Record): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(
        message.key !== undefined ? message.key : new Uint8Array()
      ));
    message.value !== undefined &&
      (obj.value = base64FromBytes(
        message.value !== undefined ? message.value : new Uint8Array()
      ));
    message.nanoTimestamp !== undefined &&
      (obj.nanoTimestamp = (message.nanoTimestamp || Long.ZERO).toString());
    message.writerAddress !== undefined &&
      (obj.writerAddress = message.writerAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<Record>): Record {
    const message = { ...baseRecord } as Record;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = new Uint8Array();
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = new Uint8Array();
    }
    if (object.nanoTimestamp !== undefined && object.nanoTimestamp !== null) {
      message.nanoTimestamp = object.nanoTimestamp as Long;
    } else {
      message.nanoTimestamp = Long.ZERO;
    }
    if (object.writerAddress !== undefined && object.writerAddress !== null) {
      message.writerAddress = object.writerAddress;
    } else {
      message.writerAddress = "";
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(""));
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
