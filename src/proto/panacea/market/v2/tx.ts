/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "panacea.market.v2";

/** MsgCreateDeal defines the Msg/CreateDeal request type. */
export interface MsgCreateDeal {
  dataSchema: string[];
  budget: Coin | undefined;
  maxNumData: Long;
  trustedDataValidators: string[];
  owner: string;
}

/** MsgCreateDealResponse defines the Msg/CreateDeal response type. */
export interface MsgCreateDealResponse {
  dealId: Long;
}

/** MsgSellData defines the Msg/SellData request type. */
export interface MsgSellData {
  cert: DataValidationCertificate | undefined;
  seller: string;
}

/** MsgSellDataResponse defines the Msg/SellData response type. */
export interface MsgSellDataResponse {
  reward: Coin | undefined;
}

/** DataValidationCertificate defines data validation certificate. */
export interface DataValidationCertificate {
  unsignedCert: UnsignedDataValidationCertificate | undefined;
  signature: Uint8Array;
}

/** UnsignedDataValidationCertificate defines unsigned data validation certificate. */
export interface UnsignedDataValidationCertificate {
  dealId: Long;
  dataHash: Uint8Array;
  encryptedDataUrl: Uint8Array;
  dataValidatorAddress: string;
  requesterAddress: string;
}

/** MsgDeactivateDeal defines the Msg/DeactivateDeal request type. */
export interface MsgDeactivateDeal {
  dealId: Long;
  deactivateRequester: string;
}

/** MsgDeactivateDealResponse defines the Msg/DeactivateDeal response type. */
export interface MsgDeactivateDealResponse {
  dealId: Long;
}

const baseMsgCreateDeal: object = {
  dataSchema: "",
  maxNumData: Long.UZERO,
  trustedDataValidators: "",
  owner: "",
};

export const MsgCreateDeal = {
  encode(
    message: MsgCreateDeal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.dataSchema) {
      writer.uint32(10).string(v!);
    }
    if (message.budget !== undefined) {
      Coin.encode(message.budget, writer.uint32(18).fork()).ldelim();
    }
    if (!message.maxNumData.isZero()) {
      writer.uint32(24).uint64(message.maxNumData);
    }
    for (const v of message.trustedDataValidators) {
      writer.uint32(34).string(v!);
    }
    if (message.owner !== "") {
      writer.uint32(42).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDeal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateDeal } as MsgCreateDeal;
    message.dataSchema = [];
    message.trustedDataValidators = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dataSchema.push(reader.string());
          break;
        case 2:
          message.budget = Coin.decode(reader, reader.uint32());
          break;
        case 3:
          message.maxNumData = reader.uint64() as Long;
          break;
        case 4:
          message.trustedDataValidators.push(reader.string());
          break;
        case 5:
          message.owner = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDeal {
    const message = { ...baseMsgCreateDeal } as MsgCreateDeal;
    message.dataSchema = [];
    message.trustedDataValidators = [];
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
    if (object.maxNumData !== undefined && object.maxNumData !== null) {
      message.maxNumData = Long.fromString(object.maxNumData);
    } else {
      message.maxNumData = Long.UZERO;
    }
    if (
      object.trustedDataValidators !== undefined &&
      object.trustedDataValidators !== null
    ) {
      for (const e of object.trustedDataValidators) {
        message.trustedDataValidators.push(String(e));
      }
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner);
    } else {
      message.owner = "";
    }
    return message;
  },

  toJSON(message: MsgCreateDeal): unknown {
    const obj: any = {};
    if (message.dataSchema) {
      obj.dataSchema = message.dataSchema.map((e) => e);
    } else {
      obj.dataSchema = [];
    }
    message.budget !== undefined &&
      (obj.budget = message.budget ? Coin.toJSON(message.budget) : undefined);
    message.maxNumData !== undefined &&
      (obj.maxNumData = (message.maxNumData || Long.UZERO).toString());
    if (message.trustedDataValidators) {
      obj.trustedDataValidators = message.trustedDataValidators.map((e) => e);
    } else {
      obj.trustedDataValidators = [];
    }
    message.owner !== undefined && (obj.owner = message.owner);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgCreateDeal>): MsgCreateDeal {
    const message = { ...baseMsgCreateDeal } as MsgCreateDeal;
    message.dataSchema = [];
    message.trustedDataValidators = [];
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
    if (object.maxNumData !== undefined && object.maxNumData !== null) {
      message.maxNumData = object.maxNumData as Long;
    } else {
      message.maxNumData = Long.UZERO;
    }
    if (
      object.trustedDataValidators !== undefined &&
      object.trustedDataValidators !== null
    ) {
      for (const e of object.trustedDataValidators) {
        message.trustedDataValidators.push(e);
      }
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner;
    } else {
      message.owner = "";
    }
    return message;
  },
};

