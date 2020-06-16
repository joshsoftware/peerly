/*eslint-disable  no-unused-vars */
const request = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require
const data = require("./data");
const app = require("../../server");
const db = require("../models/sequelize");
const token = process.env.ACCESS_TOKEN;
let organizations = { ...data.organizations };
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for login", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    organizations.domain_name = "joshsoftware.com";
    db.organizations.create(organizations);
    done();
  });

  /*eslint-disable-line no-undef*/ after(async () => {
    await db.user_blacklisted_tokens.destroy({ where: {} });
    await db.users.destroy({ where: {} });
    await db.organizations.destroy({ where: {} });
  });

  it("should give ok status", function (done) {
    request(app)
      .post("/oauth/google")
      .send({
        access_token: token,
      })
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        should(res.body.data).be.a.Object();
        done();
      });
  });

  it("should give bad request error", function (done) {
    request(app)
      .post("/oauth/google")
      .send({
        access_token: "",
      })
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("should unauthorize user", function (done) {
    request(app)
      .post("/oauth/google")
      .send({
        access_token: "",
      })
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        res.body.error.code.should.equal("invalid-token");
        res.status.should.equal(400);
        done();
      });
  });
  it("should give unauthorize with 401", function (done) {
    request(app)
      .post("/oauth/google")
      .send({
        access_token: "xxxxxxx",
      })
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
});
/*eslint-disable  no-undef*/
