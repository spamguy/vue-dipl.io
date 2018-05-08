import axios from 'axios';
import Vue from 'vue';

import auth from '@/utils/auth';

let Client = axios.create({
    baseURL: process.env.VUE_APP_DIPLICITY_ENDPOINT,
    headers: {
        Accept: 'application/json'
    }
});

Client.interceptors.request.use(function(config) {
    const fakeID = Vue.localStorage.get('fakeID');
    const token = Vue.localStorage.get('token');

    // /variants does not need authentication.
    if (config.path === '/variants')
        return config;

    // Assumed: fakeID or token is defined. This should be guaranteed by router's beforeEach().
    if (fakeID)
        config.params = { 'fake-id': fakeID };
    else if (token)
        config.headers.Authorization = 'Bearer ' + token;

    return config;
}, function(error) {
    return Promise.reject(error);
});

Client.interceptors.response.use(config => { return config; }, error => {
    if (!error.response)
        auth.logOut();
    return Promise.reject(error);
});

Client.extractData = function(result) {
    return result.data.Properties;
};

export { Client };
