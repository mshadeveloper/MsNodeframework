/******************************/
// author : HAJAR A.AZIZ AL MADHOOB
/******************************/
process.env.NODE_ENV=process.env.NODE_ENV||'development'
var express=require('./config/express.js')
var db = require('./config/config.js');
var database=require('./config/'+db.db_engine+'.js');
var app=express();
app.listen('3000',()=>{console.log('server is running')})
module.exprots=app;
