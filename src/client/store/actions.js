import listeners from './socket/listeners';
import emitters from './socket/emitters';

export default {
	playerAction(context) {
		if (!context.state.connected) {
			return undefined;
		}
		if (context.state.gameState === 'QUEUED') {
			return context.dispatch('playerLeave');
		}
		return context.dispatch('playerJoin');
	},
	conditionalGameState(context, payload) {
		if (payload.id === context.state.socketId) {
			return context.commit('gameState', payload.samePlayerState);
		}
		return context.commit('gameState', payload.otherPlayerState);
	},
	...listeners,
	...emitters,
};
