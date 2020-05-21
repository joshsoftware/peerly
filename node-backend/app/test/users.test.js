/*eslint-disable  no-unused-vars */
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should"); //eslint-disable-line node/no-unpublished-require
const server = supertest.agent(process.env.TEST_URL);
const employeeToken = process.env.EMPLOYEE_TOKEN;
const superAdminToken = process.env.SUPER_ADMIN_TOKEN;
/*eslint-disable  no-unused-vars */
/*eslint-disable  no-undef*/
describe("test cases for users listing for organization", function () {
  it("/users get method should give status 200", function (done) {
    server
      .get("/users")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("/users get method should unauthorize user with 401 status", function (done) {
    server
      .get("/users")
      .set("Authorization", "Bearer " + "xxxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
  it("/users?limit=10&offset=0&org_id=1 get method should give status 403", function (done) {
    server
      .get("/users?limit=2&offset=4&org_id=1")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(403)
      .end(function (err, res) {
        res.status.should.equal(403);
        done();
      });
  });
  it("/users?limit=ten&offset=zero&org_id=1 get method should give status 400", function (done) {
    server
      .get("/users?limit=ten&offset=zero&org_id=1")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users?limit=10&offset=0&org_id=1 get method should give status 200", function (done) {
    server
      .get("/users?limit=2&offset=4&org_id=1")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("/users/me get method should give status 401", function (done) {
    server
      .get("/users/me")
      .set("Authorization", "Bearer " + "xxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
  it("/users/me get method should give status 200", function (done) {
    server
      .get("/users/me")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("/users/:id get method should give status 200", function (done) {
    server
      .get("/users/18")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("/users/:id get method should give status 400", function (done) {
    server
      .get("/users/five")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/:id get method should give status 403", function (done) {
    server
      .get("/users/18")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(403)
      .end(function (err, res) {
        res.status.should.equal(403);
        done();
      });
  });

  it("/users/me put method should give status 200", function (done) {
    server
      .put("/users/me")
      .send({
        first_name: "xyz",
        last_name: "abc",
        display_name: "pqr",
      })
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("/users/me put method should give status 400", function (done) {
    server
      .put("/users/me")
      .send({
        first_name: "xyz",
        last_name: "abc",
      })
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/me put method should give status 401", function (done) {
    server
      .put("/users/me")
      .send({
        first_name: "xyz",
        last_name: "abc",
        display_name: "pqr",
      })
      .set("Authorization", "Bearer " + "xxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
  it("/users/:id put method should give status 403", function (done) {
    server
      .put("/users/15")
      .send({
        role_id: "3",
      })
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(403)
      .end(function (err, res) {
        res.status.should.equal(403);
        done();
      });
  });
  it("/users/:id put method should give status 400 fo invalid path param", function (done) {
    server
      .put("/users/five")
      .send({
        role_id: "3",
      })
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/:id put method should give status 400 for invalid input", function (done) {
    server
      .put("/users/15")
      .send({
        role_id: "two",
      })
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/:id put method should give status 200", function (done) {
    server
      .put("/users/15")
      .send({
        role_id: "3",
      })
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("/users/:id delete method should give status 401", function (done) {
    server
      .delete("/users/15")
      .set("Authorization", "Bearer " + "xxxxx")
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(401)
      .end(function (err, res) {
        res.status.should.equal(401);
        done();
      });
  });
  it("/users/:id delete method should give status 200", function (done) {
    server
      .delete("/users/15")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.status.should.equal(200);
        done();
      });
  });
  it("/users/:id delete method should give status 400", function (done) {
    server
      .delete("/users/five")
      .set("Authorization", "Bearer " + superAdminToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err, res) {
        res.status.should.equal(400);
        done();
      });
  });
  it("/users/:id delete method should give status 403", function (done) {
    server
      .delete("/users/15")
      .set("Authorization", "Bearer " + employeeToken)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(403)
      .end(function (err, res) {
        res.status.should.equal(403);
        done();
      });
  });
});
/*eslint-disable  no-undef*/
