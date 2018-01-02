import { getRandomIndex, getCellIndex } from './general';
import { tileScale, shapes } from './constants';

class Game {
	constructor(id, player1, player2) {
		this.id = id;
		player1.shape = shapes.X;
		player2.shape = shapes.O;

		this.players = [player1, player2];
		this.grid = [[], [], []];
		this.currentPlayer = this.chooseRandomPlayer();
		console.log("Game " + this.id + " started");
	}

	chooseRandomPlayer() {
		return this.players[getRandomIndex(this.players.length)];
	}

	nextTurn() {
		this.currentPlayer = this.players.filter(p => p.id != this.currentPlayer.id)[0];
	}

	validateTurn(id, data) {
		if (id != this.currentPlayer.id) {
			return;
		}

		const x = getCellIndex(data.x, tileScale);
		const y = getCellIndex(data.y, tileScale);

		if (!this.grid[x][y]) {
			this.grid[x][y] = this.currentPlayer;

			this.checkWinCondition();
			this.nextTurn();
		}
	}

	checkWinCondition() {

	}
}

export default Game;
