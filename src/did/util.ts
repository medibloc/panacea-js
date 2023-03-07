import { sha256 } from "@cosmjs/crypto";
import { DIDDocument, DataWithSeq } from "../proto/panacea/did/v2/did";
import Long from "long";
import { Secp256k1 } from "../crypto/secp256k1";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vc from "@digitalcredentials/vc";
import { EcdsaSecp256k1Signature2019 } from "@medibloc/ecdsa-secp256k1-signature-2019";
import { EcdsaSecp256k1VerificationKey2019 } from "@medibloc/ecdsa-secp256k1-verification-key-2019";
import { securityLoader } from "@digitalcredentials/security-document-loader";


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

  static async createDidAuthPresentation(did: string, verificationMethodId: string, privKey: Uint8Array): Promise<Record<string, any>> {
    const suite = new EcdsaSecp256k1Signature2019({
      key: await EcdsaSecp256k1VerificationKey2019.from({
        controller: did,
        id: verificationMethodId,
        privateKeyBase58: bs58.encode(privKey),
        publicKeyBase58: bs58.encode(Secp256k1.getPublicKeyCompressed(privKey)),
      }),
    });

    return await vc.signPresentation({
      presentation: vc.createPresentation({
        holder: did,
      }),
      suite: suite,
      challenge: "this is a challenge",
    });
  }

  static async verifyDidAuthPresentation(vp: Record<string, any>, verificationMethodId: string, pubKeyCompressed: Uint8Array) {
    const suite = new EcdsaSecp256k1Signature2019({
      key: await EcdsaSecp256k1VerificationKey2019.from({
        controller: vp.holder,
        id: verificationMethodId,
        publicKeyBase58: bs58.encode(pubKeyCompressed),
      }),
    });

    const result = await vc.verify({
      presentation: vp,
      suite: suite,
      challenge: "this is a challenge",
      documentLoader: securityLoader().build(),
    })
    console.log(JSON.stringify(result, null, 2));
  }
}