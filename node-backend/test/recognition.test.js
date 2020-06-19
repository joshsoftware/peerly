const app = require("../server");
const db = require("../models/sequelize");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
let token;
let orgId;
let roleId = 3;
let userId;
let coreValueId;
let id;
let organizations = { ...data.organizations };
let user = { ...data.user };
let coreValue = { ...data.coreValue };

describe(/*eslint-disable-line no-undef*/ "test cases for recognitions", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    db.organizations.create(organizations).then((res) => {
      orgId = res.id;
      user.org_id = orgId;
      user.role_id = roleId;
      db.users.create(user).then((res) => {
        userId = res.id;
        coreValue.org_id = orgId;
        db.core_values.create(coreValue).then((res) => {
          coreValueId = res.id;
          token = createToken(roleId, orgId, userId);
          done();
        });
      });
    });
  });

  /*eslint-disable-line no-undef*/ after(async () => {
    await db.recognition_hi5.destroy({ where: {} });
    await db.recognitions.destroy({ where: {} });
    await db.users.destroy({ where: {} });
    await db.core_values.destroy({ where: {} });
    await db.organizations.destroy({ where: {} });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create recognition with write Contents,url", function (done) {
    // post request for create Recognition successfully
    chai
      .request(app)
      .post("/recognitions")
      .send({
        core_value_id: coreValueId,
        text: "good contribution",
        given_for: userId,
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        id = res.body.data.id;
        res.should.have.status(201);
        res.body.data.should.be.a("object");
        res.body.data.given_for.should.be.equal(userId);
        res.body.data.core_value_id.should.be.equal(coreValueId);
        res.body.data.text.should.be.equal("good contribution");
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get recognition by id with write url", function (done) {
    chai
      .request(app)
      .get("/recognitions/" + id)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        res.body.data.id.should.be.equal(id);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get all recognition  with write url", function (done) {
    chai
      .request(app)
      .get("/recognitions/")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get all recognition  with all filter parameters", function (done) {
    chai
      .request(app)
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
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for give hi5 for recognition with write Contents,url", function (done) {
    chai
      .request(app)
      .post(`/recognitions/${id}/hi5`)
      .send({
        comment: "good efforts",
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(201);
        res.body.data.should.be.a("array");
        res.body.data.id.should.equal(id);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create recognition with wrong Contents,response code is 400 ", function (done) {
    chai
      .request(app)
      .post("/recognitions/")
      .send({
        core_value_id: "",
        text: "good contribution in open source",
        given_for: userId,
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get recognition by id with incorrect id type", function (done) {
    chai
      .request(app)
      .get("/recognitions/abc")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });
});
