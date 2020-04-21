"use strict";
var passport = require("passport");
const pool = require("../database/database");
var GoogleTokenStrategy = require("passport-google-token").Strategy;
var config = require("../config/config");
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
        let result = await pool.query({
          text: " select roles.role,users.email,organizations.name from users,roles,organizations where users.email = '" + email + "'"/*eslint-disable-line prettier/prettier */,
        });
        if (result.rowCount) {
          let token_email = result.rows[0].email;
          let role = result.rows[0].role;
          let organization_data = result.rows[0].name;
          var exp_time = {
            "expiresIn"/*eslint-disable-line prettier/prettier */: process.env.JWT_expire_time, //eslint-disable-line  no-undef
          };

          const token = jwt.sign(
            {
              email: token_email,
            },
            process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
            exp_time
          );
          return done(null, {
            "token": token, //eslint-disable-line prettier/prettier 
            "role": role, //eslint-disable-line prettier/prettier 
            "organization" : organization_data, //eslint-disable-line prettier/prettier 
          });
        } else {
          let domain_name = (profile.emails[0].value)/*eslint-disable-line prettier/prettier */.split("@").pop();
          let domain_result = await pool.query({
            text: "SELECT * FROM organizations WHERE domain_name = '" + domain_name + "'"/*eslint-disable-line prettier/prettier */,
          });
          if (domain_result.rowCount) {
            let domain_id = domain_result.rows[0].id;
            await pool.query("insert into users (org_id,name,email,display_name,soft_delete,role_id,hi5_quota_balance) values('"+domain_id+"','"+user_name+"','"+email+"','"+display_name+"',false,1,5);" /*eslint-disable-line prettier/prettier */,
            );
            let user_retrive = await pool.query("select roles.role,users.email,organizations.name from users,roles,organizations where users.email = '"+ email +"'"/*eslint-disable-line prettier/prettier */,
            );
            if (user_retrive.rowCount) {
              let token_email = user_retrive.rows[0].email;
              let role = user_retrive.rows[0].role;
              let organization_data = user_retrive.rows[0].name;
              var exp_time /*eslint-disable-line no-redeclare*/ = {
                "expiresIn" /*eslint-disable-line prettier/prettier */: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
              };
              const token = jwt.sign(
                {
                  email: token_email,
                },
                process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
                exp_time
              );
              return done(null, {
                "token": token,//eslint-disable-line prettier/prettier 
                "role": role,//eslint-disable-line prettier/prettier 
                "organization" : organization_data,//eslint-disable-line prettier/prettier 
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
