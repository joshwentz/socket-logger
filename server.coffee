connect = require 'connect'
socketio = require 'socket.io'
Tail = require('tail').Tail

app = connect.createServer(connect.static('public')).listen 3000
io = socketio.listen app
console.log "Server listening on port 3000..."

fileName = 'mylogfile.log'
tail = new Tail fileName

tail.on 'line', (data) ->
    io.sockets.emit 'new-data',
        channel: 'stdout'
        value: data

io.sockets.on 'connection', (socket) ->
    socket.emit 'new-data',
        channel: 'stdout'
        value: "tail file #{fileName}"