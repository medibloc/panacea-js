import bech32 from 'bech32';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
import secureRandom from 'secure-random';
import browserifiedCrypto from 'crypto-browserify';
import { ec as EC } from 'elliptic';
import is from 'is_js';
import uuid from 'uuid';
import ecc from 'secp256k1';
import createHash from 'crypto';

import {
  ab2hexstring, isHex,
  sha256,
  sha256ripemd160,
  sha3,
} from '../utils';
import {
  CURVE,
  DECODED_ADDR_LEN,
  DEFAULT_PREFIX, HD_PATH,
  MNEMONIC_LEN,
  PRIVKEY_LEN,
  PRIVKEY_MAX,
} from '../config/default';


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
    return (decodedAddressLength === DECODED_ADDR_LEN &&
      decodedAddress.prefix === hrp);
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
const encodeAddress = (value, prefix = DEFAULT_PREFIX, type = 'hex') => {
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
 * @returns {string} entropy bytes hex string
 */
const generatePrivateKey = () => {
  const privKey = ab2hexstring(generateRandomArray(PRIVKEY_LEN));
  if (parseInt(privKey, 16) > parseInt(PRIVKEY_MAX, 16)) return generatePrivateKey();
  return privKey;
};

/**
 * Calculates the public key from a given private key.
 * @param {string} privateKeyHex the private key hexstring
 * @return {string} public key hexstring
 */
const getPublicKeyFromPrivateKey = (privateKeyHex) => {
  if (!privateKeyHex || privateKeyHex.length !== PRIVKEY_LEN * 2 || !isHex(privateKeyHex)) {
    throw new Error('invalid privateKey');
  }
  const privKeyBuffer = Buffer.from(privateKeyHex, 'hex');
  const pubKey = ecc.publicKeyCreate(privKeyBuffer).toString('hex');
  return pubKey;
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
  return encodeAddress(hash, prefix);
};

/**
 * Gets an address from a private key.
 * @param {string} privateKeyHex the private key hex string
 * @param {string} prefix the hrp
 */
const getAddressFromPrivateKey = (privateKeyHex, prefix) => {
  const pubKey = getPublicKeyFromPrivateKey(privateKeyHex);
  return getAddressFromPublicKey(pubKey, prefix);
};

/**
 * Generates a signature (64 byte <r,s>) for a transaction based on given private key.
 * @param {string} signBytesHex - Unsigned transaction sign bytes hex string.
 * @param {string | Buffer} privateKey - The private key.
 * @return {string} Signature. Does not include tx.
 */
const generateSignature = (signBytesHex, privateKey) => {
  const msgHash = sha256(signBytesHex);
  const msgHashBuf = Buffer.from(msgHash, 'hex');
  const privKeyBuf = Buffer.from(privateKey, 'hex');
  const signature = ecc.sign(msgHashBuf, privKeyBuf); // enc ignored if buffer
  return signature.signature.toString('hex');
};

/**
 * Generates a signature (64 byte <r,s>) for a transaction based on given private key.
 * @param {string} signHash - Unsigned transaction hash string.
 * @param {string | Buffer} privateKey - The private key.
 * @return {string} Signature. Does not include tx.
 */
const generateSignatureFromHash = (signHash, privateKey) => {
  const msgHashBuf = Buffer.from(signHash, 'hex');
  const privKeyBuf = Buffer.from(privateKey, 'hex');
  const signature = ecc.sign(msgHashBuf, privKeyBuf); // enc ignored if buffer
  return signature.signature.toString('hex');
};

/**
 * Verifies a signature (64 byte <r,s>) given the sign bytes and public key.
 * @param {string} sigHex - The signature hex string.
 * @param {string} signBytesHex - Unsigned transaction sign bytes hex string.
 * @param {string} publicKeyHex - The public key.
 * @return {boolean}
 */
const verifySignature = (sigHex, signBytesHex, publicKeyHex) => {
  const pubKeyBuf = Buffer.from(publicKeyHex, 'hex');
  const msgHash = sha256(signBytesHex);
  const msgHashBuf = Buffer.from(msgHash, 'hex');
  const sigBuf = Buffer.from(sigHex, 'hex');
  return ecc.verify(msgHashBuf, sigBuf, pubKeyBuf);
};

// TODO @ggomma check compatibility with old panacea-js
/**
 * Generates a keystore object(web3 secret storage format) given private key to store.
 * @param {string} privateKeyHex the private key hexstring.
 * @param {string} password the password.
 * @return {object} the keystore object.
 */
const generateKeyStore = (privateKeyHex, password = '') => {
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
 * @param {object} keystore the keystore in json format
 * @param {string} password the password.
 */
const getPrivateKeyFromKeyStore = (keystore, password = '') => {
  if (!is.string(password)) {
    throw new Error('No password given');
  }

  const json = is.json(keystore) ? keystore : JSON.parse(keystore);
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
  const privateKeyBuf = Buffer.concat([decipher.update(ciphertextBuf), decipher.final()]);
  return privateKeyBuf.toString('hex');
};

/**
 * Generates mnemonic phrase words using random entropy.
 */
const generateMnemonic = () => bip39.generateMnemonic(MNEMONIC_LEN);

const entropyToMnemonic = (entropy) => {
  const hashed = createHash('sha256').update(entropy).digest('hex');
  bip39.entropyToMnemonic(hashed);
};

/**
 * Validates mnemonic phrase words.
 * @param {string} mnemonic the mnemonic phrase words
 * @return {boolean} validation result
 */
const validateMnemonic = mnemonic => bip39.validateMnemonic(mnemonic);

/**
 * Get a private key from mnemonic words.
 * @param {string} mnemonic the mnemonic phrase words
 * @param {Boolean} derive derive a private key using the default HD path (default: true)
 * @param {number} index the bip44 address index (default: 0)
 * @param {string} password according to bip39
 * @return {string} hex string
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

const getSharedSecret = (publicKey, privateKey) => {
  const shared = ecc.ecdhUnsafe(publicKey, privateKey, true);
  return createHash('md5').update(shared).digest('hex');
};


export {
  decodeAddress,
  checkAddress,
  encodeAddress,
  generatePrivateKey,
  getPublicKeyFromPrivateKey,
  getAddressFromPublicKey,
  getAddressFromPrivateKey,
  generateSignature,
  generateSignatureFromHash,
  verifySignature,
  generateKeyStore,
  getPrivateKeyFromKeyStore,
  generateMnemonic,
  entropyToMnemonic,
  validateMnemonic,
  getPrivateKeyFromMnemonic,
  getSharedSecret,
};
