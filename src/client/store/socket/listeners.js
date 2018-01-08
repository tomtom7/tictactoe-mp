export default {
	socket_gameOver({ commit, dispatch }, game) {
		commit('updateGame', game);
		commit('gameOver');
		if (game.result.winner) {
			dispatch('conditionalGameState', {
				id: game.result.winner,
				samePlayerState: 'WIN',
				otherPlayerState: 'LOSS',
			});
		} else {
			commit('gameState', game.result.state);
		}
	},
	socket_updateGame({ commit, dispatch }, game) {
		commit('updateGame', game);
		dispatch('conditionalGameState', {
			id: game.currentPlayer.id,
			samePlayerState: 'TURN',
			otherPlayerState: 'WAIT',
		});
	},
	socket_disconnect({ commit }) {
		commit('gameState', 'DISCONNECT');
		commit('disconnect');
		commit('gameOver');
	},
};
