<template>
    <v-btn-toggle mandatory>
        <v-btn v-for="action in availableActions"
               :key="action.icon"
               icon />
    </v-btn-toggle>
</template>

<script>
export default {
    name: 'MapOrderMenu',
    props: {
        phaseType: {
            type: String,
            required: true
        }
    },
    computed: {
        availableActions: () => {
            let availableActions = [];

            switch (this.phaseType) {
            case 'Movement':
                break;
            }

            return availableActions;
        }
    }
};
</script>
