const LocalStrategy=require('passport-local').Strategy
const bcrypt=require('bcryptjs'); //define bcrypt
var connection= require('./mysql');
module.exports=function(passport){ //function passport




passport.use(new LocalStrategy((username, password, cb) => { //passport middelware


  connection.connect();

connection.query("SELECT id, username, password  FROM users WHERE username = " +username, function (error, results, fields) {
  if (error) {

    console.error('connection error', error.stack)
  }


if(result.rows.length > 0) { //else so the rows >0
  const first = result.rows[0] //select the one row
  //console.log(result.rows)
  bcrypt.compare(password, first.password.trim(), function(err, res) { //check the password with requested password
    if(res) {
      cb(null, { id: first.id, username: first.username.trim()}) //if correct send id ,username,role_id
     } else {
      cb(null, false,{message:'wrong password'}) //if not match wrong password
     }
   })
 } else {
   cb(null, false,{message:'wrong username'}) //if rows =<0 so is no user have this username
 }
done();});
connection.end();
}












}))
