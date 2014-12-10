var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var log4js = require('log4js');

var app = express();

var movie = require('./routes/movie');

var connect = require('connect');
var SessionStore = require("session-mongoose")(connect);
var store = new SessionStore({
  url:"mongodb://localhost/session",
  interval: 120000
});

var routes = require('./routes/index');
//var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine', 'html');
//app.set('view engine', 'ejs');
app.use(session({
  secret: 'test.com',
  store: store,
  cookie:{maxAge:10000}//expire session in 10 seconds
}));

app.use(function(req,res,next){
  res.locals.user = req.session.user;
  var err = req.session.error;
  delete req.session.error;
  res.locals.message = '';
  if (err) res.locals.message = '<div class="alert alert-danger">'+err+'</div>';
  //console.log('Session is = ',req.session.user);
  next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
//app.use(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);
app.get('/',routes.index);
app.route('/login')
.all(notAuthentication)
.get(routes.login)
.post(routes.doLogin);
app.route('/logout')
.get(authentication)
.get(routes.logout);
app.route('/home')
.get(authentication)
.get(routes.home);


function authentication(req,res,next){
  if(!req.session.user){
    req.session.error='请先登录';
    return res.redirect('/login'); 
  }
  next();
}

function notAuthentication(req,res,next){
  if(req.session.user){
    req.session.error='已登录';
    return res.redirect('/home');
  }
  next();
}

//movie model 操作
app.route('/movie/add')
.get(movie.movieAdd)  //增加
.post(movie.doMovieAdd); //提交

app.get('/movie/:name',movie.movieAdd); //编辑查询

//app.get('/movie/json/:name',movie.movieJSON); //JSON数据





// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(4000);
//module.exports = app;
