import { lines } from './constants';

export function getRandomIndex(max) {
	return Math.floor(Math.random() * max);
}

export function getCellIndex(value, divisble) {
	return Math.floor(value / divisble);
}

export function getCoordinates(type, x, y, i) {
	if (type == lines.COL) {
		y = i;
	} else if (type == lines.ROW) {
		x = i;
	}	else if (type == lines.DIAG) {
		x = i;
		y = i;
	}	else if (type == lines.ADIAG) {
		x = i;
		y = 2 - i;
	}

	return [x, y];
}
