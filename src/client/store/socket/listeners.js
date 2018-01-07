export default {
	socket_startGame({commit}, game) {
		commit('updateGame', game);
		commit('setConditionalGameState', {
			id: game.currentPlayer.id,
			samePlayerState: 'TURN',
			otherPlayerState: 'WAIT'
		});
	},
	socket_gameOver({commit}, game) {
		commit('updateGame', game);
		commit('gameOver');
		if (game.result.winner) {
			return commit('setConditionalGameState', {
				id: game.currentPlayer.id,
				samePlayerState: 'WIN',
				otherPlayerState: 'LOSS'
			});
		}
		commit('setGameState', game.result.state);
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
