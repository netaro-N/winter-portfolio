'use strict';

const debug = require('debug');
const debugInfo = debug('module:info');
setInterval(() => {
  debugInfo('some information.');
}, 1000);
const debugError = debug('module:error');
setInterval(() => {
  debugError('some error.');
}, 1000);

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');
var passport = require('passport');
var GitHubStrategy = require('passport-github2').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var GITHUB_CLIENT_ID = '6d52bc06fd83ea97a35a';
var GITHUB_CLIENT_SECRET = 'a7e841c7358243dc938fd222e62ce91b227b3119';

var TWITTER_CONSUMER_KEY = 'S8S8vfWzTpDOmc64t7cbgcyVh';
var TWITTER_CONSUMER_SECRET = 'UN1yXfQX88wT70JDbnKYIViAg9uWWhWL03kJZuHaqKp8XzTPl3';

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// GitHubの認証設定
passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: 'http://example.net:8000/auth/github/callback'
},
// 認証後アクション
  function (accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));

// Twitterの認証設定
passport.use(new TwitterStrategy({
  consumerKey: TWITTER_CONSUMER_KEY,
  consumerSecret: TWITTER_CONSUMER_SECRET,
  callbackURL: "http://example.net:8000/auth/twitter/callback"
},
// 認証後アクション
function (accessToken, refreshToken, profile, done) {
  process.nextTick(function () {
    return done(null, profile);
  });
}
));

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();
app.use(helmet());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'fd2bd5032392e6dc', resave: false, saveUninitialized:false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/login',loginRouter);
app.use('/logout', logoutRouter);

// GitHub認証のハンドラ
app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {
});
// GitHub が利用者の許可に対する問い合わせの結果を送るパスハンドラの登録
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
});

// Twitter認証のハンドラ
app.get('/auth/twitter',
 passport.authenticate('twitter'),
 function (req, res) {
});
// callbackのハンドラ
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

app.get('/login', function (req, res) {
  res.render('login');
});

app.get('/logout', function (req, res) {
  res.logout();
  res.redirect('/');
});

// 認証済みか確認します
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
