export const panacead = {
  tendermintUrl: process.env.TENDERMINT_URL || "http://localhost:26657",
  chainId: process.env.CHAIN_ID || "",
  mnemonic: process.env.MNEMONIC || "",
}

export function panaceadEnabled(): boolean {
  return !!process.env.PANACEAD_ENABLED;
}

export function pendingWithoutPanacead(): void {
  if (!panaceadEnabled()) {
    return pending("Set PANACEAD_ENABLED to enable Panacea based tests")
  }
}
