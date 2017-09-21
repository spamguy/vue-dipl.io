import {Client} from './base';
import Vue from 'vue';

export default {
    getAllVariants() {
        return Client.get('Variants');
    },

    getVariant(name) {
        const variants = JSON.parse(Vue.localStorage.get('variants'));
        return variants.find(v => v.Name === name);
    },

    setVariants(variantArray) {
        Vue.localStorage.set('variants', JSON.stringify(variantArray));
    },

    async setVariantMap(variant) {
        const svg = await Client.get('/Variant/' + variant.Name + '/Map.svg');
        Vue.localStorage.set('map.' + variant.Name, svg.data);
    }
};