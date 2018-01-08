export default {
	isRunning(state) {
		return state.game.id;
	},
	btnText(state) {
		if (state.gameState === 'QUEUED') {
			return 'cancelText';
		}
		return 'playText';
	},
	gameState(state) {
		return state.gameState;
	},
	game(state) {
		return state.game;
	},
};
