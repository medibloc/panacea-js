import {Client} from './Client';
import { APIS } from '../config/default';

const { DID: DID_API } = APIS;

export class DID extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getDID = this.getDID.bind(this);
  }

  /**
   * GET
   * */
  getDID(did: string): any {
    return this.getRequest(DID_API.did, [did]);
  }
}
