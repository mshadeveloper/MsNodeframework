var config =require('./config');
var {client}=require('pg');

module.exports=function(){


  var db = new Client({
  connectionString: config.pgconnect,
});


  return db;
}
