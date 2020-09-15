import Client from './Client';
import { APIS, QUERY } from '../config/default';

const { TENDERMINT } = APIS;

export default class Tendermint extends Client {
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
  //TODO @youngjoon-lee: use a proper type for Promise
  getNodeInfo(): Promise<any> {
    return this.getRequest(TENDERMINT.nodeInfo);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getSyncStatus(): Promise<any> {
    return this.getRequest(TENDERMINT.syncStatus);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getLatestBlock(): Promise<any> {
    return this.getRequest(TENDERMINT.latestBlock);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getBlock(height: number): Promise<any> {
    return this.getRequest(TENDERMINT.block, [height]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getLatestValidatorSets(): Promise<any> {
    return this.getRequest(TENDERMINT.latestValidatorSets);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getValidatorSets(height: number): Promise<any> {
    return this.getRequest(TENDERMINT.validatorSets, [height]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getTx(hash: string): Promise<any> {
    return this.getRequest(TENDERMINT.tx, [hash]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getTxs(opts = { tags: {}, page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }): Promise<any> {
    return this.getRequest(
      TENDERMINT.txs,
      null, { ...opts.tags, page: opts.page, limit: opts.limit },
    );
  }

  /**
   * POST
   * */
  //TODO @youngjoon-lee: use a proper type for data
  //TODO @youngjoon-lee: use a proper type for Promise
  broadcastTx(data: any): Promise<any> {
    return this.postRequest(TENDERMINT.txs, null, data);
  }

  //TODO @youngjoon-lee: use a proper type for data
  //TODO @youngjoon-lee: use a proper type for Promise
  encodeTx(data: any): Promise<any> {
    return this.postRequest(TENDERMINT.encodeTx, null, data);
  }
}
