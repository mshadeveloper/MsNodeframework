

       var config =require('../config');


       switch(config.db_engine){
         case 'mongoose':

         var mongoose = require('../config/mongoose');
             crypto = require('crypto');
             Schema = mongoose.Schema;
   var UserSchema = new Schema({
     firstName: String,
     lastName: String,
     email: {
       type: String,
       match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
     },
     username: {
       type: String,
       unique: true,
       required: 'Username is required',
       trim: true
     },
     password: {
       type: String,
       validate: [
       function(password) {
           return password && password.length > 6;
         }, 'Password should be longer'
]
}, salt: {
    type: String
  },
  provider: {
    type: String,
    required: 'Provider is required'
  },
  providerId: String,
  providerData: {},
  created: {
type: Date,
    default: Date.now
  }
});
UserSchema.virtual('fullName').get(function() {
  return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
  var splitName = fullName.split(' ');
  this.firstName = splitName[0] || '';
  this.lastName = splitName[1] || '';
});
UserSchema.pre('save', function(next) {
  if (this.password) {
    this.salt = new
      Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
    this.password = this.hashPassword(this.password);
  }
next(); });
UserSchema.methods.hashPassword = function(password) {
  return crypto.pbkdf2Sync(password, this.salt, 10000,
    64).toString('base64');
};
UserSchema.methods.authenticate = function(password) {
  return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix,
     callback) {
     var _this = this;
     var possibleUsername = username + (suffix || '');
     _this.findOne({
       username: possibleUsername
     }, function(err, user) {
       if (!err) {
         if (!user) {
           callback(possibleUsername);
         } else {
           return _this.findUniqueUsername(username, (suffix || 0) +
             1, callback);
         }
       } else {
         callback(null);
} });
};
   UserSchema.set('toJSON', {
     getters: true,
     virtuals: true
   });
   mongoose.model('User', UserSchema);
   module.exports = User;
break;

case 'pg':

var pg = require('../config/pg');

module.exports.findone=function(req,res,id){
      const pool= new Pool({
  connectionString: pg.connect(),
     connectionLimit : 20,
})
    pool.connect((err,client,done) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
   //const text = 'SELECT * FROM links'
//const values = [req.body.url, req.body.link,req.body.div,req.body.img,req.body.title,req.body.des]

// callback

//console.log(id)
pool.query('SELECT * FROM users where id= $1',[id], (err, result) =>{ //find user by id
  if (err) {
    console.log(err.stack)
  }else{ //console.log(result.rows[0])

        pool.connect((err,client,done) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {


res.render('showuser',{user:result.rows})


}
})



                   }


})
}
})
}


module.exports.findall=function(req,res){
        const pool= new Pool({
  connectionString: pg.connect(),
    connectionLimit : 20,
})
        pool.connect((err,client,done) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
   //const text = 'SELECT * FROM links'
//const values = [req.body.url, req.body.link,req.body.div,req.body.img,req.body.title,req.body.des]

// callback


pool.query('SELECT * FROM users', (err, result) =>{ //find all users
  if (err) {
    console.error('connection error',err.stack)
  }else{ //console.log(result.rows[0])
     // res.sendStatus(200)
     //roles('users' ,result.rows,null,req.user,res,null)
 //res.render('users',{row: result.rows,user:req.user,role:role});
  //render user page with current user role
  //done();
  res.render('users',{list:result.rows})
  //res.redirect('/users')
 }

 done();


})
}
})
}

module.exports.save=function(fields,update,res){ //update or insert function depends on update parameter value

       const pool= new Pool({
  connectionString: pg.connect(),
      connectionLimit : 20,
})
        pool.connect((err,client,done) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {

const text = (update===false)?'INSERT INTO users (fullname,username,password,email,registerdate) VALUES($1, $2, $3,$4,$5)':'UPDATE users SET fullname=$1,username=$2, password=$3,email=$4 ,registerdate= $5 where id=$6';
const values = (update===false)?[fields.firstname+' '+fields.lastname,fields.username, fields.password,fields.email,fields.registerdate]:[fields.firstname+' '+fields.lastname,fields.username, fields.password,fields.email,fields.registerdate,fields.id];


// callback
pool.query(text, values, (err, result) => {
  if (err) {
    console.log(err.stack)
  }else{ res.redirect('/users')}
  done()

})

//req.flash('success','You are sucessfuly added user')



    }

    })
}
module.exports.deleteuser=function(req,res,id){
      const pool= new Pool({
  connectionString: pg.connect(),
     connectionLimit : 20,
})
    pool.connect((err,client,done) => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
   //const text = 'SELECT * FROM links'
//const values = [req.body.url, req.body.link,req.body.div,req.body.img,req.body.title,req.body.des]

// callback

//console.log(id)
pool.query(' DELETE  FROM users where id= $1',[id], (err, result) =>{ //delete user by id
  if (err) {
    console.log(err.stack)
  }else{ //console.log(result.rows[0])


 res.redirect('/users')  ;


                    done();}




})
}
})
}
break;

case 'mysql':
var connection= require('../config/mysql');
module.exports.findOne=function(res,req,id){
  connection.connect();

connection.query('SELECT * from users where id='+id, function (error, results, fields) {
  if (error) throw error;
  return results;
});

connection.end();
}

module.exports.findall=function(res,req){
  connection.connect();

connection.query('SELECT * from users', function (error, results, fields) {
  if (error) throw error;
  return results;
});

connection.end();
}

module.exports.save=function(res,req,update,fields){
  connection.connect();
 if(update===false){let query='INSERT INTO users (fullname,username,password,email,registerdate) VALUES('+fields.firstname+' '+fields.lastname,fields.username, fields.password,fields.email,fields.registerdate+')'}else{
let query='UPDATE users SET fullname='+fields.firstname+' '+fields.lastname+',username='+fields.username+', password='+fields.password+',email='+fields.email+ ',registerdate= '+fields.registerdate+' WHERE id= '+fields.id}
connection.query(query, function (error, results, fields) {
  if (error) throw error;
  return results;
});

connection.end();
}
module.exports.deleteuser=function(res,req,id){
  connection.connect();

connection.query('DELETE from users where id='+id, function (error, results, fields) {
  if (error) throw error;
  return results;
});

connection.end();
}

break;

 }
