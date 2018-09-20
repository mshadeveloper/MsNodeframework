var express=require('express');
module.exports=function(){

  var app=express()
  require('../app/routing/index.server.routes.js')(app);
  return app;
}
