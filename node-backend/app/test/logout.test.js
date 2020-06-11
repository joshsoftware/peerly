/*eslint-disable  no-unused-vars */
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require

let path = require("path");
let dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
const db = require("./dbConnection");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");
const server = supertest.agent(process.env.TEST_URL + process.env.HTTP_PORT);
let token;
let roleId = 3;
let orgId;

/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for logout", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    db.organizations.create(data.organizations).then((res) => {
      data.user.org_id = res.id;
      orgId = res.id;
      data.user.role_id = roleId;
      db.users.create(data.user).then((res) => {
        token = createToken(roleId, orgId, res.id);
        done();
      });
    });
  });

  /*eslint-disable-line no-undef*/ after(async () => {
    await db.user_blacklisted_tokens.destroy({ where: {} });
    await db.users.destroy({ where: {} });
    await db.organizations.destroy({ where: {} });
  });

  it("should give ok status", function (done) {
    server
      .post("/logout")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
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
