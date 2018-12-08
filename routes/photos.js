'use strict';
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('Some photos');
});

// XSS脆弱性あり
router.param('X', (req, res, next, X) => {
  res.send(X);
  next();
});

router.get('/:X', (req, res, next) => {
  res.end();
});

// XSS脆弱性の処理
router.param('/X', (req, res, next, X) => {
  // ここで、変数 Xの内容をもとに存在チェック
});
module.exports = router;