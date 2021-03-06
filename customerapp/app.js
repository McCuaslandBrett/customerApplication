var express = require('express');
//const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
// connect to the database
// mongoose.connect('mongodb://localhost/testaroo');
// var url = 'mongodb://localhost:3000/test';

// mongoose.connection.once('open',function(){
//   console.log('Connection has been made, now make fireworks...');
// }).on('error',function(error){
//   console.log('Connection error');
// });

var app = express();
/*
var logger = function(req,res,next){
  console.log('Loggin...');
  next();
}

app.use(logger);*/
//======================================
//View Engine
//======================================
var fs = require('fs');
var myCss = {
  style : fs.readFileSync('views/style.css','utf8')
};
app.get('/', function(req,res){
  res.render('index.ejs',{
    myCss: myCss
  });
});

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
//app.use(express.static(__dirname + '/public'));app.use(express.static(__dirname + '/public'));<link href="/css/style.css" rel="stylesheet" type="text/css">

//Body Parser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param,msg,value){
    var namespace = param.split('.')
    ,root = namespace.shift(),
    formParam = root;

    while(namespace.length){
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param:formParam,
      msg:msg,
      value:value
    };
  }
}));
//======================================

//Set Static path
app.use(express.static(path.join(__dirname,'public')));
app.use(express.static("public"));

//Global variables
app.use(function(req,res,next){
  res.locals.errors = null;
  next();
});
//======================================
//Routes
//======================================


app.post('/addclient', function(req,res){
  client.create({
  // res.render('index',{
  //   title:'Customers',
  //   users: users
  // });
});
})
app.post('/users/add', function(req,res){
req.checkBody('first_name','First Name is Required').notEmpty();
req.checkBody('last_name','Last Name is Required').notEmpty();
req.checkBody('email','Email is Required').notEmpty();

var errors = req.validationErrors();
if(errors){
 res.render('index',{
   title:'Customers',
   users:users,
   errors:errors
 });
}else{
  var newUser={
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email:req.body.email
  }
  console.log('Success');
}
});

app.listen(3000,function(){
  console.log('Server started on port 3000...');
});
