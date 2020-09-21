import { MSG_TYPE } from '../config/default';
import { checkParams } from '../utils/validate';

const { SLASHING } = MSG_TYPE;

export class Unjail {
  public readonly type: string;
  public readonly value: Record<string, any>; //TODO @youngjoon-lee: to be type-safe

  //TODO @youngjoon-lee: to be type-safe
  constructor(data: Record<string, any>) {
    const requiredParams = ['address'];
    checkParams(requiredParams, data);

    this.type = SLASHING.UNJAIL;
    this.value = {
      address: data.address,
    };
  }
}

