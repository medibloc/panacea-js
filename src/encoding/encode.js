import { marshalTx } from '@medibloc/amino-js';

const encode = (decodedTx) => {
  const buf = Buffer.from(marshalTx(decodedTx));
  const encodedTx = buf.toString('base64');

  return encodedTx;
};

export default encode;
