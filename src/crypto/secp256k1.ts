import { secp256k1 } from "@noble/curves/secp256k1";
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
    return secp256k1.utils.randomSecretKey();
  }

  static getPublicKeyCompressed(privKey: Uint8Array): Uint8Array {
    return secp256k1.getPublicKey(privKey, true);
  }

  static getPublicKeyUncompressed(privKey: Uint8Array): Uint8Array {
    return secp256k1.getPublicKey(privKey, false);
  }

  // Uncompress public key if it's compressed. If not, do nothing.
  static uncompressPublicKey(pubKey: Uint8Array): Uint8Array {
    return secp256k1.Point.fromHex(pubKey).toBytes(false);
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
    if (data32.length !== 32) {
      throw new Error("input data must be exactly 32 bytes");
    }
    return secp256k1
      .sign(data32, privKey, { lowS: true, prehash: false })
      .toBytes("compact");
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
