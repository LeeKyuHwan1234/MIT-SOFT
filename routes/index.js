var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../config/db');
/* GET home page. */

router.get('/', function(req, res, next) {
  var a = 1;
  var b = 10;
  var c = Math.floor((Math.random() * (b - a + 1)) + a);
  var handdata = req.body.handdata;
  db.query('select * from problem', function (error, result) {
    if (error) {
        throw error;
    }    
    else {
        res.render('quiz1', {'result' : result, c:c});
        console.log(handdata);
    };
  });
});

router.post('/2', function(req, res, next) {
  var a = 11;
  var b = 20;
  var c = Math.floor((Math.random() * (b - a + 1)) + a);
  var handdata = req.body.handdata;
  db.query('select * from problem', function (error, result) {
    if (error) {
        throw error;
    }    
    else {
        res.render('quiz1', {'result' : result, c:c});
        console.log(handdata);
    };
  });
});

module.exports = router;
