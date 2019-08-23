import axios from 'axios';
import { PARAM } from '../../config/default';


const injectParams = (url, params = []) => {
  // Inject params to the url
  if (!params) params = []; // eslint-disable-line no-param-reassign
  const paramsCount = (url.match(new RegExp(PARAM, 'g')) || []).length;
  if (paramsCount !== params.length) {
    throw new Error(`This request requires ${paramsCount} parameters in ${url}, but you entered ${params.length}`);
  }
  params.forEach((param) => {
    url = url.replace(PARAM, param); // eslint-disable-line no-param-reassign
  });

  return url;
};

const handleResponse = promise => promise
  .then(({ data }) => data)
  .catch(({ response }) => ({
    status: response.status,
    statusText: response.statusText,
    error: response.data,
  }));

class Client {
  constructor(serverUrl) {
    if (!serverUrl) {
      throw new Error('Panacea chain server should not be null');
    }

    this.serverUrl = serverUrl;
    this.getRequest = this.getRequest.bind(this);
    this.postRequest = this.postRequest.bind(this);
  }

  getRequest(url, params = [], query = {}) {
    const fullUrl = injectParams(url, params);

    // Remove empty query
    Object.keys(query).forEach((k) => {
      if (!query[k]) delete query[k]; // eslint-disable-line no-param-reassign
    });

    return handleResponse(axios.get(this.serverUrl + fullUrl, { params: query }));
  }

  postRequest(url, params = [], data = {}) {
    const fullUrl = injectParams(url, params);

    return handleResponse(axios.post(this.serverUrl + fullUrl, data));
  }
}

export default Client;
