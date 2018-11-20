import axios from 'axios';
import Vue from 'vue';

import { logOut } from '@/utils/Auth';

const Client = axios.create({
    baseURL: process.env.VUE_APP_DIPLICITY_ENDPOINT,
    headers: {
        Accept: 'application/json'
    }
});

Client.interceptors.request.use((config) => {
    const fakeID = Vue.localStorage.get('fakeID');
    const token = Vue.localStorage.get('token');

    // /variants does not need authentication.
    if (config.url.toLowerCase() === 'variants')
        return config;

    // Assumed: fakeID or token is defined. This should be guaranteed by router's beforeEach().
    if (fakeID)
        config.params = { 'fake-id': fakeID };
    else if (token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
}, error => Promise.reject(error));

function extractDataFromResponse(response) {
    // Most API responses have a Properties wrapper that needs to be stripped.
    let { data } = response;
    if (data.Properties)
        data = response.data.Properties;

    // If the desired data is an array, elements probably have a Properties wrapper too.
    if (Array.isArray(data))
        data = data.map(item => item.Properties);

    return data;
}

Client.interceptors.response.use(extractDataFromResponse, (error) => {
    if (!error.response) {
        logOut();
        Vue.$router.push('/');
    }

    return Promise.reject(error);
});

export default Client;
