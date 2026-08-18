/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "panacea.nft.v1";

/** EventClassCreated is emitted when a class is created. */
export interface EventClassCreated {
  classId: string;
  creator: string;
}

/** EventControllerUpdated is emitted when class control changes. */
export interface EventControllerUpdated {
  classId: string;
  oldController: string;
  newController: string;
}

/** EventNFTRevoked is emitted when an NFT is irreversibly revoked. */
export interface EventNFTRevoked {
  classId: string;
  nftId: string;
  controller: string;
}

function createBaseEventClassCreated(): EventClassCreated {
  return { classId: "", creator: "" };
}

export const EventClassCreated = {
  encode(message: EventClassCreated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventClassCreated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventClassCreated();
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

  fromJSON(object: any): EventClassCreated {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
    };
  },

  toJSON(message: EventClassCreated): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventClassCreated>, I>>(base?: I): EventClassCreated {
    return EventClassCreated.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventClassCreated>, I>>(object: I): EventClassCreated {
    const message = createBaseEventClassCreated();
    message.classId = object.classId ?? "";
    message.creator = object.creator ?? "";
    return message;
  },
};

function createBaseEventControllerUpdated(): EventControllerUpdated {
  return { classId: "", oldController: "", newController: "" };
}

export const EventControllerUpdated = {
  encode(message: EventControllerUpdated, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.oldController !== "") {
      writer.uint32(18).string(message.oldController);
    }
    if (message.newController !== "") {
      writer.uint32(26).string(message.newController);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EventControllerUpdated {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventControllerUpdated();
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

          message.oldController = reader.string();
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

  fromJSON(object: any): EventControllerUpdated {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      oldController: isSet(object.oldController) ? globalThis.String(object.oldController) : "",
      newController: isSet(object.newController) ? globalThis.String(object.newController) : "",
    };
  },

  toJSON(message: EventControllerUpdated): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.oldController !== "") {
      obj.oldController = message.oldController;
    }
    if (message.newController !== "") {
      obj.newController = message.newController;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EventControllerUpdated>, I>>(base?: I): EventControllerUpdated {
    return EventControllerUpdated.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventControllerUpdated>, I>>(object: I): EventControllerUpdated {
    const message = createBaseEventControllerUpdated();
    message.classId = object.classId ?? "";
    message.oldController = object.oldController ?? "";
    message.newController = object.newController ?? "";
    return message;
  },
};

function createBaseEventNFTRevoked(): EventNFTRevoked {
  return { classId: "", nftId: "", controller: "" };
}

export const EventNFTRevoked = {
  encode(message: EventNFTRevoked, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): EventNFTRevoked {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEventNFTRevoked();
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

  fromJSON(object: any): EventNFTRevoked {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      nftId: isSet(object.nftId) ? globalThis.String(object.nftId) : "",
      controller: isSet(object.controller) ? globalThis.String(object.controller) : "",
    };
  },

  toJSON(message: EventNFTRevoked): unknown {
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

  create<I extends Exact<DeepPartial<EventNFTRevoked>, I>>(base?: I): EventNFTRevoked {
    return EventNFTRevoked.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EventNFTRevoked>, I>>(object: I): EventNFTRevoked {
    const message = createBaseEventNFTRevoked();
    message.classId = object.classId ?? "";
    message.nftId = object.nftId ?? "";
    message.controller = object.controller ?? "";
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
