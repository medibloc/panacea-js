/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Token } from "../../../panacea/token/v2/token";

export const protobufPackage = "panacea.token.v2";

/** GenesisState defines the token module's genesis state. */
export interface GenesisState {
  tokens: { [key: string]: Token };
}

export interface GenesisState_TokensEntry {
  key: string;
  value: Token | undefined;
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.tokens).forEach(([key, value]) => {
      GenesisState_TokensEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.tokens = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GenesisState_TokensEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.tokens[entry1.key] = entry1.value;
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
    message.tokens = {};
    if (object.tokens !== undefined && object.tokens !== null) {
      Object.entries(object.tokens).forEach(([key, value]) => {
        message.tokens[key] = Token.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    obj.tokens = {};
    if (message.tokens) {
      Object.entries(message.tokens).forEach(([k, v]) => {
        obj.tokens[k] = Token.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.tokens = {};
    if (object.tokens !== undefined && object.tokens !== null) {
      Object.entries(object.tokens).forEach(([key, value]) => {
        if (value !== undefined) {
          message.tokens[key] = Token.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseGenesisState_TokensEntry: object = { key: "" };

export const GenesisState_TokensEntry = {
  encode(
    message: GenesisState_TokensEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Token.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisState_TokensEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenesisState_TokensEntry,
    } as GenesisState_TokensEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Token.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState_TokensEntry {
    const message = {
      ...baseGenesisState_TokensEntry,
    } as GenesisState_TokensEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Token.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState_TokensEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Token.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenesisState_TokensEntry>
  ): GenesisState_TokensEntry {
    const message = {
      ...baseGenesisState_TokensEntry,
    } as GenesisState_TokensEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Token.fromPartial(object.value);
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
