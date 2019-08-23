import Client from './Client';
import { APIS, QUERY } from '../../config';

const { SLASHING } = APIS;

class Slashing extends Client {
  /**
   * GET
   * */
  getValidatorSigningInfo(validatorPubKey) {
    return this.getRequest(SLASHING.validatorSigningInfo, [validatorPubKey]);
  }

  getValidatorsSigningInfo(opts = { page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    return this.getRequest(SLASHING.validatorsSigningInfo, null, opts);
  }

  getSlashingParams() {
    return this.getRequest(SLASHING.params);
  }

  /**
   * POST
   * */
  generateUnjailTx(validatorAddr, tx) {
    return this.postRequest(SLASHING.unjail, [validatorAddr], tx);
  }
}

export default Slashing;
