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

  getRequest(url, params = [], query = {}) {
    // Inject params to the url
    if (!params) params = [];
    const paramsCount = (url.match(new RegExp(PARAM, 'g')) || []).length;
    if (paramsCount !== params.length) {
      throw new Error(`This request requires ${paramsCount} parameters in ${url}, but you entered ${params.length}`);
    }
    params.forEach((param) => {
      url = url.replace(PARAM, param);
    });

    // Remove empty query
    Object.keys(query).forEach((k) => {
      if (!query[k]) delete query[k];
    });

    return axios.get(this.serverUrl + url, { params: query })
      .then(({ data }) => data)
      .catch(({ response }) => ({
        status: response.status,
        statusText: response.statusText,
        error: response.data,
      }))
  }
}

export default Client;
