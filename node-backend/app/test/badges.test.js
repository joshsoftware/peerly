const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars
const { getOrgId } = require("./variables");
// This agent refers to PORT where program is runninng.

const server = supertest.agent("http://localhost:3120");
const token = process.env.TOKEN;
let id;
// UNIT test begin

describe(/*eslint-disable-line no-undef*/ "SAMPLE unit test", function () {
  it(/*eslint-disable-line no-undef*/ "post request for badges value with right Contents,url", function (done) {
    // post request for create badges successfully
    server
      .post(`/organisations/${getOrgId()}/badges`)
      .send({
        name: "Tata",
        hi5_count_required: 3,
        hi5_frequency: "high",
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

  it(/*eslint-disable-line no-undef*/ "get API all badges correct response", function (done) {
    // calling get all badges api
    server
      .get(`/organisations/${getOrgId()}/badges`)
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

  it(/*eslint-disable-line no-undef*/ "get request contain valid id ", function (done) {
    // calling get by id badges api
    server
      .get(`/organisations/${getOrgId()}/badges/${id}`)
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

  it(/*eslint-disable-line no-undef*/ "put request for updated badges with right content and url", function (done) {
    // calling put request for updated badges sucessfully
    server
      .put(`/organisations/${getOrgId()}/badges/${id}`)
      .send({
        name: "Tata",
        hi5_count_required: 3,
        hi5_frequency: "high",
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

  it(/*eslint-disable-line no-undef*/ "get API all badges invalid type recognition id ", function (done) {
    // calling get all badges api
    server
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
    server
      .get(`/organisations/${getOrgId()}/badges/1000`)
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
      .get(`/organisations/${getOrgId()}/badges/t`)
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

  it(/*eslint-disable-line no-undef*/ "post request for create badges with wrong Contents", function (done) {
    // post request for create badges with wrong Contents
    server
      .post(`/organisations/${getOrgId()}/badges`)
      .send({
        name: "Tata",
        hi5_count_required: "g",
        hi5_frequency: "high",
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

  it(/*eslint-disable-line no-undef*/ "post request for create badges with wrong url", function (done) {
    // calling post request for create badges with wrong url
    server
      .post(`/organisations/${getOrgId()}/badge`)
      .send({
        name: "Tata",
        hi5_count_required: 3,
        hi5_frequency: "high",
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

  it(/*eslint-disable-line no-undef*/ "put request for update badges with wrong Contents", function (done) {
    // put request for update badges with wrong Contents
    server
      .put(`/organisations/${getOrgId()}/badges/${id}`)
      .send({
        name: "Tata",
        hi5_count_required: "t",
        hi5_frequency: "high",
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

  it(/*eslint-disable-line no-undef*/ "put request for update badges with Invalid Id", function (done) {
    // put request for create badges with wrong Contents
    server
      .put(`/organisations/${getOrgId()}/badges/7000`)
      .send({
        name: "Tata",
        hi5_count_required: 3,
        hi5_frequency: "high",
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
});
