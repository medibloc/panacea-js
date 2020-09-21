import axios from 'axios';
import { PARAM } from '../config/default';


//TODO @youngjoon-lee: make params type-safe
const injectParams = (url: string, params: any[] = []) => {
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

//TODO @youngjoon-lee: this function can be switched to the Axios Response Interceptor
//TODO @youngjoon-lee: use a proper type for Promise
const handleResponse = (promise: Promise<any>) => promise
  .then(({ data }) => data)
  .catch((res) => {
    //TODO @youngjoon-lee: use Promise.reject, instead of returning a plain (unknown) Error object.
    const { response } = res;
    if (!response) return ({ error: res });
    return ({
      status: response.status,
      statusText: response.statusText,
      error: response.data,
    });
  });

export default class Client {
  public readonly serverUrl: string;

  constructor(serverUrl: string) {
    if (!serverUrl) {
      throw new Error('Panacea chain server should not be null');
    }

    this.serverUrl = serverUrl;
    this.getRequest = this.getRequest.bind(this);
    this.postRequest = this.postRequest.bind(this);
  }

  //TODO @youngjoon-lee: make params/query type-safe
  getRequest(url: string, params: any[] = [], query: Record<string, any> = {}) {
    const fullUrl = injectParams(url, params);

    // Remove empty query
    Object.keys(query).forEach((k: string) => {
      if (!query[k]) delete query[k]; // eslint-disable-line no-param-reassign
    });

    return handleResponse(axios.get(this.serverUrl + fullUrl, { params: query }));
  }

  //TODO @youngjoon-lee: make params/data type-safe
  postRequest(url: string, params: any[] = [], data: Record<string, any> = {}) {
    const fullUrl = injectParams(url, params);

    return handleResponse(axios.post(this.serverUrl + fullUrl, data));
  }
}
