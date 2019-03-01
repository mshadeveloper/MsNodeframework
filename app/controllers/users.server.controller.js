 var config =require('../config');
var local=require('../config/strategies/local-'+config.db_engine+'.js')
var model=require('./models/user.js');

//login
exports.login=function(req,res){

  res.render('login')
}



// user login
exports.getlog=function(req,res,,next){
  passport.authenticate('local', { successRedirect: '/dashboard',
                                   failureRedirect: '/login' ,
                                 failureFlash: true
                               //failureFlash: 'Invalid username or password.' }
                               )(req,res,next);
}


//user register page
exports.register=function(req,res){
    res.render('register')
}


//user save information
exports.getreg=function(req,res){

}
exports.getupdate=function(req,res){}

//user logout
exports.logout=function(req,res){
  req.logout();
  res.redirect('/');
}


//list of users
exports.userslist=function(req,res){
  switch(config.db_engine){
    case 'mongoose':
    User.find({}, function(err, users) {
      if (err) {throw err;}
  else{
    res.render('users',{list:users})
  }
      // object of all the users

    });
    break;
    case 'pg':
    findall(req,res);

    break;
    case 'mysql':
    var users=findall(req,res);
      res.render('users',{list:users})
    break;
  }

}


//users edit page
exports.edit=function(req,res){
  switch(config.db_engine){
    case 'mongoose':
    User.find({id : req.params.id}, function(err, users) {
      if (err) {throw err;}
  else{
    res.render('users',{list:users})
  }
      // object of all the users

    });
    break;
    case 'pg':
    findone(req,res,req.params.id);

    break;
    case 'mysql':
    var users=findone(req,res,req.params.id);
      res.render('users',{list:users})
    break;
  }
}


//remove user
exports.delete=function(req,res){
  switch(config.db_engine){
    case 'mongoose':
    User.find({ id: req.params.id}, function(err, user) {
    if (err) throw err;

    // delete him
    user.remove(function(err) {
      if (err) throw err;

      res.redirect('/users');
    });
  });
    break;
    case 'pg':
  deleteuser(req,res,req.params.id)

    break;
    case 'mysql':
    var users=deleteuser(req,res,req.params.id);
      res.render('users',{list:users})
    break;
  }
}


//show user
exports.show=function(req,res){
  switch(config.db_engine){
    case 'mongoose':
    User.find({id : req.params.id}, function(err, users) {
      if (err) {throw err;}
  else{
    res.render('users',{list:users})
  }
      // object of all the users

    });
    break;
    case 'pg':
    findone(req,res,req.params.id);

    break;
    case 'mysql':
    var users=findOne(req,res,req.params.id);
      res.render('users',{list:users})
    break;
  }
}
