import { canvas, gameState, playBtn } from './constants';

export function getCursorPosition(e) {
	const rect = canvas.getBoundingClientRect();
	const x = e.clientX - rect.left;
	const y = e.clientY - rect.top;

	return { x, y };
}

export function setGameState(text) {
	gameState.innerHTML = text;
}

export function hidePlay() {
	playBtn.style.display = 'none';
}

export function showPlay() {
	playBtn.style.display = 'block';
}
