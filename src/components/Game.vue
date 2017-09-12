<template>
    <h1>{{game ? game.Desc : ''}}</h1>
</template>

<script>
    import Game from '@/api/game';
    import MapPhaseViewer from './MapPhaseViewer';
    export default {
        name: 'game',
        components: {
            'map-phase-viewer': MapPhaseViewer
        },
        asyncComputed: {
            async game() {
                const game = Game.getGame(this.$route.params.id);
                return game;
            }
        }
    };
</script>
