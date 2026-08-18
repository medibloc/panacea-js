/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Any } from "../../../google/protobuf/any";
import { TransferPolicy, transferPolicyFromJSON, transferPolicyToJSON } from "./nft";

export const protobufPackage = "panacea.nft.v1";

/** MsgCreateClassRequest creates an immutable class and its policy. */
export interface MsgCreateClassRequest {
  creator: string;
  localClassId: string;
  name: string;
  symbol: string;
  description: string;
  uri: string;
  uriHash: string;
  transferPolicy: TransferPolicy;
  revocable: boolean;
  maxSupply: Long;
}

/** MsgCreateClassResponse returns the chain-generated full class ID. */
export interface MsgCreateClassResponse {
  classId: string;
}

/** MsgUpdateControllerRequest transfers class operations to a new controller. */
export interface MsgUpdateControllerRequest {
  classId: string;
  controller: string;
  newController: string;
}

/** MsgUpdateControllerResponse is the response for UpdateController. */
export interface MsgUpdateControllerResponse {
}

/** MsgMintRequest mints one NFT to a recipient. */
export interface MsgMintRequest {
  classId: string;
  nftId: string;
  controller: string;
  recipient: string;
  uri: string;
  uriHash: string;
  data: Any | undefined;
}

/** MsgMintResponse is the response for Mint. */
export interface MsgMintResponse {
}

/** MsgRevokeRequest irreversibly revokes one live NFT. */
export interface MsgRevokeRequest {
  classId: string;
  nftId: string;
  controller: string;
}

/** MsgRevokeResponse is the response for Revoke. */
export interface MsgRevokeResponse {
}

/** MsgBurnRequest permanently burns an NFT owned by the signer. */
export interface MsgBurnRequest {
  classId: string;
  nftId: string;
  owner: string;
}

/** MsgBurnResponse is the response for Burn. */
export interface MsgBurnResponse {
}

function createBaseMsgCreateClassRequest(): MsgCreateClassRequest {
  return {
    creator: "",
    localClassId: "",
    name: "",
    symbol: "",
    description: "",
    uri: "",
    uriHash: "",
    transferPolicy: 0,
    revocable: false,
    maxSupply: Long.UZERO,
  };
}

