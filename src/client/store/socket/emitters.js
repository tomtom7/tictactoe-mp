export default {
	playerInput(context, coordinates) {
		if (context.state.game.id) {
			this._vm.$socket.emit('playerInput', {
				coordinates, gameId: context.state.game.id
			});
		}
	},
	playerJoin({commit}) {
		this._vm.$socket.emit('playerJoin');
		commit('setGameState', 'QUEUED');
	},
	playerLeave({commit}) {
		this._vm.$socket.emit('playerLeave');
		commit('setGameState', 'UNQUEUED');
	},
}
