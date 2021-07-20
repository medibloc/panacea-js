import ecc from "secp256k1";
import { randomBytes } from "crypto";

export class Secp256k1 {
  static generatePrivateKey(): Uint8Array {
    let privKey
    do {
      privKey = randomBytes(32)
    } while (!ecc.privateKeyVerify(privKey));
    return privKey;
  }

  static getPublicKeyCompressed(privKey: Uint8Array): Uint8Array {
    return ecc.publicKeyCreate(privKey);
  }

  static sign(data32: Uint8Array, privKey: Uint8Array): Uint8Array {
    return ecc.ecdsaSign(data32, privKey).signature;
  }
}