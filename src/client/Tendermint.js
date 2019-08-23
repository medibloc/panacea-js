import Client from './Client';
import { APIS, QUERY } from '../../config/default';

const { TENDERMINT } = APIS;

class Tendermint extends Client {
  /**
   * GET
   * */
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
    return this.getRequest(
      TENDERMINT.txs,
      null, { ...opts.tags, page: opts.page, limit: opts.limit },
    );
  }

  /**
   * POST
   * */
  broadcastTx(data) {
    return this.postRequest(TENDERMINT.txs, null, data);
  }

  encodeTx(data) {
    return this.postRequest(TENDERMINT.encodeTx, null, data);
  }
}

export default Tendermint;
