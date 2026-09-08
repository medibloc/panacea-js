import { encodeSecp256k1Pubkey, pubkeyToAddress } from "@cosmjs/amino";
import { Bip39, EnglishMnemonic, stringToPath } from "@cosmjs/crypto";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import { HARDENED_OFFSET, HDKey } from "@scure/bip32";

export const panaceaAddressPrefix = "panacea";
export const panaceaAddressBranchPath = "m/44'/371'/0'/0";

const assertAddressIndex = (index: number): void => {
  if (!Number.isInteger(index) || index < 0 || index >= HARDENED_OFFSET) {
    throw new RangeError(
      `index must be an integer between 0 and ${HARDENED_OFFSET - 1}`,
    );
  }
};

/**
 * Derives the public-only branch key used to generate Panacea customer
 * addresses. Run this where the mnemonic is managed, then store only the
 * returned xpub on the application server.
 */
export async function derivePanaceaBranchXpub(
  mnemonic: string,
  bip39Password = "",
): Promise<string> {
  const seed = await Bip39.mnemonicToSeed(
    new EnglishMnemonic(mnemonic),
    bip39Password,
  );
  const root = HDKey.fromMasterSeed(seed);

  try {
    const branch = root.derive(panaceaAddressBranchPath);
    try {
      return branch.publicExtendedKey;
    } finally {
      branch.wipePrivateData();
    }
  } finally {
    root.wipePrivateData();
    seed.fill(0);
  }
}

/** Derives m/44'/371'/0'/0/{index} without private key material. */
export function derivePanaceaAddress(xpub: string, index: number): string {
  assertAddressIndex(index);

  const branch = HDKey.fromExtendedKey(xpub);
  if (branch.privateKey !== null) {
    throw new Error("xpub must not contain private key material");
  }
  if (branch.depth !== 4 || branch.index !== 0) {
    throw new Error(`xpub must be derived at ${panaceaAddressBranchPath}`);
  }

  const publicKey = branch.deriveChild(index).publicKey;
  if (publicKey === null) {
    throw new Error("failed to derive a public key from xpub");
  }

  return pubkeyToAddress(
    encodeSecp256k1Pubkey(publicKey),
    panaceaAddressPrefix,
  );
}

/**
 * Creates a CosmJS wallet for m/44'/371'/0'/0/{index}. Keep this operation in
 * the environment that is allowed to access the mnemonic.
 */
export async function createPanaceaWallet(
  mnemonic: string,
  index: number,
  bip39Password = "",
): Promise<DirectSecp256k1HdWallet> {
  assertAddressIndex(index);

  return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    bip39Password,
    hdPaths: [stringToPath(`${panaceaAddressBranchPath}/${index}`)],
    prefix: panaceaAddressPrefix,
  });
}
