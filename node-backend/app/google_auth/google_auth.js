"use strict";
const passport = require("passport");
const db = require("../models");
const GoogleTokenStrategy = require("passport-google-token").Strategy;
const config = require("../config/google.config");
const jwt = require("jsonwebtoken");

module.exports = function () {
  passport.use(
    new GoogleTokenStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
      },
      async function (accessToken, refreshToken, profile, done) {
        let email = profile.emails[0].value;
        let userName = profile.name.givenName;
        let displayName = profile.displayName;
        let result;
        await db.sequelize
          .query(
            "select roles.role,users.email,organizations.name from users,roles,organizations where users.email = '" +
              email +
              "'"
          )
          .then(function (users) {
            result = users;
          })
          .catch((err) => {
            done(err);
          });
        if (result[1].rowCount) {
          let tokenEmail = result[0][0].email;
          let role = result[0][0].role;
          let organizationData = result[0][0].name;
          var expTime = {
            expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
          };
          const token = jwt.sign(
            {
              email: tokenEmail,
            },
            process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
            expTime
          );
          return done(null, {
            token: token,
            role: role,
            organization: organizationData,
          });
        } else {
          let domainName = profile.emails[0].value.split("@").pop();
          let domainResult;
          await db.sequelize
            .query(
              " SELECT * FROM organizations WHERE domain_name = '" +
                domainName +
                "'"
            )
            .then(function (organizationData) {
              domainResult = organizationData;
            })
            .catch((err) => {
              done(err);
            });
          if (domainResult[1].rowCount) {
            let domainId = domainResult[0][0].id;
            await db.sequelize
              .query(
                "insert into users (org_id,name,email,display_name,soft_delete,role_id,hi5_quota_balance) values('" +
                  domainId +
                  "','" +
                  userName +
                  "','" +
                  email +
                  "','" +
                  displayName +
                  "',false,1,5);"
              )
              .catch((err) => {
                done(err);
              });
            let getUser;
            await db.sequelize
              .query(
                "select roles.role,users.email,organizations.name from users,roles,organizations where users.email = '" +
                  email +
                  "'"
              )
              .then(function (userData) {
                getUser = userData;
              })
              .catch((err) => {
                done(err);
              });
            if (getUser[1].rowCount) {
              let tokenEmail = getUser[0][0].email;
              let role = getUser[0][0].role;
              let organizationData = getUser[0][0].name;
              var expTime /*eslint-disable-line no-redeclare*/ = {
                expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
              };
              const token = jwt.sign(
                {
                  email: tokenEmail,
                },
                process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
                expTime
              );
              return done(null, {
                token: token,
                role: role,
                organization: organizationData,
              });
            } else {
              done(null);
            }
          } else {
            done(null);
          }
        }
      }
    )
  );
};
