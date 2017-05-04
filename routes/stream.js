var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
    //Get variable from app.js
    var client = req.app.get('client');

    res.render('content/stream');
});

module.exports = router;
