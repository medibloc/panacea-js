import BaseHandler from './Client';

import Account from './Account';
import AOL from './AOL';
import DID from './DID';
import Distribution from './Distribution';
import Governance from './Governance';
import Minting from './Minting';
import Slashing from './Slashing';
import Staking from './Staking';
import Tendermint from './Tendermint';
import Version from './Version';


class Client extends BaseHandler {
  constructor(serverUrl) {
    super(serverUrl);

    this.Account = new Account(serverUrl);
    this.AOL = new AOL(serverUrl);
    this.DID = new DID(serverUrl);
    this.Distribution = new Distribution(serverUrl);
    this.Governance = new Governance(serverUrl);
    this.Minting = new Minting(serverUrl);
    this.Slashing = new Slashing(serverUrl);
    this.Staking = new Staking(serverUrl);
    this.Tendermint = new Tendermint(serverUrl);
    this.Version = new Version(serverUrl);
  }
}

export default Client;
