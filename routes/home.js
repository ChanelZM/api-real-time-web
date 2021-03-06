var express = require('express');
var multer = require('multer');

var router = express.Router();
var upload = multer();

router.get('/', function(req, res){
    res.render('content/homepage', {
        message: ''
    });
});

router.post('/', upload.single(), function(req, res){
    var username = req.body.username;

    //Get variable from app.js
    var client = req.app.get('client'); //Credits to http://stackoverflow.com/questions/20712712/how-to-pass-variable-from-app-js-to-routes-index-js

        //Get recent tweets from trump
        client.get('statuses/user_timeline', {screen_name: 'realDonaldTrump'}, function(error, tweets, response){
            if(error){
                //If it didn't work render this page
                res.render('content/noconnection');
            } else {
                res.render('content/stream', {
                    username : username,
                    tweets : tweets
                });
            }
        });
});

module.exports = router;
