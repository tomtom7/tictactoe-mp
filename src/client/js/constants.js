export const canvas = document.getElementById('game-canvas');
export const ctx = canvas.getContext('2d');
export const tileScale = 100;
export const offset = tileScale / 2;
export const padding = tileScale / 4;
export const radius = tileScale / 2.5;
export const gameState = document.getElementById('game-state');
export const playBtn = document.getElementById('play');
export const WINNER = 'WINNER';
export const stateTexts = {
	TIE: 'Tie',
	OPPONENT_LEFT: 'Your opponent left',
	WIN: 'You win!',
	LOSS: 'You lost',
	WAITING: 'Waiting for players',
	YOUR_TURN: 'It is your turn',
	OPPONENT_TURN: 'Waiting for other player',
};
