import Client from './Client';
import { APIS } from '../../config';

const { VERSION } = APIS;

class Version extends Client {
  constructor(serverUrl) {
    super(serverUrl);
  }

  /**
   * GET
   * */
  getVersion() {
    return this.getRequest(VERSION.version);
  }

  getNodeVersion() {
    return this.getRequest(VERSION.nodeVersion);
  }
}

export default Version;
