'use strict';
const express = require('express');
const router = express.Router();
const authenticationEnsurer = require('./authentication-ensurer');

router.post('/', authenticationEnsurer, (req, res, next) => {
  console.log(req.body); // コメントを保存する実装をする
  //req.body.fixtureId でfixtureIdを取得できる
  res.redirect('/');
});

module.exports = router;