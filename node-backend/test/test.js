/*eslint-disable  no-unused-vars */
var supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
var should = require("should"); //eslint-disable-line node/no-unpublished-require
var server = supertest.agent("http://localhost:3120");
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("SAMPLE unit test", function () {
  it("should give undefined token", function (done) {
    server
      .post("/v1/oauth/google")
      .send({
        access_token: "",
      })
      .expect("Content-type", /json/)
      .expect(404)
      .end(function (err, res) {
        res.body.error.message.should.equal("undefined access token");
        done();
      });
  });
  it("should give ok status", function (done) {
    server
      .post("/v1/oauth/google")
      .send({
        access_token: "",
      })
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.token.should.equal("");
        done();
      });
  });
  it("should give internal server error", function (done) {
    server
      .post("/v1/oauth/google")
      .send({
        access_token: "",
      })
      .expect("Content-type", /json/)
      .expect(500)
      .end(function (err, res) {
        res.body.error.message.should.equal("internal server error");
        done();
      });
  });
  it("should unauthorize user", function (done) {
    server
      .post("/v1/oauth/google")
      .send({
        access_token: "",
      })
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.body.error.message.should.equal("unauthorized user");
        done();
      });
  });
});
/*eslint-disable  no-undef*/
