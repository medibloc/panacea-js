import {Client} from './Client';
import { APIS, QUERY } from '../config/default';
import {Transaction} from '../tx';

const { SLASHING } = APIS;

export class Slashing extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getValidatorSigningInfo = this.getValidatorSigningInfo.bind(this);
    this.getValidatorsSigningInfo = this.getValidatorsSigningInfo.bind(this);
    this.getSlashingParams = this.getSlashingParams.bind(this);
    this.generateUnjailTx = this.generateUnjailTx.bind(this);
  }

  /**
   * GET
   * */
  getValidatorSigningInfo(validatorPubKey: string): any {
    return this.getRequest(SLASHING.validatorSigningInfo, [validatorPubKey]);
  }

  getValidatorsSigningInfo(opts = { page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }): any {
    return this.getRequest(SLASHING.validatorsSigningInfo, [], opts);
  }

  getSlashingParams(): any {
    return this.getRequest(SLASHING.params);
  }

  /**
   * POST
   * */
  generateUnjailTx(validatorAddr: string, tx: Transaction): any {
    return this.postRequest(SLASHING.unjail, [validatorAddr], tx);
  }
}
