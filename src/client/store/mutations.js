export default {
	SOCKET_CONNECT(state) {
		state.connected = true;
		state.socketId = this._vm.$socket.id;
	},
	disconnect(state) {
		state.connected = false;
		state.socketId = null;
	},
	updateGame(state, game) {
		state.game = game;
	},
	gameOver(state) {
		state.game.id = null;
	},
	setConditionalGameState(state, payload) {
		if (payload.id === state.socketId) {
			state.gameState = payload.samePlayerState;
		} else {
			state.gameState = payload.otherPlayerState;
		}
	},
	setGameState(state, value) {
		state.gameState = value;
	}
}
