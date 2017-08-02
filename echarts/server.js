const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req, res) => {
  // res.send('<h1>Hello, world!</h1>');
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', msg => {
    console.log(`message: ${msg}`);
    io.emit('chat message', msg);
  })
});

function rd(n, m) {
  const v = m - n + 1;
  return Math.floor(Math.random() * v + n);
}

let now = +Date.now();
const oneSecond = 1000 * 60;

function mockDigital(time) {
  io.emit('Digital', rd(0, 1), +time);
}

function mockAnalog(time) {
  io.emit('Analog', rd(0, 500), +time);
}

function mockData() {
  now = new Date(+now + oneSecond);
  mockDigital(now);
  mockAnalog(now);
}

setInterval(mockData, 1000);

http.listen(3000, () => {
  console.log('listening on *:3000');
});