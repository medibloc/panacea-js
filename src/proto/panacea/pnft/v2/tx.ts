/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.pnft.v2";

export interface MsgCreateDenomRequest {
  id: string;
  name: string;
  symbol: string;
  description: string;
  uri: string;
  uriHash: string;
  data: string;
  creator: string;
}

export interface MsgCreateDenomResponse {
}

export interface MsgUpdateDenomRequest {
  id: string;
  name: string;
  symbol: string;
  description: string;
  uri: string;
  uriHash: string;
  data: string;
  updater: string;
}

export interface MsgUpdateDenomResponse {
}

export interface MsgDeleteDenomRequest {
  id: string;
  remover: string;
}

export interface MsgDeleteDenomResponse {
}

export interface MsgTransferDenomRequest {
  id: string;
  sender: string;
  receiver: string;
}

export interface MsgTransferDenomResponse {
}

export interface MsgMintPNFTRequest {
  denomId: string;
  id: string;
  name: string;
  description: string;
  uri: string;
  uriHash: string;
  data: string;
  creator: string;
}

export interface MsgMintPNFTResponse {
}

export interface MsgTransferPNFTRequest {
  denomId: string;
  id: string;
  sender: string;
  receiver: string;
}

export interface MsgTransferPNFTResponse {
}

export interface MsgBurnPNFTRequest {
  denomId: string;
  id: string;
  burner: string;
}

export interface MsgBurnPNFTResponse {
}

function createBaseMsgCreateDenomRequest(): MsgCreateDenomRequest {
  return { id: "", name: "", symbol: "", description: "", uri: "", uriHash: "", data: "", creator: "" };
}

