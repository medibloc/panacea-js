import {
  Bip39,
  EnglishMnemonic,
  Secp256k1,
  Secp256k1Signature,
  sha256,
} from "@cosmjs/crypto";
import { fromBase64 } from "@cosmjs/encoding";
import { makeSignBytes, makeSignDoc } from "@cosmjs/proto-signing";
import { HDKey } from "@scure/bip32";
import {
  createPanaceaWallet,
  derivePanaceaAddress,
  derivePanaceaBranchXpub,
} from "../wallet";

const testMnemonic =
  "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

describe("Panacea HD wallet", () => {
  it("derives a stable branch xpub", async () => {
    await expect(derivePanaceaBranchXpub(testMnemonic)).resolves.toBe(
      "xpub6EE3tm3LjX1eGdvZi1Jg2RAdmeZLrPdW3YvVVKwwE9zSfFZsdZe8zxqKMDpv6FX8TGZB7egitKSbxpPdk8xMDmypGUN4Sgi9yfLs49bZZSw",
    );
  });

  it.each([0, 1, 123])(
    "derives the same address from xpub and mnemonic for index %i",
    async (index) => {
      const xpub = await derivePanaceaBranchXpub(testMnemonic);
      const wallet = await createPanaceaWallet(testMnemonic, index);
      const [account] = await wallet.getAccounts();
      const publicKey = HDKey.fromExtendedKey(xpub).deriveChild(index).publicKey;

      expect(publicKey).toEqual(account.pubkey);
      expect(derivePanaceaAddress(xpub, index)).toBe(account.address);
    },
  );

  it("uses the same BIP39 password for xpub and wallet derivation", async () => {
    const xpub = await derivePanaceaBranchXpub(testMnemonic, "password");
    const wallet = await createPanaceaWallet(testMnemonic, 7, "password");
    const [account] = await wallet.getAccounts();

    expect(derivePanaceaAddress(xpub, 7)).toBe(account.address);
  });

  it("creates a wallet that can sign directly", async () => {
    const wallet = await createPanaceaWallet(testMnemonic, 123);
    const [account] = await wallet.getAccounts();
    const signDoc = makeSignDoc(
      new Uint8Array([1, 2, 3]),
      new Uint8Array([4, 5, 6]),
      "test-chain",
      7,
    );

    const response = await wallet.signDirect(account.address, signDoc);
    const signature = Secp256k1Signature.fromFixedLength(
      fromBase64(response.signature.signature),
    );

    await expect(
      Secp256k1.verifySignature(
        signature,
        sha256(makeSignBytes(response.signed)),
        account.pubkey,
      ),
    ).resolves.toBe(true);
  });

  it.each([-1, 1.5, 2 ** 31])("rejects invalid index %s", async (index) => {
    const xpub = await derivePanaceaBranchXpub(testMnemonic);

    expect(() => derivePanaceaAddress(xpub, index)).toThrow(RangeError);
    await expect(createPanaceaWallet(testMnemonic, index)).rejects.toThrow(
      RangeError,
    );
  });

  it("rejects an extended private key", async () => {
    const seed = await Bip39.mnemonicToSeed(
      new EnglishMnemonic(testMnemonic),
      "",
    );
    const xprv =
      HDKey.fromMasterSeed(seed).derive("m/44'/371'/0'/0").privateExtendedKey;

    expect(() => derivePanaceaAddress(xprv, 0)).toThrow(
      "xpub must not contain private key material",
    );
  });

  it("rejects an xpub from the wrong depth", async () => {
    const seed = await Bip39.mnemonicToSeed(
      new EnglishMnemonic(testMnemonic),
      "",
    );
    const xpub =
      HDKey.fromMasterSeed(seed).derive("m/44'/371'/0'").publicExtendedKey;

    expect(() => derivePanaceaAddress(xpub, 0)).toThrow(
      "xpub must be derived at m/44'/371'/0'/0",
    );
  });

  it("rejects a malformed xpub", () => {
    expect(() => derivePanaceaAddress("not-an-xpub", 0)).toThrow();
  });
});
