import bech32 from 'bech32';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import secureRandom from 'secure-random';
import browserifiedCrypto from 'crypto-browserify';
import { ec as EC } from 'elliptic';
import is from 'is_js';
import uuid from 'uuid';
import ecc from 'tiny-secp256k1';

import {
  ab2hexstring,
  sha256,
  sha256ripemd160,
  sha3,
} from '../utils';


const PRIVKEY_LEN = 32;
const DECODED_ADDR_LEN = 20; // 20 byte
const HD_PATH = "44'/371'/0'/0/";
const MNEMONIC_LEN = 256; // 256 bit entropy
const CURVE = 'secp256k1';

const ec = new EC(CURVE);


/**
 * Decodes an address in bech32 format.
 * @param {string} value the bech32 address to decode
 */
const decodeAddress = (value) => {
  const { words } = bech32.decode(value);
  return Buffer.from(bech32.fromWords(words));
};

/**
 * Checks whether an address is valid.
 * @param {string} address the bech32 address to decode
 * @param {string} hrp the prefix to check for the bech32 address
 * @return {boolean}
 */
const checkAddress = (address, hrp) => {
  try {
    if (!address.startsWith(hrp)) return false;

    const decodedAddress = bech32.decode(address);
    const decodedAddressLength = decodeAddress(address).length;
    if (decodedAddressLength === DECODED_ADDR_LEN &&
      decodedAddress.prefix === hrp) {
      return true;
    }

    return false;
  } catch (err) {
    return false;
  }
};

/**
 * Encodes an address from input data bytes.
 * @param {string} value the public key to encode
 * @param {*} prefix the address prefix
 * @param {*} type the output type (default: hex)
 */
const encodeAddress = (value, prefix = 'panacea', type = 'hex') => {
  const words = bech32.toWords(Buffer.from(value, type));
  return bech32.encode(prefix, words);
};

/**
 * Generates an arrayBuffer filled with random bits.
 * @param {number} length - Length of buffer.
 * @returns {arrayBuffer}
 */
const generateRandomArray = length => secureRandom(length);

/**
 * Generates 32 bytes of random entropy
 * @param {number} len output length (default: 32 bytes)
 * @returns {string} entropy bytes hexstring
 */
const generatePrivateKey = (len = PRIVKEY_LEN) => ab2hexstring(generateRandomArray(len));

/**
 * @param {string} publicKey - Encoded public key
 * @return {Elliptic.PublicKey} public key hexstring
 */
const getPublicKey = (publicKey) => {
  const keyPair = ec.keyFromPublic(publicKey, 'hex');
  return keyPair.getPublic();
};

/**
 * Calculates the public key from a given private key.
 * @param {string} privateKeyHex the private key hexstring
 * @return {string} public key hexstring
 */
const getPublicKeyFromPrivateKey = (privateKeyHex) => {
  if (!privateKeyHex || privateKeyHex.length !== PRIVKEY_LEN * 2) {
    throw new Error('invalid privateKey');
  }
  const curve = new EC(CURVE);
  const keypair = curve.keyFromPrivate(privateKeyHex, 'hex');
  const pubKey = keypair.getPublic().encode('hex');
  return pubKey;
};

/**
 * PubKey performs the point-scalar multiplication from the privKey on the
 * generator point to get the pubkey.
 * @param {Buffer} privateKey
 * @return {Elliptic.PublicKey} PubKey
 * */
const generatePubKey = (privateKey) => {
  const curve = new EC(CURVE);
  const keypair = curve.keyFromPrivate(privateKey);
  return keypair.getPublic();
};

/**
 * Gets an address from a public key hex.
 * @param {string} publicKeyHex the public key hexstring
 * @param {string} prefix the address prefix
 */
const getAddressFromPublicKey = (publicKeyHex, prefix) => {
  const pubKey = ec.keyFromPublic(publicKeyHex, 'hex');
  const pubPoint = pubKey.getPublic();

  const compressed = pubPoint.encodeCompressed();
  const hexed = ab2hexstring(compressed);
  const hash = sha256ripemd160(hexed); // https://git.io/fAn8N
  const address = encodeAddress(hash, prefix);
  return address;
};

/**
 * Gets an address from a private key.
 * @param {string} privateKeyHex the private key hexstring
 */
const getAddressFromPrivateKey = (privateKeyHex, prefix) => {
  const pubKey = getPublicKeyFromPrivateKey(privateKeyHex);
  return getAddressFromPublicKey(pubKey, prefix);
};

/**
 * Generates a signature (64 byte <r,s>) for a transaction based on given private key.
 * @param {string} signBytesHex - Unsigned transaction sign bytes hexstring.
 * @param {string | Buffer} privateKey - The private key.
 * @return {Buffer} Signature. Does not include tx.
 */
const generateSignature = (signBytesHex, privateKey) => {
  const msgHash = sha256(signBytesHex);
  const msgHashBuf = Buffer.from(msgHash, 'hex');
  const signature = ecc.sign(msgHashBuf, Buffer.from(privateKey, 'hex')); // enc ignored if buffer
  return signature;
};

/**
 * Verifies a signature (64 byte <r,s>) given the sign bytes and public key.
 * @param {string} sigHex - The signature hexstring.
 * @param {string} signBytesHex - Unsigned transaction sign bytes hexstring.
 * @param {string} publicKeyHex - The public key.
 * @return {Buffer} Signature. Does not include tx.
 */
