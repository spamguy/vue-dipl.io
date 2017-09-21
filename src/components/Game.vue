<template>
    <div>
        <h1>{{game.Desc}}</h1>
        <map-phase-viewer :game="game"></map-phase-viewer>
    </div>
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
            game: {
                async get() {
                    const game = Game.getGame(this.$route.params.ID);
                    return game;
                },
                default: { }
            }
        }
    };
</script>
