export default {
	playerInput(context, coordinates) {
		if (context.state.gameId) {
			this._vm.$socket.emit('playerInput', {
				coordinates, gameId: context.state.gameId
			});
		}
	},
	playerAction(context) {
		if (!context.state.connected) {
			return;
		}
		if (context.state.queued) {
			return context.dispatch('playerLeave');
		}
		return context.dispatch("playerJoin");
	},
	playerJoin({commit}) {
		this._vm.$socket.emit('playerJoin');
		commit('queue');
	},
	playerLeave({commit}) {
		this._vm.$socket.emit('playerLeave');
		commit('unqueue');
	},
	socket_startGame({commit}, game) {
		commit('setConditionalGameState', {
			id: game.currentPlayer.id,
			samePlayerState: 'TURN',
			otherPlayerState: 'WAIT'
		});
		commit('startGame', game);
	},
	socket_gameOver({commit}, game) {
		if (game.result.winner) {
			commit('setConditionalGameState', {
				id: game.currentPlayer.id,
				samePlayerState: 'WIN',
				otherPlayerState: 'LOSS'
			});
		} else {
			commit('setGameState', game.result.state);
		}

		commit('gameOver', game);
	},
	socket_updateGame({commit}, game) {
		commit('updateGame', game);
	},
	socket_disconnect({commit}) {
		commit('setGameState', 'DISCONNECT');
		commit('disconnect');
		commit('gameOver');
	}
}
