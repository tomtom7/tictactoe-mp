import io from 'socket.io-client';
import MoveHandler from './movehandler';
import Renderer from './renderer';
import { gameState } from './constants';

class Client {
	constructor() {
		this.socket = io();
		this.moveHandler = new MoveHandler(this.socket);
		this.renderer = new Renderer();
		this.socket.emit("newPlayer");
		this.socket.on('updateGame', game => this.updateGame(game));
	}

	updateGame(game) {
		if (this.isMyTurn(game.currentPlayer.id)) {
			gameState.innerHTML = "It is your turn";
		} else {
			gameState.innerHTML = "Waiting for other player";
		}
		this.renderer.render(game.grid);
	}

	isMyTurn(currentPlayerId) {
		return currentPlayerId == this.socket.id
	}

}

new Client();
