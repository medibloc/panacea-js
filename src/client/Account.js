import Client from './Client';
import { APIS } from '../../config';

const { ACCOUNT } = APIS;

class Account extends Client {
  constructor(serverUrl) {
    super(serverUrl);
  }

  /**
   * GET
   * */
  getAccount(address) {
    return this.getRequest(ACCOUNT.account, [address]);
  }

  getBalance(address) {
    return this.getRequest(ACCOUNT.balance, [address]);
  }

  /**
   * POST
   * */
  generateTransferTx(address, tx) {
    return this.postRequest(ACCOUNT.transferTx, [address], tx);
  }
}

export default Account;