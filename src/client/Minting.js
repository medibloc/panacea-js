import Client from './Client';
import { APIS } from '../../config/default';

const { MINTING } = APIS;

class Minting extends Client {
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
