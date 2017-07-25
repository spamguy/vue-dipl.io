import {Client} from './base';

export default {
    getUserToken() {
        return Client.get('/Auth/Login', {
            params: { 'redirect-to': encodeURIComponent(process.env.DOMAIN + '/main/login') }
        });
    }
};
