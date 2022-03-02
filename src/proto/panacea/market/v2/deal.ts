/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "panacea.market.v2";

/** Deal defines a deal. */
export interface Deal {
  dealId: Long;
  dealAddress: string;
  dataSchema: string[];
  budget: Coin | undefined;
  trustedDataValidators: string[];
  maxNumData: Long;
  curNumData: Long;
  owner: string;
  status: string;
}

const baseDeal: object = {
  dealId: Long.UZERO,
  dealAddress: "",
  dataSchema: "",
  trustedDataValidators: "",
  maxNumData: Long.UZERO,
  curNumData: Long.UZERO,
  owner: "",
  status: "",
};

export const Deal = {
  encode(message: Deal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.dealId.isZero()) {
      writer.uint32(8).uint64(message.dealId);
    }
    if (message.dealAddress !== "") {
      writer.uint32(18).string(message.dealAddress);
    }
    for (const v of message.dataSchema) {
      writer.uint32(26).string(v!);
    }
    if (message.budget !== undefined) {
      Coin.encode(message.budget, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.trustedDataValidators) {
      writer.uint32(42).string(v!);
    }
    if (!message.maxNumData.isZero()) {
      writer.uint32(48).uint64(message.maxNumData);
    }
    if (!message.curNumData.isZero()) {
      writer.uint32(56).uint64(message.curNumData);
    }
    if (message.owner !== "") {
      writer.uint32(66).string(message.owner);
    }
    if (message.status !== "") {
      writer.uint32(74).string(message.status);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Deal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDeal } as Deal;
    message.dataSchema = [];
    message.trustedDataValidators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dealId = reader.uint64() as Long;
          break;
        case 2:
          message.dealAddress = reader.string();
          break;
        case 3:
          message.dataSchema.push(reader.string());
          break;
        case 4:
          message.budget = Coin.decode(reader, reader.uint32());
          break;
        case 5:
          message.trustedDataValidators.push(reader.string());
          break;
        case 6:
          message.maxNumData = reader.uint64() as Long;
          break;
        case 7:
          message.curNumData = reader.uint64() as Long;
          break;
        case 8:
          message.owner = reader.string();
          break;
        case 9:
          message.status = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Deal {
    const message = { ...baseDeal } as Deal;
    message.dataSchema = [];
    message.trustedDataValidators = [];
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = Long.fromString(object.dealId);
    } else {
      message.dealId = Long.UZERO;
    }
    if (object.dealAddress !== undefined && object.dealAddress !== null) {
      message.dealAddress = String(object.dealAddress);
    } else {
      message.dealAddress = "";
    }
    if (object.dataSchema !== undefined && object.dataSchema !== null) {
      for (const e of object.dataSchema) {
        message.dataSchema.push(String(e));
      }
    }
    if (object.budget !== undefined && object.budget !== null) {
      message.budget = Coin.fromJSON(object.budget);
    } else {
      message.budget = undefined;
    }
    if (
      object.trustedDataValidators !== undefined &&
      object.trustedDataValidators !== null
    ) {
      for (const e of object.trustedDataValidators) {
        message.trustedDataValidators.push(String(e));
      }
    }
    if (object.maxNumData !== undefined && object.maxNumData !== null) {
      message.maxNumData = Long.fromString(object.maxNumData);
    } else {
      message.maxNumData = Long.UZERO;
    }
    if (object.curNumData !== undefined && object.curNumData !== null) {
      message.curNumData = Long.fromString(object.curNumData);
    } else {
      message.curNumData = Long.UZERO;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = String(object.status);
    } else {
      message.status = "";
    }
    return message;
  },

  toJSON(message: Deal): unknown {
    const obj: any = {};
    message.dealId !== undefined &&
      (obj.dealId = (message.dealId || Long.UZERO).toString());
    message.dealAddress !== undefined &&
      (obj.dealAddress = message.dealAddress);
    if (message.dataSchema) {
      obj.dataSchema = message.dataSchema.map((e) => e);
    } else {
      obj.dataSchema = [];
    }
    message.budget !== undefined &&
      (obj.budget = message.budget ? Coin.toJSON(message.budget) : undefined);
    if (message.trustedDataValidators) {
      obj.trustedDataValidators = message.trustedDataValidators.map((e) => e);
    } else {
      obj.trustedDataValidators = [];
    }
    message.maxNumData !== undefined &&
      (obj.maxNumData = (message.maxNumData || Long.UZERO).toString());
    message.curNumData !== undefined &&
      (obj.curNumData = (message.curNumData || Long.UZERO).toString());
    message.owner !== undefined && (obj.owner = message.owner);
    message.status !== undefined && (obj.status = message.status);
    return obj;
  },

  fromPartial(object: DeepPartial<Deal>): Deal {
    const message = { ...baseDeal } as Deal;
    message.dataSchema = [];
    message.trustedDataValidators = [];
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = object.dealId as Long;
    } else {
      message.dealId = Long.UZERO;
    }
    if (object.dealAddress !== undefined && object.dealAddress !== null) {
      message.dealAddress = object.dealAddress;
    } else {
      message.dealAddress = "";
    }
    if (object.dataSchema !== undefined && object.dataSchema !== null) {
      for (const e of object.dataSchema) {
        message.dataSchema.push(e);
      }
    }
    if (object.budget !== undefined && object.budget !== null) {
      message.budget = Coin.fromPartial(object.budget);
    } else {
      message.budget = undefined;
    }
    if (
      object.trustedDataValidators !== undefined &&
      object.trustedDataValidators !== null
    ) {
      for (const e of object.trustedDataValidators) {
        message.trustedDataValidators.push(e);
      }
    }
    if (object.maxNumData !== undefined && object.maxNumData !== null) {
      message.maxNumData = object.maxNumData as Long;
    } else {
      message.maxNumData = Long.UZERO;
    }
    if (object.curNumData !== undefined && object.curNumData !== null) {
      message.curNumData = object.curNumData as Long;
    } else {
      message.curNumData = Long.UZERO;
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    if (object.status !== undefined && object.status !== null) {
      message.status = object.status;
    } else {
      message.status = "";
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
