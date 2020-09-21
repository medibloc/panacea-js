import 'reflect-metadata';  // for class-transformer
import config, { test } from '../../src/config';
import { Message } from '../../src';

const { Slashing } = Message;

describe('Slashing message', () => {
  describe('Unjail', () => {
    it('generates unjail message object', () => {
      const msg = new Slashing.Unjail(test.MESSAGE.SLASHING.UNJAIL);

      expect(msg.type).toEqual(config.MSG_TYPE.SLASHING.UNJAIL);
      expect(msg.value.address).toEqual(test.MESSAGE.SLASHING.UNJAIL.address);
    });
  });
});
