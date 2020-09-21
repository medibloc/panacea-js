import is from "is_js";
import { DEFAULT_DENOM } from '../config/default';

export default class Coin {
  public denom: string;
  public amount: string; //TODO @youngjoon-lee: to be number

  //TODO @youngjoon-lee: to be type-safe
  constructor(data?: number | string) {
    this.denom = DEFAULT_DENOM;
    this.amount = '0';

    if (is.number(+data)) {
      this.amount = `${data}`;
    } else if (is.string(data)) {
      const parsedCoin = Coin.parseCoin(data as string);
      this.denom = parsedCoin.denom;
      this.amount = parsedCoin.amount;
    }
  }

  static parseCoin(str: string): Coin {
    const parsedCoin = str.split(/([0-9.]+)/).filter(Boolean);
    if (parsedCoin.length !== 2) {
      throw new Error('Invalid coin argument. You need to put amount + denom format. ex) 100.00umed');
    }

    //TODO @youngjoon-lee: make the constructor accept amount/denom
    const coin = new Coin();
    coin.amount = `${parsedCoin[0]}`;
    coin.denom = parsedCoin[1];
    return coin;
  }
}
