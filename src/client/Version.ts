import Client from './Client';
import { APIS } from '../config/default';

const { VERSION } = APIS;

export default class Version extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getVersion = this.getVersion.bind(this);
    this.getNodeVersion = this.getNodeVersion.bind(this);
  }

  /**
   * GET
   * */
  //TODO @youngjoon-lee: use a proper type for Promise
  getVersion(): Promise<any> {
    return this.getRequest(VERSION.version);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getNodeVersion(): Promise<any> {
    return this.getRequest(VERSION.nodeVersion);
  }
}
