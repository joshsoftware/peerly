let path = require("path");
let dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
const db = require("./dbConnection");
const Organizations = db.organizations;
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars
const { createToken } = require("./jwtTokenGenration");
const server = supertest.agent(process.env.TEST_URL + process.env.HTTP_PORT);
let token;
let id;
let roleId = 3;
let orgId = 2;
let userId = 1;
// UNIT test begin
describe(/*eslint-disable-line no-undef*/ "test case for organisation", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    token = createToken(roleId, orgId, userId);
    done();
  });

  /*eslint-disable-line no-undef*/ after(() => {
    Organizations.destroy({ where: {} });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create organisation with write Contents,url", function (done) {
    // post request for create organisation successfully
    server
      .post("/organisations")
      .send({
        name: "Tata",
        contact_email: "KGF@gmail.com",
        domain_name: "@joshsoftware.com",
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
        id = res.body.data.id;
        // Error key should be false.
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all organizations correct response", function (done) {
    // calling get all organizations api
    server
      .get("/organisations")
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain valid id ", function (done) {
    // calling get by id organizations api
    server
      .get("/organisations/" + id)
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

  it(/*eslint-disable-line no-undef*/ "put request for updated orgnisation with write content and url", function (done) {
    // calling put request for updated orgnisation sucessfully
    server
      .put("/organisations/" + id)
      .send({
        name: "Tata",
        contact_email: "KGF@gmail.com",
        domain_name: "joshsoftware.com",
        subscription_status: 1,
        subscription_valid_upto: "1587732342",
        hi5_limit: 5000,
        hi5_quota_renewal_frequency: "renew",
        timezone: "india",
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

  it(/*eslint-disable-line no-undef*/ "get request contain invalid id ", function (done) {
    // calling get request with wrong id in organisation
    server
      .get("/organisations/50000")
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

  it(/*eslint-disable-line no-undef*/ "get request pass other content ", function (done) {
    // calling get request with passing other than id
    server
      .get("/organisations/jiiuj")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 200
        res.status.should.equal(400);
        // Error key should be false.
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create orgnisation with wrong Contents", function (done) {
    // post request for create orgnisation with wrong Contents
    server
      .post("/organisations/")
      .send({
        name: "Tata",
        contact_email: "KGFgmail.com",
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
      .expect(400) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 400
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create orgnisation with wrong url", function (done) {
    // calling post request for create orgnisation with wrong url
    server
      .post("/organisations/dec")
      .send({
        name: "Tata",
        contact_email: "KGFgmail.com",
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
      .expect(404) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 404
        res.status.should.equal(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update orgnisation with wrong Contents", function (done) {
    // put request for update orgnisation with wrong Contents
    server
      .put("/organisations/1")
      .send({
        name: "Tata",
        contact_email: "KGFgmail.com",
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
      .expect(400) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 400
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update orgnisation with Invalid Id", function (done) {
    // put request for update orgnisation with wrong Contents
    server
      .put("/organisations/udc")
      .send({
        name: "Tata",
        contact_email: "KGFgmail.com",
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
      .expect(400) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 400
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update orgnisation with wrong url", function (done) {
    // calling put request for update orgnisation with wrong url
    server
      .put("/organisations/dec/dd")
      .send({
        name: "Tata",
        contact_email: "KGFgmail.com",
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
      .expect(404) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 404
        res.status.should.equal(404);
        done();
      });
  });
});
