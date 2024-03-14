/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.pnft.v2";

export interface EventSaveDenom {
  id: string;
  creator: string;
}

export interface EventUpdateDenom {
  id: string;
  updater: string;
}

export interface EventDeleteDenom {
  id: string;
  remover: string;
}

export interface EventTransferDenom {
  id: string;
  sender: string;
  receiver: string;
}

export interface EventMintPNFT {
  denomId: string;
  id: string;
  creator: string;
}

export interface EventTransferPNFT {
  denomId: string;
  id: string;
  sender: string;
  receiver: string;
}

export interface EventBurnPNFT {
  denomId: string;
  id: string;
  burner: string;
}

function createBaseEventSaveDenom(): EventSaveDenom {
  return { id: "", creator: "" };
}

export const EventSaveDenom = {
  encode(message: EventSaveDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventSaveDenom {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventSaveDenom();
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

  fromJSON(object: any): EventSaveDenom {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
    };
  },

  toJSON(message: EventSaveDenom): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventSaveDenom>, I>>(base?: I): EventSaveDenom {
    return EventSaveDenom.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventSaveDenom>, I>>(object: I): EventSaveDenom {
    const message = createBaseEventSaveDenom();
    message.id = object.id ?? "";
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseEventUpdateDenom(): EventUpdateDenom {
  return { id: "", updater: "" };
}

export const EventUpdateDenom = {
  encode(message: EventUpdateDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.updater !== "") {
      writer.uint32(18).string(message.updater);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventUpdateDenom {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventUpdateDenom();
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

  fromJSON(object: any): EventUpdateDenom {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      updater: isSet(object.updater) ? globalThis.String(object.updater) : "",
    };
  },

  toJSON(message: EventUpdateDenom): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.updater !== "") {
      obj.updater = message.updater;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventUpdateDenom>, I>>(base?: I): EventUpdateDenom {
    return EventUpdateDenom.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventUpdateDenom>, I>>(object: I): EventUpdateDenom {
    const message = createBaseEventUpdateDenom();
    message.id = object.id ?? "";
    message.updater = object.updater ?? "";
    return message;
  },
};

function createBaseEventDeleteDenom(): EventDeleteDenom {
  return { id: "", remover: "" };
}

export const EventDeleteDenom = {
  encode(message: EventDeleteDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.remover !== "") {
      writer.uint32(18).string(message.remover);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventDeleteDenom {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventDeleteDenom();
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

  fromJSON(object: any): EventDeleteDenom {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      remover: isSet(object.remover) ? globalThis.String(object.remover) : "",
    };
  },

  toJSON(message: EventDeleteDenom): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.remover !== "") {
      obj.remover = message.remover;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventDeleteDenom>, I>>(base?: I): EventDeleteDenom {
    return EventDeleteDenom.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventDeleteDenom>, I>>(object: I): EventDeleteDenom {
    const message = createBaseEventDeleteDenom();
    message.id = object.id ?? "";
    message.remover = object.remover ?? "";
    return message;
  },
};

function createBaseEventTransferDenom(): EventTransferDenom {
  return { id: "", sender: "", receiver: "" };
}

export const EventTransferDenom = {
  encode(message: EventTransferDenom, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): EventTransferDenom {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventTransferDenom();
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

  fromJSON(object: any): EventTransferDenom {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      receiver: isSet(object.receiver) ? globalThis.String(object.receiver) : "",
    };
  },

  toJSON(message: EventTransferDenom): unknown {
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

  create<I extends Exact<DeepPartial<EventTransferDenom>, I>>(base?: I): EventTransferDenom {
    return EventTransferDenom.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventTransferDenom>, I>>(object: I): EventTransferDenom {
    const message = createBaseEventTransferDenom();
    message.id = object.id ?? "";
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    return message;
  },
};

function createBaseEventMintPNFT(): EventMintPNFT {
  return { denomId: "", id: "", creator: "" };
}

export const EventMintPNFT = {
  encode(message: EventMintPNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.denomId !== "") {
      writer.uint32(10).string(message.denomId);
    }
    if (message.id !== "") {
      writer.uint32(18).string(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(26).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventMintPNFT {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventMintPNFT();
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

  fromJSON(object: any): EventMintPNFT {
    return {
      denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
    };
  },

  toJSON(message: EventMintPNFT): unknown {
    const obj: any = {};
    if (message.denomId !== "") {
      obj.denomId = message.denomId;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventMintPNFT>, I>>(base?: I): EventMintPNFT {
    return EventMintPNFT.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventMintPNFT>, I>>(object: I): EventMintPNFT {
    const message = createBaseEventMintPNFT();
    message.denomId = object.denomId ?? "";
    message.id = object.id ?? "";
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseEventTransferPNFT(): EventTransferPNFT {
  return { denomId: "", id: "", sender: "", receiver: "" };
}

export const EventTransferPNFT = {
  encode(message: EventTransferPNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): EventTransferPNFT {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventTransferPNFT();
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

  fromJSON(object: any): EventTransferPNFT {
    return {
      denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      sender: isSet(object.sender) ? globalThis.String(object.sender) : "",
      receiver: isSet(object.receiver) ? globalThis.String(object.receiver) : "",
    };
  },

  toJSON(message: EventTransferPNFT): unknown {
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

  create<I extends Exact<DeepPartial<EventTransferPNFT>, I>>(base?: I): EventTransferPNFT {
    return EventTransferPNFT.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventTransferPNFT>, I>>(object: I): EventTransferPNFT {
    const message = createBaseEventTransferPNFT();
    message.denomId = object.denomId ?? "";
    message.id = object.id ?? "";
    message.sender = object.sender ?? "";
    message.receiver = object.receiver ?? "";
    return message;
  },
};

function createBaseEventBurnPNFT(): EventBurnPNFT {
  return { denomId: "", id: "", burner: "" };
}

export const EventBurnPNFT = {
  encode(message: EventBurnPNFT, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): EventBurnPNFT {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventBurnPNFT();
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

  fromJSON(object: any): EventBurnPNFT {
    return {
      denomId: isSet(object.denomId) ? globalThis.String(object.denomId) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      burner: isSet(object.burner) ? globalThis.String(object.burner) : "",
    };
  },

  toJSON(message: EventBurnPNFT): unknown {
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

  create<I extends Exact<DeepPartial<EventBurnPNFT>, I>>(base?: I): EventBurnPNFT {
    return EventBurnPNFT.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventBurnPNFT>, I>>(object: I): EventBurnPNFT {
    const message = createBaseEventBurnPNFT();
    message.denomId = object.denomId ?? "";
    message.id = object.id ?? "";
    message.burner = object.burner ?? "";
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
