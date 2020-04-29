/*eslint-disable  no-unused-vars */
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require
const server = supertest.agent(process.env.TEST_URL);
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for users listing for organization", function () {
  it("invalid access token", function (done) {
    server
      .get("/users")
      .send()
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.body.error.message.should.equal("unauthorised user");
        done();
      });
  });
  it("should give ok status", function (done) {
    server
      .get("/users")
      .set("Authorization", "Bearer " + "")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.data[0].id.should.equal(8);
        done();
      });
  });
  it("should give internal server error", function (done) {
    server
      .get("/users")
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
      .get("/users")
      .set("Authorization", "Bearer " + "xxxxx")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.body.error.message.should.equal("unauthorised user");
        done();
      });
  });
});
/*eslint-disable  no-undef*/
