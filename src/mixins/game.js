import moment from 'moment';

export default {
    methods: {
        gameDescriptionOrUntitled() {
            return this.game.Desc || 'Untitled Game';
        },

        fullPhaseDescription() {
            return this.phase && `${this.phase.Season} ${this.phase.Type} ${this.phase.Year}`;
        },

        fullGameStatus() {
            if (this.game.Finished) {
                const finishedDate = moment(this.game.FinishedAt).format('l');
                return `Finished on ${finishedDate}`;
            }
            if (!this.game.Started)
                return '[not started]';


            return null;
        },

        fullPhaseDescriptionOrGameStatus() {
            return this.fullGameStatus() || this.fullPhaseDescription();
        }
    }
};
