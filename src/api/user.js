import Client from './base';

export default {
    /**
     * Gets a user's basic info.
     * @param {string|undefined} ID The user ID, or undefined for current user.
     * @returns {Object} User info.
     */
    getUser: ID => (ID
        ? Client.get(`/User/${ID}`)
        : Client.get('/')),

    /**
     * Gets a user's basic info and statistics.
     * @param {string} ID The user ID.
     * @returns {Object} Statistics, with user data embedded as a subobject.
     */
    getUserAndStats: ID => Client.get(`/User/${ID}/Stats`)
};
