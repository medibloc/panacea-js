import {Client} from './Client';
import { APIS } from '../config/default';
import {Transaction} from '../tx';
import {plainToClass} from "class-transformer";
import {Account as Acc} from '../account';
import {Coin} from "../coin";

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
  getAccount(address: string): Promise<Acc> {
    return this.getRequest(ACCOUNT.account, [address])
        .then(function (data: Record<string, Record<string, any>>): Acc {
          return plainToClass(Acc, data.value) // https://cosmos.network/rpc/v0.37.9
        });
  }

  getBalance(address: string): Promise<Coin[]> {
    return this.getRequest(ACCOUNT.balance, [address])
        .then(function (data: Record<string, any>[]): Coin[] {
          return plainToClass(Coin, data);
        })
  }

  /**
   * POST
   * */
  generateTransferTx(address: string, tx: Transaction): Promise<any> {
    return this.postRequest(ACCOUNT.transferTx, [address], tx);
  }
}
