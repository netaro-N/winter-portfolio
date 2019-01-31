var express = require('express');
var router = express.Router();
var moment = require('moment-timezone');
var localTimes = moment('03/02/2019 20:45', 'DD/MM/YYYY HH:mm');
var times = localTimes.add(8, 'hours').format("YYYY年MM月DD日 HH時mm分");
/**
 * CLなどのイングランドでの試合は異なる。
 * var atEnglandTimes = moment(fixtureDate, 'DD/MM/YYYY HH:mm').tz('Asia/Tokyo').format("YYYY年MM月DD日 HH時mm分");
 */
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express,winter-portfolio', user: req.user ,times:times});
  // fixtureのデータを取得してindex.pugにちゃんと送る！
});

module.exports = router;
