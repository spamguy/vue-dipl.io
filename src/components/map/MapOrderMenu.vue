<template>
    <v-btn-toggle v-model="selectedAction" mandatory>
        <v-tooltip v-for="action in availableActions"
                   :key="action.icon"
                   bottom>
            <v-btn slot="activator"
                   :value="action.name"
                   flat>
                <v-icon>{{action.icon}}</v-icon>
            </v-btn>
            <span>{{action.name}}</span>
        </v-tooltip>
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
    data: () => ({
        actions: [{
            name: 'Hold',
            icon: 'pan_tool',
            phaseTypes: ['Movement']
        }, {
            name: 'Move',
            icon: 'trending_flat',
            phaseTypes: ['Movement', 'Retreat']
        }, {
            name: 'Support',
            icon: 'call_merge',
            phaseTypes: ['Movement']
        }, {
            name: 'Build Army',
            icon: 'add',
            phaseTypes: ['Adjustment']
        }, {
            name: 'Build Fleet',
            icon: 'add_box',
            phaseTypes: ['Adjustment']
        }],
        selectedAction: 'Hold'
    }),
    computed: {
        availableActions() {
            return this.actions.filter(a => a.phaseTypes.indexOf(this.phaseType) > -1);
        }
    }
};
</script>
