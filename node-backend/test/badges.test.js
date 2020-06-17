const app = require("../server");
const db = require("../models/sequelize");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
// const request = require("supertest"); //eslint-disable-line node/no-unpublished-require
// const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars
let token;
let id;
let orgId;
let roleId = 2;
let userId = 1;
let badges = { ...data.badges };
// UNIT test begin

describe(/*eslint-disable-line no-undef*/ "test cases for badges", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    db.organizations.create(data.organizations).then((data) => {
      orgId = data.id;
      token = createToken(roleId, orgId, userId);
      done();
    });
  });

  /*eslint-disable-line no-undef*/ after(async () => {
    await db.badges.destroy({ where: {} });
    await db.organizations.destroy({ where: {} });
  });

  it(/*eslint-disable-line no-undef*/ "post request for badges value with right Contents,url", function (done) {
    chai
      .request(app)
      .post(`/organisations/${orgId}/badges`)
      .send(badges)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(201);
        res.body.data.should.be.a("object");
        id = res.body.data.id;
        delete res.body.data.id;
        delete res.body.data.org_id;
        res.body.data.should.be.eql(badges);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all badges correct response", function (done) {
    chai
      .request(app)
      .get(`/organisations/${orgId}/badges`)
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
      .get(`/organisations/${orgId}/badges/${id}`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        res.body.data.id.should.be.eq(id);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for updated badges with right content and url", function (done) {
    chai
      .request(app)
      .put(`/organisations/${orgId}/badges/${id}`)
      .send(badges)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        delete res.body.data.id;
        delete res.body.data.org_id;
        res.body.data.should.be.eql(badges);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all badges invalid type recognition id ", function (done) {
    chai
      .request(app)
      .get(`/organisations/t/badges`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain invalid id ", function (done) {
    chai
      .request(app)
      .get(`/organisations/${orgId}/badges/1000`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request pass invalid type content content ", function (done) {
    chai
      .request(app)
      .get(`/organisations/${orgId}/badges/t`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update badges with Invalid Id", function (done) {
    chai
      .request(app)
      .put(`/organisations/${orgId}/badges/7000`)
      .send(badges)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create badges with wrong url", function (done) {
    chai
      .request(app)
      .post(`/organisations/${orgId}/badge`)
      .send(badges)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create badges with wrong Contents", function (done) {
    badges.hi5_count_required = "abc";
    chai
      .request(app)
      .post(`/organisations/${orgId}/badges`)
      .send(badges)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update badges with wrong Contents", function (done) {
    badges.hi5_count_required = "abc";
    chai
      .request(app)
      .put(`/organisations/${orgId}/badges/${id}`)
      .send(badges)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });
});
