import {Client} from './Client';
import { APIS } from '../config/default';

const { AOL: AOL_API } = APIS;

export class AOL extends Client {
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
  getTopics(ownerAddr: string): any {
    return this.getRequest(AOL_API.topics, [ownerAddr]);
  }

  getTopic(ownerAddr: string, topic: string): any {
    return this.getRequest(AOL_API.topic, [ownerAddr, topic]);
  }

  getWriters(ownerAddr: string, topic: string): any {
    return this.getRequest(AOL_API.writers, [ownerAddr, topic]);
  }

  getWriter(ownerAddr: string, topic: string, writerAddr: string): any {
    return this.getRequest(AOL_API.writer, [ownerAddr, topic, writerAddr]);
  }

  getRecord(ownerAddr: string, topic: string, offset: string): any {
    return this.getRequest(AOL_API.record, [ownerAddr, topic, offset]);
  }
}
