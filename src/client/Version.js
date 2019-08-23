import Client from './Client';
import { APIS } from '../../config/default';

const { VERSION } = APIS;

class Version extends Client {
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
