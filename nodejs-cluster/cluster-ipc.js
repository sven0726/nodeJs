var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    var worker= cluster.fork();
    worker.send('hi worker' + worker.id);
  }

  cluster.on('fork',function(worker){
   //timeout[worker.id] = setTimeout(errorMsg,10000);
    console.log('fork: fork worker ' + worker.id);
  });
  
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died'+'code='+code+'\tsignal='+signal);
    cluster.fork();
  });
} else {

  // Workers can share any TCP connection
  // In this case its a HTTP server
  http.createServer(function(req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(8000);

  process.on('message', function(msg) {
    process.send(msg);
    console.log("worker " + cluster.worker.id + ' received msg['+msg+']');
  });
}

