/**
 * Crypto
 */
export const DEFAULT_PREFIX = 'panacea';
export const PRIVKEY_LEN = 32; // 32bytes
export const PRIVKEY_MAX = 'FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140'; // based on https://en.bitcoin.it/wiki/Secp256k1
export const MNEMONIC_LEN = 256; // 256 bit entropy
export const DECODED_ADDR_LEN = 20; // 20 byte
export const HD_PATH = "44'/371'/0'/0/";
export const CURVE = 'secp256k1';

/**
 * TX
 */
export const DENOM = 'umed';
export const QUERY = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
};
