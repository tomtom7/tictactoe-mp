export default {
	isRunning: state => state.game.id,
	btnText: state => state.gameState === 'QUEUED' ? 'cancelText' : 'playText',
	gameState: state => state.gameState,
	game: state => state.game
};
