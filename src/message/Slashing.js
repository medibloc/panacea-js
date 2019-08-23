import { MSG_TYPE } from '../../config/default';
import { checkParams } from '../utils/validate';

const { SLASHING } = MSG_TYPE;

class Unjail {
  constructor(data) {
    const requiredParams = ['address'];
    checkParams(requiredParams, data);

    this.type = SLASHING.UNJAIL;
    this.value = {
      address: data.address,
    };
  }
}

// eslint-disable-next-line import/prefer-default-export
export { Unjail };
