import Client from './Client';
import { APIS } from '../config/default';

const { MINTING } = APIS;

export default class Minting extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getMintParams = this.getMintParams.bind(this);
    this.getInflation = this.getInflation.bind(this);
    this.getAnnualProvisions = this.getAnnualProvisions.bind(this);
  }

  /**
   * GET
   * */
  //TODO @youngjoon-lee: use a proper type for Promise
  getMintParams(): Promise<any> {
    return this.getRequest(MINTING.params);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getInflation(): Promise<any> {
    return this.getRequest(MINTING.inflation);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getAnnualProvisions(): Promise<any> {
    return this.getRequest(MINTING.annualProvisions);
  }
}
