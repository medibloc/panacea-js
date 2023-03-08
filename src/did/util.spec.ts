import { Secp256k1 } from "../crypto";
import { DidUtil } from "./util";

describe("DidUtil", () => {
  it("findVerificationMethod", async () => {
    const privKey = await Secp256k1.generatePrivateKey();
    const pubKey = Secp256k1.getPublicKeyCompressed(privKey);
    const did = DidUtil.getDid(pubKey);
    const verificationMethodId = `${did}#key1`;

    const didDocument = {
      contexts: {
        values: [ 'https://www.w3.org/ns/did/v1' ],
      },
      id: did,
      controller: undefined,
      verificationMethods: [
        {
          id: verificationMethodId,
          type: 'EcdsaSecp256k1VerificationKey2019',
          controller: did,
          publicKeyBase58: DidUtil.getPublicKeyBase58(pubKey),
        },
      ],
      authentications: [
        {
          verificationMethodId: verificationMethodId,
          verificationMethod: undefined,
        }
      ],
      assertionMethods: [],
      keyAgreements: [],
      capabilityInvocations: [],
      capabilityDelegations: [],
      services: [],
    };

    let vm = DidUtil.findVerificationMethod(verificationMethodId, didDocument.verificationMethods)
    expect(vm).toStrictEqual(didDocument.verificationMethods[0]);

    vm = DidUtil.findVerificationMethod(verificationMethodId, didDocument.verificationMethods, didDocument.authentications);
    expect(vm).toStrictEqual(didDocument.verificationMethods[0]);

    expect(() => {
      DidUtil.findVerificationMethod("dummy", didDocument.verificationMethods)
    }).toThrow(`unable to find verification method: dummy`);

    expect(() => {
      DidUtil.findVerificationMethod(verificationMethodId, didDocument.verificationMethods, didDocument.assertionMethods);
    }).toThrow(`unable to find verification method: ${verificationMethodId}`);
  });
});
