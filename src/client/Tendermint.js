import Client from './Client';
import { APIS, QUERY } from '../../config';

const { TENDERMINT } = APIS;

class Tendermint extends Client {
  constructor(serverUrl) {
    super(serverUrl);
  }

  getNodeInfo() {
    return this.getRequest(TENDERMINT.nodeInfo);
  }

  getSyncStatus() {
    return this.getRequest(TENDERMINT.syncStatus);
  }

  getLatestBlock() {
    return this.getRequest(TENDERMINT.latestBlock);
  }

  getBlock(height) {
    return this.getRequest(TENDERMINT.block, [height]);
  }

  getLatestValidatorSets() {
    return this.getRequest(TENDERMINT.latestValidatorSets);
  }

  getValidatorSets(height) {
    return this.getRequest(TENDERMINT.validatorSets, [height]);
  }

  getTx(hash) {
    return this.getRequest(TENDERMINT.tx, [hash]);
  }

  getTxs(opts = { tags: '', page: QUERY.DEFAULT_PAGE, limit: QUERY.DEFAULT_LIMIT }) {
    return this.getRequest(TENDERMINT.txs, null, { ...opts.tags, page: opts.page, limit: opts.limit });
  }
}

export default Tendermint;
