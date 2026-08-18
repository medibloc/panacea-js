/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Class, NFT } from "../../../cosmos/nft/v1beta1/nft";
import { Any } from "../../../google/protobuf/any";
import { Timestamp } from "../../../google/protobuf/timestamp";

export const protobufPackage = "panacea.nft.v1";

/** TransferPolicy defines whether an NFT owner may transfer an NFT. */
export enum TransferPolicy {
  TRANSFER_POLICY_UNSPECIFIED = 0,
  TRANSFER_POLICY_LOCKED = 1,
  TRANSFER_POLICY_OWNER_TRANSFERABLE = 2,
  UNRECOGNIZED = -1,
}

export function transferPolicyFromJSON(object: any): TransferPolicy {
  switch (object) {
    case 0:
    case "TRANSFER_POLICY_UNSPECIFIED":
      return TransferPolicy.TRANSFER_POLICY_UNSPECIFIED;
    case 1:
    case "TRANSFER_POLICY_LOCKED":
      return TransferPolicy.TRANSFER_POLICY_LOCKED;
    case 2:
    case "TRANSFER_POLICY_OWNER_TRANSFERABLE":
      return TransferPolicy.TRANSFER_POLICY_OWNER_TRANSFERABLE;
    case -1:
    case "UNRECOGNIZED":
    default:
      return TransferPolicy.UNRECOGNIZED;
  }
}

