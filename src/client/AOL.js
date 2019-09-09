import Client from './Client';
import { APIS } from '../../config/default';

const { AOL: AOL_API } = APIS;

class AOL extends Client {
  constructor(serverUrl) {
    super(serverUrl);

    this.getTopics = this.getTopics.bind(this);
    this.getTopic = this.getTopic.bind(this);
    this.getWriters = this.getWriters.bind(this);
    this.getWriter = this.getWriter.bind(this);
    this.getRecord = this.getRecord.bind(this);
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
