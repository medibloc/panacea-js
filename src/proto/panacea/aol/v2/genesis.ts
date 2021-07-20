/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Owner } from "../../../panacea/aol/v2/owner";
import { Topic } from "../../../panacea/aol/v2/topic";
import { Writer } from "../../../panacea/aol/v2/writer";
import { Record } from "../../../panacea/aol/v2/record";

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

const baseGenesisState: object = {};

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.owners).forEach(([key, value]) => {
      GenesisState_OwnersEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    Object.entries(message.topics).forEach(([key, value]) => {
      GenesisState_TopicsEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    Object.entries(message.writers).forEach(([key, value]) => {
      GenesisState_WritersEntry.encode(
        { key: key as any, value },
        writer.uint32(26).fork()
      ).ldelim();
    });
    Object.entries(message.records).forEach(([key, value]) => {
      GenesisState_RecordsEntry.encode(
        { key: key as any, value },
        writer.uint32(34).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.owners = {};
    message.topics = {};
    message.writers = {};
    message.records = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GenesisState_OwnersEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.owners[entry1.key] = entry1.value;
          }
          break;
        case 2:
          const entry2 = GenesisState_TopicsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.topics[entry2.key] = entry2.value;
          }
          break;
        case 3:
          const entry3 = GenesisState_WritersEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry3.value !== undefined) {
            message.writers[entry3.key] = entry3.value;
          }
          break;
        case 4:
          const entry4 = GenesisState_RecordsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry4.value !== undefined) {
            message.records[entry4.key] = entry4.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.owners = {};
    message.topics = {};
    message.writers = {};
    message.records = {};
    if (object.owners !== undefined && object.owners !== null) {
      Object.entries(object.owners).forEach(([key, value]) => {
        message.owners[key] = Owner.fromJSON(value);
      });
    }
    if (object.topics !== undefined && object.topics !== null) {
      Object.entries(object.topics).forEach(([key, value]) => {
        message.topics[key] = Topic.fromJSON(value);
      });
    }
    if (object.writers !== undefined && object.writers !== null) {
      Object.entries(object.writers).forEach(([key, value]) => {
        message.writers[key] = Writer.fromJSON(value);
      });
    }
    if (object.records !== undefined && object.records !== null) {
      Object.entries(object.records).forEach(([key, value]) => {
        message.records[key] = Record.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    obj.owners = {};
    if (message.owners) {
      Object.entries(message.owners).forEach(([k, v]) => {
        obj.owners[k] = Owner.toJSON(v);
      });
    }
    obj.topics = {};
    if (message.topics) {
      Object.entries(message.topics).forEach(([k, v]) => {
        obj.topics[k] = Topic.toJSON(v);
      });
    }
    obj.writers = {};
    if (message.writers) {
      Object.entries(message.writers).forEach(([k, v]) => {
        obj.writers[k] = Writer.toJSON(v);
      });
    }
    obj.records = {};
    if (message.records) {
      Object.entries(message.records).forEach(([k, v]) => {
        obj.records[k] = Record.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.owners = {};
    message.topics = {};
    message.writers = {};
    message.records = {};
    if (object.owners !== undefined && object.owners !== null) {
      Object.entries(object.owners).forEach(([key, value]) => {
        if (value !== undefined) {
          message.owners[key] = Owner.fromPartial(value);
        }
      });
    }
    if (object.topics !== undefined && object.topics !== null) {
      Object.entries(object.topics).forEach(([key, value]) => {
        if (value !== undefined) {
          message.topics[key] = Topic.fromPartial(value);
        }
      });
    }
    if (object.writers !== undefined && object.writers !== null) {
      Object.entries(object.writers).forEach(([key, value]) => {
        if (value !== undefined) {
          message.writers[key] = Writer.fromPartial(value);
        }
      });
    }
    if (object.records !== undefined && object.records !== null) {
      Object.entries(object.records).forEach(([key, value]) => {
        if (value !== undefined) {
          message.records[key] = Record.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseGenesisState_OwnersEntry: object = { key: "" };

export const GenesisState_OwnersEntry = {
  encode(
    message: GenesisState_OwnersEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Owner.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisState_OwnersEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenesisState_OwnersEntry,
    } as GenesisState_OwnersEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Owner.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState_OwnersEntry {
    const message = {
      ...baseGenesisState_OwnersEntry,
    } as GenesisState_OwnersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Owner.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState_OwnersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Owner.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenesisState_OwnersEntry>
  ): GenesisState_OwnersEntry {
    const message = {
      ...baseGenesisState_OwnersEntry,
    } as GenesisState_OwnersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Owner.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseGenesisState_TopicsEntry: object = { key: "" };

export const GenesisState_TopicsEntry = {
  encode(
    message: GenesisState_TopicsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Topic.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisState_TopicsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenesisState_TopicsEntry,
    } as GenesisState_TopicsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Topic.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState_TopicsEntry {
    const message = {
      ...baseGenesisState_TopicsEntry,
    } as GenesisState_TopicsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Topic.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState_TopicsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Topic.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenesisState_TopicsEntry>
  ): GenesisState_TopicsEntry {
    const message = {
      ...baseGenesisState_TopicsEntry,
    } as GenesisState_TopicsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Topic.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseGenesisState_WritersEntry: object = { key: "" };

export const GenesisState_WritersEntry = {
  encode(
    message: GenesisState_WritersEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Writer.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisState_WritersEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenesisState_WritersEntry,
    } as GenesisState_WritersEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Writer.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState_WritersEntry {
    const message = {
      ...baseGenesisState_WritersEntry,
    } as GenesisState_WritersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Writer.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState_WritersEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Writer.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenesisState_WritersEntry>
  ): GenesisState_WritersEntry {
    const message = {
      ...baseGenesisState_WritersEntry,
    } as GenesisState_WritersEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Writer.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseGenesisState_RecordsEntry: object = { key: "" };

export const GenesisState_RecordsEntry = {
  encode(
    message: GenesisState_RecordsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Record.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisState_RecordsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenesisState_RecordsEntry,
    } as GenesisState_RecordsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Record.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState_RecordsEntry {
    const message = {
      ...baseGenesisState_RecordsEntry,
    } as GenesisState_RecordsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Record.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState_RecordsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Record.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenesisState_RecordsEntry>
  ): GenesisState_RecordsEntry {
    const message = {
      ...baseGenesisState_RecordsEntry,
    } as GenesisState_RecordsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Record.fromPartial(object.value);
    } else {
      message.value = undefined;
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
