import Client from './Client';
import { APIS } from '../../config';

const { AOL: AOL_API } = APIS;

class AOL extends Client {
  constructor(serverUrl) {
    super(serverUrl);
  }

  /**
   * GET
   * */
  getTopics(ownerAddr) {
    return this.getRequest(AOL_API.topics, [ownerAddr]);
  }

  getTopic(ownerAddr, topic) {
    return this.getRequest(AOL_API.topic, [ownerAddr, topic]);
  }

  getWriters(ownerAddr, topic) {
    return this.getRequest(AOL_API.writers, [ownerAddr, topic]);
  }

  getWriter(ownerAddr, topic, writerAddr) {
    return this.getRequest(AOL_API.writer, [ownerAddr, topic, writerAddr]);
  }

  getRecord(ownerAddr, topic, offset) {
    return this.getRequest(AOL_API.record, [ownerAddr, topic, offset]);
  }
}

export default AOL;
