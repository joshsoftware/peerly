/*eslint-disable  no-unused-vars */
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require
const server = supertest.agent(process.env.TEST_URL);
const token = process.env.TOKEN;
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for get profile", function () {
  it("invalid access token", function (done) {
    server
      .get("/profile")
      .set("Authorization", "Bearer " + "")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
  it("get profile", function (done) {
    server
      .get("/profile")
      .set("Authorization", "Bearer " + token)
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
});
/*eslint-disable  no-undef*/
