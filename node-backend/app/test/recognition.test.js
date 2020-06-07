const path = require("path");
const dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
const db = require("./dbConnection");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");

const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars

const server = supertest.agent(process.env.TEST_URL + process.env.HTTP_PORT);
let token;
let orgId;
let userId;
let coreValueId;
let id;

describe(/*eslint-disable-line no-undef*/ "test cases for recognitions", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    db.organizations.create(data.organizations).then((res) => {
      orgId = res.id;
      data.user.org_id = orgId;
      data.user.role_id = 3;
      db.users.create(data.user).then((res) => {
        userId = res.id;
        data.coreValue.org_id = orgId;
        db.core_value.create(data.coreValue).then((res) => {
          coreValueId = res.id;
          token = createToken(3, orgId, userId);
          done();
        });
      });
    });
  });

  /*eslint-disable-line no-undef*/ after((done) => {
    db.recognition_hi5.destroy({ where: {} });
    db.recognitions.destroy({ where: {} });
    db.users.destroy({ where: {} });
    db.core_value.destroy({ where: {} });
    db.organizations.destroy({ where: {} });
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
