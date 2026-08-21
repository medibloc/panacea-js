import {
  Secp256k1 as CryptoSecp256k1,
  stringToPath,
  sha256,
} from "@cosmjs/crypto";
import { fromHex, toHex } from "@cosmjs/encoding";
import { TextEncoder } from "util";
import * as jose from "jose";
import { Secp256k1 } from "../crypto";

const testMnemonic =
  "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

describe("Secp256k1", () => {
  it("parseMnemonicToPrivateKey", async () => {
    const body = "testBody";
    const hashedBody = sha256(new TextEncoder().encode(body));
    const hdPath = stringToPath("m/44'/371'/0'/0/0");

    const privateKey = await Secp256k1.parseMnemonicToPrivateKey(
      testMnemonic,
      hdPath,
    );
    const { pubkey } = await CryptoSecp256k1.makeKeypair(privateKey);

    const signature = await CryptoSecp256k1.createSignature(
      hashedBody,
      privateKey,
    );
    expect(
      CryptoSecp256k1.verifySignature(signature, hashedBody, pubkey),
    ).toBeTruthy();
  });

  it("uncompressPublicKey", async () => {
    const privKey = Secp256k1.generatePrivateKey();

    const pubKeyCompressed = Secp256k1.getPublicKeyCompressed(privKey);
    const pubKeyUncompressed = Secp256k1.getPublicKeyUncompressed(privKey);

    expect(Secp256k1.uncompressPublicKey(pubKeyCompressed)).toEqual(
      pubKeyUncompressed,
    );
    expect(Secp256k1.uncompressPublicKey(pubKeyUncompressed)).toEqual(
      pubKeyUncompressed,
    );
  });

  it("preserves public key and deterministic signature bytes", () => {
    const privateKey = fromHex(
      "0000000000000000000000000000000000000000000000000000000000000001",
    );
    const messageHash = fromHex(
      "6afff7824c9e5f73775b6dd8b27b43e8cd808b02ac02e154ece5245d56bc5ad2",
    );

    expect(toHex(Secp256k1.getPublicKeyCompressed(privateKey))).toBe(
      "0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798",
    );
    expect(toHex(Secp256k1.getPublicKeyUncompressed(privateKey))).toBe(
      "0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8",
    );
    expect(toHex(Secp256k1.sign(messageHash, privateKey))).toBe(
      "c92fb23091373730989a4fcdc34ecc5885fcf1607ec4732fba04fc4ccba7ef201a51bffadd15b344a80735099afe380603c8cbc8edf71f62cf671d26c328ecef",
    );
  });

  it("convertPrivateKeyToJWK", async () => {
    const privKey = Secp256k1.generatePrivateKey();

    const jwk = Secp256k1.convertPrivateKeyToJWK(privKey);
    expect(jwk.kty).toEqual("EC");
    expect(jwk.crv).toEqual("secp256k1");
    expect(jwk.d).toBeDefined();
    expect(jwk.x).toBeDefined();
    expect(jwk.y).toBeDefined();

    expect(async () => {
      await jose.importJWK(jwk, "ES256K");
    }).not.toThrow();
  });

  it("convertPublicKeyToJWK", async () => {
    const privKey = Secp256k1.generatePrivateKey();

    const jwk = Secp256k1.convertPublicKeyToJWK(
      Secp256k1.getPublicKeyUncompressed(privKey),
    );
    expect(jwk.kty).toEqual("EC");
    expect(jwk.crv).toEqual("secp256k1");
    expect(jwk.d).toBeUndefined();
    expect(jwk.x).toBeDefined();
    expect(jwk.y).toBeDefined();

    expect(async () => {
      await jose.importJWK(jwk, "ES256K");
    }).not.toThrow();
  });
});
