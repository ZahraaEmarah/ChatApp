var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
rootpath = "D:/Training/12.Node/Day4/Day4_myTask/Server";

app.get('/', function (req, res) {
    res.render("main.ejs");
});

app.get('/public/Styles/style.css', function (req, res) {
    res.sendFile(rootpath + "/public/Styles/style.css")
});

users = [];

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('setUsername', function (data) {
        console.log(data)
        if (users.indexOf(data) == -1) {
            users.push(data);
            socket.emit('userSet', { username: data });
        } else {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        }
    });

    socket.on('msg', function(data){
        io.sockets.emit('newmsg', data);
     })
});

http.listen(7000, function () {
    console.log('listening on localhost:7000');
});