const app = require("../server");
const db = require("../models/sequelize");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");

const request = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars

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
    request(app)
      .post("/recognitions")
      .send({
        core_value_id: coreValueId,
        text: "good contribution",
        given_for: userId,
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        id = res.body.data.id;
        res.status.should.equal(201);
        should(res.body.data).be.a.Object();
        res.body.data.given_for.should.equal(userId);
        res.body.data.core_value_id.should.equal(coreValueId);
        res.body.data.text.should.equal("good contribution");
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get recognition by id with write url", function (done) {
    // post request for get Recognition successfully
    request(app)
      .get("/recognitions/" + id)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        should(res.body.data).be.a.Object();
        res.body.data.id.should.equal(id);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get all recognition  with write url", function (done) {
    // post request for get Recognition successfully
    request(app)
      .get("/recognitions/")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        should(res.body.data).be.a.Array();
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get all recognition  with all filter parameters", function (done) {
    // post request for get filter Recognition successfully
    request(app)
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
        should(res.body.data).be.a.Array();
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for give hi5 for recognition with write Contents,url", function (done) {
    // post request for give hi5 Recognition successfully
    request(app)
      .post(`/recognitions/${id}/hi5`)
      .send({
        comment: "good efforts",
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(201);
        should(res.body.data).be.a.Object();
        res.body.data.id.should.equal(id);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create recognition with wrong Contents,response code is 400 ", function (done) {
    // post request with wrong contents
    request(app)
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
    request(app)
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
