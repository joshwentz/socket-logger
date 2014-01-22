var Tail, app, connect, fileName, io, socketio, tail;

connect = require('connect');

socketio = require('socket.io');

Tail = require('tail').Tail;

app = connect.createServer(connect["static"]('public')).listen(process.env.PORT, process.env.IP);

io = socketio.listen(app);

console.log("Server listening on port 80...");

fileName = 'mylogfile.log';

tail = new Tail(fileName);

tail.on('line', function(data) {
  return io.sockets.emit('new-data', {
    channel: 'stdout',
    value: data
  });
});

io.sockets.on('connection', function(socket) {
  return socket.emit('new-data', {
    channel: 'stdout',
    value: "tail file " + fileName
  });
});