import is from "is_js";
import Coin from './Coin';
import { DEFAULT_GAS } from '../config/default';

export default class Fee {
  public amount: Coin[];
  public gas: string; //TODO @youngjoon-lee: to be number

  //TODO @youngjoon-lee: to be type-safe
  constructor() {
    this.amount = null;
    this.gas = DEFAULT_GAS;
  }

  setGasLimit(gasLimit: number): void {
    if (!is.number(+gasLimit)) { //TODO @youngjoon-lee: don't need to use is_js, I guess
      throw new Error('gas limit should be a number');
    }
    this.gas = `${gasLimit}`;
  }

  setGasPrice(price: string): void {
    const parsedCoin = Coin.parseCoin(price);

    // fee amount = gas price * gas limit
    parsedCoin.amount = `${Number(parsedCoin.amount) * Number(this.gas)}`;
    this.addCoin(parsedCoin);
  }

  setFee(fee: string): void {
    const parsedCoin = Coin.parseCoin(fee);
    this.addCoin(parsedCoin);
  }

  addCoin(parsedCoin: Coin): void {
    if (this.amount) {
      let found = false;
      this.amount.forEach((coin) => {
        if (coin.denom === parsedCoin.denom) {
          // eslint-disable-next-line no-param-reassign
          coin.amount = `${parsedCoin.amount}`;
          found = true;
        }
      });
      if (!found) {
        this.amount.push(parsedCoin);
      }
    } else {
      this.amount = [parsedCoin];
    }
  }
}
