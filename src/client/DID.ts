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
        //TODO @youngjoon-lee: handle the case when DID was already deactivated
        return plainToClass(DIDDocumentWithSeq, data, { excludeExtraneousValues: true });
      });
  }
}
