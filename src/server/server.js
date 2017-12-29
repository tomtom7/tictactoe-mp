import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
import path from 'path';

const app = express();
const httpServer = http.Server(app);
const io = socketIO(httpServer);

app.get('/', (req, res) => {
  res.sendFile(path.resolve('dist/index.html'));
});

app.use('/dist', express.static(path.resolve('dist')));

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () =>{
    console.log('user disconnected');
  });
});

httpServer.listen(3000, () => {
  console.log('listening on *:3000');
});