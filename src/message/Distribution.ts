export class WithdrawReward {
  constructor(
    // it can be an validator operator address to withdraw validator reward
    public delegator_address: string,
    public validator_address: string,
  ) {}
}

export class ModifyWithdrawAddress {
  constructor(
    public delegator_address: string,
    public withdraw_address: string,
  ) {}
}
