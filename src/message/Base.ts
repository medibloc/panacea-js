import {Type} from "class-transformer";
import {Coin} from "../coin";

export class Base {
  public from_address: string;
  public to_address: string;
  @Type(() => Coin)
  public amount: Coin[];

  constructor(from_address: string, to_address: string, amount: Coin[]) {
    this.from_address = from_address;
    this.to_address = to_address;
    this.amount = amount;
  }
}
