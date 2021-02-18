var express = require('express');
var router = express.Router();
var db = require('../config/db');
var fs = require('fs');

const { createConnection } = require('net');



  // MySQL 연결
  
router.get('/:pid', function (req, res) {
    var c = lottoNum();
    var stmt = "SELECT * FROM problem WHERE pid=" + c;
    db.query(stmt, function (err, result) {
       if (err) throw err;
       var result = result[0];
       res.render('quiz.ejs', {
           title: 'content',
           result: result,
           check: "answer"
        });
      })
  });

  router.post('/:pid', function (req, res) {
    var stmt = "SELECT * FROM problem WHERE pid=" + req.params.pid;
      db.query(stmt, function (err, result) {
        if (err) throw err;

        if (result[0].answer == req.body.answer) {
            res.send(true);
        } else {
            res.send(false);
        }
    })
});

  
function lottoNum () {
  let lotto = [];
  let i = 0;
  while (i < 1) {
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
