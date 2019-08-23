import is from 'is_js';
import { DEFAULT_DENOM } from '../../config';

class Coin {
  constructor(data) {
    this.denom = DEFAULT_DENOM;
    this.amount = '0';

    if (is.number(+data)) {
      this.amount = `${data}`;
    } else if (is.string(data)) {
      const parsedCoin = Coin.parseCoin(data);
      this.denom = parsedCoin.denom;
      this.amount = parsedCoin.amount;
    }
  }

  static parseCoin(coin) {
    const parsedCoin = coin.split(/([0-9.]+)/).filter(Boolean);
    if (parsedCoin.length !== 2) {
      throw new Error('Invalid coin argument. You need to put amount + denom format. ex) 100.00umed');
    }
    return {
      amount: `${parsedCoin[0]}`,
      denom: parsedCoin[1],
    };
  }
}

export default Coin;
