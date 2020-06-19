/*eslint-disable  no-unused-vars */
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const data = require("./data");
const app = require("../server");
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
    chai
      .request(app)
      .post("/oauth/google")
      .send({
        access_token: token,
      })
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        done();
      });
  });

  it("should give bad request error", function (done) {
    chai
      .request(app)
      .post("/oauth/google")
      .send({
        access_token: "",
      })
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
  });
  it("should unauthorize user", function (done) {
    chai
      .request(app)
      .post("/oauth/google")
      .send({
        access_token: "",
      })
      .end(function (err, res) {
        res.should.have.status(400);
        done();
      });
  });
  it("should give unauthorize with 401", function (done) {
    chai
      .request(app)
      .post("/oauth/google")
      .send({
        access_token: "xxxxxxx",
      })
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });
});
/*eslint-disable  no-undef*/
