import { DIDDocument, DIDPubKey } from '../message/DID';
import { sortJsonProperties } from './encoding';
import { generateSignatureFromHash } from '../crypto';
import { sha256 } from './base';

const bs58 = require('bs58');

const didMethod = 'panacea';
const keyType = 'Secp256k1VerificationKey2018';

function generateDID(networkID, pubKeyBuf) {
  const idStr = bs58.encode(pubKeyBuf.subarray(0, 16));
  return `did:${didMethod}:${networkID}:${idStr}`;
}

// eslint-disable-next-line import/prefer-default-export
export const generateDIDDocument = (networkID, keyIDSuffix, pubKeyHex) => {
  const pubKeyBuf = Buffer.from(pubKeyHex, 'hex');

  const did = generateDID(networkID, pubKeyBuf);
  const didPubKey = new DIDPubKey({
    id: `${did}#${keyIDSuffix}`,
    type: keyType,
    publicKeyBase58: bs58.encode(pubKeyBuf),
  });

  return new DIDDocument({
    context: 'https://www.w3.org/ns/did/v1',
    id: did,
    publicKey: [didPubKey],
    authentication: [didPubKey.id],
  });
};

export const sign = (data, seq, privKey) => {
  const jsonStr = JSON.stringify(sortJsonProperties({
    data,
    sequence: seq.toString(),
  }));
  const hash = sha256(Buffer.from(jsonStr).toString('hex'));
  const sigHex = generateSignatureFromHash(hash, privKey);
  return Buffer.from(sigHex, 'hex').toString('base64');
};
