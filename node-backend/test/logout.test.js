/*eslint-disable  no-unused-vars */
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const app = require("../server");
const db = require("../models/sequelize");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");
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
    chai
      .request(app)
      .post("/logout")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(200);
        done();
      });
  });

  it("should unauthorized user", function (done) {
    chai
      .request(app)
      .post("/logout")
      .set("Authorization", "Bearer " + "xxxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });
});
/*eslint-disable  no-undef*/
