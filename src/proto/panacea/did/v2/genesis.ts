/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { DIDDocumentWithSeq } from "../../../panacea/did/v2/did";

export const protobufPackage = "panacea.did.v2";

/** GenesisState defines the did module's genesis state. */
export interface GenesisState {
  documents: { [key: string]: DIDDocumentWithSeq };
}

export interface GenesisState_DocumentsEntry {
  key: string;
  value: DIDDocumentWithSeq | undefined;
}

const baseGenesisState: object = {};

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.documents).forEach(([key, value]) => {
      GenesisState_DocumentsEntry.encode(
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
    message.documents = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GenesisState_DocumentsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.documents[entry1.key] = entry1.value;
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
    message.documents = {};
    if (object.documents !== undefined && object.documents !== null) {
      Object.entries(object.documents).forEach(([key, value]) => {
        message.documents[key] = DIDDocumentWithSeq.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    obj.documents = {};
    if (message.documents) {
      Object.entries(message.documents).forEach(([k, v]) => {
        obj.documents[k] = DIDDocumentWithSeq.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.documents = {};
    if (object.documents !== undefined && object.documents !== null) {
      Object.entries(object.documents).forEach(([key, value]) => {
        if (value !== undefined) {
          message.documents[key] = DIDDocumentWithSeq.fromPartial(value);
        }
      });
    }
    return message;
  },
};

const baseGenesisState_DocumentsEntry: object = { key: "" };

export const GenesisState_DocumentsEntry = {
  encode(
    message: GenesisState_DocumentsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      DIDDocumentWithSeq.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisState_DocumentsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenesisState_DocumentsEntry,
    } as GenesisState_DocumentsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = DIDDocumentWithSeq.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState_DocumentsEntry {
    const message = {
      ...baseGenesisState_DocumentsEntry,
    } as GenesisState_DocumentsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = DIDDocumentWithSeq.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState_DocumentsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? DIDDocumentWithSeq.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenesisState_DocumentsEntry>
  ): GenesisState_DocumentsEntry {
    const message = {
      ...baseGenesisState_DocumentsEntry,
    } as GenesisState_DocumentsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = DIDDocumentWithSeq.fromPartial(object.value);
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
