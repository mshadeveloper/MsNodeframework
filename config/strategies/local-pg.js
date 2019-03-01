const LocalStrategy=require('passport-local').Strategy
const bcrypt=require('bcryptjs'); //define bcrypt
var pg = require('./pg');
module.exports=function(passport){ //function passport




passport.use(new LocalStrategy((username, password, cb) => { //passport middelware


      const pool= new Pool({
  connectionString: pg.connect(),
     connectionLimit : 20,
})
      pool.connect((err,client,done) => {
          //connect db

  if (err) {
    console.error('connection error', err.stack)
  } else {
      pool.query('SELECT id, username, password  FROM users WHERE username = $1' //select user
  , [username], (err, result) => { //by username requested
    if(err) {
      console.log('Error when selecting user on login', err) //if error
      return cb(err)//return the err
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
  done();})}



        })
}))




}
