import io from 'socket.io-client';
import MoveHandler from './movehandler';
import Renderer from './renderer';
import { gameState, playBtn, stateTexts, WINNER } from './constants';

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
		this.socket.on('updateGame', game => this.onGameUpdate(game));
		this.socket.on('gameOver', game => this.onGameOver(game));
	}

	onGameUpdate(game) {
		this.setState(this.getPlayerText(game.currentPlayer.id, stateTexts.YOUR_TURN, stateTexts.OPPONENT_TURN));
		this.renderer.render(game);
	}

	onGameStart(game) {
		this.setGame(game.id);
		this.onGameUpdate(game);
	}

	onGameOver(game) {
		this.setGame(null);
		this.setEndState(game);
		this.showPlay();
		this.renderer.render(game);
	}

	setEndState(game) {
		if (game.result.state == WINNER) {
			return this.setState(this.getPlayerText(game.result.winner, stateTexts.WIN, stateTexts.LOSS));
		}

		return this.setState(stateTexts[game.result.state]);
	}

	getPlayerText(id, samePlayerText, otherPlayerText) {
		if (id == this.socket.id) {
			return samePlayerText;
		}

		return otherPlayerText;
	}

	play() {
		if (this.moveHandler.gameId) {
			return;
		}

		this.socket.emit("newPlayer");
		this.hidePlay();
		this.setState(stateTexts.WAITING);
		this.renderer.clearCanvas();
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

	setGame(gameId) {
		this.moveHandler.gameId = gameId;
	}
}

new Client();
