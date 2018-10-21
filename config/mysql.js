var config =require('./config');
var mysql=require('mysql');

module.exports=function(){

  var db =mysql.createConnection(config.mysqlconnect);
  return db;
}
