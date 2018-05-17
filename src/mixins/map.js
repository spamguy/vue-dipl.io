export default {
    /**
     * Identifies whether an attempted order failed.
     * @param {string} status The order's outcome returned by Diplicity.
     * @returns {boolean} Whether the order failed.
     */
    orderDidFail: status => status !== 'OK'
};
