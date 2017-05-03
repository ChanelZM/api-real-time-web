require('dotenv').config();

var express = require('express');
var Server = require('http').Server;
var socketio = require('socket.io');
var path = require('path');
var Twitter = require('twitter');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
var server = Server(app);
var io = socketio(server);
//Setup to get access to twitter stream, on twitter you can request these keys
var client = new Twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

//When user signs up, this array will contain usernames
var users = [];

//EJS setup
app.set('view engine', 'ejs');
app.set('client', client);

//Express setup
app.use(express.static(path.join(__dirname, 'public')));

//Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var homeRouter = require('./routes/home');
var streamRouter = require('./routes/stream');

app.use('/', homeRouter);
app.use('/stream', streamRouter);

//IO setup
io.on('connection', function(socket){
    socket.on('user', function(user){
        users.push(user);
        console.log(users);
    });

    socket.broadcast.on('comment', function(comm){
      io.emit('comment', comm);
    });

    socket.on('dislike', function(dislike){
        io.emit('dislike', dislike);
    });
});

//Run it, Run it
server.listen(process.env.PORT||4000, function () {//Use the port that's default when deployed, else use 4000
    console.log("Running at port 4000");
});
