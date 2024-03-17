import ecc from "secp256k1";
import { randomBytes } from "crypto";
import {
  Bip39,
  EnglishMnemonic,
  Slip10,
  Slip10Curve,
  Slip10RawIndex,
} from "@cosmjs/crypto";
import * as jose from "jose";
import { base64url } from "jose";

export class Secp256k1 {
  static generatePrivateKey(): Uint8Array {
    let privKey;
    do {
      privKey = randomBytes(32);
    } while (!ecc.privateKeyVerify(privKey));
    return privKey;
  }

  static getPublicKeyCompressed(privKey: Uint8Array): Uint8Array {
    return ecc.publicKeyCreate(privKey);
  }

  static getPublicKeyUncompressed(privKey: Uint8Array): Uint8Array {
    return ecc.publicKeyCreate(privKey, false);
  }

  // Uncompress public key if it's compressed. If not, do nothing.
  static uncompressPublicKey(pubKey: Uint8Array): Uint8Array {
    return ecc.publicKeyConvert(pubKey, false);
  }

  // Convert a raw private key to JWK
  static convertPrivateKeyToJWK(privKey: Uint8Array): jose.JWK {
    const jwk = this.convertPublicKeyToJWK(
      Secp256k1.getPublicKeyUncompressed(privKey),
    );
    jwk.d = base64url.encode(privKey);
    return jwk;
  }

  // Convert a raw uncompressed public key to JWK
  static convertPublicKeyToJWK(pubKey: Uint8Array): jose.JWK {
    return {
      kty: "EC",
      crv: "secp256k1",
      x: base64url.encode(pubKey.slice(1, 33)),
      y: base64url.encode(pubKey.slice(33, 66)),
    };
  }

  static sign(data32: Uint8Array, privKey: Uint8Array): Uint8Array {
    return ecc.ecdsaSign(data32, privKey).signature;
  }

  static async parseMnemonicToPrivateKey(
    mnemonic: string,
    hdPath: readonly Slip10RawIndex[],
  ): Promise<Uint8Array> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic);
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked, "");
    return Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdPath).privkey;
  }
}
