let path = require("path");
let dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });

const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars

const server = supertest.agent(process.env.TEST_URL + process.env.HTTP_PORT);
const token = process.env.TOKEN;
// UNIT test begin
let orgId;
let core_value_id;
let sampleData;

describe(/*eslint-disable-line no-undef*/ "SAMPLE unit test", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    this.timeout(200);
    setTimeout(done, 200);
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
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(201);
        orgId = res.body.data.id;

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
          .expect(201)
          .end(function (err /*eslint-disable-line no-undef*/, res) {
            res.status.should.equal(201);
            core_value_id = res.body.data.id;
          });
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create recognition with write Contents,url", function (done) {
    // post request for create Recognition successfully
    server
      .post("/recognitions")
      .send({
        core_value_id: core_value_id,
        text: "good contribution in open source",
        given_for: 15,
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        sampleData = res.body.data;
        res.status.should.equal(201);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get recognition by id with write url", function (done) {
    // post request for get Recognition successfully
    server
      .get("/recognitions/" + sampleData.id)
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
          sampleData.core_value_id +
          "&given_for=" +
          sampleData.given_for +
          "&given_by=" +
          sampleData.given_by +
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
      .post("/recognitions/" + sampleData.id + "/hi5")
      .send({
        comment: "good efforts ",
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        sampleData = res.body.data;
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
        given_for: 15,
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

  it(/*eslint-disable-line no-undef*/ "post request for give hi5 for recognition with wrong Contents, response code is 400", function (done) {
    // post request with wrong contents
    server
      .post("/recognitions/" + sampleData.id + "/hi5")
      .send({
        comment: 2,
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
