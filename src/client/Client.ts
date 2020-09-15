import { PARAM } from '../config/default';
const axios = require('axios');


const injectParams = (url: string, params: any[] = []): string => {
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

//TODO: use a concrete type
const handleResponse = (promise: Promise<any>) => promise
  .then(({ data }) => data)
  .catch((res) => {
    const { response } = res;
    if (!response) return ({ error: res });
    return ({
      status: response.status,
      statusText: response.statusText,
      error: response.data,
    });
  });

export class Client {
  public serverUrl: string;

  constructor(serverUrl: string) {
    if (!serverUrl) {
      throw new Error('Panacea chain server should not be null');
    }

    this.serverUrl = serverUrl;
    this.getRequest = this.getRequest.bind(this);
    this.postRequest = this.postRequest.bind(this);
  }

  getRequest(urlPath: string, params: any[] = [], query: Record<string, any> = {}): any {
    const fullUrl = injectParams(urlPath, params);

    // Remove empty query
    Object.keys(query).forEach((k) => {
      if (!query[k]) {
        delete query[k];
      }
    });

    return handleResponse(axios.get(this.serverUrl + fullUrl, { params: query }));
  }

  postRequest(urlPath: string, params: any[] = [], data: any = {}): any {
    const fullUrl = injectParams(urlPath, params);

    return handleResponse(axios.post(this.serverUrl + fullUrl, data));
  }
}
