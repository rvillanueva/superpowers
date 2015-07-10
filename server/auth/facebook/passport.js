var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var generator = require('../../generator/generator.service');

exports.setup = function(User, config) {
    passport.use(new FacebookStrategy({
            clientID: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: '/auth/facebook/callback'
          },
          function(accessToken, refreshToken, profile, done) {
            console.log(profile)
            User.findOne({
                'name': profile.displayName
              },
              function(err, user) {
                if (err) {
                  return done(err);
                }
                if (!user) {
                  generator.hero(function(hero) {
                      user = new User({
                        name: profile.displayName,
                        role: 'user',
                        username: profile.username,
                        provider: 'facebook',
                        facebook: profile._json,
                        birthday: false,
                        hero: hero,
                        visited: new Date()
                      });
                      if (profile.emails) {
                        user.email = profile.emails[0].value
                      }
                      user.save(function(err) {
                        if (err) done(err);
                        console.log(user)
                        return done(err, user);
                      });
                    })
                  } else {
                    generator.hero(function(hero) {
                          user.name = profile.displayName;
                          user.username = profile.username;
                          user.provider = 'facebook';
                          user.facebook = profile._json;
                          user.visited = new Date();
                        if (profile.emails) {
                          user.email = profile.emails[0].value
                        }
                        if (!user.hero) {
                          user.hero = hero;
                        }
                        user.save(function(err) {
                          if (err) done(err);
                          console.log(user)
                          return done(err, user);
                        });
                      })
                    }
                  })
              }
            ));
        };
