import {DIDDocument, DIDVerificationMethod, DIDSignable, DIDAuthentication} from '../message/DID';
import { sortJsonProperties } from './encoding';
import { generateSignatureFromHash } from '../crypto';
import { sha256 } from './base';
import {classToPlain} from "class-transformer";

const bs58 = require('bs58');

const didMethod = 'panacea';
const keyType = 'Secp256k1VerificationKey2018';

function generateDID(pubKeyHex: string) {
  const idStr = bs58.encode(Buffer.from(sha256(pubKeyHex), 'hex'));
  return `did:${didMethod}:${idStr}`;
}

export const generateDIDDocument = (keyIDSuffix: string, pubKeyHex: string): DIDDocument => {
  const pubKeyBuf = Buffer.from(pubKeyHex, 'hex');

  const contexts = ['https://www.w3.org/ns/did/v1'];
  const did = generateDID(pubKeyHex);
  const didPubKey = new DIDVerificationMethod(`${did}#${keyIDSuffix}`, keyType, did, bs58.encode(pubKeyBuf));
  const auth = new DIDAuthentication(didPubKey.id)

  return new DIDDocument(contexts, did, [didPubKey], [auth]);
};

export const sign = (data: any, seq: number, privKey: string): string => {
  const jsonStr = JSON.stringify(sortJsonProperties(
    classToPlain(new DIDSignable(data, seq)),
  ));
  const hash = sha256(Buffer.from(jsonStr).toString('hex'));
  const sigHex = generateSignatureFromHash(hash, privKey);
  return Buffer.from(sigHex, 'hex').toString('base64');
};
