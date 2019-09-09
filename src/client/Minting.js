import Client from './Client';
import { APIS } from '../../config/default';

const { MINTING } = APIS;

class Minting extends Client {
  constructor(serverUrl) {
    super(serverUrl);

    this.getMintParams = this.getMintParams.bind(this);
    this.getInflation = this.getInflation.bind(this);
    this.getAnnualProvisions = this.getAnnualProvisions.bind(this);
  }

  /**
   * GET
   * */
  getMintParams() {
    return this.getRequest(MINTING.params);
  }

  getInflation() {
    return this.getRequest(MINTING.inflation);
  }

  getAnnualProvisions() {
    return this.getRequest(MINTING.annualProvisions);
  }
}

export default Minting;
