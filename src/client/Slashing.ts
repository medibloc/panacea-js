import Client from './Client';
import { APIS, QUERY } from '../config/default';

const { SLASHING } = APIS;

export default class Slashing extends Client {
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
  //TODO @youngjoon-lee: use a proper type for Promise
  getValidatorSigningInfo(validatorPubKey: string): Promise<any> {
    return this.getRequest(SLASHING.validatorSigningInfo, [validatorPubKey]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getValidatorsSigningInfo(opts = { page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }): Promise<any> {
    return this.getRequest(SLASHING.validatorsSigningInfo, null, opts);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getSlashingParams(): Promise<any> {
    return this.getRequest(SLASHING.params);
  }

  /**
   * POST
   * */
  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateUnjailTx(validatorAddr: string, tx: any): Promise<any> {
    return this.postRequest(SLASHING.unjail, [validatorAddr], tx);
  }
}
