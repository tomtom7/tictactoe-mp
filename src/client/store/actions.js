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
	...listeners,
	...emitters
}