export function transferPolicyToJSON(object: TransferPolicy): string {
  switch (object) {
    case TransferPolicy.TRANSFER_POLICY_UNSPECIFIED:
      return "TRANSFER_POLICY_UNSPECIFIED";
    case TransferPolicy.TRANSFER_POLICY_LOCKED:
      return "TRANSFER_POLICY_LOCKED";
    case TransferPolicy.TRANSFER_POLICY_OWNER_TRANSFERABLE:
      return "TRANSFER_POLICY_OWNER_TRANSFERABLE";
    case TransferPolicy.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/**
 * LiveNFTStatus is derived from revocation: ACTIVE when revocation is absent
 * and REVOKED when revocation is present. UNSPECIFIED is never returned.
 */
export enum LiveNFTStatus {
  LIVE_NFT_STATUS_UNSPECIFIED = 0,
  LIVE_NFT_STATUS_ACTIVE = 1,
  LIVE_NFT_STATUS_REVOKED = 2,
  UNRECOGNIZED = -1,
}

export function liveNFTStatusFromJSON(object: any): LiveNFTStatus {
  switch (object) {
    case 0:
    case "LIVE_NFT_STATUS_UNSPECIFIED":
      return LiveNFTStatus.LIVE_NFT_STATUS_UNSPECIFIED;
    case 1:
    case "LIVE_NFT_STATUS_ACTIVE":
      return LiveNFTStatus.LIVE_NFT_STATUS_ACTIVE;
    case 2:
    case "LIVE_NFT_STATUS_REVOKED":
      return LiveNFTStatus.LIVE_NFT_STATUS_REVOKED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LiveNFTStatus.UNRECOGNIZED;
  }
}

export function liveNFTStatusToJSON(object: LiveNFTStatus): string {
  switch (object) {
    case LiveNFTStatus.LIVE_NFT_STATUS_UNSPECIFIED:
      return "LIVE_NFT_STATUS_UNSPECIFIED";
    case LiveNFTStatus.LIVE_NFT_STATUS_ACTIVE:
      return "LIVE_NFT_STATUS_ACTIVE";
    case LiveNFTStatus.LIVE_NFT_STATUS_REVOKED:
      return "LIVE_NFT_STATUS_REVOKED";
    case LiveNFTStatus.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** BasicNFTData is the only NFT Data type accepted in v1. */
export interface BasicNFTData {
  name: string;
  description: string;
  imageUri: string;
}

/** ClassPolicy stores Panacea policy state for one standard NFT class. */
export interface ClassPolicy {
  classId: string;
  creator: string;
  controller: string;
  transferPolicy: TransferPolicy;
  revocable: boolean;
  maxSupply: Long;
}

/** MintRecord stores immutable mint provenance. */
export interface MintRecord {
  mintedAt: Date | undefined;
  mintedBy: string;
}

/** Revocation stores an irreversible revocation. */
export interface Revocation {
  revokedAt: Date | undefined;
  revokedBy: string;
}

/** LifecycleRecord stores provenance and optional revocation for a live NFT. */
export interface LifecycleRecord {
  classId: string;
  nftId: string;
  mint: MintRecord | undefined;
  revocation: Revocation | undefined;
}

/** BurnTombstone permanently preserves a burned NFT's metadata and lifecycle. */
export interface BurnTombstone {
  classId: string;
  nftId: string;
  mint: MintRecord | undefined;
  uri: string;
  uriHash: string;
  data: Any | undefined;
  revocation: Revocation | undefined;
  burnedAt: Date | undefined;
  burnedBy: string;
}

/** ClassRecord combines a standard NFT class with its Panacea policy state. */
export interface ClassRecord {
  class: Class | undefined;
  policy: ClassPolicy | undefined;
  mintedCount: Long;
}

/** LiveNFTRecord combines a standard NFT with owner and lifecycle state. */
export interface LiveNFTRecord {
  nft: NFT | undefined;
  owner: string;
  status: LiveNFTStatus;
  mint: MintRecord | undefined;
  revocation: Revocation | undefined;
}

/** NFTRecord returns either a live NFT or its burn tombstone. */
export interface NFTRecord {
  live?: LiveNFTRecord | undefined;
  burnTombstone?: BurnTombstone | undefined;
}

function createBaseBasicNFTData(): BasicNFTData {
  return { name: "", description: "", imageUri: "" };
}

export const BasicNFTData = {
  encode(message: BasicNFTData, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.imageUri !== "") {
      writer.uint32(26).string(message.imageUri);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BasicNFTData {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBasicNFTData();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.imageUri = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BasicNFTData {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      imageUri: isSet(object.imageUri) ? globalThis.String(object.imageUri) : "",
    };
  },

  toJSON(message: BasicNFTData): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.imageUri !== "") {
      obj.imageUri = message.imageUri;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BasicNFTData>, I>>(base?: I): BasicNFTData {
    return BasicNFTData.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BasicNFTData>, I>>(object: I): BasicNFTData {
    const message = createBaseBasicNFTData();
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.imageUri = object.imageUri ?? "";
    return message;
  },
};

function createBaseClassPolicy(): ClassPolicy {
  return { classId: "", creator: "", controller: "", transferPolicy: 0, revocable: false, maxSupply: Long.UZERO };
}

export const ClassPolicy = {
  encode(message: ClassPolicy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.controller !== "") {
      writer.uint32(26).string(message.controller);
    }
    if (message.transferPolicy !== 0) {
      writer.uint32(32).int32(message.transferPolicy);
    }
    if (message.revocable !== false) {
      writer.uint32(40).bool(message.revocable);
    }
    if (!message.maxSupply.equals(Long.UZERO)) {
      writer.uint32(48).uint64(message.maxSupply);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassPolicy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassPolicy();
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
        case 3:
          if (tag !== 26) {
            break;
          }

          message.controller = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.transferPolicy = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.revocable = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
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

  fromJSON(object: any): ClassPolicy {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      creator: isSet(object.creator) ? globalThis.String(object.creator) : "",
      controller: isSet(object.controller) ? globalThis.String(object.controller) : "",
      transferPolicy: isSet(object.transferPolicy) ? transferPolicyFromJSON(object.transferPolicy) : 0,
      revocable: isSet(object.revocable) ? globalThis.Boolean(object.revocable) : false,
      maxSupply: isSet(object.maxSupply) ? Long.fromValue(object.maxSupply) : Long.UZERO,
    };
  },

  toJSON(message: ClassPolicy): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.creator !== "") {
      obj.creator = message.creator;
    }
    if (message.controller !== "") {
      obj.controller = message.controller;
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

  create<I extends Exact<DeepPartial<ClassPolicy>, I>>(base?: I): ClassPolicy {
    return ClassPolicy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClassPolicy>, I>>(object: I): ClassPolicy {
    const message = createBaseClassPolicy();
    message.classId = object.classId ?? "";
    message.creator = object.creator ?? "";
    message.controller = object.controller ?? "";
    message.transferPolicy = object.transferPolicy ?? 0;
    message.revocable = object.revocable ?? false;
    message.maxSupply = (object.maxSupply !== undefined && object.maxSupply !== null)
      ? Long.fromValue(object.maxSupply)
      : Long.UZERO;
    return message;
  },
};

function createBaseMintRecord(): MintRecord {
  return { mintedAt: undefined, mintedBy: "" };
}

export const MintRecord = {
  encode(message: MintRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mintedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.mintedAt), writer.uint32(10).fork()).ldelim();
    }
    if (message.mintedBy !== "") {
      writer.uint32(18).string(message.mintedBy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MintRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMintRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.mintedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.mintedBy = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MintRecord {
    return {
      mintedAt: isSet(object.mintedAt) ? fromJsonTimestamp(object.mintedAt) : undefined,
      mintedBy: isSet(object.mintedBy) ? globalThis.String(object.mintedBy) : "",
    };
  },

  toJSON(message: MintRecord): unknown {
    const obj: any = {};
    if (message.mintedAt !== undefined) {
      obj.mintedAt = message.mintedAt.toISOString();
    }
    if (message.mintedBy !== "") {
      obj.mintedBy = message.mintedBy;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MintRecord>, I>>(base?: I): MintRecord {
    return MintRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MintRecord>, I>>(object: I): MintRecord {
    const message = createBaseMintRecord();
    message.mintedAt = object.mintedAt ?? undefined;
    message.mintedBy = object.mintedBy ?? "";
    return message;
  },
};

function createBaseRevocation(): Revocation {
  return { revokedAt: undefined, revokedBy: "" };
}

export const Revocation = {
  encode(message: Revocation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.revokedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.revokedAt), writer.uint32(10).fork()).ldelim();
    }
    if (message.revokedBy !== "") {
      writer.uint32(18).string(message.revokedBy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Revocation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRevocation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.revokedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.revokedBy = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Revocation {
    return {
      revokedAt: isSet(object.revokedAt) ? fromJsonTimestamp(object.revokedAt) : undefined,
      revokedBy: isSet(object.revokedBy) ? globalThis.String(object.revokedBy) : "",
    };
  },

  toJSON(message: Revocation): unknown {
    const obj: any = {};
    if (message.revokedAt !== undefined) {
      obj.revokedAt = message.revokedAt.toISOString();
    }
    if (message.revokedBy !== "") {
      obj.revokedBy = message.revokedBy;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Revocation>, I>>(base?: I): Revocation {
    return Revocation.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Revocation>, I>>(object: I): Revocation {
    const message = createBaseRevocation();
    message.revokedAt = object.revokedAt ?? undefined;
    message.revokedBy = object.revokedBy ?? "";
    return message;
  },
};

function createBaseLifecycleRecord(): LifecycleRecord {
  return { classId: "", nftId: "", mint: undefined, revocation: undefined };
}

export const LifecycleRecord = {
  encode(message: LifecycleRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.nftId !== "") {
      writer.uint32(18).string(message.nftId);
    }
    if (message.mint !== undefined) {
      MintRecord.encode(message.mint, writer.uint32(26).fork()).ldelim();
    }
    if (message.revocation !== undefined) {
      Revocation.encode(message.revocation, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LifecycleRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLifecycleRecord();
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

          message.mint = MintRecord.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.revocation = Revocation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LifecycleRecord {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      nftId: isSet(object.nftId) ? globalThis.String(object.nftId) : "",
      mint: isSet(object.mint) ? MintRecord.fromJSON(object.mint) : undefined,
      revocation: isSet(object.revocation) ? Revocation.fromJSON(object.revocation) : undefined,
    };
  },

  toJSON(message: LifecycleRecord): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.nftId !== "") {
      obj.nftId = message.nftId;
    }
    if (message.mint !== undefined) {
      obj.mint = MintRecord.toJSON(message.mint);
    }
    if (message.revocation !== undefined) {
      obj.revocation = Revocation.toJSON(message.revocation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LifecycleRecord>, I>>(base?: I): LifecycleRecord {
    return LifecycleRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LifecycleRecord>, I>>(object: I): LifecycleRecord {
    const message = createBaseLifecycleRecord();
    message.classId = object.classId ?? "";
    message.nftId = object.nftId ?? "";
    message.mint = (object.mint !== undefined && object.mint !== null)
      ? MintRecord.fromPartial(object.mint)
      : undefined;
    message.revocation = (object.revocation !== undefined && object.revocation !== null)
      ? Revocation.fromPartial(object.revocation)
      : undefined;
    return message;
  },
};

function createBaseBurnTombstone(): BurnTombstone {
  return {
    classId: "",
    nftId: "",
    mint: undefined,
    uri: "",
    uriHash: "",
    data: undefined,
    revocation: undefined,
    burnedAt: undefined,
    burnedBy: "",
  };
}

export const BurnTombstone = {
  encode(message: BurnTombstone, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.classId !== "") {
      writer.uint32(10).string(message.classId);
    }
    if (message.nftId !== "") {
      writer.uint32(18).string(message.nftId);
    }
    if (message.mint !== undefined) {
      MintRecord.encode(message.mint, writer.uint32(26).fork()).ldelim();
    }
    if (message.uri !== "") {
      writer.uint32(34).string(message.uri);
    }
    if (message.uriHash !== "") {
      writer.uint32(42).string(message.uriHash);
    }
    if (message.data !== undefined) {
      Any.encode(message.data, writer.uint32(50).fork()).ldelim();
    }
    if (message.revocation !== undefined) {
      Revocation.encode(message.revocation, writer.uint32(58).fork()).ldelim();
    }
    if (message.burnedAt !== undefined) {
      Timestamp.encode(toTimestamp(message.burnedAt), writer.uint32(66).fork()).ldelim();
    }
    if (message.burnedBy !== "") {
      writer.uint32(74).string(message.burnedBy);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BurnTombstone {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBurnTombstone();
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

          message.mint = MintRecord.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.uri = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.uriHash = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.data = Any.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.revocation = Revocation.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.burnedAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.burnedBy = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BurnTombstone {
    return {
      classId: isSet(object.classId) ? globalThis.String(object.classId) : "",
      nftId: isSet(object.nftId) ? globalThis.String(object.nftId) : "",
      mint: isSet(object.mint) ? MintRecord.fromJSON(object.mint) : undefined,
      uri: isSet(object.uri) ? globalThis.String(object.uri) : "",
      uriHash: isSet(object.uriHash) ? globalThis.String(object.uriHash) : "",
      data: isSet(object.data) ? Any.fromJSON(object.data) : undefined,
      revocation: isSet(object.revocation) ? Revocation.fromJSON(object.revocation) : undefined,
      burnedAt: isSet(object.burnedAt) ? fromJsonTimestamp(object.burnedAt) : undefined,
      burnedBy: isSet(object.burnedBy) ? globalThis.String(object.burnedBy) : "",
    };
  },

  toJSON(message: BurnTombstone): unknown {
    const obj: any = {};
    if (message.classId !== "") {
      obj.classId = message.classId;
    }
    if (message.nftId !== "") {
      obj.nftId = message.nftId;
    }
    if (message.mint !== undefined) {
      obj.mint = MintRecord.toJSON(message.mint);
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
    if (message.revocation !== undefined) {
      obj.revocation = Revocation.toJSON(message.revocation);
    }
    if (message.burnedAt !== undefined) {
      obj.burnedAt = message.burnedAt.toISOString();
    }
    if (message.burnedBy !== "") {
      obj.burnedBy = message.burnedBy;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BurnTombstone>, I>>(base?: I): BurnTombstone {
    return BurnTombstone.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BurnTombstone>, I>>(object: I): BurnTombstone {
    const message = createBaseBurnTombstone();
    message.classId = object.classId ?? "";
    message.nftId = object.nftId ?? "";
    message.mint = (object.mint !== undefined && object.mint !== null)
      ? MintRecord.fromPartial(object.mint)
      : undefined;
    message.uri = object.uri ?? "";
    message.uriHash = object.uriHash ?? "";
    message.data = (object.data !== undefined && object.data !== null) ? Any.fromPartial(object.data) : undefined;
    message.revocation = (object.revocation !== undefined && object.revocation !== null)
      ? Revocation.fromPartial(object.revocation)
      : undefined;
    message.burnedAt = object.burnedAt ?? undefined;
    message.burnedBy = object.burnedBy ?? "";
    return message;
  },
};

function createBaseClassRecord(): ClassRecord {
  return { class: undefined, policy: undefined, mintedCount: Long.UZERO };
}

export const ClassRecord = {
  encode(message: ClassRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.class !== undefined) {
      Class.encode(message.class, writer.uint32(10).fork()).ldelim();
    }
    if (message.policy !== undefined) {
      ClassPolicy.encode(message.policy, writer.uint32(18).fork()).ldelim();
    }
    if (!message.mintedCount.equals(Long.UZERO)) {
      writer.uint32(24).uint64(message.mintedCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ClassRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseClassRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.class = Class.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.policy = ClassPolicy.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.mintedCount = reader.uint64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ClassRecord {
    return {
      class: isSet(object.class) ? Class.fromJSON(object.class) : undefined,
      policy: isSet(object.policy) ? ClassPolicy.fromJSON(object.policy) : undefined,
      mintedCount: isSet(object.mintedCount) ? Long.fromValue(object.mintedCount) : Long.UZERO,
    };
  },

  toJSON(message: ClassRecord): unknown {
    const obj: any = {};
    if (message.class !== undefined) {
      obj.class = Class.toJSON(message.class);
    }
    if (message.policy !== undefined) {
      obj.policy = ClassPolicy.toJSON(message.policy);
    }
    if (!message.mintedCount.equals(Long.UZERO)) {
      obj.mintedCount = (message.mintedCount || Long.UZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ClassRecord>, I>>(base?: I): ClassRecord {
    return ClassRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ClassRecord>, I>>(object: I): ClassRecord {
    const message = createBaseClassRecord();
    message.class = (object.class !== undefined && object.class !== null) ? Class.fromPartial(object.class) : undefined;
    message.policy = (object.policy !== undefined && object.policy !== null)
      ? ClassPolicy.fromPartial(object.policy)
      : undefined;
    message.mintedCount = (object.mintedCount !== undefined && object.mintedCount !== null)
      ? Long.fromValue(object.mintedCount)
      : Long.UZERO;
    return message;
  },
};

function createBaseLiveNFTRecord(): LiveNFTRecord {
  return { nft: undefined, owner: "", status: 0, mint: undefined, revocation: undefined };
}

export const LiveNFTRecord = {
  encode(message: LiveNFTRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nft !== undefined) {
      NFT.encode(message.nft, writer.uint32(10).fork()).ldelim();
    }
    if (message.owner !== "") {
      writer.uint32(18).string(message.owner);
    }
    if (message.status !== 0) {
      writer.uint32(24).int32(message.status);
    }
    if (message.mint !== undefined) {
      MintRecord.encode(message.mint, writer.uint32(34).fork()).ldelim();
    }
    if (message.revocation !== undefined) {
      Revocation.encode(message.revocation, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LiveNFTRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLiveNFTRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nft = NFT.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.owner = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.status = reader.int32() as any;
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.mint = MintRecord.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.revocation = Revocation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): LiveNFTRecord {
    return {
      nft: isSet(object.nft) ? NFT.fromJSON(object.nft) : undefined,
      owner: isSet(object.owner) ? globalThis.String(object.owner) : "",
      status: isSet(object.status) ? liveNFTStatusFromJSON(object.status) : 0,
      mint: isSet(object.mint) ? MintRecord.fromJSON(object.mint) : undefined,
      revocation: isSet(object.revocation) ? Revocation.fromJSON(object.revocation) : undefined,
    };
  },

  toJSON(message: LiveNFTRecord): unknown {
    const obj: any = {};
    if (message.nft !== undefined) {
      obj.nft = NFT.toJSON(message.nft);
    }
    if (message.owner !== "") {
      obj.owner = message.owner;
    }
    if (message.status !== 0) {
      obj.status = liveNFTStatusToJSON(message.status);
    }
    if (message.mint !== undefined) {
      obj.mint = MintRecord.toJSON(message.mint);
    }
    if (message.revocation !== undefined) {
      obj.revocation = Revocation.toJSON(message.revocation);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<LiveNFTRecord>, I>>(base?: I): LiveNFTRecord {
    return LiveNFTRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<LiveNFTRecord>, I>>(object: I): LiveNFTRecord {
    const message = createBaseLiveNFTRecord();
    message.nft = (object.nft !== undefined && object.nft !== null) ? NFT.fromPartial(object.nft) : undefined;
    message.owner = object.owner ?? "";
    message.status = object.status ?? 0;
    message.mint = (object.mint !== undefined && object.mint !== null)
      ? MintRecord.fromPartial(object.mint)
      : undefined;
    message.revocation = (object.revocation !== undefined && object.revocation !== null)
      ? Revocation.fromPartial(object.revocation)
      : undefined;
    return message;
  },
};

function createBaseNFTRecord(): NFTRecord {
  return { live: undefined, burnTombstone: undefined };
}

export const NFTRecord = {
  encode(message: NFTRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.live !== undefined) {
      LiveNFTRecord.encode(message.live, writer.uint32(10).fork()).ldelim();
    }
    if (message.burnTombstone !== undefined) {
      BurnTombstone.encode(message.burnTombstone, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NFTRecord {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNFTRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.live = LiveNFTRecord.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.burnTombstone = BurnTombstone.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NFTRecord {
    return {
      live: isSet(object.live) ? LiveNFTRecord.fromJSON(object.live) : undefined,
      burnTombstone: isSet(object.burnTombstone) ? BurnTombstone.fromJSON(object.burnTombstone) : undefined,
    };
  },

  toJSON(message: NFTRecord): unknown {
    const obj: any = {};
    if (message.live !== undefined) {
      obj.live = LiveNFTRecord.toJSON(message.live);
    }
    if (message.burnTombstone !== undefined) {
      obj.burnTombstone = BurnTombstone.toJSON(message.burnTombstone);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NFTRecord>, I>>(base?: I): NFTRecord {
    return NFTRecord.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NFTRecord>, I>>(object: I): NFTRecord {
    const message = createBaseNFTRecord();
    message.live = (object.live !== undefined && object.live !== null)
      ? LiveNFTRecord.fromPartial(object.live)
      : undefined;
    message.burnTombstone = (object.burnTombstone !== undefined && object.burnTombstone !== null)
      ? BurnTombstone.fromPartial(object.burnTombstone)
      : undefined;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(Math.trunc(date.getTime() / 1_000));
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds.toNumber() || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
