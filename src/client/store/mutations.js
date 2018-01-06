export default {
	SOCKET_CONNECT(state) {
		state.connected = true;
		state.socketId = this._vm.$socket.id;
	},
	startGame(state, game) {
		state.gameId = game.id;
		state.queued = false;
		state.game = game;
	},
	gameOver(state, game) {
		state.gameId = null;
		state.game = game;
	},
	disconnect(state) {
		state.connected = false;
		state.queued = false;
	},
	setConditionalGameState(state, payload) {
		if (payload.id === state.socketId) {
			state.gameState = payload.samePlayerState;
		} else {
			state.gameState = payload.otherPlayerState;
		}
	},
	updateGame(state, game) {
		state.game = game;
	},
	setGameState(state, value) {
		state.gameState = value;
	},
	queue(state) {
		state.queued = true;
		state.gameState = 'WAITING';
	},
	unqueue(state) {
		state.queued = false;
		state.gameState = "";
	}
}
