import moment from 'moment';

export default {
    methods: {
        gameDescriptionOrUntitled() {
            return this.game.Desc || 'Untitled Game';
        },

        fullPhaseDescription() {
            return this.phase ? `${this.phase.Season} ${this.phase.Type} ${this.phase.Year}` : null;
        },

        fullGameStatus() {
            if (this.game.Finished) {
                const finishedDate = moment(this.game.FinishedAt).format('l');
                return `Finished on ${finishedDate}`;
            }
            else if (!this.game.Started) {
                return '[not started]';
            }

            return null;
        },

        fullPhaseDescriptionOrGameStatus() {
            return this.fullGameStatus() || this.fullPhaseDescription();
        },

        getUserAsPlayer: (game, user) => game.Members.find(m => m.User.Id === user.Id)
    }
};
