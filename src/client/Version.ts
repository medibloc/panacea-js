import {Client} from './Client';
import { APIS } from '../config/default';

const { VERSION } = APIS;

export class Version extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getVersion = this.getVersion.bind(this);
    this.getNodeVersion = this.getNodeVersion.bind(this);
  }

  /**
   * GET
   * */
  getVersion(): any {
    return this.getRequest(VERSION.version);
  }

  getNodeVersion(): any {
    return this.getRequest(VERSION.nodeVersion);
  }
}
