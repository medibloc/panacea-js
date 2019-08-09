import axios from 'axios';

class HttpRequest {
  constructor(baseURL) {
    this.httpClient = axios.create({ baseURL });
  }

  get(path, params, opts) {
    return this.request('get', path, params, opts);
  }

  post(path, body, opts) {
    return this.request('post', path, body, opts);
  }

  request(method, path, params, opts) {
    const options = {
      method,
      url: path,
      ...opts,
    };

    if (params) {
      if (method === 'get') {
        options.params = params;
      } else if (method === 'post') {
        options.data = params;
      } else {
        throw new Error('invalid request method');
      }
    }

    return this.httpClient
      .request(options)
      .then(res => ({ result: res.data, status: res.status }))
      .catch((err) => {
        let error = err;
        try {
          const msgObj = err.response && err.response.data;
          error = new Error(msgObj.message);
          error.code = msgObj.code;
        } catch (e) {
          throw error;
        }
        throw error;
      });
  }
}

export default HttpRequest;
