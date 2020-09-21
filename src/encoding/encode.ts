//TODO @youngjoon-lee: It seems the amino-js is unnecessary and not used from anywhere. Consider to delete this module.
import {marshalTx, Tx} from '@medibloc/amino-js';

const encode = (decodedTx: Tx): string => {
  const buf = Buffer.from(marshalTx(decodedTx));
  const encodedTx = buf.toString('base64');

  return encodedTx;
};

export default encode;
