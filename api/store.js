import {formatResult} from "../util/helpers";
import {API_URL} from "../config/config";

export class Store {
    async get(URL, body) {
        const appURL = API_URL + 'api/' + URL
        const fetchURL = URL.includes('https') && URL || appURL
        return new Promise(async (resolve, reject) => {
            await fetch(fetchURL, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    // 'Authorization': 'Bearer ' + await AsyncStorage.getItem('access_token'),
                },
                body: JSON.stringify(body)
            }).then(async r => {
                resolve(await formatResult(r))
            })
        })
    }

    async delete(URL, body) {
        const appURL = API_URL + 'api/' + URL
        const fetchURL = URL.includes('https') && URL || appURL
        return new Promise(async (resolve, reject) => {
            return await fetch(appURL, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    // 'Authorization': 'Bearer ' + await AsyncStorage.getItem('access_token'),
                },
                body: JSON.stringify(body)
            }).then(async r => {
                resolve(await formatResult(r));
            })
        })

    }

    async post(URL, body) {
        const appURL = API_URL + 'api/' + URL
        const fetchURL = URL.includes('https') && URL || appURL
        return new Promise(async (resolve, reject) => {
            await fetch(appURL, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    // 'Authorization': 'Bearer ' + await AsyncStorage.getItem('access_token'),
                },
                body: JSON.stringify(body)
            }).then(async r => {
                return resolve(await formatResult(r))
            })
        })
    }

    async put(URL, body) {
        const appURL = API_URL + 'api/' + URL
        const fetchURL = URL.includes('https') && URL || appURL
        return new Promise(async (resolve, reject) => {
            await fetch(appURL, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    // 'Authorization': 'Bearer ' + await AsyncStorage.getItem('access_token'),
                },
                body: JSON.stringify(body)
            }).then(async r => {
                resolve(await formatResult(r));
            })
        })
    }
}
