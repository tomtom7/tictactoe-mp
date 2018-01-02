import { canvas, ctx, tileScale } from './constants';

class Renderer {
	constructor(resources, spritesData) {
		this.resources = resources;
		this.spritesData = spritesData;
	}

	_clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	_drawGrid() {
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

	_drawEntitiy(shape, x, y) {
		ctx.font = "150px Arial";
		ctx.fillText(shape, (x * tileScale) + 40, (y * tileScale) + 150); 
	}


	render(grid) {
		this._clearCanvas();
		this._drawGrid();

		for (let x = 0; x < grid.length; x += 1) {
			for (let y = 0; y < grid[x].length; y += 1) {
				if (grid[x][y] != null) {
				  this._drawEntitiy(grid[x][y].shape, x, y);
				}
	    }
    }
	}
}

export default Renderer;
