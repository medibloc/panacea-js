import 'reflect-metadata'; // for class-transformer
import {utils} from '../../src';


describe('utils encoding', () => {
  describe('mapTransform', () => {
    it('apply the transformation to the array', () => {
      let arr = [1, 2];
      expect(utils.mapTransform(arr, (v => v.toString()))).toEqual(['1', '2']);

      arr = [];
      expect(utils.mapTransform(arr, (v => v.toString()))).toEqual([]);
    });
  });
});
