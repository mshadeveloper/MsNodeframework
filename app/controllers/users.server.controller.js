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
  let input=req.body;
  switch(config.db_engine){
    case 'mongoose':
    var newUser = User({
      firstName: input.firstName,
      lastName: input.lastName,
      username: input.username,
      password: input.password,
      email:input.email,
      registerdate:Date.now(),
    });

    // save the user
    newUser.save(function(err) {
      if (err) throw err;
else{
  res.redirect('/users')
}

    });
    break;
    case 'pg':
   req.checkBody('username','username should not empty').notEmpty()
   req.checkBody('password','password should not empty').notEmpty()
   req.checkBody('email','email should not empty').notEmpty()
   req.checkBody('firstName','firstName should not empty').notEmpty()
   req.checkBody('lastName','lastName should not empty').notEmpty()
   req.checkBody('email','email is not valid').isEmail()
   req.checkBody('password2','password should be match').equals(req.body.password) //validate all fields on form
   let errors=req.validationErrors()
   //console.log(errors)
   if(errors){
       res.redirect('users/register');
}
else{
  input.password = hashPassword(input.password);
    var newUser = {
      firstName: input.firstName,
      lastName: input.lastName,
      username: input.username,
      password: input.password,
      email:input.email,
      registerdate:Date.now(),
    };
save(newUser,false,res);
    // save the user

}
    break;
    case 'mysql':
    req.checkBody('username','username should not empty').notEmpty()
    req.checkBody('password','password should not empty').notEmpty()
    req.checkBody('email','email should not empty').notEmpty()
    req.checkBody('firstName','firstName should not empty').notEmpty()
    req.checkBody('lastName','lastName should not empty').notEmpty()
    req.checkBody('email','email is not valid').isEmail()
    req.checkBody('password2','password should be match').equals(req.body.password) //validate all fields on form
    let errors=req.validationErrors()
    //console.log(errors)
    if(errors){

      res.redirect('users/register');
 }
 else{
   input.password = hashPassword(input.password);
     var newUser = {
       firstName: input.firstName,
       lastName: input.lastName,
       username: input.username,
       password: input.password,
       email:input.email,
       registerdate:Date.now(),
     };
 save(newUser,false,res);
     // save the user

 }

    break;
  }


}
exports.getupdate=function(req,res){
  let input=req.body;
  switch(config.db_engine){
    case 'mongoose':
//     var newUser = User({
//       firstName: input.firstName,
//       lastName: input.lastName,
//       username: input.username,
//       password: input.password,
//       email:input.email,
//       registerdate:Date.now(),
//     });
//
//     // save the user
//     newUser.save(function(err) {
//       if (err) throw err;
// else{
//   res.redirect('/users')
// }
//
//     });


User.findById(req.params.id, function(err, user) {
  if (err) throw err;

  // change the users location
  //user.location = 'uk';
  user.firstName = input.firstName;
  user.lastName = input.lastName;
  user.username = input.username;
  user.password = input.password;
  user.email = input.email;


  // save the user
  user.save(function(err) {
    if (err) throw err;

    else{res.redirect('/users');}
  });

});
    break;
    case 'pg':
   req.checkBody('username','username should not empty').notEmpty()
   req.checkBody('password','password should not empty').notEmpty()
   req.checkBody('email','email should not empty').notEmpty()
   req.checkBody('firstName','firstName should not empty').notEmpty()
   req.checkBody('lastName','lastName should not empty').notEmpty()
   req.checkBody('email','email is not valid').isEmail()
   req.checkBody('password2','password should be match').equals(req.body.password) //validate all fields on form
   let errors=req.validationErrors()
   //console.log(errors)
   if(errors){
       res.redirect('users/register');
}
else{
  input.password = hashPassword(input.password);
    var newUser = {
      firstName: input.firstName,
      lastName: input.lastName,
      username: input.username,
      password: input.password,
      email:input.email,
      id:req.params.id,
      registerdate:Date.now(),
    };
save(newUser,true,res);
    // save the user

}
    break;
    case 'mysql':
    req.checkBody('username','username should not empty').notEmpty()
    req.checkBody('password','password should not empty').notEmpty()
    req.checkBody('email','email should not empty').notEmpty()
    req.checkBody('firstName','firstName should not empty').notEmpty()
    req.checkBody('lastName','lastName should not empty').notEmpty()
    req.checkBody('email','email is not valid').isEmail()
    req.checkBody('password2','password should be match').equals(req.body.password) //validate all fields on form
    let errors=req.validationErrors()
    //console.log(errors)
    if(errors){

      res.redirect('users/register');
 }
 else{
   input.password = hashPassword(input.password);
     var newUser = {
       firstName: input.firstName,
       lastName: input.lastName,
       username: input.username,
       password: input.password,
       email:input.email,
       id:req.params.id,
       registerdate:Date.now(),
     };
 save(newUser,true,res);
     // save the user

 }

    break;
  }

}

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
