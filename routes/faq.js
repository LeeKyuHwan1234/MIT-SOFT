var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('faq', {  lotto : lottoNum() });
});
function lottoNum () {
  let lotto = [];
  let i = 0;
  while (i < 1) {
  let n = Math.floor(Math.random() * 292) + 1;
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
module.exports = router;
