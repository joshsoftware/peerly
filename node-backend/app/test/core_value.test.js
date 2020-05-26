let path = require("path");
let dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });

const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars

const server = supertest.agent(process.env.TEST_URL + process.env.HTTP_PORT);
const token = process.env.TOKEN;
// UNIT test begin
let id;
let orgId;

describe(/*eslint-disable-line no-undef*/ "test case for Core Value", function () {
  /*eslint-disable-line no-undef*/ before(function () {
    server
      .post("/organisations")
      .send({
        name: "Tata",
        contact_email: "KGF@gmail.com",
        domain_name: "@kgf.com",
        subscription_status: 1,
        subscription_valid_upto: "1587731342",
        hi5_limit: 5000,
        hi5_quota_renewal_frequency: "renew",
        timezone: "india",
      })
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(201) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 200
        res.status.should.equal(201);
        orgId = res.body.data.id;
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create core value with right Contents,url", function (done) {
    // post request for create core value successfully
    server
      .post(`/organisations/${orgId}/core_values`)
      .send({
        text: "Tata",
        description: "good",
        parent_core_value_id: 2,
      })
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(201) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 201
        res.status.should.equal(201);
        id = res.body.data.id;
        // Error key should be false.
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all core value correct response", function (done) {
    // calling get all core value api
    server
      .get(`/organisations/${orgId}/core_values`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get all core values", function (done) {
    server
      .get("/core_values")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain valid id ", function (done) {
    server
      .get(`/core_values/${id}`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain valid id ", function (done) {
    // calling get by id core value api
    server
      .get(`/organisations/${orgId}/core_values/${id}`)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for updated core value with write content and url", function (done) {
    // calling put request for updated core value sucessfully
    server
      .put(`/organisations/${orgId}/core_values/${id}`)
      .send({
        text: "Tata",
        description: "good",
        parent_core_value_id: 2,
      })
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(200) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        // Error key should be false.
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all core value invalid type recognation id response", function (done) {
    // calling get all core value api
    server
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

  it(/*eslint-disable-line no-undef*/ "get request contain invalid id ", function (done) {
    // calling get request with wrong id in core value
    server
      .get(`/organisations/${orgId}/core_values/1000`)
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
    server
      .get(`/organisations/${orgId}/core_values/t`)
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

  it(/*eslint-disable-line no-undef*/ "post request for create core value with wrong Contents", function (done) {
    // post request for create core value with wrong Contents
    server
      .post(`/organisations/${orgId}/core_values`)
      .send({
        text: "Tata",
        description: "good",
        parent_core_value_id: "xyz",
      })
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

  it(/*eslint-disable-line no-undef*/ "post request for create core value with wrong url", function (done) {
    // calling post request for create core value with wrong url
    server
      .post(`/organisations/${orgId}/core_value`)
      .send({
        text: "Tata",
        description: "good",
        parent_core_value_id: 2,
      })
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

  it(/*eslint-disable-line no-undef*/ "put request for update core value with wrong Contents", function (done) {
    // post request for update core value with wrong Contents
    server
      .put(`/organisations/${orgId}/core_values/2`)
      .send({
        text: "Tata",
        description: "good",
        parent_core_value_id: "xyz",
      })
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

  it(/*eslint-disable-line no-undef*/ "put request for update core value with Invalid Id", function (done) {
    // post request for update core value with wrong Contents
    server
      .put(`/organisations/${orgId}/core_values/7000`)
      .send({
        text: "Tata",
        description: "good",
        parent_core_value_id: 2,
      })
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

  it(/*eslint-disable-line no-undef*/ "get  request contain invalid id ", function (done) {
    server
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
    server
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
    server
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