export const MsgCreateClassRequest = {
  encode(message: MsgCreateClassRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.localClassId !== "") {
      writer.uint32(18).string(message.localClassId);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(34).string(message.symbol);
    }
    if (message.description !== "") {
      writer.uint32(42).string(message.description);
    }
    if (message.uri !== "") {
      writer.uint32(50).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(58).string(message.uriHash);
    }
    if (message.transferPolicy !== 0) {
      writer.uint32(64).int32(message.transferPolicy);
    }
    if (message.revocable !== false) {
      writer.uint32(72).bool(message.revocable);
    }
    if (!message.maxSupply.equals(Long.UZERO)) {
      writer.uint32(80).uint64(message.maxSupply);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateClassRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClassRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.localClassId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.name = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.description = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.uriHash = reader.string();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.transferPolicy = reader.int32() as any;
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.revocable = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.maxSupply = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateClassRequest {
    return {
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      localClassId: isSet(object.localClassId) ? globalThis.String(object.localClassId) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      symbol: isSet(object.symbol) ? globalThis.String(object.symbol) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      uri: isSet(object.uri) ? globalThis.String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? globalThis.String(object.uriHash) : "",
      transferPolicy: isSet(object.transferPolicy) ? transferPolicyFromJSON(object.transferPolicy) : 0,
      revocable: isSet(object.revocable) ? globalThis.Boolean(object.revocable) : false,
      maxSupply: isSet(object.maxSupply) ? Long.fromValue(object.maxSupply) : Long.UZERO,
    };
  },

  toJSON(message: MsgCreateClassRequest): unknown {
    const obj: any = {};
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.localClassId !== "") {
      obj.localClassId = message.localClassId;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.symbol !== "") {
      obj.symbol = message.symbol;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.uri !== "") {
      obj.uri = message.uri;
    }
    if (message.uriHash !== "") {
      obj.uriHash = message.uriHash;
    }
    if (message.transferPolicy !== 0) {
      obj.transferPolicy = transferPolicyToJSON(message.transferPolicy);
    }
    if (message.revocable !== false) {
      obj.revocable = message.revocable;
    }
    if (!message.maxSupply.equals(Long.UZERO)) {
      obj.maxSupply = (message.maxSupply || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateClassRequest>, I>>(base?: I): MsgCreateClassRequest {
    return MsgCreateClassRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateClassRequest>, I>>(object: I): MsgCreateClassRequest {
    const message = createBaseMsgCreateClassRequest();
    message.creator = object.creator ?? "";
    message.localClassId = object.localClassId ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.transferPolicy = object.transferPolicy ?? 0;
    message.revocable = object.revocable ?? false;
    message.maxSupply = (object.maxSupply !== undefined && object.maxSupply !== null)
      ? Long.fromValue(object.maxSupply)
      : Long.UZERO;
    return message;
  },
};

function createBaseMsgCreateClassResponse(): MsgCreateClassResponse {
  return { classId: "" };
}

export const MsgCreateClassResponse = {
  encode(message: MsgCreateClassResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateClassResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateClassResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateClassResponse {
    return { classId: isSet(object.classId) ? globalThis.String(object.classId) : "" };
  },

  toJSON(message: MsgCreateClassResponse): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateClassResponse>, I>>(base?: I): MsgCreateClassResponse {
    return MsgCreateClassResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateClassResponse>, I>>(object: I): MsgCreateClassResponse {
    const message = createBaseMsgCreateClassResponse();
    message.classId = object.classId ?? "";
    return message;
  },
};

function createBaseMsgUpdateControllerRequest(): MsgUpdateControllerRequest {
  return { classId: "", controller: "", newController: "" };
}

export const MsgUpdateControllerRequest = {
  encode(message: MsgUpdateControllerRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.controller !== "") {
      writer.uint32(18).string(message.controller);
    }
    if (message.newController !== "") {
      writer.uint32(26).string(message.newController);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateControllerRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateControllerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.controller = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.newController = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateControllerRequest {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      controller: isSet(object.controller) ? globalThis.String(object.controller) : "",
      newController: isSet(object.newController) ? globalThis.String(object.newController) : "",
    };
  },

  toJSON(message: MsgUpdateControllerRequest): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.controller !== "") {
      obj.controller = message.controller;
    }
    if (message.newController !== "") {
      obj.newController = message.newController;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateControllerRequest>, I>>(base?: I): MsgUpdateControllerRequest {
    return MsgUpdateControllerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateControllerRequest>, I>>(object: I): MsgUpdateControllerRequest {
    const message = createBaseMsgUpdateControllerRequest();
    message.classId = object.classId ?? "";
    message.controller = object.controller ?? "";
    message.newController = object.newController ?? "";
    return message;
  },
};

function createBaseMsgUpdateControllerResponse(): MsgUpdateControllerResponse {
  return {};
}

export const MsgUpdateControllerResponse = {
  encode(_: MsgUpdateControllerResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateControllerResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateControllerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateControllerResponse {
    return {};
  },

  toJSON(_: MsgUpdateControllerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateControllerResponse>, I>>(base?: I): MsgUpdateControllerResponse {
    return MsgUpdateControllerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateControllerResponse>, I>>(_: I): MsgUpdateControllerResponse {
    const message = createBaseMsgUpdateControllerResponse();
    return message;
  },
};

function createBaseMsgMintRequest(): MsgMintRequest {
  return { classId: "", nftId: "", controller: "", recipient: "", uri: "", uriHash: "", data: undefined };
}

export const MsgMintRequest = {
  encode(message: MsgMintRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.nftId !== "") {
      writer.uint32(18).string(message.nftId);
    }
    if (message.controller !== "") {
      writer.uint32(26).string(message.controller);
    }
    if (message.recipient !== "") {
      writer.uint32(34).string(message.recipient);
    }
    if (message.uri !== "") {
      writer.uint32(42).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(50).string(message.uriHash);
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nftId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.controller = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.recipient = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.uriHash = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.data = Any.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMintRequest {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      nftId: isSet(object.nftId) ? globalThis.String(object.nftId) : "",
      controller: isSet(object.controller) ? globalThis.String(object.controller) : "",
      recipient: isSet(object.recipient) ? globalThis.String(object.recipient) : "",
      uri: isSet(object.uri) ? globalThis.String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? globalThis.String(object.uriHash) : "",
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: MsgMintRequest): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.nftId !== "") {
      obj.nftId = message.nftId;
    }
    if (message.controller !== "") {
      obj.controller = message.controller;
    }
    if (message.recipient !== "") {
      obj.recipient = message.recipient;
    }
    if (message.uri !== "") {
      obj.uri = message.uri;
    }
    if (message.uriHash !== "") {
      obj.uriHash = message.uriHash;
    }
    if (message.data !== undefined) {
      obj.data = Any.toJSON(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMintRequest>, I>>(base?: I): MsgMintRequest {
    return MsgMintRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMintRequest>, I>>(object: I): MsgMintRequest {
    const message = createBaseMsgMintRequest();
    message.classId = object.classId ?? "";
    message.nftId = object.nftId ?? "";
    message.controller = object.controller ?? "";
    message.recipient = object.recipient ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = (object.data !== undefined && object.data !== null) ? Any.fromPartial(object.data) : undefined;
    return message;
  },
};

function createBaseMsgMintResponse(): MsgMintResponse {
  return {};
}

export const MsgMintResponse = {
  encode(_: MsgMintResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgMintResponse {
    return {};
  },

  toJSON(_: MsgMintResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMintResponse>, I>>(base?: I): MsgMintResponse {
    return MsgMintResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMintResponse>, I>>(_: I): MsgMintResponse {
    const message = createBaseMsgMintResponse();
    return message;
  },
};

function createBaseMsgRevokeRequest(): MsgRevokeRequest {
  return { classId: "", nftId: "", controller: "" };
}

export const MsgRevokeRequest = {
  encode(message: MsgRevokeRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.nftId !== "") {
      writer.uint32(18).string(message.nftId);
    }
    if (message.controller !== "") {
      writer.uint32(26).string(message.controller);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nftId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.controller = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgRevokeRequest {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      nftId: isSet(object.nftId) ? globalThis.String(object.nftId) : "",
      controller: isSet(object.controller) ? globalThis.String(object.controller) : "",
    };
  },

  toJSON(message: MsgRevokeRequest): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.nftId !== "") {
      obj.nftId = message.nftId;
    }
    if (message.controller !== "") {
      obj.controller = message.controller;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeRequest>, I>>(base?: I): MsgRevokeRequest {
    return MsgRevokeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeRequest>, I>>(object: I): MsgRevokeRequest {
    const message = createBaseMsgRevokeRequest();
    message.classId = object.classId ?? "";
    message.nftId = object.nftId ?? "";
    message.controller = object.controller ?? "";
    return message;
  },
};

function createBaseMsgRevokeResponse(): MsgRevokeResponse {
  return {};
}

export const MsgRevokeResponse = {
  encode(_: MsgRevokeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRevokeResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRevokeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgRevokeResponse {
    return {};
  },

  toJSON(_: MsgRevokeResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgRevokeResponse>, I>>(base?: I): MsgRevokeResponse {
    return MsgRevokeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgRevokeResponse>, I>>(_: I): MsgRevokeResponse {
    const message = createBaseMsgRevokeResponse();
    return message;
  },
};

function createBaseMsgBurnRequest(): MsgBurnRequest {
  return { classId: "", nftId: "", owner: "" };
}

export const MsgBurnRequest = {
  encode(message: MsgBurnRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.nftId !== "") {
      writer.uint32(18).string(message.nftId);
    }
    if (message.owner !== "") {
      writer.uint32(26).string(message.owner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.classId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.nftId = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.owner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBurnRequest {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      nftId: isSet(object.nftId) ? globalThis.String(object.nftId) : "",
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
    };
  },

  toJSON(message: MsgBurnRequest): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.nftId !== "") {
      obj.nftId = message.nftId;
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurnRequest>, I>>(base?: I): MsgBurnRequest {
    return MsgBurnRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnRequest>, I>>(object: I): MsgBurnRequest {
    const message = createBaseMsgBurnRequest();
    message.classId = object.classId ?? "";
    message.nftId = object.nftId ?? "";
    message.owner = object.owner ?? "";
    return message;
  },
};

function createBaseMsgBurnResponse(): MsgBurnResponse {
  return {};
}

export const MsgBurnResponse = {
  encode(_: MsgBurnResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): MsgBurnResponse {
    return {};
  },

  toJSON(_: MsgBurnResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurnResponse>, I>>(base?: I): MsgBurnResponse {
    return MsgBurnResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnResponse>, I>>(_: I): MsgBurnResponse {
    const message = createBaseMsgBurnResponse();
    return message;
  },
};

/** Msg defines the Panacea NFT transaction service. */
export interface Msg {
  CreateClass(request: MsgCreateClassRequest): Promise<MsgCreateClassResponse>;
  UpdateController(request: MsgUpdateControllerRequest): Promise<MsgUpdateControllerResponse>;
  Mint(request: MsgMintRequest): Promise<MsgMintResponse>;
  Revoke(request: MsgRevokeRequest): Promise<MsgRevokeResponse>;
  Burn(request: MsgBurnRequest): Promise<MsgBurnResponse>;
}

export const MsgServiceName = "panacea.nft.v1.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateClass = this.CreateClass.bind(this);
    this.UpdateController = this.UpdateController.bind(this);
    this.Mint = this.Mint.bind(this);
    this.Revoke = this.Revoke.bind(this);
    this.Burn = this.Burn.bind(this);
  }
  CreateClass(request: MsgCreateClassRequest): Promise<MsgCreateClassResponse> {
    const data = MsgCreateClassRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateClass", data);
    return promise.then((data) => MsgCreateClassResponse.decode(_m0.Reader.create(data)));
  }

  UpdateController(request: MsgUpdateControllerRequest): Promise<MsgUpdateControllerResponse> {
    const data = MsgUpdateControllerRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateController", data);
    return promise.then((data) => MsgUpdateControllerResponse.decode(_m0.Reader.create(data)));
  }

  Mint(request: MsgMintRequest): Promise<MsgMintResponse> {
    const data = MsgMintRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Mint", data);
    return promise.then((data) => MsgMintResponse.decode(_m0.Reader.create(data)));
  }

  Revoke(request: MsgRevokeRequest): Promise<MsgRevokeResponse> {
    const data = MsgRevokeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Revoke", data);
    return promise.then((data) => MsgRevokeResponse.decode(_m0.Reader.create(data)));
  }

  Burn(request: MsgBurnRequest): Promise<MsgBurnResponse> {
    const data = MsgBurnRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Burn", data);
    return promise.then((data) => MsgBurnResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
