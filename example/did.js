// eslint-disable-next-line import/extensions
import panaceajs from '../lib/index.js';

const txBroadcastMode = 'block';
const chainId = 'testing';
const didKeyPasswd = 'did-key-passwd';

const client = new panaceajs.Client('http://127.0.0.1:1317');

// Replace address and mnemonic with the real values, before running this example code.
async function getAccount() {
  const account = new panaceajs.Account(await client.Account.getAccount('panacea1d58s72gu0mjkw0lkgyvr0eqzz3mv74awfsjslz'));
  account.setPrivKeyFromMnemonic('document public coconut mandate dawn agree satisfy family earth glimpse extend gas toddler pattern horror bar detect borrow bunker buddy harvest explain purpose fury');
  return account;
}

function generateDIDKey() {
  const mnemonic = panaceajs.crypto.generateMnemonic();
  const privKey = panaceajs.crypto.getPrivateKeyFromMnemonic(mnemonic, true, 0, '');
  return panaceajs.crypto.generateKeyStore(privKey, didKeyPasswd);
}

async function createDID(account, keystore) {
  console.log(account);
  const fee = new panaceajs.Fee();
  fee.setFee('1000000umed');

  let tx = new panaceajs.Tx({
    chainId,
    sequence: account.sequence,
    accountNumber: account.account_number,
    fee,
  });

  const didPrivKey = panaceajs.crypto.getPrivateKeyFromKeyStore(keystore, didKeyPasswd);
  const didPubKey = panaceajs.crypto.getPublicKeyFromPrivateKey(didPrivKey);
  const didDoc = panaceajs.utils.did.generateDIDDocument('testnet', 'key1', didPubKey);

  const msg = new panaceajs.Message.DID.CreateDID({
    did: didDoc.id,
    document: didDoc,
    fromAddress: account.address,
  });
  tx.addMsgs(msg);

  tx = account.sign(tx);
  const res = await client.Tendermint.broadcastTx(tx.convertToBroadcastTx(txBroadcastMode));
  console.log(res);

  account.increaseSequence();
  return didDoc.id;
}

async function getDID(did) {
  const didWithSeq = await client.DID.getDID(did);
  return didWithSeq.document;
}

async function updateDID(account, keystore, did, keyId, newDoc) {
  console.log(account);
  const fee = new panaceajs.Fee();
  fee.setFee('1000000umed');

  let tx = new panaceajs.Tx({
    chainId,
    sequence: account.sequence,
    accountNumber: account.account_number,
    fee,
  });

  const curDidWithSeq = await client.DID.getDID(did);

  const privKey = panaceajs.crypto.getPrivateKeyFromKeyStore(keystore, didKeyPasswd);
  const sig = panaceajs.utils.did.sign(newDoc, curDidWithSeq.sequence, privKey);

  const msg = new panaceajs.Message.DID.UpdateDID({
    did,
    document: newDoc,
    sigKeyId: keyId,
    signature: sig,
    fromAddress: account.address,
  });
  tx.addMsgs(msg);

  tx = account.sign(tx);
  const res = await client.Tendermint.broadcastTx(tx.convertToBroadcastTx(txBroadcastMode));
  console.log(res);

  account.increaseSequence();
}

async function deleteDID(account, keystore, did, keyId) {
  console.log(account);
  const fee = new panaceajs.Fee();
  fee.setFee('1000000umed');

  let tx = new panaceajs.Tx({
    chainId,
    sequence: account.sequence,
    accountNumber: account.account_number,
    fee,
  });

  const curDidWithSeq = await client.DID.getDID(did);

  const privKey = panaceajs.crypto.getPrivateKeyFromKeyStore(keystore, didKeyPasswd);
  const sig = panaceajs.utils.did.sign(did, curDidWithSeq.sequence, privKey);

  const msg = new panaceajs.Message.DID.DeleteDID({
    did,
    sigKeyId: keyId,
    signature: sig,
    fromAddress: account.address,
  });
  tx.addMsgs(msg);

  tx = account.sign(tx);
  const res = await client.Tendermint.broadcastTx(tx.convertToBroadcastTx(txBroadcastMode));
  console.log(res);

  account.increaseSequence();
}

async function main() {
  const account = await getAccount();
  const keystore = generateDIDKey();

  const did = await createDID(account, keystore);

  const doc = await getDID(did);
  console.log(doc);

  const keyId = doc.publicKey[0].id;
  const newDoc = doc;
  newDoc.authentication.push(keyId); // just for testing, push the same keyId again.
  await updateDID(account, keystore, did, keyId, newDoc);
  console.log(await getDID(did));

  await deleteDID(account, keystore, did, keyId);
  console.log(await getDID(did));
}

main();

