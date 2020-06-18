const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
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

describe(/*eslint-disable-line no-undef*/ "test case for organisation", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    token = createToken(roleId, orgId, userId);
    done();
  });

  /*eslint-disable-line no-undef*/ after(async () => {
    await db.users.destroy({ where: {} });
    await db.organizations.destroy({ where: {} });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create organisation with write Contents,url", function (done) {
    chai
      .request(app)
      .post("/organisations")
      .send(organizations)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(201);
        res.body.data.should.be.a("object");
        id = res.body.data.id;
        delete res.body.data.id;
        res.body.data.subscription_valid_upto = parseInt(
          res.body.data.subscription_valid_upto
        );
        res.body.data.should.be.eql(organizations);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get API all organizations correct response", function (done) {
    chai
      .request(app)
      .get("/organisations")
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
      .get("/organisations/" + id)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        res.body.data.id.should.be.equal(id);
        res.body.data.should.be.a("object");
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for updated orgnisation with write content and url", function (done) {
    chai
      .request(app)
      .put("/organisations/" + id)
      .send(organizations)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        id.should.equal(res.body.data.id);
        delete res.body.data.id;
        res.body.data.subscription_valid_upto = parseInt(
          res.body.data.subscription_valid_upto
        );
        res.body.data.should.be.eql(organizations);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request contain invalid id ", function (done) {
    chai
      .request(app)
      .get("/organisations/-50000")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request pass other content ", function (done) {
    chai
      .request(app)
      .get("/organisations/jiiuj")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create orgnisation with wrong Contents", function (done) {
    organizations.hi5_limit = "abc";
    chai
      .request(app)
      .post("/organisations/")
      .send(organizations)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create orgnisation with wrong url", function (done) {
    chai
      .request(app)
      .post("/organisations/dec")
      .send(organizations)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(404);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update orgnisation with wrong Contents", function (done) {
    organizations.hi5_limit = "abc";
    chai
      .request(app)
      .put("/organisations/1")
      .send(organizations)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update orgnisation with Invalid Id", function (done) {
    chai
      .request(app)
      .put("/organisations/udc")
      .send(organizations)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "put request for update orgnisation with wrong url", function (done) {
    chai
      .request(app)
      .put("/organisations/dec/dd")
      .send(organizations)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(404);
        done();
      });
  });
});
