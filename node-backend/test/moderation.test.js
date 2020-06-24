const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const db = require("../models/sequelize");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");

let orgId;
let roleId = 3;
let userId;
let coreValueId;
let recognitionId;
let token;
let organizations = { ...data.organizations };
let user = { ...data.user };
let coreValue = { ...data.coreValue };
let recognition = { ...data.recognition };
describe(/*eslint-disable-line no-undef*/ "test case for recognition moderation", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    db.organizations.create(organizations).then((res) => {
      orgId = res.id;
      user.org_id = orgId;
      user.role_id = roleId;
      db.users.create(user).then((res) => {
        userId = res.id;
        coreValue.org_id = orgId;
        db.core_values.create(coreValue).then((res) => {
          coreValueId = res.id;
          recognition.core_value_id = coreValueId;
          recognition.given_by = userId;
          recognition.given_for = userId;
          db.recognitions.create(recognition).then((res) => {
            recognitionId = res.id;
            token = createToken(roleId, orgId, userId);
            done();
          });
        });
      });
    });
  });

  /*eslint-disable-line no-undef*/ after(async () => {
    await db.reported_recognitions.destroy({ where: {} });
    await db.recognition_moderation.destroy({ where: {} });
    await db.recognition_hi5.destroy({ where: {} });
    await db.recognitions.destroy({ where: {} });
    await db.users.destroy({ where: {} });
    await db.core_values.destroy({ where: {} });
    await db.organizations.destroy({ where: {} });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with right Contents and url", function (done) {
    chai
      .request(app)
      .post(`/recognitions/${recognitionId}/report`)
      .send({
        mark_as: "fraud",
        reason: "wrong content",
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(201);
        res.body.data.should.be.a("object");
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with incorrect Contents", function (done) {
    chai
      .request(app)
      .post(`/recognitions/${recognitionId}/report`)
      .send({
        type_of_reporting: "negative",
        reason_for_reporting: "wrong content",
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with invalid token", function (done) {
    chai
      .request(app)
      .post(`/recognitions/${recognitionId}/report`)
      .send({
        type_of_reporting: "negative",
        reason_for_reporting: "wrong content",
      })
      .set("Authorization", "Bearer " + "")
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(401);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with right Contents and url", function (done) {
    chai
      .request(app)
      .post(`/recognitions/${recognitionId}/review`)
      .send({
        is_inappropriate: "true",
        comment: "wrong content",
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(201);
        res.body.data.should.be.a("object");
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with incorrect Contents", function (done) {
    chai
      .request(app)
      .post(`/recognitions/${recognitionId}/review`)
      .send({
        is_inappropriate: "hello",
        moderator_comment: "wrong content",
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with invalid token", function (done) {
    chai
      .request(app)
      .post(`/recognitions/${recognitionId}/review`)
      .send({
        is_inappropriate: "true",
        moderator_comment: "wrong content",
      })
      .set("Authorization", "Bearer " + "")
      .set("Accept", "application/vnd.peerly.v1")
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.should.have.status(401);
        done();
      });
  });
});
