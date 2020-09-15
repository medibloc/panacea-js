import {Client} from './Client';
import { APIS } from '../config/default';
import {Transaction} from '../tx';

const { ACCOUNT } = APIS;

export class Account extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getAccount = this.getAccount.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.generateTransferTx = this.generateTransferTx.bind(this);
  }

  /**
   * GET
   * */
  getAccount(address: string): any {
    return this.getRequest(ACCOUNT.account, [address]);
  }

  getBalance(address: string): any {
    return this.getRequest(ACCOUNT.balance, [address]);
  }

  /**
   * POST
   * */
  generateTransferTx(address: string, tx: Transaction): any {
    return this.postRequest(ACCOUNT.transferTx, [address], tx);
  }
}
