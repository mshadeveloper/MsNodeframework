var passport = require('passport'),
       var mongoose = require('mongoose');
       var pg = require('pg');
       var connection = require('mysql');
       config=require('config');
       switch(config.db_engine){
         case 'mongoose':
   module.exports = function() {
     var User = mongoose.model('User');
     passport.serializeUser(function(user, done) {
       done(null, user.id);
});
     passport.deserializeUser(function(id, done) {
       User.findOne({
         _id: id
       }, '-password -salt', function(err, user) {
         done(err, user);
       });
});
     require('./strategies/local-mongo.js')();
 };
break;

case 'pg':

module.exports=function(passport){ //function passport



passport.serializeUser((user, done) => {
  done(null, user.id) //send userid
})

passport.deserializeUser((id, cb) => {

      const pool= new Pool({
  connectionString: pg.connect(),
     connectionLimit : 20,
})
        pool.connect((err,client,done) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
  pool.query('SELECT id, username as role FROM users WHERE id = $1', [parseInt(id, 10)], (err, results) => {
    if(err) {
      //winston.error('Error when selecting user on session deserialize', err)
      return cb(err)
    }

    cb(null, results.rows[0])//get the user session
   done();})}})
})

require('./strategies/local-pg.js')();
}
break;
case 'mysql':

module.exports=function(passport){ //function passport



passport.serializeUser((user, done) => {
  done(null, user.id) //send userid
})

passport.deserializeUser((id, cb) => {

connection.connect();
      connection.query('SELECT id, username as role FROM users WHERE id = '+parseInt(id, 10), function (error, results, fields) {
  if (err) {
    console.error('connection error', err.stack)
  } else {

      //winston.error('Error when selecting user on session deserialize', err)



    cb(null, results.rows[0])//get the user session
   done();}})
})

require('./strategies/local-mysql.js')();
}
break;
}
