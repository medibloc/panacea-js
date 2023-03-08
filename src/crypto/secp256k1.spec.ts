import { Secp256k1 as CryptoSecp256k1, stringToPath, sha256 } from "@cosmjs/crypto";
import { panacead } from "../testutils";
import { TextEncoder } from "util";
import { Secp256k1 } from "./secp256k1";
import * as jose from 'jose'

describe("Secp256k1", () => {

  it("parseMnemonicToPrivateKey", async () => {
    const body = "testBody";
    const hashedBody = sha256(new TextEncoder().encode(body));
    const hdPath = stringToPath("m/44'/371'/0'/0/0");

    const privateKey = await Secp256k1.parseMnemonicToPrivateKey(panacead.mnemonic, hdPath);
    const {pubkey} = await CryptoSecp256k1.makeKeypair(privateKey);

    const signature = await CryptoSecp256k1.createSignature(hashedBody, privateKey)
    expect(CryptoSecp256k1.verifySignature(signature, hashedBody, pubkey)).toBeTruthy()
  });

  it("uncompressPublicKey", async () => {
    const privKey = await Secp256k1.generatePrivateKey();

    const pubKeyCompressed = Secp256k1.getPublicKeyCompressed(privKey);
    const pubKeyUncompressed = Secp256k1.getPublicKeyUncompressed(privKey);

    expect(Secp256k1.uncompressPublicKey(pubKeyCompressed)).toEqual(pubKeyUncompressed);
    expect(Secp256k1.uncompressPublicKey(pubKeyUncompressed)).toEqual(pubKeyUncompressed);
  });

  it("convertPrivateKeyToJWK", async () => {
    const privKey = await Secp256k1.generatePrivateKey();

    const jwk = Secp256k1.convertPrivateKeyToJWK(privKey);
    expect(jwk.kty).toEqual("EC");
    expect(jwk.crv).toEqual("secp256k1");
    expect(jwk.d).toBeDefined();
    expect(jwk.x).toBeDefined();
    expect(jwk.y).toBeDefined();

    await expect(async () => {
      await jose.importJWK(jwk, "ES256K");
    }).not.toThrow();
  });

  it("convertPublicKeyToJWK", async () => {
    const privKey = await Secp256k1.generatePrivateKey();

    const jwk = Secp256k1.convertPublicKeyToJWK(Secp256k1.getPublicKeyUncompressed(privKey));
    expect(jwk.kty).toEqual("EC");
    expect(jwk.crv).toEqual("secp256k1");
    expect(jwk.d).toBeUndefined();
    expect(jwk.x).toBeDefined();
    expect(jwk.y).toBeDefined();

    await expect(async () => {
      await jose.importJWK(jwk, "ES256K");
    }).not.toThrow();
  });
});
