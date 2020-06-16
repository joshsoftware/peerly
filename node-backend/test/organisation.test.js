const request = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars
const { createToken } = require("./jwtTokenGenration");
const data = require("./data");
const app = require("../server");
const db = require("../models/sequelize");
let token;
let id;
let roleId = 3;
let orgId = 2;
let userId = 1;
let organizations = { ...data.organizations };
// UNIT test begin
describe(/*eslint-disable-line no-undef*/ "test case for organisation", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    token = createToken(roleId, orgId, userId);
    done();
  });

  /*eslint-disable-line no-undef*/ after(async () => {
    await db.organizations.destroy({ where: {} });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create organisation with write Contents,url", function (done) {
    // post request for create organisation successfully
    request(app)
      .post("/organisations")
      .send(organizations)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(201);
        should(res.body.data).be.a.Object();
        id = res.body.data.id;
        delete res.body.data.id;
        res.body.data.subscription_valid_upto = parseInt(
          res.body.data.subscription_valid_upto
        );
        res.body.data.should.eql(organizations);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all organizations correct response", function (done) {
    // calling get all organizations api
    request(app)
      .get("/organisations")
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        should(res.body.data).be.a.Array();
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain valid id ", function (done) {
    // calling get by id organizations api
    request(app)
      .get("/organisations/" + id)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        res.body.data.id.should.equal(id);
        should(res.body.data).be.a.Object();
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for updated orgnisation with write content and url", function (done) {
    // calling put request for updated orgnisation sucessfully
    request(app)
      .put("/organisations/" + id)
      .send(organizations)
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(200) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        // HTTP status should be 200
        res.status.should.equal(200);
        should(res.body.data).be.a.Object();
        id.should.equal(res.body.data.id);
        delete res.body.data.id;
        res.body.data.subscription_valid_upto = parseInt(
          res.body.data.subscription_valid_upto
        );
        res.body.data.should.eql(organizations);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain invalid id ", function (done) {
    // calling get request with wrong id in organisation
    request(app)
      .get("/organisations/-50000")
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(404) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request pass other content ", function (done) {
    // calling get request with passing other than id
    request(app)
      .get("/organisations/jiiuj")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400) // THis is HTTP response
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create orgnisation with wrong Contents", function (done) {
    // post request for create orgnisation with wrong Contents
    organizations.hi5_limit = "abc";
    request(app)
      .post("/organisations/")
      .send(organizations)
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
    request(app)
      .post("/organisations/dec")
      .send(organizations)
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
    organizations.hi5_limit = "abc";
    request(app)
      .put("/organisations/1")
      .send(organizations)
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
    request(app)
      .put("/organisations/udc")
      .send(organizations)
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
    request(app)
      .put("/organisations/dec/dd")
      .send(organizations)
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
