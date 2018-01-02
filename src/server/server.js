import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import path from 'path';
import Player from './player';
import Game from './game';

const app = express();
const httpServer = http.Server(app);
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.use('/dist', express.static(path.resolve('dist')));

httpServer.listen(port, () => {
  console.log('listening on *:3000');
});

class Server {
	constructor() {
		this.io = socketIO(httpServer);
		this.addSocketHandlers();
		this.games = [];
		this.waitingPlayers = [];
	}

	addSocketHandlers() {
		this.io.sockets.on('connection', socket => {
			// listen for disconnection; 
			socket.on('disconnect', () => this.onDisconnect(socket.id)); 
			// listen for new player
			socket.on("newPlayer", () => this.onNewPlayer(socket.id));
			// listen for player input
			socket.on("playerInput", data => this.onPlayerInput(socket, data));
		});
	}

	onDisconnect(id) {
		console.log("Player left: " + id);
		this.waitingPlayers.filter(p => p.id != id);
	}

	onNewPlayer(id) {
		console.log("New player: " + id);
		this.waitingPlayers.push(new Player(id));

		if (this.waitingPlayers.length >= 2) {
			const player1 = this.waitingPlayers.shift();
			const player2 = this.waitingPlayers.shift();
			const game = new Game(new Date().getTime(), player1, player2);

			this.games.push(game);

			this.io.sockets.connected[player1.id].join(game.id);
			this.io.sockets.connected[player2.id].join(game.id);
			this.io.to(game.id).emit('updateGame', game);
		}
	}

	findGame(id) {
		return this.games.find(g => g.id == id);
	}

	onPlayerInput(socket, data) {
		const gameId = Object.keys(socket.rooms).filter(r => r != socket.id);
		const game = this.findGame(gameId);

		game.validateTurn(socket.id, data);
		this.io.to(gameId).emit('updateGame', game);
	}
}

new Server();