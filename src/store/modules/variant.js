import Variant from '@/models/Variant';
import MutationTypes from '@/store/mutation-types';
import VariantAPI from '@/api/variant';

const state = {
    variants: []
};

const getters = {
    getVariant: state => variantName => state.variants[variantName]
};

const actions = {
    setVariants: async(context) => {
        const variantArray = await VariantAPI.getAllVariants();
        const variantMapArray = await Promise.all(
            variantArray.map(v => VariantAPI.getVariantMap(v.Name))
        );
        const variantDictionary = { };

        // Map results as dictionary, keyed by variant name.
        for (let i = 0; i < variantArray.length; i++) {
            const variant = variantArray[i];

            variantDictionary[variant.Name] = Object.freeze(new Variant(variant, variantMapArray[i]));
        }

        // Commit.
        context.commit(MutationTypes.SET_VARIANTS, variantDictionary);
    }
};

const mutations = {
    [MutationTypes.SET_VARIANTS]: (state, variants) => (state.variants = variants),
};

export default {
    state,
    getters,
    mutations,
    actions
};
