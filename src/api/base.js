import axios from 'axios';
import store from '../store';

let Client = axios.create({
    baseURL: process.env.DIPLICITY_ENDPOINT
});

Client.interceptors.request.use(function(config) {
    const fakeID = store.state.user.fakeID;

    if (fakeID)
        config.params = { 'fake-id': fakeID };

    return config;
}, function(error) {
    return Promise.reject(error);
});

export {Client};
