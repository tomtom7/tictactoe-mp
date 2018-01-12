import { lines } from './constants';

export const getRandomIndex = max => Math.floor(Math.random() * max);
export const getCellIndex = (value, divisible) => Math.floor(value / divisible);
export const getCoordinates = (type, x, y, i) => {
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
};
