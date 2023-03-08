import * as jose from "jose";
import { Secp256k1 } from "../crypto";
import { DIDDocument } from "../proto/panacea/did/v2/did";
import { DidUtil } from "./util";

const bs58 = require('bs58');

export class DidAuthJwt {
  private static readonly JwtType = "JWT";
  private static readonly JwtAlgo = "ES256K";

  static async issue(did: string, privKey: Uint8Array, verificationMethodId: string, challenge: string, expirationSec: number): Promise<string> {
    const key = await jose.importJWK(Secp256k1.convertPrivateKeyToJWK(privKey), "ES256K")
    const payload = {
      "verificationMethod": verificationMethodId,
      "challenge": challenge,
    };
    const now = this.epoch(new Date());

    return await new jose.SignJWT(payload)
      .setProtectedHeader({ alg: this.JwtAlgo, typ: this.JwtType })
      .setIssuer(did)
      .setSubject(did)
      .setIssuedAt(now)
      .setNotBefore(now)
      .setExpirationTime(now + expirationSec)
      .sign(key);
  }

  static async verify(jwt: string, didDocument: DIDDocument, challenge: string) {
    const payload = await jose.decodeJwt(jwt);

    if (payload.challenge !== challenge) {
      throw new Error(`unexpected challenge: ${payload.challenge}`);
    }

    const vm = DidUtil.findVerificationMethod(
      payload.verificationMethod as string,
      didDocument.verificationMethods,
      didDocument.authentications,
    );
    const pubKey = Secp256k1.uncompressPublicKey(bs58.decode(vm.publicKeyBase58));
    const key = await jose.importJWK(Secp256k1.convertPublicKeyToJWK(pubKey), "ES256K")

    await jose.jwtVerify(jwt, key, {
      typ: this.JwtType,
      algorithms: [this.JwtAlgo],
      issuer: didDocument.id,
      subject: didDocument.id,
    });
  }

  private static epoch(date: Date) {
    return Math.floor(date.getTime() / 1000);
  }
}
