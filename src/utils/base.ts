/* eslint-disable */
import hexEncoding from 'crypto-js/enc-hex';
import SHA3 from 'crypto-js/sha3';
import SHA256 from 'crypto-js/sha256';
import RIPEMD160 from 'crypto-js/ripemd160';

/**
 * @param {arrayBuffer} buf
 * @returns {string} ASCII string
 */
export const ab2str = (buf: Uint8Array): string =>
  String.fromCharCode.apply(null, Array.from(buf));

/**
 * @param {string} str - ASCII string
 * @returns {arrayBuffer}
 */
export const str2ab = (str: string): Uint8Array => {
  const result = new Uint8Array(str.length);
  for (let i = 0, strLen = str.length; i < strLen; i += 1) {
    result[i] = str.charCodeAt(i);
  }
  return result;
};

/**
 * @param {string} str - HEX string
 * @returns {number[]}
 */
export const hexstring2ab = (str: string): Uint8Array => {
  ensureHex(str);
  if (!str.length) {
    return new Uint8Array();
  }
  const iters = str.length / 2;
  const result = new Uint8Array(iters);
  for (let i = 0; i < iters; i += 1) {
    result[i] = parseInt(str.substring(0, 2), 16);
    str = str.substring(2);
  }
  return result;
};

/**
 * @param {arrayBuffer} arr
 * @returns {string} HEX string
 */
export const ab2hexstring = (arr: Uint8Array): string => {
  let result = '';
  for (let i = 0; i < arr.length; i += 1) {
    const str = arr[i].toString(16);

    if (str.length === 0) result += '00';
    else if (str.length === 1) result += `0${str}`;
    else result += str;
  }
  return result;
};

/**
 * @param {string} str - ASCII string
 * @returns {string} HEX string
 */
export const str2hexstring = (str: string): string => ab2hexstring(str2ab(str));

/**
 * @param {string} hexstring - HEX string
 * @returns {string} ASCII string
 */
export const hexstring2str = (hexstring: string): string => ab2str(hexstring2ab(hexstring));

/**
 * convert an integer to big endian hex and add leading zeros
 * @param {Number} num
 * @returns {string}
 */
export const int2hex = (num: number): string => {
  const h = num.toString(16);
  return h.length % 2 ? `0${h}` : h;
};

/**
 * Converts a number to a big endian hexstring of a suitable size, optionally little endian
 * @param {Number} num
 * @param {Number} size - The required size in bytes, eg 1 for Uint8, 2 for Uint16. Defaults to 1.
 * @param {Boolean} littleEndian - Encode the hex in little endian form
 * @return {string}
 */
export const num2hexstring = (num: number, size = 1, littleEndian = false): string => {
  if (num < 0) {
    throw new RangeError('num is unsigned (>= 0)');
  }
  if (size % 1 !== 0) {
    throw new Error('size must be a whole integer');
  }
  if (!Number.isSafeInteger(num)) {
    throw new RangeError(`num (${num}) must be a safe integer`);
  }

  size *= 2;
  let hexstring = num.toString(16);
  hexstring = hexstring.length % size === 0 ? hexstring : ('0'.repeat(size) + hexstring).substring(hexstring.length);
  if (littleEndian) {
    hexstring = reverseHex(hexstring);
  }
  return hexstring;
};

/**
 * Converts a number to a variable length Int. Used for array length header
 * @param {Number} num - The number
 * @returns {string} hexstring of the variable Int.
 */
export const num2VarInt = (num: number): string => {
  if (num < 0xfd) {
    return num2hexstring(num);
  } else if (num <= 0xffff) {
    // uint16
    return `fd${num2hexstring(num, 2, true)}`;
  } else if (num <= 0xffffffff) {
    // uint32
    return `fe${num2hexstring(num, 4, true)}`;
  }
  // uint64
  return `ff${num2hexstring(num, 8, true)}`;
};

/**
 * XORs two hexstrings
 * @param {string} str1 - HEX string
 * @param {string} str2 - HEX string
 * @returns {string} XOR output as a HEX string
 */
export const hexXor = (str1: string, str2: string): string => {
  ensureHex(str1);
  ensureHex(str2);
  if (str1.length !== str2.length) {
    throw new Error('strings are disparate lengths');
  }

  const result = [];
  for (let i = 0; i < str1.length; i += 2) {
    result.push(parseInt(str1.substr(i, 2), 16) ^ parseInt(str2.substr(i, 2), 16));
  }
  return ab2hexstring(new Uint8Array(result));
};

/**
 * Reverses an array. Accepts arrayBuffer.
 * @param {Array} arr
 * @returns {Uint8Array}
 */
export const reverseArray = (arr: Uint8Array): Uint8Array => {
  if (!arr.length) {
    throw new Error("reverseArray expects an non-empty array")
  }
  let result = new Uint8Array(arr.length)
  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[arr.length - 1 - i]
  }

  return result
}

/**
 * Reverses a HEX string, treating 2 chars as a byte.
 * @example
 * reverseHex('abcdef') = 'efcdab'
 * @param {string} hex - HEX string
 * @return {string} HEX string reversed in 2s.
 */
export const reverseHex = (hex: string): string => {
  ensureHex(hex)
  let out = ""
  for (let i = hex.length - 2; i >= 0; i -= 2) {
    out += hex.substr(i, 2)
  }
  return out
}

export const hexRegex = /^([0-9A-Fa-f]{2})*$/

/**
 * Checks if input is a hexstring. Empty string is considered a hexstring.
 * @example
 * isHex('0101') = true
 * isHex('') = true
 * isHex('0x01') = false
 * @param {string} str
 * @return {boolean}
 */
export const isHex = (str: string): boolean => {
  try {
    return hexRegex.test(str)
  } catch (err) {
    return false
  }
}

/**
 * Throws an error if input is not hexstring.
 * @param {string} str
 */
export const ensureHex = (str: string): void => {
  if (!isHex(str)) {
    throw new Error(`Expected a hexstring but got ${str}`)
  }
}

/**
 * Computes a SHA256 followed by a RIPEMD160.
 * @param {string} hex message to hash
 * @returns {string} hash output
 */
export const sha256ripemd160 = (hex: string): string => {
  if (hex.length % 2 !== 0) {
    throw new Error(`invalid hex string length: ${hex}`);
  }
  const hexEncoded = hexEncoding.parse(hex);
  const ProgramSha256 = SHA256(hexEncoded);
  return RIPEMD160(hexEncoding.parse(ProgramSha256.toString())).toString();
};

/**
 * Computes a single SHA256 digest.
 * @param {string} hex message to hash
 * @returns {string} hash output
 */
export const sha256 = (hex: string): string => {
  if (hex.length % 2 !== 0) {
    throw new Error(`invalid hex string length: ${hex}`)
  }
  const hexEncoded = hexEncoding.parse(hex);
  return SHA256(hexEncoded).toString();
};

/**
 * Computes a single SHA3-Keccak digest.
 * @param {string} hex message to hash
 * @param {number} outputLength output length in bits (224, 256, 384, or 512)
 * @returns {string} hash output
 */
export const sha3keccak = (hex: string, outputLength: number): string => {
  if (hex.length % 2 != 0) {
    throw new Error(`invalid hex string length: ${hex}`);
  }
  const hexEncoded = hexEncoding.parse(hex);
  return SHA3(hexEncoded, { outputLength: outputLength }).toString();
};
