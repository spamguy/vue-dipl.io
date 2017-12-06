import MutationTypes from '@/store/mutation-types';
import Variant from '@/api/variant';

const state = {
    variants: []
};

const getters = {
    getVariant: state => variantName => state.variants.find(v => v.Name === variantName)
    // getSCs: (state, getters) => variantName => {
    //     const variant = getters.getVariant(variantName);

    //     // Return all graph nodes containing SC info.
    //     return variant ? ;
    // }
};

const actions = {
    setVariants: async(context) => {
        const variants = await Variant.getAllVariants();
        context.commit(MutationTypes.SET_VARIANTS, variants);
        return Promise.all(
            context.state.variants.map(async(v) => context.dispatch('setVariantMap', v.Name))
        );
    },

    setVariantMap: async({ commit, state }, variantName) => {
        commit(
            MutationTypes.SET_VARIANT_MAP, { name: variantName, map: await Variant.getVariantMap(variantName) }
        );
    }
};

const mutations = {
    [MutationTypes.SET_VARIANTS]: (state, variants) => {
        state.variants = variants.map(v => v.Properties);
    },
    [MutationTypes.SET_VARIANT_MAP]: (state, payload) => {
        // HACK: Can't use getters inside mutations. Copy/paste from getters.getVariant().
        let variant = state.variants.find(v => v.Name === payload.name);

        variant.MapString = payload.map.data;
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
