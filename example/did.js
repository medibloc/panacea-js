import panaceajs from '@medibloc/panacea-js';
const {Clients, Account, crypto, Tx, Fee, utils, Message} = panaceajs;

const txBroadcastMode = 'block';
const chainId = 'testing';
const didKeyPasswd = 'did-key-passwd';

const client = new Clients('http://127.0.0.1:1317');

// Replace address and mnemonic with the real values, before running this example code.
async function getAccount() {
    const account = await client.Account.getAccount('panacea1d58s72gu0mjkw0lkgyvr0eqzz3mv74awfsjslz');
    account.setPrivKeyFromMnemonic('document public coconut mandate dawn agree satisfy family earth glimpse extend gas toddler pattern horror bar detect borrow bunker buddy harvest explain purpose fury');
    return account;
}

function generateDIDKey() {
    const mnemonic = crypto.generateMnemonic();
    const privKey = crypto.getPrivateKeyFromMnemonic(mnemonic, true, 0, '');
    return crypto.generateKeyStore(privKey, didKeyPasswd);
}

async function createDID(account, keystore) {
    // eslint-disable-next-line no-undef
    console.log(account);
    const fee = new Fee();
    fee.setFee('1000000umed');

    let tx = new Tx(chainId, account.sequence, account.account_number);
    tx.setFee(fee);

    const didPrivKey = crypto.getPrivateKeyFromKeyStore(keystore, didKeyPasswd);
    const didPubKey = crypto.getPublicKeyFromPrivateKey(didPrivKey);
    const didDoc = utils.did.generateDIDDocument('testnet', 'key1', didPubKey);
    const sig = utils.did.sign(didDoc, Message.DID.InitialSequence, didPrivKey);

    const msg = Message.wrap(new Message.DID.CreateDID(
        didDoc.id,
        didDoc,
        didDoc.publicKey[0].id,
        sig,
        account.address,
    ));
    tx.addMsgs([msg]);

    tx = account.sign(tx);
    const res = await client.Tendermint.broadcastTx(tx.convertToBroadcastTx(txBroadcastMode));
    // eslint-disable-next-line no-undef
    console.log(res);

    account.increaseSequence();
    return didDoc.id;
}

async function getDID(did) {
    const didWithSeq = await client.DID.getDID(did);
    return didWithSeq.document;
}

async function updateDID(account, keystore, did, keyId, newDoc) {
    // eslint-disable-next-line no-undef
    console.log(account);
    const fee = new Fee();
    fee.setFee('1000000umed');

    let tx = new Tx(
        chainId,
        account.sequence,
        account.account_number,
    );
    tx.setFee(fee);

    const curDidWithSeq = await client.DID.getDID(did);

    const privKey = crypto.getPrivateKeyFromKeyStore(keystore, didKeyPasswd);
    const sig = utils.did.sign(newDoc, curDidWithSeq.sequence, privKey);

    const msg = Message.wrap(new Message.DID.UpdateDID(
        did,
        newDoc,
        keyId,
        sig,
        account.address,
    ));
    tx.addMsgs([msg]);

    tx = account.sign(tx);
    const res = await client.Tendermint.broadcastTx(tx.convertToBroadcastTx(txBroadcastMode));
    // eslint-disable-next-line no-undef
    console.log(res);

    account.increaseSequence();
}

async function deactivateDID(account, keystore, did, keyId) {
    // eslint-disable-next-line no-undef
    console.log(account);
    const fee = new Fee();
    fee.setFee('1000000umed');

    let tx = new Tx(chainId, account.sequence, account.account_number);
    tx.setFee(fee);

    const curDidWithSeq = await client.DID.getDID(did);

    const privKey = crypto.getPrivateKeyFromKeyStore(keystore, didKeyPasswd);
    const sig = utils.did.sign(did, curDidWithSeq.sequence, privKey);

    const msg = Message.wrap(new Message.DID.DeactivateDID(
        did,
        keyId,
        sig,
        account.address,
    ));
    tx.addMsgs([msg]);

    tx = account.sign(tx);
    const res = await client.Tendermint.broadcastTx(tx.convertToBroadcastTx(txBroadcastMode));
    // eslint-disable-next-line no-undef
    console.log(res);

    account.increaseSequence();
}

async function main() {
    try {
        const account = await getAccount();
        const keystore = generateDIDKey();

        const did = await createDID(account, keystore);

        const doc = await getDID(did);
        // eslint-disable-next-line no-undef
        console.log(doc);

        const keyId = doc.publicKey[0].id;
        const newDoc = doc;
        newDoc.authentication.push(keyId); // just for testing, push the same keyId again.
        await updateDID(account, keystore, did, keyId, newDoc);
        // eslint-disable-next-line no-undef
        console.log(await getDID(did));

        await deactivateDID(account, keystore, did, keyId);
        // eslint-disable-next-line no-undef
        console.log(await getDID(did));
    } catch (e) {
        // eslint-disable-next-line no-undef
        console.error(e);
    }
}

main();

