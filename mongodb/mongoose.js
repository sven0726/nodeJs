var mongoose = require('mongoose');
var log4js = require('log4js');

log4js.configure({
  appenders: [
    {type: 'console'},//控制台输出
    {
      type:'file',//文件输出
      filename: 'logs/access.log',
      maxLogSize: 1024,
      backups:3,
      category: 'normal'
    }

  ]

});

var logger = log4js.getLogger('normal');
logger.setLevel('INFO');

mongoose.use(log4js.connectLogger(logger,{level:log4js.levels.INFO}));
mongoose.use(app.router);

mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('connect success');
});

var kittySchema = mongoose.Schema({
  name:String,
  id:String,
  arrayL: String
},{_id:false});

kittySchema.methods.speak = function(){
  var greeting = this.name
    ?"Neow name is " + this.name
    : "I donot have a name"
  console.log(greeting);
}

kittySchema.index({name:1,id:-1});

var Kitten = mongoose.model('Kitten',kittySchema);

var silence = new Kitten({'name':'Silence','arrayL':['a','b']});

silence.save(function(err,silence){
  //silence.speak()
});
