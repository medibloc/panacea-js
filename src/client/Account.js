import Client from './Client';
import { APIS } from '../config/default';

const { ACCOUNT } = APIS;

class Account extends Client {
  constructor(serverUrl) {
    super(serverUrl);

    this.getAccount = this.getAccount.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.generateTransferTx = this.generateTransferTx.bind(this);
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
