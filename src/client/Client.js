import axios from 'axios';
import { PARAM } from '../../config';


class Client {
  constructor(serverUrl) {
    if (!serverUrl) {
      throw new Error('Panacea chain server should not be null');
    }

    this.serverUrl = serverUrl;
    this.getRequest = this.getRequest.bind(this);
  }

  #injectParams(url, params = []) { // # is private prefix
    // Inject params to the url
    if (!params) params = [];
    const paramsCount = (url.match(new RegExp(PARAM, 'g')) || []).length;
    if (paramsCount !== params.length) {
      throw new Error(`This request requires ${paramsCount} parameters in ${url}, but you entered ${params.length}`);
    }
    params.forEach((param) => {
      url = url.replace(PARAM, param);
    });

    return url;
  }

  #handleResponse(promise) {
    return promise
      .then(({ data }) => data)
      .catch(({ response }) => ({
        status: response.status,
        statusText: response.statusText,
        error: response.data,
      }))
  }

  getRequest(url, params = [], query = {}) {
    const fullUrl = this.#injectParams(url, params);

    // Remove empty query
    Object.keys(query).forEach((k) => {
      if (!query[k]) delete query[k];
    });

    return this.#handleResponse(axios.get(this.serverUrl + fullUrl, { params: query }))
  }

  postRequest(url, params = [], data = {}) {
    const fullUrl = this.#injectParams(url, params);

    return this.#handleResponse(axios.post(this.serverUrl + fullUrl, data))
  }
}

export default Client;
