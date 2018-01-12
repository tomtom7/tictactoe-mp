import uuid from 'node-uuid';
import Player from './player';
import Game from './game';
import { shapes } from './constants';

export default class App {
	games = [];
	players = [];

	constructor(io) {
		this.io = io;
		this.addSocketHandlers();
	}

	addSocketHandlers = () => {
		this.io.sockets.on('connection', socket => {
			socket.on('disconnect', () => this.onDisconnect(socket));
			socket.on('playerJoin', () => this.onPlayerJoin(socket.id));
			socket.on('playerInput', data => this.onPlayerInput(socket, data));
			socket.on('playerLeave', () => this.onPlayerLeave(socket));
		});
	}

	onDisconnect = socket => {
		console.log(`Player left: ${socket.id}`);

		this.games.forEach(game => {
			game.players.forEach(player => {
				if (player.id === socket.id) {
					game.onOpponentLeft();
					this.endGame(game);
					console.log(`Game ${game.id} over, player: ${player.id} left`);
				}
			});
		});
		this.players.filter(p => p.id !== socket.id);
	}

	onPlayerJoin = id => {
		console.log(`New player: ${id}`);
		this.players.push(new Player(id));

		if (this.players.length >= 2) {
			this.createGame();
		}
	}

	onPlayerLeave = socket => {
		this.players = this.players.filter(p => p.id !== socket.id);
	}

	createGame = () => {
		const player1 = this.players.shift();
		player1.shape = shapes.X;
		const player2 = this.players.shift();
		player2.shape = shapes.O;

		const game = new Game(uuid.v4(), [player1, player2]);

		if (this.io.sockets.connected[player1.id] && this.io.sockets.connected[player2.id]) {
			this.startGame(game);
		}
	}

	findGame = (id, playerId) => this.games.find(game => game.id === id && game.players.some(player => player.id === playerId));

	onPlayerInput = (socket, data) => {
		const game = this.findGame(data.gameId, socket.id);

		if (!game) {
			return;
		}

		game.validateTurn(socket.id, data.coordinates);

		if (game.result) {
			this.endGame(game);
		} else {
			this.updateGame(game);
		}
	}

	addPlayerToGameRoom = (playerId, gameId) => {
		this.io.sockets.connected[playerId].join(gameId);
	}

	removePlayersFromGameRoom = game => {
		game.players.forEach(player => {
			if (this.io.sockets.connected[player.id]) {
				this.io.sockets.connected[player.id].leave(game.id);
			}
		});
	}

	endGame = game => {
		this.io.to(game.id).emit('gameOver', game);
		this.removePlayersFromGameRoom(game);
	}

	updateGame = game => {
		this.io.to(game.id).emit('updateGame', game);
	}

	startGame= game => {
		game.players.forEach(player => this.addPlayerToGameRoom(player.id, game.id));
		this.games.push(game);
		this.updateGame(game);
	}
}
