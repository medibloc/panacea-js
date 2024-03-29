/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.aol.v2";

/** Record defines a record type. */
export interface Record {
  key: Uint8Array;
  value: Uint8Array;
  nanoTimestamp: Long;
  writerAddress: string;
}

function createBaseRecord(): Record {
  return { key: new Uint8Array(0), value: new Uint8Array(0), nanoTimestamp: Long.ZERO, writerAddress: "" };
}

export const Record = {
  encode(message: Record, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    if (!message.nanoTimestamp.equals(Long.ZERO)) {
      writer.uint32(24).int64(message.nanoTimestamp);
    }
    if (message.writerAddress !== "") {
      writer.uint32(34).string(message.writerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Record {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.nanoTimestamp = reader.int64() as Long;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.writerAddress = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Record {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(0),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
      nanoTimestamp: isSet(object.nanoTimestamp) ? Long.fromValue(object.nanoTimestamp) : Long.ZERO,
      writerAddress: isSet(object.writerAddress) ? globalThis.String(object.writerAddress) : "",
    };
  },

  toJSON(message: Record): unknown {
    const obj: any = {};
    if (message.key.length !== 0) {
      obj.key = base64FromBytes(message.key);
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value);
    }
    if (!message.nanoTimestamp.equals(Long.ZERO)) {
      obj.nanoTimestamp = (message.nanoTimestamp || Long.ZERO).toString();
    }
    if (message.writerAddress !== "") {
      obj.writerAddress = message.writerAddress;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Record>, I>>(base?: I): Record {
    return Record.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Record>, I>>(object: I): Record {
    const message = createBaseRecord();
    message.key = object.key ?? new Uint8Array(0);
    message.value = object.value ?? new Uint8Array(0);
    message.nanoTimestamp = (object.nanoTimestamp !== undefined && object.nanoTimestamp !== null)
      ? Long.fromValue(object.nanoTimestamp)
      : Long.ZERO;
    message.writerAddress = object.writerAddress ?? "";
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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
