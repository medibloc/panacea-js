import Client from './Client';
import { APIS } from '../config/default';
import {DIDDocumentWithSeq} from "../message/DID";
import {plainToClass} from "class-transformer";

const { DID: DID_API } = APIS;

export default class DID extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getDID = this.getDID.bind(this);
  }

  /**
   * GET
   * */
  getDID(did: string): Promise<DIDDocumentWithSeq> {
    return this.getRequest(DID_API.did, [did])
      .then((data: Record<string, any>): DIDDocumentWithSeq => {
        const result = data.result as Record<string, any>
        return plainToClass(DIDDocumentWithSeq, result, { excludeExtraneousValues: true });
      });
  }
}
