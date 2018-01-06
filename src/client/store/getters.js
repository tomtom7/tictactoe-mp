export default {
	notStarted(state) {
		return !state.gameId;
	},
	btnText(state) {
		if (state.queued) {
			return state.cancelText;
		}
		return state.playText;
	},
	gameState(state) {
		return state[state.gameState];
	}
}
