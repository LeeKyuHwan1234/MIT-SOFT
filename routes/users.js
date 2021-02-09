var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var db = require('../config/db');

/* GET users listing. */
router.get('/1', function(req, res, next) {
        db.query('select * from problem', function (error, result) {
                if (error) {
                    throw error;
                }    
                else {
                    res.render('users', {'result' : result});
                };
              });
});
router.get('/2', function(req, res, next) {
        res.render('users2');
  
});
router.get('/3', function(req, res, next) {
        res.render('users2');
  
});

module.exports = router;
