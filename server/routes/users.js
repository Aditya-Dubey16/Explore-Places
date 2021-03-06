var express = require('express');
var router = express.Router();
var passport = require('passport');


var authenticate = require('../authenticate');
var cors =  require('./cors');
var bodyParser  = require('body-parser');
var User = require('../models/users');

router.use(bodyParser.json());
router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200);  });



/* GET users listing. */
router.get('/', cors.corsWithOptions, function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup',  cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}),
  req.body.password,  (err,  user) => {
    if(err) {
      res.statusCode =  500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if(req.body.firstname)
          user.firstname =  req.body.firstname;
      if(req.body.lastname)
          user.lastname  = req.body.lastname;
      user.save((err, user) =>{
        if(err) {
          res.statusCode  = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err:  err});
        }
        passport.authenticate('local')(req, res,  ()  => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({sucess: true, status: 'Registration Successful'});

        });
      });
    }
  });
});


router.post('/login',  cors.corsWithOptions, (req, res, next) => {
  passport.authenticate('local', (err, user, info)  => {
    if(err)
        return next(err);

    if(!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({sucess: false, status: 'Login Unsuccessful!', err:info});


    }
    req.logIn(user, (err) =>  {
      if(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful', err: 'Could not log in user!'});

      }

      var token =  authenticate.getToken({_id: req.user._id});
      res.statusCode =  200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status:  'Login Successful!', token: token});

    });
  }) (req, res, next);
});



router.get('/logout', cors.corsWithOptions,  (req, res, next) => {
  if(req.session) {
    res.redirect('/');
  }
  else{
    var err =  new Error('You are not logged in!');
    err.status  =  403;
    next(err);
  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if(req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({sucess:  true, token: token,  status: 'You are Successfully logged in!'});

  }
});


module.exports = router;
