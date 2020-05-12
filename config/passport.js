var mongoose = require('mongoose');
var UserModel = mongoose.model('Users');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var session = require('express-session');
var UserTokenModel = mongoose.model('UserToken');

module.exports.init = init;

function init(app) {

  //initialize passport
  passport.use(new LocalStrategy(UserModel.authenticate()));

  passport.use(new BearerStrategy(
    function(token, done) {
      UserTokenModel.getByToken(token, function (err, userToken) {
        if (err) { return done(err); }
        if (!userToken) { return done(null, false); }
        UserModel.findById(userToken.userId, function (err, user) {
          if(err) { return done(err); }

          if (!user) { return done(null, false); }

          return done(null, user, { scope: 'all' });
        });
      });
    }
  ));

  // use static serialize and deserialize of model for passport session support
  passport.serializeUser(UserModel.serializeUser());
  passport.deserializeUser(UserModel.deserializeUser());

  //need this according to passport guide
  app.use(session({
      secret: 'the princess and the frog',
      saveUninitialized: true,
      resave: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  return passport;
}
