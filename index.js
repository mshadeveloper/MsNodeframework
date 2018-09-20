
process.env.NODE_ENV=process.env.NODE_ENV||'development'
var express=require('./config/express.js')
var app=express();
app.listen('3000',()=>{console.log('server is running')})
module.exprots=app;
