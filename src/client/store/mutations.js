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
	gameState(state, value) {
		state.gameState = value;
	}
}
