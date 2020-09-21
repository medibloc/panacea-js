import is from "is_js";
import { MSG_TYPE } from '../config/default';
import { checkParams } from '../utils/validate';

const { BASE } = MSG_TYPE;

export default class Base {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
    const requiredParams = ['fromAddress', 'toAddress', 'amount'];
    checkParams(requiredParams, data);

    if (!is.array(data.amount)) {
      throw new Error('amount field should be an array');
    }
    //TODO @youngjoon-lee: use the Coin class
    data.amount.forEach((coin: Record<string, any>) => {
      const requiredParamsInCoin = ['denom', 'amount'];
      checkParams(requiredParamsInCoin, coin);
    });

    this.type = BASE.SEND;
    this.value = {
      from_address: data.fromAddress,
      to_address: data.toAddress,
      amount: data.amount,
    };
  }
}
