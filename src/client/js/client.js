import io from 'socket.io-client';
import MoveHandler from './movehandler';
import Renderer from './renderer';
import { playBtn, stateTexts, WINNER } from './constants';
import { setGameState, hidePlay, showPlay } from './general';

class Client {
	constructor() {
		this.socket = io();
		this.moveHandler = new MoveHandler(this.socket);
		this.renderer = new Renderer();
		this.addSocketListeners();
		playBtn.onclick = () => this.play();
	}

	addSocketListeners() {
		this.socket.on('startGame', game => this.onGameStart(game));
		this.socket.on('updateGame', game => this.onGameUpdate(game));
		this.socket.on('gameOver', game => this.onGameOver(game));
		this.socket.on('disconnect', () => this.handleDisconnect());
	}

	onGameUpdate(game) {
		setGameState(this.getPlayerText(game.currentPlayer.id, stateTexts.YOUR_TURN, stateTexts.OPPONENT_TURN));
		this.renderer.render(game);
	}

	onGameStart(game) {
		this.setGame(game.id);
		this.onGameUpdate(game);
	}

	onGameOver(game) {
		this.setGame(null);
		this.setEndState(game);
		showPlay();
		this.renderer.render(game);
	}

	handleDisconnect() {
		this.setGame(null);
		setGameState(stateTexts.DISCONNECTED);
		showPlay();
	}

	setEndState(game) {
		if (game.result.state == WINNER) {
			return setGameState(this.getPlayerText(game.result.winner, stateTexts.WIN, stateTexts.LOSS));
		}

		return setGameState(stateTexts[game.result.state]);
	}

	getPlayerText(id, samePlayerText, otherPlayerText) {
		if (id == this.socket.id) {
			return samePlayerText;
		}

		return otherPlayerText;
	}

	play() {
		if (!this.socket.connected || this.moveHandler.gameId ) {
			return;
		}

		this.socket.emit('newPlayer');
		hidePlay();
		setGameState(stateTexts.WAITING);
		this.renderer.clearCanvas();
	}

	setGame(gameId) {
		this.moveHandler.gameId = gameId;
	}
}

new Client();
