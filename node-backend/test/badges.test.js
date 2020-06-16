const app = require("../server");
const db = require("../models/sequelize");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");

const request = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars
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
    // post request for create badges successfully
    request(app)
      .post(`/organisations/${orgId}/badges`)
      .send(badges)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(201) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(201);
        should(res.body.data).be.a.Object();
        id = res.body.data.id;
        delete res.body.data.id;
        delete res.body.data.org_id;
        res.body.data.should.eql(badges);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all badges correct response", function (done) {
    // calling get all badges api
    request(app)
      .get(`/organisations/${orgId}/badges`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        should(res.body.data).be.a.Array();
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain valid id ", function (done) {
    // calling get by id badges api
    request(app)
      .get(`/organisations/${orgId}/badges/${id}`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        res.body.data.id.should.equal(id);
        should(res.body.data).be.a.Object();
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for updated badges with right content and url", function (done) {
    // calling put request for updated badges sucessfully
    request(app)
      .put(`/organisations/${orgId}/badges/${id}`)
      .send(badges)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(200) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        should(res.body.data).be.a.Object();
        delete res.body.data.id;
        delete res.body.data.org_id;
        res.body.data.should.eql(badges);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all badges invalid type recognition id ", function (done) {
    // calling get all badges api
    request(app)
      .get(`/organisations/t/badges`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400) // THis is HTTP response
      .end(function (err, res) {
        // HTTP status should be 400
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain invalid id ", function (done) {
    // calling get request with wrong id in badges
    request(app)
      .get(`/organisations/${orgId}/badges/1000`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(404) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 404
        res.status.should.equal(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request pass invalid type content content ", function (done) {
    // calling get request with passing other than id
    request(app)
      .get(`/organisations/${orgId}/badges/t`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 400
        res.status.should.equal(400);
        // Error key should be false.
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update badges with Invalid Id", function (done) {
    // put request for create badges with wrong Contents
    request(app)
      .put(`/organisations/${orgId}/badges/7000`)
      .send(badges)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(404) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 404
        res.status.should.equal(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create badges with wrong url", function (done) {
    // calling post request for create badges with wrong url
    request(app)
      .post(`/organisations/${orgId}/badge`)
      .send(badges)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(404) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 404
        res.status.should.equal(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create badges with wrong Contents", function (done) {
    // post request for create badges with wrong Contents
    badges.hi5_count_required = "abc";
    request(app)
      .post(`/organisations/${orgId}/badges`)
      .send(badges)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(400) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 400
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update badges with wrong Contents", function (done) {
    // put request for update badges with wrong Contents
    badges.hi5_count_required = "abc";
    request(app)
      .put(`/organisations/${orgId}/badges/${id}`)
      .send(badges)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(400) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 400
        res.status.should.equal(400);
        done();
      });
  });
});
