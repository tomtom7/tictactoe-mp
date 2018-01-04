import { getCursorPosition } from './general';
import { canvas } from './constants';

class MoveHandler {
	constructor(socket) {
		this.socket = socket;
		canvas.onclick = e => this.sendCoordinates(getCursorPosition(e));
	}

	sendCoordinates(coordinates) {
		if (!this.gameId) {
			return;
		}

		const data = {
			coordinates,
			gameId: this.gameId,
		};

		this.socket.emit('playerInput', data);
	}
}

export default MoveHandler;
