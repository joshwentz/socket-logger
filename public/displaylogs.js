$(document).ready(function() {
    var socket = io.connect('http://eweb-c9-joshwentz.c9.io/');
    var container = $('#container');
    socket.on('new-data', function(data) {
        var newItem = $('<div>' + data.value + '</div>');
        container.append(newItem);
    });
});