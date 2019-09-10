import Client from './Client';
import { APIS, QUERY } from '../config/default';

const { SLASHING } = APIS;

class Slashing extends Client {
  constructor(serverUrl) {
    super(serverUrl);

    this.getValidatorSigningInfo = this.getValidatorSigningInfo.bind(this);
    this.getValidatorsSigningInfo = this.getValidatorsSigningInfo.bind(this);
    this.getSlashingParams = this.getSlashingParams.bind(this);
    this.generateUnjailTx = this.generateUnjailTx.bind(this);
  }

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
