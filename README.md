# MsNode
NODE JS Horizontal MVC framework 
is a horizantal MVC framework for node js is useful for small projects and for beginner developers on nodejs is reserved to msdeveloper

<b>Documentation </b>

database configuration
<p>

```diff
-config folder
- --env folder
 --development.js file

```

<p>




define this variables  on development.js for example mongoose
db_engin should shoose the one of three engins mongoose ,mysql or pg

<pre>

module.exports={

 
  mangoconnect:'mongodb://'+obj.username('dbuser')+':'+obj.password('dbpass')+'@127.0.0.1:27017/'+obj.database('dbname'),
  pgconnect:'postgresql://'+obj.username("root")+':'+obj.password('')+'@localhost:3211/'+obj.database(''),
  mysqlconnect:{
  host     : 'localhost',
  user     : obj.username("root"),
  password : obj.password(''),
  database : obj.database('')
},
db_engine: obj.db_engine('mongoose'),

 
}



</pre>

<b>Routing</b>
<p> for example :</p>
<pre> 

module.exports=function(app){
  var index=require('../controllers/index.server.controller.js') --this to get the controller functions
  app.get('/',index.render);--mean when request get  / root apply the index which is controller function named render 
}
</pre>

<b>controllers</b>

<p>for example :</p>

<pre>
exports.render=function(req,res){ //render function has request and response parameters
  res.render('index',{title:'hello world'});
}


</pre>
