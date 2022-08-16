import ecc from "secp256k1";
import { randomBytes } from "crypto";
import crypto_1 from "@cosmjs/crypto"

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

  static async parseMnemonicToPrivateKey(mnemonic: string, hdPath: readonly crypto_1.Slip10RawIndex[]): Promise<Uint8Array> {
    const mnemonicChecked = new crypto_1.EnglishMnemonic(mnemonic)
    const seed = await crypto_1.Bip39.mnemonicToSeed(mnemonicChecked, "")
    return crypto_1.Slip10.derivePath(crypto_1.Slip10Curve.Secp256k1, seed, hdPath).privkey
  }
}