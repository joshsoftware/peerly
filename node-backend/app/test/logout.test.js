/*eslint-disable  no-unused-vars */
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require
const server = supertest.agent(process.env.TEST_URL);
const token = process.env.TOKEN;
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for logout", function () {
  it("invalid access token", function (done) {
    server
      .post("/logout")
      .send()
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.body.message.should.equal("Not a valid token");
        res.status.should.equal(401);
        done();
      });
  });
  it("should give ok status", function (done) {
    server
      .post("/logout")
      .set("Authorization", "Bearer " + token)
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("should give internal server error", function (done) {
    server
      .post("/logout")
      .set("Authorization", "Bearer " + token)
      .expect("Content-type", /json/)
      .expect(500)
      .end(function (err, res) {
        res.body.error.message.should.equal("internal server error");
        res.status.should.equal(500);
        done();
      });
  });
  it("should unauthorized user", function (done) {
    server
      .post("/logout")
      .set("Authorization", "Bearer " + "xxxx")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.body.error.message.should.equal("unauthorized user");
        res.status.should.equal(401);
        done();
      });
  });
});
/*eslint-disable  no-undef*/
