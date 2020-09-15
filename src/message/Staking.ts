import {Type} from "class-transformer";
import {Coin} from "../coin";

export class CreateValidator {
  @Type(() => Description)
  public description: Description;
  @Type(() => Commission)
  public commission: Commission;
  public min_self_delegation: string; // "1"
  // TODO @ggomma check signer is identical with delegator address
  public delegator_address: string;
  public validator_address: string;
  public pubkey: string;
  @Type(() => Coin)
  public value: Coin;

  constructor(description: Description, commission: Commission, min_self_delegation: string, delegator_address: string, validator_address: string, pubkey: string, value: Coin) {
    this.description = description;
    this.commission = commission;
    this.min_self_delegation = min_self_delegation;
    this.delegator_address = delegator_address;
    this.validator_address = validator_address;
    this.pubkey = pubkey;
    this.value = value;
  }
}

export class EditValidator {
  @Type(() => Description)
  public description: Description;
  public address: string;
  public commission_rate: string;
  public min_self_delegation: string;

  constructor(description: Description, address: string, commission_rate = '', min_self_delegation = '') {
    this.description = description;
    this.description.setDoNotModify();
    this.address = address;
    this.commission_rate = commission_rate;
    this.min_self_delegation = min_self_delegation;
  }
}

export class Delegate {
  public delegator_address: string;
  public validator_address: string;
  @Type(() => Coin)
  public amount: Coin;

  constructor(delegator_address: string, validator_address: string, amount: Coin) {
    this.delegator_address = delegator_address;
    this.validator_address = validator_address;
    this.amount = amount;
  }
}

export class Redelegate {
  public delegator_address: string;
  public validator_src_address: string;
  public validator_dst_address: string;
  @Type(() => Coin)
  public amount: Coin;

  constructor(delegator_address: string, validator_src_address: string, validator_dst_address: string, amount: Coin) {
    this.delegator_address = delegator_address;
    this.validator_src_address = validator_src_address;
    this.validator_dst_address = validator_dst_address;
    this.amount = amount;
  }
}

export class Undelegate {
  public delegator_address: string;
  public validator_address: string;
  @Type(() => Coin)
  public amount: Coin;

  constructor(delegator_address: string, validator_address: string, amount: Coin) {
    this.delegator_address = delegator_address;
    this.validator_address = validator_address;
    this.amount = amount;
  }
}

const DO_NOT_MODIFY = '[do-not-modify]'; // defined in cosmose-sdk

export class Description {
  constructor(
    public moniker: string,
    public identity: string = '',
    public website: string = '',
    public details: string = '',
  ) {}

  setDoNotModify(): void {
    if (!this.moniker) {
      this.moniker = DO_NOT_MODIFY;
    }
    if (!this.identity) {
      this.identity = DO_NOT_MODIFY;
    }
    if (!this.website) {
      this.website = DO_NOT_MODIFY;
    }
    if (!this.details) {
      this.details = DO_NOT_MODIFY;
    }
  }
}

export class Commission {
  constructor(
    public rate: string, // "1.000000000000000000"
    public max_rate: string, // "1.000000000000000000"
    public max_change_rate: string, // "1.000000000000000000"
  ) {}
}
