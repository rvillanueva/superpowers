'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('facebook', {
    failureRedirect: '/login',
    scope: ['email', 'public_profile'],
    session: false
  }))

  .get('/callback', passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false
  }), auth.setTokenCookie);

module.exports = router;
