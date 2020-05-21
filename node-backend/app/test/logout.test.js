/*eslint-disable  no-unused-vars */
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require
const server = supertest.agent(process.env.TEST_URL);
const employeeToken = process.env.EMPLOYEE_TOKEN;
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for logout", function () {
  it("should give ok status", function (done) {
    server
      .post("/logout")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
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
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(500)
      .end(function (err, res) {
        res.status.should.equal(500);
        done();
      });
  });
  it("should unauthorized user", function (done) {
    server
      .post("/logout")
      .set("Authorization", "Bearer " + "xxxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
});
/*eslint-disable  no-undef*/
