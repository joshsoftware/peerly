const app = require("../../server");
const request = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars
const db = require("../models/sequelize");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");

let token;
let id;
let orgId;
let roleId = 2;
let userId = 1;

describe(/*eslint-disable-line no-undef*/ "test case for Core Value", function () {
  delete data.coreValue.org_id;
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
    request(app)
      .post(`/organisations/${orgId}/core_values`)
      .send(data.coreValue)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(201) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 201
        res.status.should.equal(201);
        should(res.body.data).be.a.Object();
        id = res.body.data.id;
        delete res.body.data.id;
        delete res.body.data.org_id;
        res.body.data.should.eql(data.coreValue);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all core value correct response", function (done) {
    // calling get all core value api
    request(app)
      .get(`/organisations/${orgId}/core_values`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        should(res.body.data).be.a.Array();
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get all core values", function (done) {
    request(app)
      .get("/core_values")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        should(res.body.data).be.a.Array();
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain valid id ", function (done) {
    request(app)
      .get(`/core_values/${id}`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        res.body.data.id.should.equal(id);
        should(res.body.data).be.a.Object();
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain valid id with organisation id", function (done) {
    // calling get by id core value api
    request(app)
      .get(`/organisations/${orgId}/core_values/${id}`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        should(res.body.data).be.a.Object();
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for updated core value with write content and url", function (done) {
    // calling put request for updated core value sucessfully
    request(app)
      .put(`/organisations/${orgId}/core_values/${id}`)
      .send(data.coreValue)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(200) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        res.body.data.id.should.equal(id);
        should(res.body.data).be.a.Object();
        id = res.body.data.id;
        delete res.body.data.id;
        delete res.body.data.org_id;
        res.body.data.should.eql(data.coreValue);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all core value invalid type  id response", function (done) {
    // calling get all core value api
    request(app)
      .get("/organisations/t/core_values")
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

  it(/*eslint-disable-line no-undef*/ "get request pass invalid type content content ", function (done) {
    // calling get request with passing other than id
    request(app)
      .get(`/organisations/${orgId}/core_values/t`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 400
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create core value with wrong url", function (done) {
    // calling post request for create core value with wrong url
    request(app)
      .post(`/organisations/${orgId}/core_value`)
      .send(data.coreValue)
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

  it(/*eslint-disable-line no-undef*/ "put request for update core value with Invalid Id", function (done) {
    // post request for update core value with wrong Contents
    request(app)
      .put(`/organisations/${orgId}/core_values/7000`)
      .send(data.coreValue)
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

  it(/*eslint-disable-line no-undef*/ "post request for create core value with wrong thumbnail_url", function (done) {
    // post request for create core value with wrong Contents
    data.coreValue.thumbnail_url = "mail.google.com";
    request(app)
      .post("/organisations/1/core_values")
      .send(data.coreValue)
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

  it(/*eslint-disable-line no-undef*/ "put request for update core value with wrong thumbnail_url", function (done) {
    // post request for update core value with wrong Contents
    data.coreValue.thumbnail_url = "mail.google.com";
    request(app)
      .put("/organisations/1/core_values/2")
      .send(data.coreValue)
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

  it(/*eslint-disable-line no-undef*/ "get  request contain invalid id ", function (done) {
    request(app)
      .get("/core_values/5000")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(404)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request pass other content ", function (done) {
    request(app)
      .get("/core_values/t")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "invalid access token", function (done) {
    request(app)
      .get("/core_values")
      .set("Authorization", "Bearer " + "")
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
});
