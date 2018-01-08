import { lines } from './constants';

export function getRandomIndex(max) {
	return Math.floor(Math.random() * max);
}

export function getCellIndex(value, divisible) {
	return Math.floor(value / divisible);
}

export function getCoordinates(type, x, y, i) {
	if (type === lines.COL) {
		return { x, y: i };
	}
	if (type === lines.ROW) {
		return { x: i, y };
	}
	if (type === lines.DIAG) {
		return { x: i, y: i };
	}
	if (type === lines.ADIAG) {
		return { x: i, y: 2 - i };
	}

	return { x, y };
}
