'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var generator = require('../../generator/generator.service');


var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  generator.hero(function(hero){
    console.log(hero)
    var newUser = new User({
      name: req.body.name,
      role: 'user',
      provider: 'facebook',
      facebook: {
        id: req.body.id
      },
      birthday: true,
      hero: hero
    });
    newUser.save(function(err, user) {
      if (err) return validationError(res, err);
      return res.send(200)
    });
  });

};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Reroll hero stats of all users
 * restriction: 'admin'
 */
exports.reroll = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.send(500, err);
    var i = 0;
    console.log(users)
    var cycle = function(){
      generator.hero(function(hero){
        if(users[i]){
          users[i].hero = hero;
          users[i].save()
        }
        if(i < users.length){
          i++;
          cycle();
        } else {
          console.log(users)
          res.json(200, users);
        }
      })
    }
    cycle();
  });
};

/**
 * Change a users password
 */
exports.addId = function(req, res, next) {
  var fbId = req.body.fbId;
  var userId = req.params.id
  User.findById(userId, '-salt -hashedPassword', function (err, user) {
    if(!user){
      res.send(404)
    }
    if(!user.facebook){
      user.facebook = {}
    }
    user.facebook = {
      id: fbId
    }
    user.save()
    res.send(200, user)
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
