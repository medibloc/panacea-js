export const panacead = {
  tendermintUrl: "localhost:26657",
  chainId: "testing",
  genesisAccountMnemonic: "limit basket dance ripple proof whisper pulp zoo shell reform domain champion because public kitchen bone rice front patch mixed tent ladder floor speed",
}

export function panaceadEnabled(): boolean {
  // return !!process.env.PANACEAD_ENABLED;
  return true;
}

export function pendingWithoutPanacead(): void {
  if (!panaceadEnabled()) {
    return pending("Set PANACEAD_ENABLED to enable Panacea based tests")
  }
}
