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

    if (fakeID)
        config.params = { 'fake-id': fakeID };
    else
        config.headers.Authorization = 'Bearer ' + Vue.localStorage.get('token');

    return config;
}, function(error) {
    return Promise.reject(error);
});

export {Client};
