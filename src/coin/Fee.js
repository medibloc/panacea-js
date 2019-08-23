import is from 'is_js';
import Coin from './Coin';
import { DEFAULT_GAS } from '../../config/default';

class Fee {
  constructor() {
    this.amount = null;
    this.gas = DEFAULT_GAS;
  }

  setGasLimit(gasLimit) {
    if (!is.number(+gasLimit)) {
      throw new Error('gas limit should be a number');
    }
    this.gas = `${gasLimit}`;
  }

  setGasPrice(price) {
    const parsedCoin = Coin.parseCoin(price);

    // fee amount = gas price * gas limit
    parsedCoin.amount = `${parsedCoin.amount * this.gas}`;
    this.addCoin(parsedCoin);
  }

  setFee(fee) {
    const parsedCoin = Coin.parseCoin(fee);
    this.addCoin(parsedCoin);
  }

  addCoin(parsedCoin) {
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

export default Fee;
