import Storage from './Storage';
import * as axios from 'axios';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { sha3_512 } from 'js-sha3';
import {DATA} from "../helpers/enums/temporary-data";

export class Http {
  static investorInvest(id, amount) {
    return this.getProtected('investor/invest', {
      username: Storage.get('username'),
      pwhash: Storage.get('token'),
      seedpwd: "x",
      projIndex: id,
      amount: amount,
    }).pipe(
      map(response => {
        if (response.data && response.data.Code && response.data.Code === 404) {
          throw new Error('Transaction failed.');
        }

        return response;
      })
    )
  }

  static registerService(entity, {username, name, email, pwd, pwhash}) {
		const hash = pwhash ? pwhash : sha3_512(pwd);
		const data = {name: name ? name : username, username: username, email:email, pwhash: hash, seedpwd: "x"};
    return this.postProtected(`${entity}/register`, data, 'api');
  }

	static getToken(username, pwd) {
		const hash = sha3_512(pwd);
		const data = {username: username, pwhash: hash};
		return this.post('token', data).pipe(map(value => {
			if(value.data.Token) {
				Storage.set('token', value.data.Token);
				Storage.set('username', username);
			}
      return value;
    }));
  }

  static validateService(entity, username) {
  	if(!entity || !username) throw Error('Invalid Data');
    return this.getProtected(`${entity}/validate`, {
      username: username,
    }, 'api2').pipe(map(value => {
      return value;
    }));
  }

  static updateAccount(data) {
    return this.postProtected('user/update', {...data});
  }

  static progress(data) {
    return this.postProtected('user/progress', {...data});
  }

  static getProgress() {
    return this.getProtected('user/progress');
  }

  static userAskXlm(username, hash) {
    return this.get('user/askxlm', {
      username: username ? username : Storage.get('username'),
      pwhash: hash ? hash : Storage.get('token'),
    })
  }

  static projectAll(type) {
    return this.getProtected('project/all').pipe(
      map(result => {
      	return result.data
			}),
      map(data => {
        if (!type || type === 'pv-solar') {
          return data.map(project => {
          	return {...project, ...DATA};
					});
        } else {
          return [];
        }
      })
    );
  }

  static originatorGet(id) {
    return this.get('public/user', {index: id});
  }

  static projectGet(id) {
    return this.getProtected('project/get', {username: Storage.get("username"), index: id}).pipe(
    	map(result => {
    		return {data: {
						...result.data,
						...DATA,
					}}
			})
		);
  }

  static investorValidate() {
    return this.get('investor/validate', {
      username: Storage.get('username'),
      pwhash: Storage.get('token')
    });
  }

  static recipientValidate() {
    return this.get('recipient/validate', {
      username: Storage.get('username'), // todo remove this
      pwhash: Storage.get('token')
    });
  }

	static get(path, data, version) {
		return this.request("GET", path, data, version);
	}

	static post(path, data) {
		return this.request("POST", path, data);
	}

	static postProtected(path, data, version) {
		const dataWithToken = {
			...data,
			token: Storage.get('token') ? Storage.get('token') : null,
		};
		return this.post(path, dataWithToken, version);
	}

	static getProtected(path, data, version) {
		const dataWithToken = {
			...data,
			token: Storage.get('token'),
		};
		return this.get(path, dataWithToken, version);
	}

  static request(method, path, data, version='api2') {
    return from(
      axios({
        method: method,
        url: `https://${version}.openx.solar/${path}`,
        params: data,
        headers: {
          'Content-Type': 'application/x-www-form/urlencoded'
        }
      })
    ).pipe(response => {

			response.subscribe(resp => {

				if(resp.data.Code === 401) {
					Storage.remove('token');
					Storage.remove('username');
					window.location.reload();
				}
			}, error => {
				if(error.response.status === 401) {
					return {data: {Code: 401}}
				}
			});
			return response;
		});
  }
}
