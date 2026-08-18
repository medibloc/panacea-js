/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { GenesisState as GenesisState1 } from "../../../cosmos/nft/v1beta1/genesis";
import { BurnTombstone, ClassPolicy, LifecycleRecord } from "./nft";

export const protobufPackage = "panacea.nft.v1";

/** GenesisState combines standard NFT state with Panacea policy state. */
export interface GenesisState {
  nftState: GenesisState1 | undefined;
  classPolicies: ClassPolicy[];
  lifecycles: LifecycleRecord[];
  tombstones: BurnTombstone[];
}

function createBaseGenesisState(): GenesisState {
  return { nftState: undefined, classPolicies: [], lifecycles: [], tombstones: [] };
}

export const GenesisState = {
  encode(message: GenesisState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nftState !== undefined) {
      GenesisState1.encode(message.nftState, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.classPolicies) {
      ClassPolicy.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.lifecycles) {
      LifecycleRecord.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.tombstones) {
      BurnTombstone.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenesisState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nftState = GenesisState1.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.classPolicies.push(ClassPolicy.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.lifecycles.push(LifecycleRecord.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.tombstones.push(BurnTombstone.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GenesisState {
    return {
      nftState: isSet(object.nftState) ? GenesisState1.fromJSON(object.nftState) : undefined,
      classPolicies: globalThis.Array.isArray(object?.classPolicies)
        ? object.classPolicies.map((e: any) => ClassPolicy.fromJSON(e))
        : [],
      lifecycles: globalThis.Array.isArray(object?.lifecycles)
        ? object.lifecycles.map((e: any) => LifecycleRecord.fromJSON(e))
        : [],
      tombstones: globalThis.Array.isArray(object?.tombstones)
        ? object.tombstones.map((e: any) => BurnTombstone.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {};
    if (message.nftState !== undefined) {
      obj.nftState = GenesisState1.toJSON(message.nftState);
    }
    if (message.classPolicies?.length) {
      obj.classPolicies = message.classPolicies.map((e) => ClassPolicy.toJSON(e));
    }
    if (message.lifecycles?.length) {
      obj.lifecycles = message.lifecycles.map((e) => LifecycleRecord.toJSON(e));
    }
    if (message.tombstones?.length) {
      obj.tombstones = message.tombstones.map((e) => BurnTombstone.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GenesisState>, I>>(base?: I): GenesisState {
    return GenesisState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GenesisState>, I>>(object: I): GenesisState {
    const message = createBaseGenesisState();
    message.nftState = (object.nftState !== undefined && object.nftState !== null)
      ? GenesisState1.fromPartial(object.nftState)
      : undefined;
    message.classPolicies = object.classPolicies?.map((e) => ClassPolicy.fromPartial(e)) || [];
    message.lifecycles = object.lifecycles?.map((e) => LifecycleRecord.fromPartial(e)) || [];
    message.tombstones = object.tombstones?.map((e) => BurnTombstone.fromPartial(e)) || [];
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
