import bech32 from 'bech32';
import * as bip32 from 'bip32';
import * as bip39 from 'bip39';
const secureRandom = require('secure-random');
const browserifiedCrypto = require('crypto-browserify');
import { ec as EC } from 'elliptic';
import is from "is_js";
import { v4 as uuidv4} from 'uuid';
import ecc from 'secp256k1';

import base from '../utils';
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
export const decodeAddress = (value: string): Buffer => {
  const { words } = bech32.decode(value);
  return Buffer.from(bech32.fromWords(words));
};

/**
 * Checks whether an address is valid.
 * @param {string} address the bech32 address to decode
 * @param {string} hrp the prefix to check for the bech32 address
 * @return {boolean}
 */
export const checkAddress = (address: string, hrp: string): boolean => {
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
export const encodeAddress = (value: string, prefix = DEFAULT_PREFIX, type: BufferEncoding = 'hex') => {
  const words = bech32.toWords(Buffer.from(value, type));
  return bech32.encode(prefix, words);
};

/**
 * Generates an arrayBuffer filled with random bits.
 * @param {number} length - Length of buffer.
 * @returns {arrayBuffer}
 */
export const generateRandomArray = (length: number)  => secureRandom(length);

/**
 * Generates 32 bytes of random entropy
 * @returns {string} entropy bytes hex string
 */
export const generatePrivateKey = (): string => {
  const privKey = base.ab2hexstring(generateRandomArray(PRIVKEY_LEN));
  if (parseInt(privKey, 16) > parseInt(PRIVKEY_MAX, 16)) return generatePrivateKey();
  return privKey;
};

/**
 * Calculates the public key from a given private key.
 * @param {string} privateKeyHex the private key hexstring
 * @return {string} public key hexstring
 */
export const getPublicKeyFromPrivateKey = (privateKeyHex: string): string => {
  if (!privateKeyHex || privateKeyHex.length !== PRIVKEY_LEN * 2 || !base.isHex(privateKeyHex)) {
    throw new Error('invalid privateKey');
  }
  const privKeyBuffer = Buffer.from(privateKeyHex, 'hex');
  return Buffer.from(ecc.publicKeyCreate(privKeyBuffer)).toString('hex');
};

/**
 * Gets an address from a public key hex.
 * @param {string} publicKeyHex the public key hexstring
 * @param {string} prefix the address prefix
 */
export const getAddressFromPublicKey = (publicKeyHex: string, prefix: string): string => {
  const pubKey = ec.keyFromPublic(publicKeyHex, 'hex');
  const pubPoint = pubKey.getPublic();

  const compressed = pubPoint.encodeCompressed();
  const hexed = base.ab2hexstring(new Uint8Array(compressed));
  const hash = base.sha256ripemd160(hexed); // https://git.io/fAn8N
  return encodeAddress(hash, prefix);
};

/**
 * Gets an address from a private key.
 * @param {string} privateKeyHex the private key hex string
 * @param {string} prefix the hrp
 */
export const getAddressFromPrivateKey = (privateKeyHex: string, prefix: string): string => {
  const pubKey = getPublicKeyFromPrivateKey(privateKeyHex);
  return getAddressFromPublicKey(pubKey, prefix);
};

/**
 * Generates a signature (64 byte <r,s>) for a transaction
 * @param {string} signBytesHex - Unsigned transaction sign bytes hex string.
 * @param {string | Buffer} privateKey - The private key.
 * @return {string} Signature. Does not include tx.
 */
export const generateSignature = (signBytesHex: string, privateKey: string): string => {
  const msgHash = base.sha256(signBytesHex);
  const msgHashBuf = Buffer.from(msgHash, 'hex');
  const privKeyBuf = Buffer.from(privateKey, 'hex');
  const signature = ecc.ecdsaSign(msgHashBuf, privKeyBuf); // enc ignored if buffer //TODO @youngjoon-lee: what does this comment mean?
  return Buffer.from(signature.signature).toString('hex');
};

/**
 * Generates a signature (64 byte <r,s>) for a transaction
 * @param {string} signHash - Unsigned transaction hash string.
 * @param {string | Buffer} privateKey - The private key.
 * @return {string} Signature. Does not include tx.
 */
export const generateSignatureFromHash = (signHash: string, privateKey: string): string => {
  const msgHashBuf = Buffer.from(signHash, 'hex');
  const privKeyBuf = Buffer.from(privateKey, 'hex');
  const signature = ecc.ecdsaSign(msgHashBuf, privKeyBuf); // enc ignored if buffer //TODO @youngjoon-lee: what does this comment mean?
  return Buffer.from(signature.signature).toString('hex');
};

/**
 * Verifies a signature (64 byte <r,s>) given the sign bytes and public key.
 * @param {string} sigHex - The signature hex string.
 * @param {string} signBytesHex - Unsigned transaction sign bytes hex string.
 * @param {string} publicKeyHex - The public key.
 * @return {boolean}
 */
export const verifySignature = (sigHex: string, signBytesHex: string, publicKeyHex: string): boolean => {
  const pubKeyBuf = Buffer.from(publicKeyHex, 'hex');
  const msgHash = base.sha256(signBytesHex);
  const msgHashBuf = Buffer.from(msgHash, 'hex');
  const sigBuf = Buffer.from(sigHex, 'hex');
  return ecc.ecdsaVerify(sigBuf, msgHashBuf, pubKeyBuf);
};

/**
 * Returns a key size of the given cipher algorithm.
 * If the given cipher algorithm is not supported, it throws an error.
 * @param {string} cipherAlgo The cipher algorithm
 * @returns {number} The cipher key size in bytes (eg. 16, 32, ...)
 */
export const getCipherKeySize = (cipherAlgo: string): number => {
  switch (cipherAlgo) {
    case 'aes-128-ctr':
      return 16;
    case 'aes-256-ctr':
      return 32;
    default:
      throw new Error(`Unsupported cipher algorithm: ${cipherAlgo}`);
  }
};

// TODO @ggomma check compatibility with old panacea-js
/**
 * Generates a keystore object(web3 secret storage format) given private key to store.
 * @param {string} privateKeyHex the private key hexstring.
 * @param {string} password the password.
 * @return {object} the keystore object.
 */
// TODO @youngjoon-lee: return a Keystore object (to be defined)
export const generateKeyStore = (privateKeyHex: string, password = ''): Record<string, any> => {
  const salt = browserifiedCrypto.randomBytes(32);
  const iv = browserifiedCrypto.randomBytes(16);
  const cipherAlg = 'aes-128-ctr';

  const kdf = 'pbkdf2';
  const kdfparams = {
    dklen: 32,
    salt: salt.toString('hex'),
    c: 262144,
    prf: 'hmac-sha256',
  };

  const derivedKey = browserifiedCrypto.pbkdf2Sync(Buffer.from(password), salt, kdfparams.c, kdfparams.dklen, 'sha256');
  const derivedKeyForCipher = derivedKey.slice(0, getCipherKeySize(cipherAlg));
  const cipher = browserifiedCrypto.createCipheriv(cipherAlg, derivedKeyForCipher, iv);
  if (!cipher) {
    throw new Error('Unsupported cipher');
  }

  const cipherText = Buffer.concat([cipher.update(Buffer.from(privateKeyHex, 'hex')), cipher.final()]);
  const bufferValue = Buffer.concat([derivedKey.slice(16, 32), cipherText]);

  return {
    version: 3,
    id: uuidv4({
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
      // mac must use sha3-keccak256 according to web3 secret storage spec
      mac: base.sha3keccak(bufferValue.toString('hex'), 256),
    },
  };
};

// TODO @ggomma check compatibility with old panacea-js
/**
 * Gets a private key from a keystore given its password.
 * @param {object} keystore the keystore in json format
 * @param {string} password the password.
 */
// TODO @youngjoon-lee: accept a Keystore object (to be defined), or make this as a member function of the Keystore class
export const getPrivateKeyFromKeyStore = (keystore: Record<string, any> | string, password = ''): string => {
  if (!is.string(password)) {
    throw new Error('No password given');
  }

  const json = is.json(keystore) ? keystore : JSON.parse(keystore as string);
  const { kdfparams, ciphertext } = json.crypto;

  // `version !== 1` is only for the backward compatibility.
  // Previously, the version had been defined as 1 (by mistake),
  // even though we have followed the format of version 3.
  if (json.version !== 3 && json.version !== 1) {
    throw new Error(`Unsupported version: ${json.version}`);
  }

  if (kdfparams.prf !== 'hmac-sha256') {
    throw new Error(`Unsupported parameters to PBKDF2 PRF: ${kdfparams.prf}`);
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

  // try sha3-keccak256 (new / ethereum keystore) mac first
  const mac = base.sha3keccak(bufferValue.toString('hex'), 256);
  if (mac !== json.crypto.mac) {
    // try again with the legacy format: sha3-keccak512
    let macLegacy = base.sha3keccak(bufferValue.toString('hex'), 512);
    if (macLegacy !== json.crypto.mac) {
      // the other legacy (sha256) mac is next to be checked.
      // pre-testnet keystores used a sha256 digest for the mac.
      // the sha256 mac was not compatible with ethereum keystores,
      // so it was changed to sha3 for mainnet.
      macLegacy = base.sha256(bufferValue.toString('hex'));
      if (macLegacy !== json.crypto.mac) {
        throw new Error('Keystore mac check failed (sha3-keccak256 & sha3-keccak512 & sha256) - wrong password?');
      }
    }
  }

  const decipher = browserifiedCrypto.createDecipheriv(
    json.crypto.cipher,
    derivedKey.slice(0, getCipherKeySize(json.crypto.cipher)),
    Buffer.from(json.crypto.cipherparams.iv, 'hex'),
  );
  const privateKeyBuf = Buffer.concat([decipher.update(ciphertextBuf), decipher.final()]);
  return privateKeyBuf.toString('hex');
};

/**
 * Generates mnemonic phrase words using random entropy.
 */
export const generateMnemonic = (): string => bip39.generateMnemonic(MNEMONIC_LEN);

export const entropyToMnemonic = (entropy: string): string => {
  const hashed = browserifiedCrypto.createHash('sha256').update(entropy).digest('hex');
  return bip39.entropyToMnemonic(hashed);
};

/**
 * Validates mnemonic phrase words.
 * @param {string} mnemonic the mnemonic phrase words
 * @return {boolean} validation result
 */
export const validateMnemonic = (mnemonic: string): boolean => bip39.validateMnemonic(mnemonic);

/**
 * Get a private key from mnemonic words.
 * @param {string} mnemonic the mnemonic phrase words
 * @param {Boolean} derive derive a private key using the default HD path (default: true)
 * @param {number} index the bip44 address index (default: 0)
 * @param {string} password according to bip39
 * @return {string} hex string
 */
export const getPrivateKeyFromMnemonic = (mnemonic: string, derive = true, index = 0, password = ''): string => {
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

export const getSharedSecret = (publicKey: Uint8Array, privateKey: Uint8Array): string => {
  const shared = ecc.ecdh(publicKey, privateKey);
  return browserifiedCrypto.createHash('md5').update(shared).digest('hex');
};
