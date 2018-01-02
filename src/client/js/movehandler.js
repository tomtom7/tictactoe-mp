import { getCursorPosition } from './general';

class MoveHandler {
	constructor(socket) {
		this.socket = socket;
		document.getElementById('game-canvas').onclick = e => this.sendCoordinates(getCursorPosition(e));
	}

	sendCoordinates(coordinates) {
		this.socket.emit("playerInput", coordinates);
	}
}

export default MoveHandler;


