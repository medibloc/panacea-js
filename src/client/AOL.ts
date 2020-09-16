import Client from './Client';
import { APIS } from '../config/default';

const { AOL: AOL_API } = APIS;

export default class AOL extends Client {
  constructor(serverUrl: string) {
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
  //TODO @youngjoon-lee: use a proper type for Promise
  getTopics(ownerAddr: string): Promise<any> {
    return this.getRequest(AOL_API.topics, [ownerAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getTopic(ownerAddr: string, topic: string): Promise<any> {
    return this.getRequest(AOL_API.topic, [ownerAddr, topic]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getWriters(ownerAddr: string, topic: string): Promise<any> {
    return this.getRequest(AOL_API.writers, [ownerAddr, topic]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getWriter(ownerAddr: string, topic: string, writerAddr: string): Promise<any> {
    return this.getRequest(AOL_API.writer, [ownerAddr, topic, writerAddr]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getRecord(ownerAddr: string, topic: string, offset: string): Promise<any> {
    return this.getRequest(AOL_API.record, [ownerAddr, topic, offset]);
  }
}
