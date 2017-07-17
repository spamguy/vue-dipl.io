import {Client} from './base';

export default {
    getUserToken() {
        Client.get('/Auth/Login?redirect-to=' + encodeURIComponent(process.env.DOMAIN + '/main/login'));
    }
};