const baseMsgCreateDealResponse: object = { dealId: Long.UZERO };

export const MsgCreateDealResponse = {
  encode(
    message: MsgCreateDealResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.dealId.isZero()) {
      writer.uint32(8).uint64(message.dealId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgCreateDealResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgCreateDealResponse } as MsgCreateDealResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dealId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDealResponse {
    const message = { ...baseMsgCreateDealResponse } as MsgCreateDealResponse;
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = Long.fromString(object.dealId);
    } else {
      message.dealId = Long.UZERO;
    }
    return message;
  },

  toJSON(message: MsgCreateDealResponse): unknown {
    const obj: any = {};
    message.dealId !== undefined &&
      (obj.dealId = (message.dealId || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgCreateDealResponse>
  ): MsgCreateDealResponse {
    const message = { ...baseMsgCreateDealResponse } as MsgCreateDealResponse;
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = object.dealId as Long;
    } else {
      message.dealId = Long.UZERO;
    }
    return message;
  },
};

const baseMsgSellData: object = { seller: "" };

export const MsgSellData = {
  encode(
    message: MsgSellData,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.cert !== undefined) {
      DataValidationCertificate.encode(
        message.cert,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.seller !== "") {
      writer.uint32(18).string(message.seller);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSellData {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSellData } as MsgSellData;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cert = DataValidationCertificate.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.seller = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSellData {
    const message = { ...baseMsgSellData } as MsgSellData;
    if (object.cert !== undefined && object.cert !== null) {
      message.cert = DataValidationCertificate.fromJSON(object.cert);
    } else {
      message.cert = undefined;
    }
    if (object.seller !== undefined && object.seller !== null) {
      message.seller = String(object.seller);
    } else {
      message.seller = "";
    }
    return message;
  },

  toJSON(message: MsgSellData): unknown {
    const obj: any = {};
    message.cert !== undefined &&
      (obj.cert = message.cert
        ? DataValidationCertificate.toJSON(message.cert)
        : undefined);
    message.seller !== undefined && (obj.seller = message.seller);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSellData>): MsgSellData {
    const message = { ...baseMsgSellData } as MsgSellData;
    if (object.cert !== undefined && object.cert !== null) {
      message.cert = DataValidationCertificate.fromPartial(object.cert);
    } else {
      message.cert = undefined;
    }
    if (object.seller !== undefined && object.seller !== null) {
      message.seller = object.seller;
    } else {
      message.seller = "";
    }
    return message;
  },
};

const baseMsgSellDataResponse: object = {};

export const MsgSellDataResponse = {
  encode(
    message: MsgSellDataResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.reward !== undefined) {
      Coin.encode(message.reward, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSellDataResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgSellDataResponse } as MsgSellDataResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reward = Coin.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgSellDataResponse {
    const message = { ...baseMsgSellDataResponse } as MsgSellDataResponse;
    if (object.reward !== undefined && object.reward !== null) {
      message.reward = Coin.fromJSON(object.reward);
    } else {
      message.reward = undefined;
    }
    return message;
  },

  toJSON(message: MsgSellDataResponse): unknown {
    const obj: any = {};
    message.reward !== undefined &&
      (obj.reward = message.reward ? Coin.toJSON(message.reward) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgSellDataResponse>): MsgSellDataResponse {
    const message = { ...baseMsgSellDataResponse } as MsgSellDataResponse;
    if (object.reward !== undefined && object.reward !== null) {
      message.reward = Coin.fromPartial(object.reward);
    } else {
      message.reward = undefined;
    }
    return message;
  },
};

const baseDataValidationCertificate: object = {};

export const DataValidationCertificate = {
  encode(
    message: DataValidationCertificate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.unsignedCert !== undefined) {
      UnsignedDataValidationCertificate.encode(
        message.unsignedCert,
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.signature.length !== 0) {
      writer.uint32(18).bytes(message.signature);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): DataValidationCertificate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseDataValidationCertificate,
    } as DataValidationCertificate;
    message.signature = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.unsignedCert = UnsignedDataValidationCertificate.decode(
            reader,
            reader.uint32()
          );
          break;
        case 2:
          message.signature = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DataValidationCertificate {
    const message = {
      ...baseDataValidationCertificate,
    } as DataValidationCertificate;
    message.signature = new Uint8Array();
    if (object.unsignedCert !== undefined && object.unsignedCert !== null) {
      message.unsignedCert = UnsignedDataValidationCertificate.fromJSON(
        object.unsignedCert
      );
    } else {
      message.unsignedCert = undefined;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = bytesFromBase64(object.signature);
    }
    return message;
  },

  toJSON(message: DataValidationCertificate): unknown {
    const obj: any = {};
    message.unsignedCert !== undefined &&
      (obj.unsignedCert = message.unsignedCert
        ? UnsignedDataValidationCertificate.toJSON(message.unsignedCert)
        : undefined);
    message.signature !== undefined &&
      (obj.signature = base64FromBytes(
        message.signature !== undefined ? message.signature : new Uint8Array()
      ));
    return obj;
  },

  fromPartial(
    object: DeepPartial<DataValidationCertificate>
  ): DataValidationCertificate {
    const message = {
      ...baseDataValidationCertificate,
    } as DataValidationCertificate;
    if (object.unsignedCert !== undefined && object.unsignedCert !== null) {
      message.unsignedCert = UnsignedDataValidationCertificate.fromPartial(
        object.unsignedCert
      );
    } else {
      message.unsignedCert = undefined;
    }
    if (object.signature !== undefined && object.signature !== null) {
      message.signature = object.signature;
    } else {
      message.signature = new Uint8Array();
    }
    return message;
  },
};

const baseUnsignedDataValidationCertificate: object = {
  dealId: Long.UZERO,
  dataValidatorAddress: "",
  requesterAddress: "",
};

export const UnsignedDataValidationCertificate = {
  encode(
    message: UnsignedDataValidationCertificate,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.dealId.isZero()) {
      writer.uint32(8).uint64(message.dealId);
    }
    if (message.dataHash.length !== 0) {
      writer.uint32(18).bytes(message.dataHash);
    }
    if (message.encryptedDataUrl.length !== 0) {
      writer.uint32(26).bytes(message.encryptedDataUrl);
    }
    if (message.dataValidatorAddress !== "") {
      writer.uint32(34).string(message.dataValidatorAddress);
    }
    if (message.requesterAddress !== "") {
      writer.uint32(42).string(message.requesterAddress);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): UnsignedDataValidationCertificate {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseUnsignedDataValidationCertificate,
    } as UnsignedDataValidationCertificate;
    message.dataHash = new Uint8Array();
    message.encryptedDataUrl = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dealId = reader.uint64() as Long;
          break;
        case 2:
          message.dataHash = reader.bytes();
          break;
        case 3:
          message.encryptedDataUrl = reader.bytes();
          break;
        case 4:
          message.dataValidatorAddress = reader.string();
          break;
        case 5:
          message.requesterAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UnsignedDataValidationCertificate {
    const message = {
      ...baseUnsignedDataValidationCertificate,
    } as UnsignedDataValidationCertificate;
    message.dataHash = new Uint8Array();
    message.encryptedDataUrl = new Uint8Array();
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = Long.fromString(object.dealId);
    } else {
      message.dealId = Long.UZERO;
    }
    if (object.dataHash !== undefined && object.dataHash !== null) {
      message.dataHash = bytesFromBase64(object.dataHash);
    }
    if (
      object.encryptedDataUrl !== undefined &&
      object.encryptedDataUrl !== null
    ) {
      message.encryptedDataUrl = bytesFromBase64(object.encryptedDataUrl);
    }
    if (
      object.dataValidatorAddress !== undefined &&
      object.dataValidatorAddress !== null
    ) {
      message.dataValidatorAddress = String(object.dataValidatorAddress);
    } else {
      message.dataValidatorAddress = "";
    }
    if (
      object.requesterAddress !== undefined &&
      object.requesterAddress !== null
    ) {
      message.requesterAddress = String(object.requesterAddress);
    } else {
      message.requesterAddress = "";
    }
    return message;
  },

  toJSON(message: UnsignedDataValidationCertificate): unknown {
    const obj: any = {};
    message.dealId !== undefined &&
      (obj.dealId = (message.dealId || Long.UZERO).toString());
    message.dataHash !== undefined &&
      (obj.dataHash = base64FromBytes(
        message.dataHash !== undefined ? message.dataHash : new Uint8Array()
      ));
    message.encryptedDataUrl !== undefined &&
      (obj.encryptedDataUrl = base64FromBytes(
        message.encryptedDataUrl !== undefined
          ? message.encryptedDataUrl
          : new Uint8Array()
      ));
    message.dataValidatorAddress !== undefined &&
      (obj.dataValidatorAddress = message.dataValidatorAddress);
    message.requesterAddress !== undefined &&
      (obj.requesterAddress = message.requesterAddress);
    return obj;
  },

  fromPartial(
    object: DeepPartial<UnsignedDataValidationCertificate>
  ): UnsignedDataValidationCertificate {
    const message = {
      ...baseUnsignedDataValidationCertificate,
    } as UnsignedDataValidationCertificate;
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = object.dealId as Long;
    } else {
      message.dealId = Long.UZERO;
    }
    if (object.dataHash !== undefined && object.dataHash !== null) {
      message.dataHash = object.dataHash;
    } else {
      message.dataHash = new Uint8Array();
    }
    if (
      object.encryptedDataUrl !== undefined &&
      object.encryptedDataUrl !== null
    ) {
      message.encryptedDataUrl = object.encryptedDataUrl;
    } else {
      message.encryptedDataUrl = new Uint8Array();
    }
    if (
      object.dataValidatorAddress !== undefined &&
      object.dataValidatorAddress !== null
    ) {
      message.dataValidatorAddress = object.dataValidatorAddress;
    } else {
      message.dataValidatorAddress = "";
    }
    if (
      object.requesterAddress !== undefined &&
      object.requesterAddress !== null
    ) {
      message.requesterAddress = object.requesterAddress;
    } else {
      message.requesterAddress = "";
    }
    return message;
  },
};

const baseMsgDeactivateDeal: object = {
  dealId: Long.UZERO,
  deactivateRequester: "",
};

export const MsgDeactivateDeal = {
  encode(
    message: MsgDeactivateDeal,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.dealId.isZero()) {
      writer.uint32(8).uint64(message.dealId);
    }
    if (message.deactivateRequester !== "") {
      writer.uint32(18).string(message.deactivateRequester);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeactivateDeal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgDeactivateDeal } as MsgDeactivateDeal;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dealId = reader.uint64() as Long;
          break;
        case 2:
          message.deactivateRequester = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeactivateDeal {
    const message = { ...baseMsgDeactivateDeal } as MsgDeactivateDeal;
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = Long.fromString(object.dealId);
    } else {
      message.dealId = Long.UZERO;
    }
    if (
      object.deactivateRequester !== undefined &&
      object.deactivateRequester !== null
    ) {
      message.deactivateRequester = String(object.deactivateRequester);
    } else {
      message.deactivateRequester = "";
    }
    return message;
  },

  toJSON(message: MsgDeactivateDeal): unknown {
    const obj: any = {};
    message.dealId !== undefined &&
      (obj.dealId = (message.dealId || Long.UZERO).toString());
    message.deactivateRequester !== undefined &&
      (obj.deactivateRequester = message.deactivateRequester);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgDeactivateDeal>): MsgDeactivateDeal {
    const message = { ...baseMsgDeactivateDeal } as MsgDeactivateDeal;
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = object.dealId as Long;
    } else {
      message.dealId = Long.UZERO;
    }
    if (
      object.deactivateRequester !== undefined &&
      object.deactivateRequester !== null
    ) {
      message.deactivateRequester = object.deactivateRequester;
    } else {
      message.deactivateRequester = "";
    }
    return message;
  },
};

const baseMsgDeactivateDealResponse: object = { dealId: Long.UZERO };

export const MsgDeactivateDealResponse = {
  encode(
    message: MsgDeactivateDealResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (!message.dealId.isZero()) {
      writer.uint32(8).uint64(message.dealId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgDeactivateDealResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = {
      ...baseMsgDeactivateDealResponse,
    } as MsgDeactivateDealResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dealId = reader.uint64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgDeactivateDealResponse {
    const message = {
      ...baseMsgDeactivateDealResponse,
    } as MsgDeactivateDealResponse;
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = Long.fromString(object.dealId);
    } else {
      message.dealId = Long.UZERO;
    }
    return message;
  },

  toJSON(message: MsgDeactivateDealResponse): unknown {
    const obj: any = {};
    message.dealId !== undefined &&
      (obj.dealId = (message.dealId || Long.UZERO).toString());
    return obj;
  },

  fromPartial(
    object: DeepPartial<MsgDeactivateDealResponse>
  ): MsgDeactivateDealResponse {
    const message = {
      ...baseMsgDeactivateDealResponse,
    } as MsgDeactivateDealResponse;
    if (object.dealId !== undefined && object.dealId !== null) {
      message.dealId = object.dealId as Long;
    } else {
      message.dealId = Long.UZERO;
    }
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** CreateDeal defines a method for creating a deal. */
  CreateDeal(request: MsgCreateDeal): Promise<MsgCreateDealResponse>;
  /** SellData defines a method for selling a data. */
  SellData(request: MsgSellData): Promise<MsgSellDataResponse>;
  /** DeactivateDeal defines a method for deactivating a deal. */
  DeactivateDeal(
    request: MsgDeactivateDeal
  ): Promise<MsgDeactivateDealResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateDeal = this.CreateDeal.bind(this);
    this.SellData = this.SellData.bind(this);
    this.DeactivateDeal = this.DeactivateDeal.bind(this);
  }
  CreateDeal(request: MsgCreateDeal): Promise<MsgCreateDealResponse> {
    const data = MsgCreateDeal.encode(request).finish();
    const promise = this.rpc.request(
      "panacea.market.v2.Msg",
      "CreateDeal",
      data
    );
    return promise.then((data) =>
      MsgCreateDealResponse.decode(new _m0.Reader(data))
    );
  }

  SellData(request: MsgSellData): Promise<MsgSellDataResponse> {
    const data = MsgSellData.encode(request).finish();
    const promise = this.rpc.request("panacea.market.v2.Msg", "SellData", data);
    return promise.then((data) =>
      MsgSellDataResponse.decode(new _m0.Reader(data))
    );
  }

  DeactivateDeal(
    request: MsgDeactivateDeal
  ): Promise<MsgDeactivateDealResponse> {
    const data = MsgDeactivateDeal.encode(request).finish();
    const promise = this.rpc.request(
      "panacea.market.v2.Msg",
      "DeactivateDeal",
      data
    );
    return promise.then((data) =>
      MsgDeactivateDealResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

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
