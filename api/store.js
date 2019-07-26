import {formatResult} from "../util/helpers";
import {API_URL} from "../config/config";

export class Store {
    async get(URL) {
        const appURL = API_URL + URL
        const fetchURL = URL.includes('https') && URL || appURL
        return new Promise(async (resolve, reject) => {
            await fetch(fetchURL, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Accept': 'application/json',
                    // 'Authorization': 'Bearer ' + await AsyncStorage.getItem('access_token'),
                },
            }).then(async r => {
                resolve(await formatResult(r))
            })
        })
    }

    async post(URL, body) {
        const appURL = API_URL + URL
        const fetchURL = URL.includes('https') && URL || appURL
        return new Promise(async (resolve, reject) => {
            await fetch(fetchURL, {
                method: 'post',
                headers: {
                    // 'Content-Type': 'application/json; charset=utf-8',
                    // 'Accept': 'application/json',
                    // 'Authorization': 'Bearer ' + await AsyncStorage.getItem('access_token'),
                },
                body,
            }).then(async r => {
                return resolve(await formatResult(r))
            })
        })
    }
}
