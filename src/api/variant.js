import { Client } from './base';

export default {
    async getAllVariants() {
        return Client.extractData(await Client.get('Variants'));
    },

    getVariantMap(variantName) {
        return Client.get('/Variant/' + variantName + '/Map.svg');
    }
};
