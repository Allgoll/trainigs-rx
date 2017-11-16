import * as Rx from 'rxjs';

import UserStore from '../stores/UserStore';

type THeaders = {
  [n: string]: string
};

class Api {

  private headers = {
    'Content-Type': 'application/json'
  };

  private defaultMethod = 'GET';

  get(url: string, headers?: THeaders) {
    return this.ajax(url, 'GET', headers);
  }

  post(url: string, body: Object, headers?: THeaders) {
    return this.ajax(url, 'POST', body, headers);
  }

  put(url: string, body: Object, headers?: THeaders) {
    return this.ajax(url, 'PUT', body, headers);
  }

  delete(url: string, body: Object, headers?: THeaders) {
    return this.ajax(url, 'DELETE', body, headers);
  }

  private ajax(url: string, method?: string, body?: Object, headers?: THeaders) {
    return Rx.Observable.ajax({
      url,
      method: method || this.defaultMethod,
      headers: this.mergeHeaders(headers),
      body
    });
  }

  private mergeHeaders(headers: THeaders = {}): THeaders {
    const authHeader = {'Authorization': UserStore.getState().token || ''};
    return {...this.headers, ...authHeader, ...headers};
  }
}

export default new Api();