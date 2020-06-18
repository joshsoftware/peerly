/*eslint-disable  no-unused-vars */
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const app = require("../server");
const { createToken } = require("./jwtTokenGenration");
const db = require("../models/sequelize");
const data = require("./data");

let employeeToken;
let superAdminToken;
let userId;
let orgId;
let superAdminRoleId = 1;
let employeeRoleId = 3;
let user = data.user;
let organizations = { ...data.organizations };
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for users", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    db.organizations.create(organizations).then((res) => {
      user.org_id = res.id;
      orgId = res.id;
      user.role_id = employeeRoleId;
      db.users.create(user).then((res) => {
        userId = res.id;
        employeeToken = createToken(employeeRoleId, orgId, userId);
        superAdminToken = createToken(superAdminRoleId, orgId, userId);
        done();
      });
    });
  });

  /*eslint-disable-line no-undef*/ after(async () => {
    await db.recognitions.destroy({ where: {} });
    await db.users.destroy({ where: {} });
    await db.core_values.destroy({ where: {} });
    await db.organizations.destroy({ where: {} });
  });

  it("/users get method should give status 200", function (done) {
    chai
      .request(app)
      .get("/users")
      .set("Authorization", `Bearer ${employeeToken}`)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        done();
      });
  });
  it("/users?limit=10&offset=0&org_id=1 get method should give status 200", function (done) {
    chai
      .request(app)
      .get("/users?limit=2&offset=4&org_id=1")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        done();
      });
  });
  it("/users/me get method should give status 200", function (done) {
    chai
      .request(app)
      .get("/users/me")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        res.body.data.id.should.be.equal(userId);
        done();
      });
  });
  it("/users/:id get method should give status 200", function (done) {
    chai
      .request(app)
      .get(`/users/${userId}`)
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        res.body.data.id.should.be.equal(userId);
        done();
      });
  });
  it("/users/me put method should give status 200", function (done) {
    chai
      .request(app)
      .put("/users/me")
      .send({
        first_name: "xyz",
        last_name: "abc",
        display_name: "pqr",
      })
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        res.body.data.id.should.be.equal(userId);
        res.body.data.first_name.should.be.equal("xyz");
        res.body.data.last_name.should.be.equal("abc");
        res.body.data.display_name.should.be.equal("pqr");
        done();
      });
  });
  it("/users/:id put method should give status 200", function (done) {
    chai
      .request(app)
      .put(`/users/${userId}`)
      .send({
        role_id: "3",
      })
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.should.have.status(200);
        res.body.data.should.be.a("object");
        res.body.data.id.should.be.equal(userId);
        res.body.data.role_id.should.be.equal(3);
        done();
      });
  });
  it("/users/:id delete method should give status 200", function (done) {
    chai
      .request(app)
      .delete(`/users/${userId}`)
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("/users/:id delete method should give status 200", function (done) {
    chai
      .request(app)
      .delete(`/users/${userId}`)
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("/users/:id get method should give status 400", function (done) {
    chai
      .request(app)
      .get("/users/five")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/:id get method should give status 403", function (done) {
    chai
      .request(app)
      .get("/users/18")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(403);
        done();
      });
  });
  it("/users?limit=10&offset=0&org_id=1 get method should give status 403", function (done) {
    chai
      .request(app)
      .get("/users?limit=2&offset=4&org_id=1")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(403);
        done();
      });
  });
  it("/users/me put method should give status 400", function (done) {
    chai
      .request(app)
      .put("/users/me")
      .send({
        first_name: "xyz",
        last_name: "abc",
      })
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/me put method should give status 401", function (done) {
    chai
      .request(app)
      .put("/users/me")
      .send({
        first_name: "xyz",
        last_name: "abc",
        display_name: "pqr",
      })
      .set("Authorization", "Bearer " + "xxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
  it("/users/:id put method should give status 403", function (done) {
    chai
      .request(app)
      .put("/users/15")
      .send({
        role_id: "3",
      })
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(403);
        done();
      });
  });
  it("/users/me get method should give status 401", function (done) {
    chai
      .request(app)
      .get("/users/me")
      .set("Authorization", "Bearer " + "xxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
  it("/users/:id put method should give status 400 fo invalid path param", function (done) {
    chai
      .request(app)
      .put("/users/five")
      .send({
        role_id: "3",
      })
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/:id put method should give status 400 for invalid input", function (done) {
    chai
      .request(app)
      .put("/users/15")
      .send({
        role_id: "two",
      })
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/:id delete method should give status 401", function (done) {
    chai
      .request(app)
      .delete("/users/15")
      .set("Authorization", "Bearer " + "xxxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
  it("/users/me get method should give status 401", function (done) {
    chai
      .request(app)
      .get("/users/me")
      .set("Authorization", "Bearer " + "xxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
  it("/users/:id delete method should give status 400", function (done) {
    chai
      .request(app)
      .delete("/users/five")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users?limit=ten&offset=zero&org_id=1 get method should give status 400", function (done) {
    chai
      .request(app)
      .get("/users?limit=ten&offset=zero&org_id=1")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/:id delete method should give status 403", function (done) {
    chai
      .request(app)
      .delete("/users/15")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err, res) {
        res.status.should.equal(403);
        done();
      });
  });
});
/*eslint-disable  no-undef*/
