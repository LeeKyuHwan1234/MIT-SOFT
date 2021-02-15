var express = require('express');
var router = express.Router();
var db = require('../config/db');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  db.query(`select * from problem`, function (error, result) {
    if (error) {
        throw error;
    }    
    else {
        res.render('quiz', {'result' : result, lotto : lottoNum()});
    };
});
});


function lottoNum () {
  let lotto = [];
  let i = 0;
  while (i < 10) {
  let n = Math.floor(Math.random() * 85) + 1;
  if (! sameNum(n)) {
    lotto.push(n);
    i++;
  }
  }
  function sameNum (n) {
  for (var i = 0; i < lotto.length; i++) {
  if (n === lotto[i]) {
    return true;
  }
  }
    return false;
  }
    return lotto;
  }
  console.log(lottoNum());
  
module.exports = router;