export const MsgCreateDenomRequest = {
  encode(message: MsgCreateDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.uri !== "") {
      writer.uint32(42).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(50).string(message.uriHash);
    }
    if (message.data !== "") {
      writer.uint32(58).string(message.data);
    }
    if (message.creator !== "") {
      writer.uint32(66).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
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

          message.data = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.creator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgCreateDenomRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      symbol: isSet(object.symbol) ? globalThis.String(object.symbol) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      uri: isSet(object.uri) ? globalThis.String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? globalThis.String(object.uriHash) : "",
      data: isSet(object.data) ? globalThis.String(object.data) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
    };
  },

  toJSON(message: MsgCreateDenomRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
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
    if (message.data !== "") {
      obj.data = message.data;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateDenomRequest>, I>>(base?: I): MsgCreateDenomRequest {
    return MsgCreateDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateDenomRequest>, I>>(object: I): MsgCreateDenomRequest {
    const message = createBaseMsgCreateDenomRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = object.data ?? "";
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseMsgCreateDenomResponse(): MsgCreateDenomResponse {
  return {};
}

export const MsgCreateDenomResponse = {
  encode(_: MsgCreateDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateDenomResponse();
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

  fromJSON(_: any): MsgCreateDenomResponse {
    return {};
  },

  toJSON(_: MsgCreateDenomResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgCreateDenomResponse>, I>>(base?: I): MsgCreateDenomResponse {
    return MsgCreateDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgCreateDenomResponse>, I>>(_: I): MsgCreateDenomResponse {
    const message = createBaseMsgCreateDenomResponse();
    return message;
  },
};

function createBaseMsgUpdateDenomRequest(): MsgUpdateDenomRequest {
  return { id: "", name: "", symbol: "", description: "", uri: "", uriHash: "", data: "", updater: "" };
}

export const MsgUpdateDenomRequest = {
  encode(message: MsgUpdateDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.symbol !== "") {
      writer.uint32(26).string(message.symbol);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.uri !== "") {
      writer.uint32(42).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(50).string(message.uriHash);
    }
    if (message.data !== "") {
      writer.uint32(58).string(message.data);
    }
    if (message.updater !== "") {
      writer.uint32(66).string(message.updater);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.symbol = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.description = reader.string();
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

          message.data = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.updater = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateDenomRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      symbol: isSet(object.symbol) ? globalThis.String(object.symbol) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      uri: isSet(object.uri) ? globalThis.String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? globalThis.String(object.uriHash) : "",
      data: isSet(object.data) ? globalThis.String(object.data) : "",
      updater: isSet(object.updater) ? globalThis.String(object.updater) : "",
    };
  },

  toJSON(message: MsgUpdateDenomRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
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
    if (message.data !== "") {
      obj.data = message.data;
    }
    if (message.updater !== "") {
      obj.updater = message.updater;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDenomRequest>, I>>(base?: I): MsgUpdateDenomRequest {
    return MsgUpdateDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDenomRequest>, I>>(object: I): MsgUpdateDenomRequest {
    const message = createBaseMsgUpdateDenomRequest();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.symbol = object.symbol ?? "";
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = object.data ?? "";
    message.updater = object.updater ?? "";
    return message;
  },
};

function createBaseMsgUpdateDenomResponse(): MsgUpdateDenomResponse {
  return {};
}

export const MsgUpdateDenomResponse = {
  encode(_: MsgUpdateDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateDenomResponse();
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

  fromJSON(_: any): MsgUpdateDenomResponse {
    return {};
  },

  toJSON(_: MsgUpdateDenomResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgUpdateDenomResponse>, I>>(base?: I): MsgUpdateDenomResponse {
    return MsgUpdateDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgUpdateDenomResponse>, I>>(_: I): MsgUpdateDenomResponse {
    const message = createBaseMsgUpdateDenomResponse();
    return message;
  },
};

function createBaseMsgDeleteDenomRequest(): MsgDeleteDenomRequest {
  return { id: "", remover: "" };
}

export const MsgDeleteDenomRequest = {
  encode(message: MsgDeleteDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.remover !== "") {
      writer.uint32(18).string(message.remover);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.remover = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgDeleteDenomRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      remover: isSet(object.remover) ? globalThis.String(object.remover) : "",
    };
  },

  toJSON(message: MsgDeleteDenomRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.remover !== "") {
      obj.remover = message.remover;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteDenomRequest>, I>>(base?: I): MsgDeleteDenomRequest {
    return MsgDeleteDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteDenomRequest>, I>>(object: I): MsgDeleteDenomRequest {
    const message = createBaseMsgDeleteDenomRequest();
    message.id = object.id ?? "";
    message.remover = object.remover ?? "";
    return message;
  },
};

function createBaseMsgDeleteDenomResponse(): MsgDeleteDenomResponse {
  return {};
}

export const MsgDeleteDenomResponse = {
  encode(_: MsgDeleteDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgDeleteDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgDeleteDenomResponse();
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

  fromJSON(_: any): MsgDeleteDenomResponse {
    return {};
  },

  toJSON(_: MsgDeleteDenomResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgDeleteDenomResponse>, I>>(base?: I): MsgDeleteDenomResponse {
    return MsgDeleteDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgDeleteDenomResponse>, I>>(_: I): MsgDeleteDenomResponse {
    const message = createBaseMsgDeleteDenomResponse();
    return message;
  },
};

function createBaseMsgTransferDenomRequest(): MsgTransferDenomRequest {
  return { id: "", sender: "", receiver: "" };
}

export const MsgTransferDenomRequest = {
  encode(message: MsgTransferDenomRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(18).string(message.sender);
    }
    if (message.receiver !== "") {
      writer.uint32(26).string(message.receiver);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferDenomRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferDenomRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.receiver = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTransferDenomRequest {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      receiver: isSet(object.receiver) ? globalThis.String(object.receiver) : "",
    };
  },

  toJSON(message: MsgTransferDenomRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.receiver !== "") {
      obj.receiver = message.receiver;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferDenomRequest>, I>>(base?: I): MsgTransferDenomRequest {
    return MsgTransferDenomRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferDenomRequest>, I>>(object: I): MsgTransferDenomRequest {
    const message = createBaseMsgTransferDenomRequest();
    message.id = object.id ?? "";
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    return message;
  },
};

function createBaseMsgTransferDenomResponse(): MsgTransferDenomResponse {
  return {};
}

export const MsgTransferDenomResponse = {
  encode(_: MsgTransferDenomResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferDenomResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferDenomResponse();
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

  fromJSON(_: any): MsgTransferDenomResponse {
    return {};
  },

  toJSON(_: MsgTransferDenomResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferDenomResponse>, I>>(base?: I): MsgTransferDenomResponse {
    return MsgTransferDenomResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferDenomResponse>, I>>(_: I): MsgTransferDenomResponse {
    const message = createBaseMsgTransferDenomResponse();
    return message;
  },
};

function createBaseMsgMintPNFTRequest(): MsgMintPNFTRequest {
  return { denomId: "", id: "", name: "", description: "", uri: "", uriHash: "", data: "", creator: "" };
}

export const MsgMintPNFTRequest = {
  encode(message: MsgMintPNFTRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(26).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(34).string(message.description);
    }
    if (message.uri !== "") {
      writer.uint32(42).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(50).string(message.uriHash);
    }
    if (message.data !== "") {
      writer.uint32(58).string(message.data);
    }
    if (message.creator !== "") {
      writer.uint32(66).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintPNFTRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintPNFTRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
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

          message.description = reader.string();
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

          message.data = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.creator = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgMintPNFTRequest {
    return {
      denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      uri: isSet(object.uri) ? globalThis.String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? globalThis.String(object.uriHash) : "",
      data: isSet(object.data) ? globalThis.String(object.data) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
    };
  },

  toJSON(message: MsgMintPNFTRequest): unknown {
    const obj: any = {};
    if (message.denomId !== "") {
      obj.denomId = message.denomId;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
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
    if (message.data !== "") {
      obj.data = message.data;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMintPNFTRequest>, I>>(base?: I): MsgMintPNFTRequest {
    return MsgMintPNFTRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMintPNFTRequest>, I>>(object: I): MsgMintPNFTRequest {
    const message = createBaseMsgMintPNFTRequest();
    message.denomId = object.denomId ?? "";
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = object.data ?? "";
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseMsgMintPNFTResponse(): MsgMintPNFTResponse {
  return {};
}

export const MsgMintPNFTResponse = {
  encode(_: MsgMintPNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintPNFTResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintPNFTResponse();
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

  fromJSON(_: any): MsgMintPNFTResponse {
    return {};
  },

  toJSON(_: MsgMintPNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgMintPNFTResponse>, I>>(base?: I): MsgMintPNFTResponse {
    return MsgMintPNFTResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgMintPNFTResponse>, I>>(_: I): MsgMintPNFTResponse {
    const message = createBaseMsgMintPNFTResponse();
    return message;
  },
};

function createBaseMsgTransferPNFTRequest(): MsgTransferPNFTRequest {
  return { denomId: "", id: "", sender: "", receiver: "" };
}

export const MsgTransferPNFTRequest = {
  encode(message: MsgTransferPNFTRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.sender !== "") {
      writer.uint32(26).string(message.sender);
    }
    if (message.receiver !== "") {
      writer.uint32(34).string(message.receiver);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferPNFTRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferPNFTRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.sender = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.receiver = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgTransferPNFTRequest {
    return {
      denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      receiver: isSet(object.receiver) ? globalThis.String(object.receiver) : "",
    };
  },

  toJSON(message: MsgTransferPNFTRequest): unknown {
    const obj: any = {};
    if (message.denomId !== "") {
      obj.denomId = message.denomId;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.sender !== "") {
      obj.sender = message.sender;
    }
    if (message.receiver !== "") {
      obj.receiver = message.receiver;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferPNFTRequest>, I>>(base?: I): MsgTransferPNFTRequest {
    return MsgTransferPNFTRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferPNFTRequest>, I>>(object: I): MsgTransferPNFTRequest {
    const message = createBaseMsgTransferPNFTRequest();
    message.denomId = object.denomId ?? "";
    message.id = object.id ?? "";
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    return message;
  },
};

function createBaseMsgTransferPNFTResponse(): MsgTransferPNFTResponse {
  return {};
}

export const MsgTransferPNFTResponse = {
  encode(_: MsgTransferPNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferPNFTResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferPNFTResponse();
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

  fromJSON(_: any): MsgTransferPNFTResponse {
    return {};
  },

  toJSON(_: MsgTransferPNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTransferPNFTResponse>, I>>(base?: I): MsgTransferPNFTResponse {
    return MsgTransferPNFTResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgTransferPNFTResponse>, I>>(_: I): MsgTransferPNFTResponse {
    const message = createBaseMsgTransferPNFTResponse();
    return message;
  },
};

function createBaseMsgBurnPNFTRequest(): MsgBurnPNFTRequest {
  return { denomId: "", id: "", burner: "" };
}

export const MsgBurnPNFTRequest = {
  encode(message: MsgBurnPNFTRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.burner !== "") {
      writer.uint32(26).string(message.burner);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnPNFTRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnPNFTRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.denomId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.id = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.burner = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MsgBurnPNFTRequest {
    return {
      denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      burner: isSet(object.burner) ? globalThis.String(object.burner) : "",
    };
  },

  toJSON(message: MsgBurnPNFTRequest): unknown {
    const obj: any = {};
    if (message.denomId !== "") {
      obj.denomId = message.denomId;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.burner !== "") {
      obj.burner = message.burner;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurnPNFTRequest>, I>>(base?: I): MsgBurnPNFTRequest {
    return MsgBurnPNFTRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnPNFTRequest>, I>>(object: I): MsgBurnPNFTRequest {
    const message = createBaseMsgBurnPNFTRequest();
    message.denomId = object.denomId ?? "";
    message.id = object.id ?? "";
    message.burner = object.burner ?? "";
    return message;
  },
};

function createBaseMsgBurnPNFTResponse(): MsgBurnPNFTResponse {
  return {};
}

export const MsgBurnPNFTResponse = {
  encode(_: MsgBurnPNFTResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBurnPNFTResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBurnPNFTResponse();
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

  fromJSON(_: any): MsgBurnPNFTResponse {
    return {};
  },

  toJSON(_: MsgBurnPNFTResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgBurnPNFTResponse>, I>>(base?: I): MsgBurnPNFTResponse {
    return MsgBurnPNFTResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MsgBurnPNFTResponse>, I>>(_: I): MsgBurnPNFTResponse {
    const message = createBaseMsgBurnPNFTResponse();
    return message;
  },
};

export interface Msg {
  CreateDenom(request: MsgCreateDenomRequest): Promise<MsgCreateDenomResponse>;
  UpdateDenom(request: MsgUpdateDenomRequest): Promise<MsgUpdateDenomResponse>;
  DeleteDenom(request: MsgDeleteDenomRequest): Promise<MsgDeleteDenomResponse>;
  TransferDenom(request: MsgTransferDenomRequest): Promise<MsgTransferDenomResponse>;
  MintPNFT(request: MsgMintPNFTRequest): Promise<MsgMintPNFTResponse>;
  TransferPNFT(request: MsgTransferPNFTRequest): Promise<MsgTransferPNFTResponse>;
  BurnPNFT(request: MsgBurnPNFTRequest): Promise<MsgBurnPNFTResponse>;
}

export const MsgServiceName = "panacea.pnft.v2.Msg";
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceName;
    this.rpc = rpc;
    this.CreateDenom = this.CreateDenom.bind(this);
    this.UpdateDenom = this.UpdateDenom.bind(this);
    this.DeleteDenom = this.DeleteDenom.bind(this);
    this.TransferDenom = this.TransferDenom.bind(this);
    this.MintPNFT = this.MintPNFT.bind(this);
    this.TransferPNFT = this.TransferPNFT.bind(this);
    this.BurnPNFT = this.BurnPNFT.bind(this);
  }
  CreateDenom(request: MsgCreateDenomRequest): Promise<MsgCreateDenomResponse> {
    const data = MsgCreateDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateDenom", data);
    return promise.then((data) => MsgCreateDenomResponse.decode(_m0.Reader.create(data)));
  }

  UpdateDenom(request: MsgUpdateDenomRequest): Promise<MsgUpdateDenomResponse> {
    const data = MsgUpdateDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateDenom", data);
    return promise.then((data) => MsgUpdateDenomResponse.decode(_m0.Reader.create(data)));
  }

  DeleteDenom(request: MsgDeleteDenomRequest): Promise<MsgDeleteDenomResponse> {
    const data = MsgDeleteDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "DeleteDenom", data);
    return promise.then((data) => MsgDeleteDenomResponse.decode(_m0.Reader.create(data)));
  }

  TransferDenom(request: MsgTransferDenomRequest): Promise<MsgTransferDenomResponse> {
    const data = MsgTransferDenomRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TransferDenom", data);
    return promise.then((data) => MsgTransferDenomResponse.decode(_m0.Reader.create(data)));
  }

  MintPNFT(request: MsgMintPNFTRequest): Promise<MsgMintPNFTResponse> {
    const data = MsgMintPNFTRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "MintPNFT", data);
    return promise.then((data) => MsgMintPNFTResponse.decode(_m0.Reader.create(data)));
  }

  TransferPNFT(request: MsgTransferPNFTRequest): Promise<MsgTransferPNFTResponse> {
    const data = MsgTransferPNFTRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TransferPNFT", data);
    return promise.then((data) => MsgTransferPNFTResponse.decode(_m0.Reader.create(data)));
  }

  BurnPNFT(request: MsgBurnPNFTRequest): Promise<MsgBurnPNFTResponse> {
    const data = MsgBurnPNFTRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "BurnPNFT", data);
    return promise.then((data) => MsgBurnPNFTResponse.decode(_m0.Reader.create(data)));
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
