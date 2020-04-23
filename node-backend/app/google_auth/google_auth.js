"use strict";
const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const config = require("../config/google.config");

module.exports = function () {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
      },
      async function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    )
  );
};
