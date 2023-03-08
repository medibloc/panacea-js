import { DidUtil } from "./util";
import { Secp256k1 } from "../crypto";

describe("DidUtil", () => {
  it("createDidAuthVP", async () => {
    const privKey = Secp256k1.generatePrivateKey();
    const pubKey = Secp256k1.getPublicKeyCompressed(privKey);

    const did = DidUtil.getDid(pubKey);
    const verificationMethodId = `${ did }#key1`;
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




    const vp = await DidUtil.createDidAuthPresentation(did, verificationMethodId, privKey);
    console.log(JSON.stringify(vp, null, 2));

    await DidUtil.verifyDidAuthPresentation(vp, pubKey, didDocument);
  });
});
