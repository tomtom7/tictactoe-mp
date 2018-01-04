import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import path from 'path';
import uuid from 'node-uuid';
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
			socket.on('disconnect', () => this.onDisconnect(socket)); 
			socket.on("newPlayer", () => this.onNewPlayer(socket.id));
			socket.on("playerInput", data => this.onPlayerInput(socket, data));
		});
	}

	onDisconnect(socket) {
		console.log("Player left: " + socket.id);

		this.games.forEach(game => {
			game.players.forEach(player => {
				if (player.id == socket.id) {
					game.onOpponentLeft();
					this.endGame(game);
					console.log("Game " + game.id + " over, player: " + player.id + " left");
				}
			});
		});
		this.waitingPlayers.filter(p => p.id != socket.id);
	}

	onNewPlayer(id) {
		console.log("New player: " + id);
		this.waitingPlayers.push(new Player(id));

		if (this.waitingPlayers.length >= 2) {
			this.createGame();
		}
	}

	createGame() {
		const player1 = this.waitingPlayers.shift();
		const player2 = this.waitingPlayers.shift();
		const game = new Game(uuid.v4(), player1, player2);

		if (this.io.sockets.connected[player1.id] && this.io.sockets.connected[player2.id]) {
			this.startGame(game);
		}
	}

	findGame(id, playerId) {
		return this.games.find(game => game.id == id && game.players.some(player => player.id == playerId));
	}

	onPlayerInput(socket, data) {
		const gameId = data.gameId;
		const game = this.findGame(gameId, socket.id);

		if (!game) {
			return;
		}

		game.validateTurn(socket.id, data.coordinates);

		if (game.result) {
			return this.endGame(game);
		} 

		this.updateGame(game);
	}


	addPlayerToGameRoom(playerId, gameId) {
		this.io.sockets.connected[playerId].join(gameId);
	}

	removePlayersFromGameRoom(game) {
		game.players.forEach(player => {
			if (this.io.sockets.connected[player.id]) {
				this.io.sockets.connected[player.id].leave(game.id);
			}
		});
	}

	endGame(game) {
		this.io.to(game.id).emit('gameOver', game);
		this.removePlayersFromGameRoom(game);
	}

	updateGame(game) {
		this.io.to(game.id).emit('updateGame', game);
	}

	startGame(game) {
		game.players.forEach(player => this.addPlayerToGameRoom(player.id, game.id));
		this.games.push(game);
		this.io.to(game.id).emit('startGame', game);
	}
}

new Server();