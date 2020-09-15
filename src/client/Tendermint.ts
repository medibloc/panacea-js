import {Client} from './Client';
import { APIS, QUERY } from '../config/default';
import {BroadcastTx} from "../tx";
import {classToPlain} from "class-transformer";

const { TENDERMINT } = APIS;

export class Tendermint extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getNodeInfo = this.getNodeInfo.bind(this);
    this.getSyncStatus = this.getSyncStatus.bind(this);
    this.getLatestBlock = this.getLatestBlock.bind(this);
    this.getBlock = this.getBlock.bind(this);
    this.getLatestValidatorSets = this.getLatestValidatorSets.bind(this);
    this.getValidatorSets = this.getValidatorSets.bind(this);
    this.getTx = this.getTx.bind(this);
    this.getTxs = this.getTxs.bind(this);
    this.broadcastTx = this.broadcastTx.bind(this);
    this.encodeTx = this.encodeTx.bind(this);
  }

  /**
   * GET
   * */
  getNodeInfo(): any {
    return this.getRequest(TENDERMINT.nodeInfo);
  }

  getSyncStatus(): any {
    return this.getRequest(TENDERMINT.syncStatus);
  }

  getLatestBlock(): any {
    return this.getRequest(TENDERMINT.latestBlock);
  }

  getBlock(height: number): any {
    return this.getRequest(TENDERMINT.block, [height]);
  }

  getLatestValidatorSets(): any {
    return this.getRequest(TENDERMINT.latestValidatorSets);
  }

  getValidatorSets(height: number): any {
    return this.getRequest(TENDERMINT.validatorSets, [height]);
  }

  getTx(hash: string): any {
    return this.getRequest(TENDERMINT.tx, [hash]);
  }

  getTxs(opts = { tags: '', page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }): any {
    return this.getRequest(TENDERMINT.txs, [], opts);
  }

  /**
   * POST
   * */
  broadcastTx(tx: BroadcastTx): any {
    return this.postRequest(TENDERMINT.txs, [], classToPlain(tx));
  }

  encodeTx(data: any): any {
    return this.postRequest(TENDERMINT.encodeTx, [], data);
  }
}
