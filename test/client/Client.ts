import rewire = require('rewire');
import { expect } from 'chai';
import config, { test } from '../../src/config';
import { PARAM } from '../../src/config/default';
import { Client } from '../../';

const privFnRewire = rewire('../../src/client/Client');
const injectParams = privFnRewire.__get__('injectParams'); // eslint-disable-line no-underscore-dangle

describe('client', () => {
  describe('injectParams', () => {
    it('throws an error if entered parameters number is not matched with required', () => {
      const count = (test.TEST_PARAM_URL.match(new RegExp(PARAM, 'g')) || []).length;

      for (let i = 0; i <= count + 1; i += 1) {
        const params = Array(i).fill('test');
        const fn = () => injectParams(test.TEST_PARAM_URL, params);
        if (i === count) {
          expect(fn).not.to.throw();
        } else {
          expect(fn).to.throw();
        }
      }
    });

    it('set elements in the PARAM field of url', () => {
      const params = ['abc', 'def'];
      const preUrl = `/test/${config.PARAM}/test/${config.PARAM}`;
      const targetUrl = '/test/abc/test/def';
      expect(injectParams(preUrl, params)).to.be.equal(targetUrl);
    });
  });

  describe('getRequest', () => {
    it('sends get request', () => {
      const testParams = ['abc', 'def'];
      const testQuery = { test1: 'abc', test2: 'def' };
      const client = new Client(test.TEST_URL);
      return client.getRequest(test.TEST_PARAM_URL, testParams, testQuery)
        .then(({ error }) => {
          expect(error.config.url).to.be.equal(`${test.TEST_URL}${injectParams(test.TEST_PARAM_URL, testParams)}`);
          expect(error.config.method).to.be.equal('get');
          expect(error.config.params).to.be.eql(testQuery);
        });
    });
  });

  describe('postRequest', () => {
    it('sends post request', () => {
      const testParams = ['abc', 'def'];
      const testData = { test1: 'abc', test2: 'def' };
      const client = new Client(test.TEST_URL);
      return client.postRequest(test.TEST_PARAM_URL, testParams, testData)
        .then(({ error }) => {
          expect(error.config.url).to.be.equal(`${test.TEST_URL}${injectParams(test.TEST_PARAM_URL, testParams)}`);
          expect(error.config.method).to.be.equal('post');
          expect(error.config.data).to.be.eql(JSON.stringify(testData));
        });
    });
  });
});
