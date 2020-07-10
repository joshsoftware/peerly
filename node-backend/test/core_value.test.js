const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const db = require("../models/sequelize");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");

let token;
let id;
let orgId;
let roleId = 2;
let userId = 1;
let coreValue = { ...data.coreValue };

describe(/*eslint-disable-line no-undef*/ "test case for Core Value", function () {
  delete coreValue.org_id;
  /*eslint-disable-line no-undef*/ before((done) => {
    db.organizations.create(data.organizations).then((data) => {
      orgId = data.id;
      token = createToken(roleId, orgId, userId);
      done();
    });
  });

  /*eslint-disable-line no-undef*/ after(async () => {
    await db.core_values.destroy({ where: {} });
    await db.organizations.destroy({ where: {} });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create core value with right Contents,url", function (done) {
    let postCoreValue = { ...coreValue };
    chai
      .request(app)
      .post(`/core_values`)
      .send(postCoreValue)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(201);
        res.body.data.should.be.a("object");
        id = res.body.data.id;
        delete res.body.data.id;
        delete res.body.data.org_id;
        delete postCoreValue.thumbnail_url;
        res.body.data.should.be.eql(postCoreValue);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get all core values", function (done) {
    chai
      .request(app)
      .get("/core_values")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain valid id ", function (done) {
    chai
      .request(app)
      .get(`/core_values/${id}`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        res.body.data.id.should.be.eql(id);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for updated core value with write content and url", function (done) {
    chai
      .request(app)
      .put(`/core_values/${id}`)
      .send(coreValue)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        res.body.data.id.should.eql(id);
        res.body.data.should.be.a("object");
        id = res.body.data.id;
        delete res.body.data.id;
        delete res.body.data.org_id;
        delete coreValue.thumbnail_url;
        res.body.data.should.be.eql(coreValue);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create core value with wrong url", function (done) {
    chai
      .request(app)
      .post(`/core_value`)
      .send(coreValue)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update core value with Invalid Id", function (done) {
    chai
      .request(app)
      .put(`/core_values/7000`)
      .send(coreValue)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create core value with wrong thumbnail_url", function (done) {
    // post request for create core value with wrong Contents
    coreValue.thumbnail_url = "mail.google.com";
    chai
      .request(app)
      .post("/core_values")
      .send(coreValue)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update core value with wrong thumbnail_url", function (done) {
    // post request for update core value with wrong Contents
    coreValue.thumbnail_url = "mail.google.com";
    chai
      .request(app)
      .put("/core_values/2")
      .send(coreValue)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get  request contain invalid id ", function (done) {
    chai
      .request(app)
      .get("/core_values/5000")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request pass other content ", function (done) {
    chai
      .request(app)
      .get("/core_values/t")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "invalid access token", function (done) {
    chai
      .request(app)
      .get("/core_values")
      .set("Authorization", "Bearer " + "")
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
});
