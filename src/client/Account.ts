import Client from './Client';
import { APIS } from '../config/default';

const { ACCOUNT } = APIS;

export default class Account extends Client {
  constructor(serverUrl: string) {
    super(serverUrl);

    this.getAccount = this.getAccount.bind(this);
    this.getBalance = this.getBalance.bind(this);
    this.generateTransferTx = this.generateTransferTx.bind(this);
  }

  /**
   * GET
   * */
  //TODO @youngjoon-lee: use a proper type for Promise
  getAccount(address: string): Promise<any> {
    return this.getRequest(ACCOUNT.account, [address]);
  }

  //TODO @youngjoon-lee: use a proper type for Promise
  getBalance(address: string): Promise<any> {
    return this.getRequest(ACCOUNT.balance, [address]);
  }

  /**
   * POST
   * */
  //TODO @youngjoon-lee: use a proper type for tx (I don't know yet)
  //TODO @youngjoon-lee: use a proper type for Promise
  generateTransferTx(address: string, tx: any): Promise<any> {
    return this.postRequest(ACCOUNT.transferTx, [address], tx);
  }
}
