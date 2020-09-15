import { DEFAULT_DENOM } from '../config/default';
import { Transform } from "class-transformer";

export class Coin {
  public denom: string;
  @Transform(v => v.toString())
  public amount: number;

  constructor(denom: string = DEFAULT_DENOM, amount: number) {
    this.denom = denom;
    this.amount = amount;
  }

  static parseCoin(coin: string): Coin {
    const parsedCoin = coin.split(/([0-9.]+)/).filter(Boolean);
    if (parsedCoin.length !== 2) {
      throw new Error('Invalid coin argument. You need to put amount + denom format. ex) 100.00umed');
    }
    return new Coin(parsedCoin[1], Number(parsedCoin[0]));
  }
}
