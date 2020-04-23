const db = require("../models/sequelize");
const jwt = require("jsonwebtoken");
const Users = db.users;
exports.login = async (req, res) => {
  let profile = req.user;
  let email = profile.emails[0].value;
  let userName = profile.name.givenName;
  let displayName = profile.displayName;
  let result = await getUser(email);
  if (result == "error") {
    res.status(500).send({ message: "internal server error" });
  } else if (result[1].rowCount) {
    let emailId = result[0][0].email;
    let role = result[0][0].role;
    let organizationData = result[0][0].name;
    var expTime = {
      expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
    };
    const token = jwt.sign(
      {
        email: emailId,
      },
      process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
      expTime
    );
    res.send({
      token: token,
      role: role,
      organization: organizationData,
    });
  } else {
    let domainName = profile.emails[0].value.split("@").pop();
    let domainResult = await getOrganization(domainName);
    if (domainResult == "error") {
      res.status(500).send({ message: "internal server error" });
    } else if (domainResult[1].rowCount) {
      let orgId = domainResult[0][0].id;
      let checkerror = await insertData(orgId, userName, email, displayName);
      if (checkerror == "error") {
        res.status(500).send({ message: "internal server error" });
      } else {
        let getUserResult = await getUser(email);
        if (getUserResult[1].rowCount) {
          let emailId = getUserResult[0][0].email;
          let role = getUserResult[0][0].role;
          let organizationData = getUserResult[0][0].name;
          var expTime /*eslint-disable-line no-redeclare*/ = {
            expiresIn: process.env.JWT_EXPIRE_TIME, //eslint-disable-line  no-undef
          };
          const token = jwt.sign(
            {
              email: emailId,
            },
            process.env.JWT_SECRET_KEY, //eslint-disable-line  no-undef
            expTime
          );
          res.send({
            token: token,
            role: role,
            organization: organizationData,
          });
        } else {
          res.status(403).send({ message: "unauthorized user" });
        }
      }
    } else {
      res.status(403).send({ message: "unauthorized user" });
    }
  }
};

const getUser = async (email) => {
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
    .catch(() => {
      result = "error";
    });
  return result;
};

const getOrganization = async (domainName) => {
  let domainResult;
  await db.sequelize
    .query(
      " SELECT * FROM organizations WHERE domain_name = '" + domainName + "'"
    )
    .then(function (organizationData) {
      domainResult = organizationData;
    })
    .catch(() => {
      domainResult = "error";
    });
  return domainResult;
};

const insertData = async (orgId, userName, email, displayName) => {
  let errorCheck;
  const user = {
    org_id: orgId,
    name: userName,
    email: email,
    display_name: displayName,
    soft_delete: false,
    role_id: 1,
    hi5_quota_balance: 5,
  };
  await Users.create(user).catch(() => {
    errorCheck = "error";
  });
  return errorCheck;
};
