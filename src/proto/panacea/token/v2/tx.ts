/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { IntProto } from "../../../cosmos/base/v1beta1/coin";

export const protobufPackage = "panacea.token.v2";

/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgIssueToken {
  name: string;
  shortSymbol: string;
  totalSupplyMicro: IntProto | undefined;
  mintable: boolean;
  ownerAddress: string;
}

export interface MsgIssueTokenResponse {}

const baseMsgIssueToken: object = {
  name: "",
  shortSymbol: "",
  mintable: false,
  ownerAddress: "",
};

export const MsgIssueToken = {
  encode(
    message: MsgIssueToken,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.shortSymbol !== "") {
      writer.uint32(18).string(message.shortSymbol);
    }
    if (message.totalSupplyMicro !== undefined) {
      IntProto.encode(
        message.totalSupplyMicro,
        writer.uint32(26).fork()
      ).ldelim();
    }
    if (message.mintable === true) {
      writer.uint32(32).bool(message.mintable);
    }
    if (message.ownerAddress !== "") {
      writer.uint32(42).string(message.ownerAddress);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgIssueToken {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgIssueToken } as MsgIssueToken;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.shortSymbol = reader.string();
          break;
        case 3:
          message.totalSupplyMicro = IntProto.decode(reader, reader.uint32());
          break;
        case 4:
          message.mintable = reader.bool();
          break;
        case 5:
          message.ownerAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgIssueToken {
    const message = { ...baseMsgIssueToken } as MsgIssueToken;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.shortSymbol !== undefined && object.shortSymbol !== null) {
      message.shortSymbol = String(object.shortSymbol);
    } else {
      message.shortSymbol = "";
    }
    if (
      object.totalSupplyMicro !== undefined &&
      object.totalSupplyMicro !== null
    ) {
      message.totalSupplyMicro = IntProto.fromJSON(object.totalSupplyMicro);
    } else {
      message.totalSupplyMicro = undefined;
    }
    if (object.mintable !== undefined && object.mintable !== null) {
      message.mintable = Boolean(object.mintable);
    } else {
      message.mintable = false;
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = String(object.ownerAddress);
    } else {
      message.ownerAddress = "";
    }
    return message;
  },

  toJSON(message: MsgIssueToken): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.shortSymbol !== undefined &&
      (obj.shortSymbol = message.shortSymbol);
    message.totalSupplyMicro !== undefined &&
      (obj.totalSupplyMicro = message.totalSupplyMicro
        ? IntProto.toJSON(message.totalSupplyMicro)
        : undefined);
    message.mintable !== undefined && (obj.mintable = message.mintable);
    message.ownerAddress !== undefined &&
      (obj.ownerAddress = message.ownerAddress);
    return obj;
  },

  fromPartial(object: DeepPartial<MsgIssueToken>): MsgIssueToken {
    const message = { ...baseMsgIssueToken } as MsgIssueToken;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.shortSymbol !== undefined && object.shortSymbol !== null) {
      message.shortSymbol = object.shortSymbol;
    } else {
      message.shortSymbol = "";
    }
    if (
      object.totalSupplyMicro !== undefined &&
      object.totalSupplyMicro !== null
    ) {
      message.totalSupplyMicro = IntProto.fromPartial(object.totalSupplyMicro);
    } else {
      message.totalSupplyMicro = undefined;
    }
    if (object.mintable !== undefined && object.mintable !== null) {
      message.mintable = object.mintable;
    } else {
      message.mintable = false;
    }
    if (object.ownerAddress !== undefined && object.ownerAddress !== null) {
      message.ownerAddress = object.ownerAddress;
    } else {
      message.ownerAddress = "";
    }
    return message;
  },
};

const baseMsgIssueTokenResponse: object = {};

export const MsgIssueTokenResponse = {
  encode(
    _: MsgIssueTokenResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): MsgIssueTokenResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMsgIssueTokenResponse } as MsgIssueTokenResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgIssueTokenResponse {
    const message = { ...baseMsgIssueTokenResponse } as MsgIssueTokenResponse;
    return message;
  },

  toJSON(_: MsgIssueTokenResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<MsgIssueTokenResponse>): MsgIssueTokenResponse {
    const message = { ...baseMsgIssueTokenResponse } as MsgIssueTokenResponse;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  IssueToken(request: MsgIssueToken): Promise<MsgIssueTokenResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.IssueToken = this.IssueToken.bind(this);
  }
  IssueToken(request: MsgIssueToken): Promise<MsgIssueTokenResponse> {
    const data = MsgIssueToken.encode(request).finish();
    const promise = this.rpc.request(
      "panacea.token.v2.Msg",
      "IssueToken",
      data
    );
    return promise.then((data) =>
      MsgIssueTokenResponse.decode(new _m0.Reader(data))
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
