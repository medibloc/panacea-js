import {Client} from './Client';
import { APIS } from '../config/default';

const { MINTING } = APIS;

export class Minting extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getMintParams = this.getMintParams.bind(this);
    this.getInflation = this.getInflation.bind(this);
    this.getAnnualProvisions = this.getAnnualProvisions.bind(this);
  }

  /**
   * GET
   * */
  getMintParams(): any {
    return this.getRequest(MINTING.params);
  }

  getInflation(): any {
    return this.getRequest(MINTING.inflation);
  }

  getAnnualProvisions(): any {
    return this.getRequest(MINTING.annualProvisions);
  }
}
