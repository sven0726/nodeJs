var app = require("express")();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/',function(req,res){
  //res.send('<h1>hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
  console.log('a user connected:'+socket.id);
  socket.broadcast.emit('chat message','hi client ' + socket.id); 
  socket.on('disconnect',function(){
    console.log('user disconneted');
  });

  socket.on('chat message',function(msg){
    io.emit('chat message',msg);
    console.log('message : ' + msg);
  });
});

http.listen(3000,function(){
  console.log('listening on *:3000');
});

