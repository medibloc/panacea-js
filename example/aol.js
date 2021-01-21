// import panaceajs from '../dist/index.js';
import panaceajs from '@medibloc/panacea-js';

const txBroadcastMode = 'block';
const chainId = 'testing';

const client = new panaceajs.Client('http://127.0.0.1:1317');

// Replace address and mnemonic with the real values, before running this example code.
async function getAccount() {
  const account = new panaceajs.Account(await client.Account.getAccount('panacea1d58s72gu0mjkw0lkgyvr0eqzz3mv74awfsjslz'));
  account.setPrivKeyFromMnemonic('document public coconut mandate dawn agree satisfy family earth glimpse extend gas toddler pattern horror bar detect borrow bunker buddy harvest explain purpose fury');
  return account;
}

async function addRecord(account, topicName, key, value) {
  const fee = new panaceajs.Fee();
  fee.setFee('1000000umed');

  let tx = new panaceajs.Tx({
    chainId,
    sequence: account.sequence,
    accountNumber: account.account_number,
    fee,
  });

  const msg = new panaceajs.Message.AOL.AddRecord({
    topicName: topicName,
    key: key,
    value: value,
    writerAddress: account.address,
    ownerAddress: account.address,
  });
  tx.addMsgs(msg);

  tx = account.sign(tx);
  account.increaseSequence();

  const res = await client.Tendermint.broadcastTx(tx.convertToBroadcastTx(txBroadcastMode));
  console.log(res);

  return JSON.parse(Buffer.from(res.data, 'hex').toString());
}

async function getRecord(account, topicName, offset) {
  const record = await client.AOL.getRecord(account.address, topicName, offset);
  console.log(record);
}

async function main() {
  try {
    const account = await getAccount();
    console.log(account);

    const res = await addRecord(account, 'my-topic', 'my-key', 'my-value');
    console.log(res);

    await getRecord(account, 'my-topic', res.value.offset);
  } catch (e) {
    console.error(e);
  }
}

main();

