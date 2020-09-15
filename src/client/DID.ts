import Client from './Client';
import { APIS } from '../config/default';

const { DID: DID_API } = APIS;

export default class DID extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getDID = this.getDID.bind(this);
  }

  /**
   * GET
   * */
  //TODO @youngjoon-lee: use a proper type for Promise
  getDID(did: string): Promise<any> {
    return this.getRequest(DID_API.did, [did]);
  }
}
