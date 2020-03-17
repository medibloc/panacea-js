export class Account {
  

    constructor(data: TAccount);

    increaseSequence(): void;

    setAddress(address: any): void;

    setPrivKeyFromMnemonic(mnemonic: any): void;

    setPrivateKey(privateKey: any): void;

    setPublicKey(publicKey: any): void;

    sign(tx: any): any;

    signTxHash(txHash: any): any;

}

export class Fee {
    constructor();

    addCoin(parsedCoin: any): void;

    setFee(fee: any): void;

    setGasLimit(gasLimit: any): void;

    setGasPrice(price: any): void;

}

export class Tx {
    constructor(data: any);

    addMsgs(...args: any[]): void;

    addSignature(pubKey: any, signature: any): void;

    calculateHash(): any;

    convertToBroadcastTx(...args: any[]): any;

    setFee(fee: any): void;

    sign(privateKey: any): any;

    signingData(): any;

}

export function BaseMessage(data: any): void;

export function Client(serverUrl: any): any;

export function Coin(data: any): void;

export namespace Coin {
    function parseCoin(coin: any): any;

}

export namespace Message {
    namespace AOL {
        function AddRecord(data: any): void;

        function AddWriter(data: any): void;

        function CreateTopic(data: any): void;

        function DeleteWriter(data: any): void;

    }

    namespace Distr {
        function ModifyWithdrawAddress(data: any): void;

        function WithdrawReward(data: any): void;

    }

    namespace Slashing {
        function Unjail(data: any): void;

    }

    namespace Staking {
        function CreateValidator(data: any): void;

        function Delegate(data: any): void;

        function EditValidator(data: any): void;

        function Redelegate(data: any): void;

        function Undelegate(data: any): void;

    }

}

export namespace crypto {
    function checkAddress(address: any, hrp: any): any;

    function decodeAddress(value: any): any;

    function encodeAddress(value: any, ...args: any[]): any;

    function generateKeyStore(privateKeyHex: any, ...args: any[]): any;

    function generateMnemonic(): any;

    function generatePrivateKey(): any;

    function generateSignature(signBytesHex: any, privateKey: any): any;

    function generateSignatureFromHash(signHash: any, privateKey: any): any;

    function getAddressFromPrivateKey(privateKeyHex: any, prefix: any): any;

    function getAddressFromPublicKey(publicKeyHex: any, prefix: any): any;

    function getPrivateKeyFromKeyStore(keystore: any, ...args: any[]): any;

    function getPrivateKeyFromMnemonic(mnemonic: any, ...args: any[]): any;

    function getPublicKeyFromPrivateKey(privateKeyHex: any): any;

    function validateMnemonic(mnemonic: any): any;

    function verifySignature(sigHex: any, signBytesHex: any, publicKeyHex: any): any;

}

export namespace utils {
    function ab2hexstring(arr: any): any;

    function ab2str(buf: any): any;

    function ensureHex(str: any): void;

    function hexXor(str1: any, str2: any): any;

    function hexstring2ab(str: any): any;

    function hexstring2str(hexstring: any): any;

    function int2hex(num: any): any;

    function isHex(str: any): any;

    function num2VarInt(num: any): any;

    function num2hexstring(num: any, ...args: any[]): any;

    function reverseArray(arr: any): any;

    function reverseHex(hex: any): any;

    function sha256(hex: any): any;

    function sha256ripemd160(hex: any): any;

    function sha3(hex: any): any;

    function str2ab(str: any): any;

    function str2hexstring(str: any): any;

    namespace encoding {
        function sortJsonProperties(jsonTx: any): any;

    }

    namespace validate {
        function checkParams(...args: any[]): any;

    }

}

