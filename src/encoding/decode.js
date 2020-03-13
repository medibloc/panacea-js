import { unmarshalTx } from '@medibloc/amino-js';

const decode = (encodedTxString) => {
  const buf = Buffer.from(encodedTxString, 'base64');
  const decodedTx = unmarshalTx(buf);

  return decodedTx;
};

export default decode;
