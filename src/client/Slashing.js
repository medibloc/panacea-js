import Client from './Client';
import { APIS, QUERY } from '../../config';

const { SLASHING } = APIS;

class Slashing extends Client {
  constructor(serverUrl) {
    super(serverUrl);
  }

  getValidatorSigningInfo(validatorPubKey) {
    return this.getRequest(SLASHING.validatorSigningInfo, [validatorPubKey]);
  }

  getValidatorsSigningInfo(opts = { page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    return this.getRequest(SLASHING.validatorsSigningInfo, null, opts);
  }

  getSlashingParams() {
    return this.getRequest(SLASHING.params);
  }
}

export default Slashing;
