import is from 'is_js';
import { checkParams } from '../utils/validate';
import { DEFAULT_DENOM } from '../../config';

class Coin {
  constructor(data) {
    this.denom = DEFAULT_DENOM;
    this.amount = '0';

    if (is.json(data)) {
      const requiredParams = ['amount'];
      checkParams(requiredParams, data);

      this.denom = data.denom || this.denom;
      this.amount = data.amount;
    } else if (is.number(+data)) {
      this.amount = `${data}`;
    } else {
      throw new Error('invalid initializing parameter');
    }
  }
}

export default Coin;
