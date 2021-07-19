import { sha256 } from "@cosmjs/crypto";
import { DIDDocument, DataWithSeq } from "../proto/panacea/did/v2/did";
import Long from "long";
import { Secp256k1 } from "../crypto/secp256k1";

const bs58 = require('bs58');

export class DidUtil {
  static getDid(pubKeyCompressed: Uint8Array): string {
    return `did:panacea:${bs58.encode(sha256(pubKeyCompressed))}`;
  }

  static getPublicKeyBase58(pubKeyCompressed: Uint8Array): string {
    return bs58.encode(pubKeyCompressed);
  }

  static signDidDocument(privKey: Uint8Array, didDocument: DIDDocument, sequence: Long = Long.fromInt(0)): Uint8Array {
    const dataWithSeq: DataWithSeq = {
      data: DIDDocument.encode(didDocument).finish(),
      sequence: sequence,
    };
    return Secp256k1.sign(sha256(DataWithSeq.encode(dataWithSeq).finish()), privKey);
  }

  static signDid(privKey: Uint8Array, did: string, sequence: Long = Long.fromInt(0)): Uint8Array {
    const didDocument: DIDDocument = {
      contexts: undefined,
      id: did,
      controller: undefined,
      verificationMethods: [],
      authentications: [],
      assertionMethods: [],
      keyAgreements: [],
      capabilityInvocations: [],
      capabilityDelegations: [],
      services: [],
    }
    return this.signDidDocument(privKey, didDocument, sequence);
  }
}