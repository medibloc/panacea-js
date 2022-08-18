import { Secp256k1 as CryptoSecp256k1, stringToPath, sha256 } from "@cosmjs/crypto";
import { panacead } from "../testutils";
import { TextEncoder } from "util";
import { Secp256k1 } from "./secp256k1";

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
});