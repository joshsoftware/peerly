/*eslint-disable  no-unused-vars */
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require

let path = require("path");
let dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
const server = supertest.agent(process.env.TEST_URL + process.env.HTTP_PORT);
const token = process.env.ACCESS_TOKEN;
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for login", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    this.timeout(100);
    setTimeout(done, 100);
    server
      .post("/organisations")
      .send({
        name: "Tata",
        contact_email: "KGF@gmail.com",
        domain_name: "joshsoftware.com",
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
      });
  });

  it("should give ok status", function (done) {
    server
      .post("/oauth/google")
      .send({
        access_token: token,
      })
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it("should unauthorize user", function (done) {
    server
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
  it("shoul give unauthorize with 401", function (done) {
    server
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
