import { sha256 } from "@cosmjs/crypto";
import {
  DIDDocument,
  DataWithSeq,
  VerificationRelationship,
  VerificationMethod,
} from "../proto/panacea/did/v2/did";
import Long from "long";
import { Secp256k1 } from "../crypto";
import bs58 from "bs58";

export class DidUtil {
  static getDid(pubKeyCompressed: Uint8Array): string {
    return `did:panacea:${bs58.encode(sha256(pubKeyCompressed))}`;
  }

  static getPublicKeyBase58(pubKeyCompressed: Uint8Array): string {
    return bs58.encode(pubKeyCompressed);
  }

  static signDidDocument(
    privKey: Uint8Array,
    didDocument: DIDDocument,
    sequence: Long = Long.fromInt(0),
  ): Uint8Array {
    const dataWithSeq: DataWithSeq = {
      data: DIDDocument.encode(didDocument).finish(),
      sequence: sequence,
    };
    return Secp256k1.sign(
      sha256(DataWithSeq.encode(dataWithSeq).finish()),
      privKey,
    );
  }

  static signDid(
    privKey: Uint8Array,
    did: string,
    sequence: Long = Long.fromInt(0),
  ): Uint8Array {
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
    };
    return this.signDidDocument(privKey, didDocument, sequence);
  }

  // Find a verification method using ID.
  // If 'relationships' are specified, find the verification method from 'relationships'.
  //     In this case, 'methods' are used as a reference for 'relationships'.
  // If 'relationships' are not specified, find the verification method only from 'methods'.
  // If the verification method is not found, throw an error.
  static findVerificationMethod(
    id: string,
    methods: VerificationMethod[],
    relationships?: VerificationRelationship[],
  ): VerificationMethod {
    if (relationships) {
      for (const relationship of relationships) {
        if (
          relationship.verificationMethod !== undefined &&
          relationship.verificationMethod.id === id
        ) {
          return relationship.verificationMethod;
        }
        if (relationship.verificationMethodId === id) {
          return this.findVerificationMethod(id, methods);
        }
      }
    } else {
      for (const method of methods) {
        if (method.id === id) {
          return method;
        }
      }
    }

    throw new Error(`unable to find verification method: ${id}`);
  }
}
