//TODO @youngjoon-lee: It seems the amino-js is unnecessary and not used from anywhere. Consider to delete this module.
import {Tx, unmarshalTx} from '@medibloc/amino-js';

const decode = (encodedTxString: string): Tx => {
  const buf = Buffer.from(encodedTxString, 'base64');
  const decodedTx = unmarshalTx(buf);

  return decodedTx;
};

export default decode;
