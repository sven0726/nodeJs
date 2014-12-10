var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var worker = require('child_process');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


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


var sysstat = function(callback){
  var cpu ="sar -u 1 1|grep Average|awk '{print $8}'";
  var mem ="sar -r 1 1|grep Average|awk '{print $4}'";

  worker.exec(cpu,function(error1,stdout1,stderr1){
     worker.exec(mem,function(error2,stdout2,stderr2){
       callback({cpu:stdout1,mem:stdout2});
     });
  });
}

io.on('connection',function(socket){
  socket.emit('open');
  console.log(socket.handshake);

  function send(obj){
    var sys = {
      time:(new Date()).getTime(),
      cpu:(100-parseFloat(obj.cpu)),
      mem:(100-parseFloat(obj.mem))
    }
    socket.emit('system',sys);
  }

  setInterval(function(){
    sysstat(send);
  },1000);

  socket.on('message',function(msg){

  });
 
  socket.on('disconnect',function(){});
});

app.get('/alert',function(req,res){
  console.log('alert get');
  res.sendfile('views/alert.html');
});

server.listen('3000',function(){
  console.log("Express server listening on port 3000");
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

