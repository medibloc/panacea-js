export const panacead = {
  tendermintUrl: "http://localhost:26657",
  chainId: "testing",
  genesisAccountMnemonic: "bulb rail shoot abandon eye domain injury return dash away base retreat vote solve recall glass joy neck cabin volcano enemy tribe output nominee",
}

export function panaceadEnabled(): boolean {
  return !!process.env.PANACEAD_ENABLED;
}

export function pendingWithoutPanacead(): void {
  if (!panaceadEnabled()) {
    return pending("Set PANACEAD_ENABLED to enable Panacea based tests")
  }
}
