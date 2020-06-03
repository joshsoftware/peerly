const faker = require("faker");
const path = require("path");
const Sequelize = require("sequelize");

const dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
const dbConfig = require("../config/db.config")["test"];
const jwtValidate = require("../jwtTokenValidation/jwtValidation");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: "postgres",
});
const core_value = require("../models/core_values.model")(sequelize, Sequelize);
const Users = require("../models/users.model")(sequelize, Sequelize);
const Recognitions = require("../models/recognitions.model")(
  sequelize,
  Sequelize
);
const Recognition_hi5 = require("../models/recognition_hi5.model")(
  sequelize,
  Sequelize
);
const Organizations = require("../models/organizations.model")(
  sequelize,
  Sequelize
);

const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars

const server = supertest.agent(process.env.TEST_URL + process.env.HTTP_PORT);
const token = process.env.TOKEN;
let orgId;
let userId;
let coreValueId;
let roleId;
let id;

describe(/*eslint-disable-line no-undef*/ "SAMPLE unit test", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    let tokenData = jwtValidate.getData("barear " + token);
    orgId = tokenData.orgId;
    userId = tokenData.userId;
    roleId = tokenData.roleId;
    const organizations = {
      id: orgId,
      name: faker.name.firstName(),
      contact_email: faker.internet.email(),
      domain_name: faker.internet.domainName(),
      subscription_status: faker.random.number(1),
      subscription_valid_upto: faker.random.number(7),
      hi5_limit: faker.random.number(1),
      hi5_quota_renewal_frequency: faker.lorem.words(1),
      timezone: faker.address.city(),
    };
    Organizations.create(organizations).then(() => {
      const coreValue = {
        org_id: orgId,
        text: faker.lorem.words(7),
        description: faker.lorem.words(5),
        parent_core_value_id: faker.random.number(1),
      };
      core_value.create(coreValue).then((data) => {
        coreValueId = data.id;
        const user = {
          id: userId,
          org_id: orgId,
          first_name: faker.name.firstName(),
          email: faker.internet.email(),
          role_id: roleId,
          soft_delete: false,
          hi5_quota_balance: faker.random.number(1),
        };
        Users.create(user).then(() => {
          done();
        });
      });
    });
  });

  /*eslint-disable-line no-undef*/ after((done) => {
    Recognition_hi5.destroy({ where: {} });
    Recognitions.destroy({ where: {} });
    Users.destroy({ where: {} });
    core_value.destroy({ where: {} });
    Organizations.destroy({ where: {} });
    done();
  });

  it(/*eslint-disable-line no-undef*/ "post request for create recognition with write Contents,url", function (done) {
    // post request for create Recognition successfully
    server
      .post("/recognitions")
      .send({
        core_value_id: coreValueId,
        text: "good contribution in open source",
        given_for: userId,
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        id = res.body.data.id;
        res.status.should.equal(201);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get recognition by id with write url", function (done) {
    // post request for get Recognition successfully
    server
      .get("/recognitions/" + id)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get all recognition  with write url", function (done) {
    // post request for get Recognition successfully
    server
      .get("/recognitions/")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get all recognition  with all filter parameters", function (done) {
    // post request for get filter Recognition successfully
    server
      .get(
        "/recognitions/?core_values=" +
          coreValueId +
          "&given_for=" +
          userId +
          "&given_by=" +
          userId +
          "&limit=1&offset=0"
      )
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for give hi5 for recognition with write Contents,url", function (done) {
    // post request for give hi5 Recognition successfully
    server
      .post("/recognitions/" + id + "/hi5")
      .send({
        comment: "good efforts ",
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        id = res.body.data.id;
        res.status.should.equal(201);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create recognition with wrong Contents,response code is 400 ", function (done) {
    // post request with wrong contents
    server
      .post("/recognitions/")
      .send({
        core_value_id: "",
        text: "good contribution in open source",
        given_for: userId,
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get recognition by id with incorrect id type", function (done) {
    // provide id as string
    server
      .get("/recognitions/abc")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });
});
