import listeners from './socket/listeners';
import emitters from './socket/emitters';

export default {
	playerAction(context) {
		if (!context.state.connected) {
			return;
		}
		if (context.state.gameState === 'QUEUED') {
			return context.dispatch('playerLeave');
		}
		return context.dispatch("playerJoin");
	},
	setConditionalGameState(context, payload) {
		if (payload.id === context.state.socketId) {
			return context.commit('setGameState', payload.samePlayerState);
		}
		return context.commit('setGameState', payload.otherPlayerState);
	},
	...listeners,
	...emitters
}
