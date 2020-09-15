import {Coin} from './Coin';
import { DEFAULT_GAS } from '../config/default';
import {Transform, Type} from "class-transformer";

export class Fee {
  @Type(() => Coin)
  public amount: Coin[];
  @Transform(v => v.toString())
  public gas: number;

  constructor(amount: Coin[] = [], gas: number = DEFAULT_GAS) {
    this.amount = amount;
    this.gas = gas;
  }

  setGasLimit(gasLimit: number): void {
    this.gas = gasLimit;
  }

  setGasPrice(price: string): void {
    const parsedCoin = Coin.parseCoin(price);

    // fee amount = gas price * gas limit
    parsedCoin.amount *= this.gas;
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
          coin.amount = parsedCoin.amount;
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
