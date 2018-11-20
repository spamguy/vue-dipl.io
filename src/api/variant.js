import Client from './base';

export default {
    getAllVariants: () => Client.get('Variants'),

    getVariantMap: variantName => Client.get(`/Variant/${variantName}/Map.svg`)
};
