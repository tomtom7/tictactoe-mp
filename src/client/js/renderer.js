import { canvas, ctx, tileScale, offset, padding, radius } from './constants';

class Renderer {
	constructor(resources, spritesData) {
		this.resources = resources;
		this.spritesData = spritesData;
	}

	clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	drawGrid() {
    ctx.beginPath();
    ctx.lineWidth = 0.15;
    ctx.strokeStyle = '#000000';
    for (let x = 0; x <= canvas.width; x += tileScale) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
    }

    ctx.stroke(); 

    ctx.beginPath();
    for (let y = 0; y <= canvas.height; y += tileScale) {
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
    }
    ctx.stroke(); 
	}

	drawEntitiy(shape, x, y) {
		ctx.beginPath();
		ctx.lineWidth = 10;
		if (shape == 'X') {
			this.drawX(x * tileScale, y * tileScale);
		} else {
			this.drawO(x * tileScale, y * tileScale);
		}
    ctx.stroke();
	}

	drawMoves(grid) {
		for (let x = 0; x < grid.length; x += 1) {
			for (let y = 0; y < grid[x].length; y += 1) {
				if (grid[x][y]) {
				  this.drawEntitiy(grid[x][y].shape, x, y);
				}
	    }
    }
	}

	drawX(x, y) {
		ctx.moveTo(x + offset - radius, y + offset - radius);
    ctx.lineTo(x + offset + radius, y + offset + radius);
    ctx.moveTo(x + offset + radius, y + offset - radius);
    ctx.lineTo(x + offset - radius, y + offset + radius);
	}

	drawO(x, y) {
		ctx.arc(x + offset, y + offset, radius, 0, 2 * Math.PI);
	}

	drawVictoryLine(line) {
		ctx.beginPath();
		ctx.lineWidth = 5;
		if (line.orientation == 'COL') {
			this.drawCol(line.x * tileScale);
		}
		if (line.orientation == 'ROW') {
			this.drawRow(line.y * tileScale);
		}
		if (line.orientation == 'DIAG') {
			this.drawDiagonal();
		}
		if (line.orientation == 'ADIAG') {
			this.drawAntiDiagonal();
		}

		ctx.stroke();
	}

	drawCol(x) {
		ctx.moveTo(x + offset, padding);
		ctx.lineTo(x + offset, canvas.height - padding);
	}

	drawRow(y) {
		ctx.moveTo(padding, y + offset);
		ctx.lineTo(canvas.width - padding, y + offset);
	}

	drawDiagonal() {
		ctx.moveTo(padding, padding);
		ctx.lineTo(canvas.width - padding, canvas.height - padding);
	}

	drawAntiDiagonal() {
		ctx.moveTo(canvas.width - padding, padding);
		ctx.lineTo(padding, canvas.height - padding);
	}

	render(game) {
		this.clearCanvas();
		this.drawGrid();
		this.drawMoves(game.grid);

		if (game.winner && game.winner != 'NONE') {
			this.drawVictoryLine(game.winner.line);
		}

	}
}

export default Renderer;
