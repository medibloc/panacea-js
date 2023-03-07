import { DidUtil } from "./util";
import { Secp256k1 } from "../crypto";

describe("DidUtil", () => {
  it("createDidAuthVP", async () => {
    const privKey = Secp256k1.generatePrivateKey();
    const vp = await DidUtil.createDidAuthPresentation("did:panacea:12315", "did:panacea:12315#key1", privKey);
    console.log(JSON.stringify(vp, null, 2));

    await DidUtil.verifyDidAuthPresentation(vp, "did:panacea:12315#key1", Secp256k1.getPublicKeyCompressed(privKey));
  });
});