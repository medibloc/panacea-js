import ecc from "secp256k1";
import {randomBytes} from "crypto";
import {Bip39, EnglishMnemonic, Slip10, Slip10Curve, Slip10RawIndex} from "@cosmjs/crypto"

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

  static async parseMnemonicToPrivateKey(mnemonic: string, hdPath: readonly Slip10RawIndex[]): Promise<Uint8Array> {
    const mnemonicChecked = new EnglishMnemonic(mnemonic)
    const seed = await Bip39.mnemonicToSeed(mnemonicChecked, "")
    return Slip10.derivePath(Slip10Curve.Secp256k1, seed, hdPath).privkey
  }
}