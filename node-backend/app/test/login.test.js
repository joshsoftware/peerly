/*eslint-disable  no-unused-vars */
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require
const server = supertest.agent(process.env.TEST_URL);
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for login", function () {
  it("should give ok status", function (done) {
    server
      .post("/oauth/google")
      .send({
        access_token: "",
      })
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.token.should.equal("");
        res.status.should.equal(200);
        done();
      });
  });
  it("should give internal server error", function (done) {
    server
      .post("/oauth/google")
      .send({
        access_token: "",
      })
      .expect("Content-type", /json/)
      .expect(500)
      .end(function (err, res) {
        res.body.error.message.should.equal("internal server error");
        res.status.should.equal(500);
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
      .expect(401)
      .end(function (err, res) {
        res.body.error.code.should.equal("invalid-token");
        res.status.should.equal(401);
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
