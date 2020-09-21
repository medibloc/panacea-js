import 'reflect-metadata';  // for class-transformer
import config, { test } from '../../src/config';
import { BaseMessage as Base } from '../../src';

describe('Base message', () => {
  describe('constructor', () => {
    it('generates default message object', () => {
      const msg = new Base(test.MESSAGE.BASE);

      expect(msg.type).toEqual(config.MSG_TYPE.BASE.SEND);
      expect(msg.value.from_address).toEqual(test.MESSAGE.BASE.fromAddress);
      expect(msg.value.to_address).toEqual(test.MESSAGE.BASE.toAddress);
      expect(msg.value.amount).toEqual(test.MESSAGE.BASE.amount);
    });
  });
});
