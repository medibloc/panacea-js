import Client from './Client';
import { APIS } from '../config/default';

const { VERSION } = APIS;

class Version extends Client {
  constructor(serverUrl) {
    super(serverUrl);

    this.getVersion = this.getVersion.bind(this);
    this.getNodeVersion = this.getNodeVersion.bind(this);
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
