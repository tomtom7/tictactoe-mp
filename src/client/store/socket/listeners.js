export default {
	socket_gameOver({commit, dispatch}, game) {
		commit('updateGame', game);
		commit('gameOver');
		if (game.result.winner) {
			return dispatch('setConditionalGameState', {
				id: game.result.winner,
				samePlayerState: 'WIN',
				otherPlayerState: 'LOSS'
			});
		}
		commit('setGameState', game.result.state);
	},
	socket_updateGame({commit, dispatch}, game) {
		commit('updateGame', game);
		dispatch('setConditionalGameState', {
			id: game.currentPlayer.id,
			samePlayerState: 'TURN',
			otherPlayerState: 'WAIT'
		});
	},
	socket_disconnect({commit}) {
		commit('gameState', 'DISCONNECT');
		commit('disconnect');
		commit('gameOver');
	}
}
