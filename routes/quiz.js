var express = require('express');
var router = express.Router();
var db = require('../config/db');
var fs = require('fs');

const { createConnection } = require('net');




  // MySQL 연결
  
  router.get('/:pid', function (req, res) {
    var stmt = "SELECT * FROM problem WHERE pid=" + req.params.pid;
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

  

  module.exports = router;
