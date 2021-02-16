var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../config/db');
var fs = require('fs');
/* GET home page. */

router.get('/', function(req, res, next) {
  // var a = 1;
  // var b = 10;
  //  var c = Math.floor((Math.random() * (b - a + 1)) + a);
 
  db.query(`select * from problem`, function (error, result) {
    if (error) {
        throw error;
    }    
    else {
        res.render('quiz', {'result' : result, lotto : lottoNum()});
    };
  });
});


module.exports = router;
