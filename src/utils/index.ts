import * as base from './base';
import * as encoding from './encoding';
import * as validate from './validate';
import * as did from './did';

export default {
  ...base,
  ...encoding,
  validate,
  did,
};
