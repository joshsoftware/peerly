"use strict";
var passport = require("passport");
const pool = require("../database/database");
var GoogleTokenStrategy = require("passport-google-token").Strategy;
var config = require("../config/config");

module.exports = function () {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
      },
      async function (accessToken, refreshToken, profile, done) {
        let email = profile.emails[0].value;
        let result = await pool.query({
          text: "SELECT * FROM users WHERE email = '" + email + "'",
        });
        if (result.rows[0]) {
          return done(null, profile);
        } else {
          done("not authorized", null);
        }
      }
    )
  );
};
