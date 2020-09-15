import Client from './Client';
import { APIS } from '../config/default';

const { DID: DID_API } = APIS;

class DID extends Client {
  constructor(serverUrl) {
    super(serverUrl);

    this.getDID = this.getDID.bind(this);
  }

  /**
   * GET
   * */
  getDID(did) {
    return this.getRequest(DID_API.did, [did]);
  }
}

export default DID;
