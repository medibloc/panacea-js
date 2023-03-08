import { Secp256k1 } from "../crypto";
import { DidUtil } from "./util";
import { DidAuthJwt } from "./jwt";
import { DIDDocument } from "../proto/panacea/did/v2/did";
import { sleep } from "@cosmjs/utils";

describe("DidAuthJwt", () => {

  let privKey: Uint8Array;
  let didDocument: DIDDocument;
  const challenge = "this is a challenge";

  beforeAll(async () => {
    privKey = await Secp256k1.generatePrivateKey();
    const pubKey = Secp256k1.getPublicKeyCompressed(privKey);
    const did = DidUtil.getDid(pubKey);

    didDocument = {
      contexts: {
        values: [ 'https://www.w3.org/ns/did/v1' ],
      },
      id: did,
      controller: undefined,
      verificationMethods: [
        {
          id: `${did}#key1`,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: did,
          publicKeyBase58: DidUtil.getPublicKeyBase58(pubKey),
        },
      ],
      authentications: [
        {
          verificationMethodId: `${did}#key1`,
          verificationMethod: undefined,
        }
      ],
      assertionMethods: [
        {
          verificationMethodId: undefined,
          verificationMethod: {
            id: `${did}#key2`,
            type: 'EcdsaSecp256k1VerificationKey2019',
            controller: did,
            publicKeyBase58: DidUtil.getPublicKeyBase58(pubKey),
          },
        }
      ],
      keyAgreements: [],
      capabilityInvocations: [],
      capabilityDelegations: [],
      services: [],
    };
  });

  it("issue and verify", async () => {
    const jwt = await DidAuthJwt.issue(didDocument.id, privKey, didDocument.authentications[0].verificationMethodId!, challenge, 3);

    await expect(async () => {
      await DidAuthJwt.verify(jwt, didDocument, challenge);
    }).not.toThrow();
  });

  it("verify: invalid JWT", async () => {
    await expect(async () => {
      await DidAuthJwt.verify("dummy jwt", didDocument, "challenge");
    }).rejects.toThrow();
  });

  it("verify: unexpected challenge", async () => {
    const wrongChallenge = "dummy";
    const jwt = await DidAuthJwt.issue(didDocument.id, privKey, didDocument.authentications[0].verificationMethodId!, wrongChallenge, 3);

    await expect(async () => {
      await DidAuthJwt.verify(jwt, didDocument, challenge);
    }).rejects.toThrow(`unexpected challenge: ${wrongChallenge}`);
  });

  it("verify: expired", async () => {
    const jwt = await DidAuthJwt.issue(didDocument.id, privKey, didDocument.authentications[0].verificationMethodId!, challenge, 0);

    await sleep(1000);

    await expect(async () => {
      await DidAuthJwt.verify(jwt, didDocument, challenge);
    }).rejects.toThrow(`"exp" claim timestamp check failed`);
  });

  it("verify: signed with wrong private key", async () => {
    const anotherPrivKey = await Secp256k1.generatePrivateKey();
    const jwt = await DidAuthJwt.issue(didDocument.id, anotherPrivKey, didDocument.authentications[0].verificationMethodId!, challenge, 3);

    await expect(async () => {
      await DidAuthJwt.verify(jwt, didDocument, challenge);
    }).rejects.toThrow();
  });

  it("verify: wrong verification method ID", async () => {
    const wrongMethodId = didDocument.assertionMethods[0].verificationMethodId! // use assertionMethods instead of authentications
    const jwt = await DidAuthJwt.issue(didDocument.id, privKey, wrongMethodId, challenge, 3);

    await expect(async () => {
      await DidAuthJwt.verify(jwt, didDocument, challenge);
    }).rejects.toThrow(`unable to find verification method: ${wrongMethodId}`);
  });
});
