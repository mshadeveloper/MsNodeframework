/******************************/
// author : HAJAR A.AZIZ AL MADHOOB
/******************************/

module.exports=function(app){
  const auth=(req,res,next)=>{
  if(!req.user){
    // res.redirect('/')
  res.render('index',{title:'hello world'})}else{next();}    //auth middleware to check authenticate user
  }
  var index=require('../controllers/index.server.controller.js')
//  var users=require('../controllers/users.server.controller.js')
  app.get('/',auth,index.render);
  // app.get('/users/login',auth,users.login);
  // app.post('/users/login',users.getlog);
  // app.get('/users/register',auth,users.register);
  // app.post('/users/register',users.getreg);
  // app.get('/users/logout',auth,users.logout)
  // app.get('/users',auth,users.userslist)
  // app.get('/users/edit/:id',auth,users.edit)
  // app.get('/users/show/:id',auth,users.show)
  // app.post('/users/update',users.getupdate);
}
