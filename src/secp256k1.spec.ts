import crypto_1 from "@cosmjs/crypto";
import {panacead} from "./testutils";
import {TextEncoder} from "util";
import {Secp256k1} from "./crypto/secp256k1";

describe("Secp256k1", () => {

    it("parseMnemonicToPrivateKey", async () => {
        const body = "testBody";
        const hashedBody = crypto_1.sha256(new TextEncoder().encode(body));
        const hdPath = crypto_1.stringToPath("m/44'/371'/0'/0/0");
        const privateKey = await Secp256k1.parseMnemonicToPrivateKey(panacead.mnemonic, hdPath);
        const {pubkey} = await crypto_1.Secp256k1.makeKeypair(privateKey);

        const signature = await crypto_1.Secp256k1.createSignature(hashedBody, privateKey)
        expect(crypto_1.Secp256k1.verifySignature(signature, hashedBody, pubkey)).toBeTruthy()
    });
});