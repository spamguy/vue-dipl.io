import axios from 'axios';

export const Client = axios.create({
    baseURL: process.env.DIPLICITY_ENDPOINT
});
