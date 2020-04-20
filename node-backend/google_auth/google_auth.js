'use strict';
var passport = require('passport');
var GoogleTokenStrategy = require('passport-google-token').Strategy;
var config = require('../config/config');

module.exports = function () {
    passport.use(new GoogleTokenStrategy({
            clientID: config.googleAuth.clientID,
            clientSecret: config.googleAuth.clientSecret
        },
        function (accessToken, refreshToken, profile, done) {
			console.log("in google token");
			console.log(profile.emails[0].value);
			return done(null, profile);
 
       }));
};
