import { getRandomIndex, getCellIndex } from './general';
import { tileScale, shapes, lines, } from './constants';

import { gameOverCodes } from './constants';

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
		if (this.result || id != this.currentPlayer.id) {
			return;
		}

		const x = getCellIndex(data.x, tileScale);
		const y = getCellIndex(data.y, tileScale);

		if (!this.grid[x][y]) {
			this.grid[x][y] = this.currentPlayer;

			this.checkWinCondition(x, y);

			if (!this.result) {
				this.nextTurn();
			}
		}
	}

	checkWinCondition(x, y) {
		this.checkGrid(lines.COL, x, y);
		this.checkGrid(lines.ROW, x, y);

		if (x == y) {
			this.checkGrid(lines.DIAG);
		}

		if (x + y == 2) {
			this.checkGrid(lines.ADIAG);
		}

		this.checkTie();
	}

	checkTie() {
		if (this.result) {
			return;
		}

		if ([].concat(...this.grid).filter(n => true).length == 9) {
			this.setResult(gameOverCodes.TIE);
		}
	}

	checkGrid(type, x, y) {
		if (this.result) {
			return;
		}

		for(let i = 0; i < 3; i += 1) {
			const coordinates = this.getCoordinates(type, x, y, i);
			const cellX = coordinates[0];
			const cellY = coordinates[1];

			if (!this.isValidCell(cellX, cellY)) {
				break;
			} 

			this.checkWinner(i, type, cellX, cellY);
		}
	}

	getCoordinates(type, x, y, i) {
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

	isValidCell(x, y) {
		return this.grid[x] && this.grid[x][y] && this.grid[x][y].id == this.currentPlayer.id
	}

	onOpponentLeft() {
		this.setResult(gameOverCodes.OPPONENT_LEFT);
	}

	setResult(state) {
		this.result = {
			state: state
		}
	}

	setWinner(x, y, type) {
		this.result = {
			state: gameOverCodes.WINNER,
			winner: this.currentPlayer.id,
			line: { 
				orientation: type,
				x: x,
				y: y
			}
		}
	}

	checkWinner(i, type, x, y) {
		if (i == 2) {
			this.setWinner(x, y, type);
			console.log("Game " + this.id + " over, winner: " + this.result.winner.id);
		}
	}
}

export default Game;
