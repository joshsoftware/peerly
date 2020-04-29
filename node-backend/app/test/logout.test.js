/*eslint-disable  no-unused-vars */
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require
const server = supertest.agent(process.env.TEST_URL);
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for logout", function () {
  it("invalid access token", function (done) {
    server
      .post("/v1/logout")
      .send()
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.body.message.should.equal("Not a valid token");
        done();
      });
  });
  it("should give ok status", function (done) {
    server
      .post("/v1/logout")
      .set("Authorization", "Bearer " + "")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.data.user_id.should.equal(4);
        done();
      });
  });
  it("should give internal server error", function (done) {
    server
      .post("/v1/oauth/google")
      .set("Authorization", "Bearer " + "")
      .expect("Content-type", /json/)
      .expect(500)
      .end(function (err, res) {
        res.body.error.message.should.equal("internal server error");
        done();
      });
  });
  it("should unauthorize user", function (done) {
    server
      .post("/v1/logout")
      .set("Authorization", "Bearer " + "")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.body.error.message.should.equal("unauthorized user");
        done();
      });
  });
});
/*eslint-disable  no-undef*/