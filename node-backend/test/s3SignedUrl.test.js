const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { createToken } = require("./jwtTokenGenration");
//const data = require("./data");
const app = require("../server");
//const db = require("../models/sequelize");
let token;
//let id;
let roleId = 3;
let orgId = 2;
let userId = 1;

describe(/*eslint-disable-line no-undef*/ "test case for get s3 signed url", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    token = createToken(roleId, orgId, userId);
    done();
  });

  it(/*eslint-disable-line no-undef*/ "s3 signed url function should return 200 status for core values", function (done) {
    chai
      .request(app)
      .get("/s3_signed_url?type=core_value&file_type=jpeg&core_value_id=1")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "s3 signed url function should return 200 status for profile", function (done) {
    chai
      .request(app)
      .get("/s3_signed_url?type=profile&file_type=jpeg")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "s3 signed url function should return 400 status for wrong type", function (done) {
    chai
      .request(app)
      .get("/s3_signed_url?type=abc")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "s3 signed url function should return 400 status for no file_type of profile", function (done) {
    chai
      .request(app)
      .get("/s3_signed_url?type=core_value")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "s3 signed url function should return 400 status for wrong corevalueid of coreValue", function (done) {
    chai
      .request(app)
      .get("/s3_signed_url?type=core_value&file_type=jpeg&core_value_id=abc")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });
});
