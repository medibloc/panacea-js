import Client from './Client';
import { APIS } from '../../config';

const { MINTING } = APIS;

class Minting extends Client {
  constructor(serverUrl) {
    super(serverUrl);
  }

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
