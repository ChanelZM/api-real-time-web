require('dotenv').config();

var express = require('express');
var Server = require('http').Server;
var socketio = require('socket.io');
var path = require('path');
var Twitter = require('twitter');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');

//Database part credits to Smitha https://www.youtube.com/watch?v=c01OHDUpDMU&index=6&list=PLw5h0DiJ-9PC0Wo1NWrNHgKE-mFc_9ftq
mongoose.Promise = global.Promise;

var URI = 'mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@ds129651.mlab.com:29651/commentsanddislikes';

mongoose.connect(URI, function(err){
    if (err){
        console.log('No connection');
    } else {
        console.log('You\'re connected');
    }
});

var commentsSchema = mongoose.Schema({
    commentTweetId: String,
    username: String,
    comment: String,
    created: {type: Date, default: Date.now}
});

var Post = mongoose.model('Comment', commentsSchema);

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
//var comments =

//EJS setup
app.set('view engine', 'ejs');
app.set('client', client);
app.set('users', users);

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
    Post.find({}, function(err, docs){
        if(err) throw err;
        socket.broadcast.emit('comment-history', docs);
    });

    socket.on('user', function(user){
//        if(users.indexOf(username)== -1){
            users.push(user);
//        } else {

//        }
    });

    socket.broadcast.on('comment', function(comm){
        var newComment = new Post(comm);
        newComment.save(function(err){
            if (err) throw err;

            io.emit('comment', comm);
        });
    });

    socket.on('dislike', function(dislike){
        io.emit('dislike', dislike);
    });
});

//Run it, Run it
server.listen(process.env.PORT||4000, function () {//Use the port that's default when deployed, else use 4000
    console.log("Running at port 4000");
});
