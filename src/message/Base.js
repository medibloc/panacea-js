import is from 'is_js';
import { MSG_TYPE } from '../../config';
import { checkParams } from '../utils/validate';

const { BASE } = MSG_TYPE;

class Base {
  constructor(data) {
    const requiredParams = ['fromAddress', 'toAddress', 'amount'];
    checkParams(requiredParams, data);

    if (!is.array(data.amount)) {
      throw new Error('amount field should be an array');
    }
    data.amount.forEach((coin) => {
      const requiredParams = ['denom', 'amount'];
      checkParams(requiredParams, coin);
    });

    this.type = BASE.SEND;
    this.value = {
      from_address: data.fromAddress,
      to_address: data.toAddress,
      amount: data.amount,
    };
  }
}

export default Base;
