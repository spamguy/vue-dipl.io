import Variant from '@/models/Variant';
import MutationTypes from '@/store/mutation-types';
import VariantAPI from '@/api/variant';

const variantState = {
    variants: []
};

const getters = {
    getVariant: state => variantName => state.variants[variantName]
};

const actions = {
    setVariants: async (context) => {
        const variantArray = await VariantAPI.getAllVariants();
        const variantMapArray = await Promise.all(
            variantArray.map(v => VariantAPI.getVariantMap(v.Name))
        );
        const variantDictionary = { };

        // Map results as dictionary, keyed by variant name.
        for (let i = 0; i < variantArray.length; i++) {
            const variant = variantArray[i];
            const vMap = variantMapArray[i];

            variantDictionary[variant.Name] = Object.freeze(new Variant(variant, vMap));
        }

        // Commit.
        context.commit(MutationTypes.SET_VARIANTS, variantDictionary);
    }
};

const mutations = {
    [MutationTypes.SET_VARIANTS]: (state, variants) => {
        state.variants = variants;
        return state;
    }
};

export default {
    state: variantState,
    getters,
    mutations,
    actions
};