const verifySignature = (sigHex, signBytesHex, publicKeyHex) => {
  const publicKey = Buffer.from(publicKeyHex, 'hex');
  if (!ecc.isPoint(publicKey)) throw new Error('Invalid public key provided');

  const msgHash = sha256(signBytesHex);
  const msgHashBuf = Buffer.from(msgHash, 'hex');
  return ecc.verify(msgHashBuf, publicKey, Buffer.from(sigHex, 'hex'));
};

// TODO @ggomma check compatibility with old panacea-js
/**
 * Generates a keystore object(web3 secret storage format) given private key to store.
 * @param {string} privateKeyHex the private key hexstring.
 * @param {string} password the password.
 * @return {object} the keystore object.
 */
const generateKeyStore = (privateKeyHex, password) => {
  const salt = browserifiedCrypto.randomBytes(32);
  const iv = browserifiedCrypto.randomBytes(16);
  const cipherAlg = 'aes-256-ctr';

  const kdf = 'pbkdf2';
  const kdfparams = {
    dklen: 32,
    salt: salt.toString('hex'),
    c: 262144,
    prf: 'hmac-sha256',
  };

  const derivedKey = browserifiedCrypto.pbkdf2Sync(Buffer.from(password), salt, kdfparams.c, kdfparams.dklen, 'sha256');
  const cipher = browserifiedCrypto.createCipheriv(cipherAlg, derivedKey.slice(0, 32), iv);
  if (!cipher) {
    throw new Error('Unsupported cipher');
  }

  const cipherText = Buffer.concat([cipher.update(Buffer.from(privateKeyHex, 'hex')), cipher.final()]);
  const bufferValue = Buffer.concat([derivedKey.slice(16, 32), Buffer.from(cipherText, 'hex')]);

  return {
    version: 1,
    id: uuid.v4({
      random: browserifiedCrypto.randomBytes(16),
    }),
    crypto: {
      ciphertext: cipherText.toString('hex'),
      cipherparams: {
        iv: iv.toString('hex'),
      },
      cipher: cipherAlg,
      kdf,
      kdfparams,
      // mac must use sha3 according to web3 secret storage spec
      mac: sha3(bufferValue.toString('hex')),
    },
  };
};

// TODO @ggomma check compatibility with old panacea-js
/**
 * Gets a private key from a keystore given its password.
 * @param {string} keystore the keystore in json format
 * @param {string} password the password.
 */
const getPrivateKeyFromKeyStore = (keystore, password) => {
  if (!is.string(password)) {
    throw new Error('No password given');
  }

  const json = is.object(keystore) ? keystore : JSON.parse(keystore);
  const { kdfparams, ciphertext } = json.crypto;

  if (kdfparams.prf !== 'hmac-sha256') {
    throw new Error('Unsupported parameters to PBKDF2');
  }

  const derivedKey = browserifiedCrypto.pbkdf2Sync(
    Buffer.from(password), // password
    Buffer.from(kdfparams.salt, 'hex'), // salt
    kdfparams.c, // iteration
    kdfparams.dklen, // keylen
    'sha256', // digest
  );
  const ciphertextBuf = Buffer.from(ciphertext, 'hex');
  const bufferValue = Buffer.concat([derivedKey.slice(16, 32), ciphertextBuf]);

  // try sha3 (new / ethereum keystore) mac first
  const mac = sha3(bufferValue.toString('hex'));
  if (mac !== json.crypto.mac) {
    // the legacy (sha256) mac is next to be checked.
    // pre-testnet keystores used a sha256 digest for the mac.
    // the sha256 mac was not compatible with ethereum keystores,
    // so it was changed to sha3 for mainnet.
    const macLegacy = sha256(bufferValue.toString('hex'));
    if (macLegacy !== json.crypto.mac) {
      throw new Error('Keystore mac check failed (sha3 & sha256) - wrong password?');
    }
  }

  const decipher = browserifiedCrypto.createDecipheriv(
    json.crypto.cipher,
    derivedKey.slice(0, 32),
    Buffer.from(json.crypto.cipherparams.iv, 'hex'),
  );
  const privateKeyBuf = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  const privateKey = privateKeyBuf.toString('hex');
  return privateKey;
};

/**
 * Generates mnemonic phrase words using random entropy.
 */
const generateMnemonic = () => bip39.generateMnemonic(MNEMONIC_LEN);

/**
 * Validates mnemonic phrase words.
 * @param {string} mnemonic the mnemonic phrase words
 * @return {bool} validation result
 */
const validateMnemonic = mnemonic => bip39.validateMnemonic(mnemonic);

/**
 * Get a private key from mnemonic words.
 * @param {string} mnemonic the mnemonic phrase words
 * @param {Boolean} derive derive a private key using the default HD path (default: true)
 * @param {number} index the bip44 address index (default: 0)
 * @param {string} password according to bip39
 * @return {string} hexstring
 */
const getPrivateKeyFromMnemonic = (mnemonic, derive = true, index = 0, password = '') => {
  if (!validateMnemonic(mnemonic)) {
    throw new Error('wrong mnemonic format');
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic, password);
  if (derive) {
    const master = bip32.fromSeed(seed);
    const child = master.derivePath(HD_PATH + index);
    return child.privateKey.toString('hex');
  }
  return seed.toString('hex');
};


export {
  decodeAddress,
  checkAddress,
  encodeAddress,
  generatePrivateKey,
  generateRandomArray,
  getPublicKey,
  getPublicKeyFromPrivateKey,
  generatePubKey,
  getAddressFromPublicKey,
  getAddressFromPrivateKey,
  generateSignature,
  verifySignature,
  generateKeyStore,
  getPrivateKeyFromKeyStore,
  generateMnemonic,
  validateMnemonic,
  getPrivateKeyFromMnemonic,
};