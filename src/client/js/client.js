import io from 'socket.io-client';
import MoveHandler from './movehandler';
import Renderer from './renderer';
import { gameState, playBtn } from './constants';

class Client {
	constructor() {
		this.socket = io();
		this.moveHandler = new MoveHandler(this.socket);
		this.renderer = new Renderer();
		this.addSocketListeners();
		playBtn.onclick = e => this.play();
	}

	addSocketListeners() {
		this.socket.on('startGame', game => this.onGameStart(game));
		this.socket.on('updateGame', game => this.onGameUpdate(game, game.currentPlayer.id, 'It is your turn', 'Waiting for other player'));
		this.socket.on('gameOver', game => this.onGameOver(game));
		this.socket.on('opponentLeft', () => this.onOpponentLeft());
	}

	onGameUpdate(game, playerId, samePlayerText, otherPlayerText) {
		if (this.socket.id == playerId) {
			this.setState(samePlayerText);
		} else {
			this.setState(otherPlayerText);
		}
		this.renderer.render(game);
	}

	onGameStart(game) {
		this.moveHandler.gameId = game.id;
		this.onGameUpdate(game, game.currentPlayer.id, 'It is your turn', 'Waiting for other player');
	}

	onGameOver(game) {
		this.moveHandler.gameId = null;

		if (game.winner == 'NONE') {
			this.setState("Tie");
			this.renderer.render(game);
		} else {
			this.onGameUpdate(game, game.winner.id, 'You win', 'You loose');
		}
		this.showPlay();
	}

	onOpponentLeft() {
		this.moveHandler.gameId = null;
		this.setState("Your opponent left");
		this.showPlay();
	}

	play() {
		if (!this.moveHandler.gameId) {
			this.socket.emit("newPlayer");
			this.hidePlay();
			this.setState("Waiting for players");
			this.renderer.clearCanvas();
		}
	}

	setState(text) {
		gameState.innerHTML = text;
	}

	hidePlay() {
		playBtn.style.display = "none";
	}

	showPlay() {
		playBtn.style.display = "block";
	}
}

new Client();
