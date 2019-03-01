/******************************/
// author : HAJAR A.AZIZ AL MADHOOB
/******************************/

var define = require('define-property');
var obj = {};
define(obj, 'username', function(val) {
  return val;
});

define(obj, 'password', function(val) {
  return val;
});
define(obj, 'database', function(val) {
  return val;
});
define(obj,'db_engine', function(val) {return val;});
module.exports={

  //development configration
  mangoconnect:'mongodb://'+obj.username('root')+':'+obj.password('')+'@127.0.0.1:27017/'+obj.database('posts'),
  pgconnect:'postgresql://'+obj.username("root")+':'+obj.password('')+'@localhost:3211/'+obj.database(''),
  mysqlconnect:{
  host     : 'localhost',
  user     : obj.username("root"),
  password : obj.password(''),
  database : obj.database('')
},
db_engine: obj.db_engine('mongoose'),

  sessionSecret:'developmentsessionsecrete'
}
