var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    var worker= cluster.fork();
  }

  cluster.on('fork',function(worker){
   //timeout[worker.id] = setTimeout(errorMsg,10000);
    console.log('fork: fork worker ' + worker.id);
  });

  cluster.on('online', function(worker) {
    console.log("oneline: worker=" + worker.id );
  });
  cluster.on('listening',function(worker,address){
    console.log('listening: worker pid=' + worker.process.pid+',address port ' + address.port + 'address type=' + address.type);
  });

  cluster.on('disconnect', function(worker) {
    console.log('The worker #' + worker.id + ' has disconnected');
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
    console.log("worker"+cluster.worker.id);
    res.end("worker"+cluster.worker.id);
  }).listen(8000);
}

