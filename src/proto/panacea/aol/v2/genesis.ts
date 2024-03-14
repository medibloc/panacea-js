/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Owner } from "./owner";
import { Record } from "./record";
import { Topic } from "./topic";
import { Writer } from "./writer";

export const protobufPackage = "panacea.aol.v2";

/** GenesisState defines the aol module's genesis state. */
export interface GenesisState {
  owners: { [key: string]: Owner };
  topics: { [key: string]: Topic };
  writers: { [key: string]: Writer };
  records: { [key: string]: Record };
}

export interface GenesisState_OwnersEntry {
  key: string;
  value: Owner | undefined;
}

export interface GenesisState_TopicsEntry {
  key: string;
  value: Topic | undefined;
}

export interface GenesisState_WritersEntry {
  key: string;
  value: Writer | undefined;
}

export interface GenesisState_RecordsEntry {
  key: string;
  value: Record | undefined;
}

function createBaseGenesisState(): GenesisState {
  return { owners: {}, topics: {}, writers: {}, records: {} };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.owners).forEach(([key, value]) => {
      GenesisState_OwnersEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    Object.entries(message.topics).forEach(([key, value]) => {
      GenesisState_TopicsEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    Object.entries(message.writers).forEach(([key, value]) => {
      GenesisState_WritersEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    Object.entries(message.records).forEach(([key, value]) => {
      GenesisState_RecordsEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = GenesisState_OwnersEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.owners[entry1.key] = entry1.value;
          }
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = GenesisState_TopicsEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.topics[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = GenesisState_WritersEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.writers[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = GenesisState_RecordsEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.records[entry4.key] = entry4.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      owners: isObject(object.owners)
        ? Object.entries(object.owners).reduce<{ [key: string]: Owner }>((acc, [key, value]) => {
          acc[key] = Owner.fromJSON(value);
          return acc;
        }, {})
        : {},
      topics: isObject(object.topics)
        ? Object.entries(object.topics).reduce<{ [key: string]: Topic }>((acc, [key, value]) => {
          acc[key] = Topic.fromJSON(value);
          return acc;
        }, {})
        : {},
      writers: isObject(object.writers)
        ? Object.entries(object.writers).reduce<{ [key: string]: Writer }>((acc, [key, value]) => {
          acc[key] = Writer.fromJSON(value);
          return acc;
        }, {})
        : {},
      records: isObject(object.records)
        ? Object.entries(object.records).reduce<{ [key: string]: Record }>((acc, [key, value]) => {
          acc[key] = Record.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.owners) {
      const entries = Object.entries(message.owners);
      if (entries.length > 0) {
        obj.owners = {};
        entries.forEach(([k, v]) => {
          obj.owners[k] = Owner.toJSON(v);
        });
      }
    }
    if (message.topics) {
      const entries = Object.entries(message.topics);
      if (entries.length > 0) {
        obj.topics = {};
        entries.forEach(([k, v]) => {
          obj.topics[k] = Topic.toJSON(v);
        });
      }
    }
    if (message.writers) {
      const entries = Object.entries(message.writers);
      if (entries.length > 0) {
        obj.writers = {};
        entries.forEach(([k, v]) => {
          obj.writers[k] = Writer.toJSON(v);
        });
      }
    }
    if (message.records) {
      const entries = Object.entries(message.records);
      if (entries.length > 0) {
        obj.records = {};
        entries.forEach(([k, v]) => {
          obj.records[k] = Record.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.owners = Object.entries(object.owners ?? {}).reduce<{ [key: string]: Owner }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Owner.fromPartial(value);
      }
      return acc;
    }, {});
    message.topics = Object.entries(object.topics ?? {}).reduce<{ [key: string]: Topic }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Topic.fromPartial(value);
      }
      return acc;
    }, {});
    message.writers = Object.entries(object.writers ?? {}).reduce<{ [key: string]: Writer }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Writer.fromPartial(value);
      }
      return acc;
    }, {});
    message.records = Object.entries(object.records ?? {}).reduce<{ [key: string]: Record }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Record.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseGenesisState_OwnersEntry(): GenesisState_OwnersEntry {
  return { key: "", value: undefined };
}

export const GenesisState_OwnersEntry = {
  encode(message: GenesisState_OwnersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Owner.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState_OwnersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_OwnersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Owner.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState_OwnersEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? Owner.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GenesisState_OwnersEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Owner.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState_OwnersEntry>, I>>(base?: I): GenesisState_OwnersEntry {
    return GenesisState_OwnersEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState_OwnersEntry>, I>>(object: I): GenesisState_OwnersEntry {
    const message = createBaseGenesisState_OwnersEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Owner.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseGenesisState_TopicsEntry(): GenesisState_TopicsEntry {
  return { key: "", value: undefined };
}

export const GenesisState_TopicsEntry = {
  encode(message: GenesisState_TopicsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Topic.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState_TopicsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_TopicsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Topic.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState_TopicsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? Topic.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GenesisState_TopicsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Topic.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState_TopicsEntry>, I>>(base?: I): GenesisState_TopicsEntry {
    return GenesisState_TopicsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState_TopicsEntry>, I>>(object: I): GenesisState_TopicsEntry {
    const message = createBaseGenesisState_TopicsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null) ? Topic.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseGenesisState_WritersEntry(): GenesisState_WritersEntry {
  return { key: "", value: undefined };
}

export const GenesisState_WritersEntry = {
  encode(message: GenesisState_WritersEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Writer.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState_WritersEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_WritersEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Writer.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState_WritersEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? Writer.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GenesisState_WritersEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Writer.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState_WritersEntry>, I>>(base?: I): GenesisState_WritersEntry {
    return GenesisState_WritersEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState_WritersEntry>, I>>(object: I): GenesisState_WritersEntry {
    const message = createBaseGenesisState_WritersEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? Writer.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseGenesisState_RecordsEntry(): GenesisState_RecordsEntry {
  return { key: "", value: undefined };
}

export const GenesisState_RecordsEntry = {
  encode(message: GenesisState_RecordsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Record.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState_RecordsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState_RecordsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Record.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState_RecordsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? Record.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GenesisState_RecordsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Record.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState_RecordsEntry>, I>>(base?: I): GenesisState_RecordsEntry {
    return GenesisState_RecordsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState_RecordsEntry>, I>>(object: I): GenesisState_RecordsEntry {
    const message = createBaseGenesisState_RecordsEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? Record.fromPartial(object.value)
      : undefined;
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
