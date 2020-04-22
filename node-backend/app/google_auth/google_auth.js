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
        let user_name = profile.name.givenName;
        let display_name = profile.displayName;
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
          let token_email = result[0][0].email;
          let role = result[0][0].role;
          let organization_data = result[0][0].name;
          var exp_time = {
            expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
          };
          const token = jwt.sign(
            {
              email: token_email,
            },
            process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
            exp_time
          );
          return done(null, {
            token: token,
            role: role,
            organization: organization_data,
          });
        } else {
          let domain_name = profile.emails[0].value.split("@").pop();
          let domain_result;
          await db.sequelize
            .query(
              " SELECT * FROM organizations WHERE domain_name = '" +
                domain_name +
                "'"
            )
            .then(function (organization_data) {
              domain_result = organization_data;
            })
            .catch((err) => {
              done(err);
            });
          if (domain_result[1].rowCount) {
            let domain_id = domain_result[0][0].id;
            await db.sequelize
              .query(
                "insert into users (org_id,name,email,display_name,soft_delete,role_id,hi5_quota_balance) values('" +
                  domain_id +
                  "','" +
                  user_name +
                  "','" +
                  email +
                  "','" +
                  display_name +
                  "',false,1,5);"
              )
              .catch((err) => {
                done(err);
              });
            let user_retrive;
            await db.sequelize
              .query(
                "select roles.role,users.email,organizations.name from users,roles,organizations where users.email = '" +
                  email +
                  "'"
              )
              .then(function (user_data) {
                user_retrive = user_data;
              })
              .catch((err) => {
                done(err);
              });
            if (user_retrive[1].rowCount) {
              let token_email = user_retrive[0][0].email;
              let role = user_retrive[0][0].role;
              let organization_data = user_retrive[0][0].name;
              var exp_time /*eslint-disable-line no-redeclare*/ = {
                expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
              };
              const token = jwt.sign(
                {
                  email: token_email,
                },
                process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
                exp_time
              );
              return done(null, {
                token: token,
                role: role,
                organization: organization_data,
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
