var db = require('./mongoose');
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function callback(){
  console.log('success!!');
});
