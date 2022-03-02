/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Deal } from "../../../panacea/market/v2/deal";
import { DataValidationCertificate } from "../../../panacea/market/v2/tx";

export const protobufPackage = "panacea.market.v2";

/** GenesisState defines the market module's genesis state. */
export interface GenesisState {
  deals: { [key: string]: Deal };
  dataCertificates: { [key: string]: DataValidationCertificate };
  nextDealNumber: Long;
}

export interface GenesisState_DealsEntry {
  key: string;
  value: Deal | undefined;
}

export interface GenesisState_DataCertificatesEntry {
  key: string;
  value: DataValidationCertificate | undefined;
}

const baseGenesisState: object = { nextDealNumber: Long.UZERO };

export const GenesisState = {
  encode(
    message: GenesisState,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.deals).forEach(([key, value]) => {
      GenesisState_DealsEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    Object.entries(message.dataCertificates).forEach(([key, value]) => {
      GenesisState_DataCertificatesEntry.encode(
        { key: key as any, value },
        writer.uint32(18).fork()
      ).ldelim();
    });
    if (!message.nextDealNumber.isZero()) {
      writer.uint32(24).uint64(message.nextDealNumber);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGenesisState } as GenesisState;
    message.deals = {};
    message.dataCertificates = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = GenesisState_DealsEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.deals[entry1.key] = entry1.value;
          }
          break;
        case 2:
          const entry2 = GenesisState_DataCertificatesEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry2.value !== undefined) {
            message.dataCertificates[entry2.key] = entry2.value;
          }
          break;
        case 3:
          message.nextDealNumber = reader.uint64() as Long;
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
    message.deals = {};
    message.dataCertificates = {};
    if (object.deals !== undefined && object.deals !== null) {
      Object.entries(object.deals).forEach(([key, value]) => {
        message.deals[key] = Deal.fromJSON(value);
      });
    }
    if (
      object.dataCertificates !== undefined &&
      object.dataCertificates !== null
    ) {
      Object.entries(object.dataCertificates).forEach(([key, value]) => {
        message.dataCertificates[key] =
          DataValidationCertificate.fromJSON(value);
      });
    }
    if (object.nextDealNumber !== undefined && object.nextDealNumber !== null) {
      message.nextDealNumber = Long.fromString(object.nextDealNumber);
    } else {
      message.nextDealNumber = Long.UZERO;
    }
    return message;
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    obj.deals = {};
    if (message.deals) {
      Object.entries(message.deals).forEach(([k, v]) => {
        obj.deals[k] = Deal.toJSON(v);
      });
    }
    obj.dataCertificates = {};
    if (message.dataCertificates) {
      Object.entries(message.dataCertificates).forEach(([k, v]) => {
        obj.dataCertificates[k] = DataValidationCertificate.toJSON(v);
      });
    }
    message.nextDealNumber !== undefined &&
      (obj.nextDealNumber = (message.nextDealNumber || Long.UZERO).toString());
    return obj;
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState;
    message.deals = {};
    message.dataCertificates = {};
    if (object.deals !== undefined && object.deals !== null) {
      Object.entries(object.deals).forEach(([key, value]) => {
        if (value !== undefined) {
          message.deals[key] = Deal.fromPartial(value);
        }
      });
    }
    if (
      object.dataCertificates !== undefined &&
      object.dataCertificates !== null
    ) {
      Object.entries(object.dataCertificates).forEach(([key, value]) => {
        if (value !== undefined) {
          message.dataCertificates[key] =
            DataValidationCertificate.fromPartial(value);
        }
      });
    }
    if (object.nextDealNumber !== undefined && object.nextDealNumber !== null) {
      message.nextDealNumber = object.nextDealNumber as Long;
    } else {
      message.nextDealNumber = Long.UZERO;
    }
    return message;
  },
};

const baseGenesisState_DealsEntry: object = { key: "" };

export const GenesisState_DealsEntry = {
  encode(
    message: GenesisState_DealsEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Deal.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisState_DealsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenesisState_DealsEntry,
    } as GenesisState_DealsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Deal.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState_DealsEntry {
    const message = {
      ...baseGenesisState_DealsEntry,
    } as GenesisState_DealsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Deal.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState_DealsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Deal.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenesisState_DealsEntry>
  ): GenesisState_DealsEntry {
    const message = {
      ...baseGenesisState_DealsEntry,
    } as GenesisState_DealsEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Deal.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
};

const baseGenesisState_DataCertificatesEntry: object = { key: "" };

export const GenesisState_DataCertificatesEntry = {
  encode(
    message: GenesisState_DataCertificatesEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      DataValidationCertificate.encode(
        message.value,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GenesisState_DataCertificatesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseGenesisState_DataCertificatesEntry,
    } as GenesisState_DataCertificatesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = DataValidationCertificate.decode(
            reader,
            reader.uint32()
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenesisState_DataCertificatesEntry {
    const message = {
      ...baseGenesisState_DataCertificatesEntry,
    } as GenesisState_DataCertificatesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = DataValidationCertificate.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },

  toJSON(message: GenesisState_DataCertificatesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value
        ? DataValidationCertificate.toJSON(message.value)
        : undefined);
    return obj;
  },

  fromPartial(
    object: DeepPartial<GenesisState_DataCertificatesEntry>
  ): GenesisState_DataCertificatesEntry {
    const message = {
      ...baseGenesisState_DataCertificatesEntry,
    } as GenesisState_DataCertificatesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = DataValidationCertificate.fromPartial(object.value);
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
