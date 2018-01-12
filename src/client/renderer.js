export default class Renderer {
	constructor(canvas, tileScale) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.tileScale = tileScale;
		this.offset = this.tileScale / 2;
		this.padding = this.tileScale / 4;
		this.radius = this.tileScale / 2.5;
	}

	clearCanvas = () => {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	drawGrid = () => {
		this.ctx.beginPath();
		this.ctx.lineWidth = 0.15;
		this.ctx.strokeStyle = '#000000';
		for (let x = 0; x <= this.canvas.width; x += this.tileScale) {
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.canvas.height);
		}

		this.ctx.stroke();

		this.ctx.beginPath();
		for (let y = 0; y <= this.canvas.height; y += this.tileScale) {
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.canvas.width, y);
		}
		this.ctx.stroke();
	}

	drawEntitiy = (shape, x, y) => {
		this.ctx.beginPath();
		this.ctx.lineWidth = 10;
		if (shape === 'X') {
			this.drawX(x * this.tileScale, y * this.tileScale);
		} else {
			this.drawO(x * this.tileScale, y * this.tileScale);
		}
		this.ctx.stroke();
	}

	drawMoves = grid => {
		for (let x = 0; x < grid.length; x += 1) {
			for (let y = 0; y < grid[x].length; y += 1) {
				if (grid[x][y]) {
					this.drawEntitiy(grid[x][y].shape, x, y);
				}
			}
		}
	}

	drawX = (x, y) => {
		this.ctx.moveTo(x + this.offset - this.radius, y + this.offset - this.radius);
		this.ctx.lineTo(x + this.offset + this.radius, y + this.offset + this.radius);
		this.ctx.moveTo(x + this.offset + this.radius, y + this.offset - this.radius);
		this.ctx.lineTo(x + this.offset - this.radius, y + this.offset + this.radius);
	}

	drawO = (x, y) => {
		this.ctx.arc(x + this.offset, y + this.offset, this.radius, 0, 2 * Math.PI);
	}

	drawVictoryLine = line => {
		this.ctx.beginPath();
		this.ctx.lineWidth = 5;
		if (line.type === 'COL') {
			this.drawCol(line.x * this.tileScale);
		}
		if (line.type === 'ROW') {
			this.drawRow(line.y * this.tileScale);
		}
		if (line.type === 'DIAG') {
			this.drawDiagonal();
		}
		if (line.type === 'ADIAG') {
			this.drawAntiDiagonal();
		}

		this.ctx.stroke();
	}

	drawCol = x => {
		this.ctx.moveTo(x + this.offset, this.padding);
		this.ctx.lineTo(x + this.offset, this.canvas.height - this.padding);
	}

	drawRow = y => {
		this.ctx.moveTo(this.padding, y + this.offset);
		this.ctx.lineTo(this.canvas.width - this.padding, y + this.offset);
	}

	drawDiagonal = () => {
		this.ctx.moveTo(this.padding, this.padding);
		this.ctx.lineTo(this.canvas.width - this.padding, this.canvas.height - this.padding);
	}

	drawAntiDiagonal = () => {
		this.ctx.moveTo(this.canvas.width - this.padding, this.padding);
		this.ctx.lineTo(this.padding, this.canvas.height - this.padding);
	}

	render = game => {
		this.clearCanvas();
		this.drawGrid();
		this.drawMoves(game.grid);

		if (game.result && game.result.state === 'WINNER') {
			this.drawVictoryLine(game.result.line);
		}
	}
}
