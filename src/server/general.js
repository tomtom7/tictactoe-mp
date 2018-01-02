export function getRandomIndex(max) {
	return Math.floor(Math.random() * max);
}

export function getCellIndex(value, divisble) {
	return Math.floor(value / divisble);
}