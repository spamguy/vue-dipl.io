import axios from 'axios';
import Vue from 'vue';

let Client = axios.create({
    baseURL: process.env.DIPLICITY_ENDPOINT,
    headers: {
        Accept: 'application/json'
    }
});

Client.interceptors.request.use(function(config) {
    const fakeID = Vue.localStorage.get('fakeID');
    const token = Vue.localStorage.get('token');

    // Assumed: fakeID or token is defined. This should be guaranteed by router's beforeEach().
    if (fakeID)
        config.params = { 'fake-id': fakeID };
    else if (token)
        config.headers.Authorization = 'Bearer ' + token;

    return config;
}, function(error) {
    return Promise.reject(error);
});

export {Client};
