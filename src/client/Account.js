import Client from './Client';
import { APIS } from '../../config';

const { ACCOUNT } = APIS;

class Account extends Client {
  constructor(serverUrl) {
    super(serverUrl);
  }

  getAccount(address) {
    return this.getRequest(ACCOUNT.account, [address]);
  }

  getBalance(address) {
    return this.getRequest(ACCOUNT.balance, [address]);
  }
}

export default Account;
