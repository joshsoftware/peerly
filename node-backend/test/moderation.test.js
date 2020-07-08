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
let givenFor;
let coreValueId;
let recognitionId;
let token;
let organizations = { ...data.organizations };
let user = { ...data.user };
let coreValue = { ...data.coreValue };
let recognition = { ...data.recognition };
describe(/*eslint-disable-line no-undef*/ "test case for recognition moderation", function () {
  /*eslint-disable-line no-undef*/ before(async () => {
    const orgResponse = await db.organizations.create(organizations);
    orgId = orgResponse.id;
    user.org_id = orgId;
    user.role_id = roleId;
    let userResponse = await db.users.create(user);
    userId = userResponse.id;
    userResponse = await db.users.create(user);
    givenFor = userResponse.id;
    coreValue.org_id = orgId;
    const coreValueResponse = await db.core_values.create(coreValue);
    coreValueId = coreValueResponse.id;
    recognition.core_value_id = coreValueId;
    recognition.given_by = userId;
    recognition.given_for = givenFor;
    const recognitionResponse = await db.recognitions.create(recognition);
    recognitionId = recognitionResponse.id;
    token = createToken(roleId, orgId, userId);
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
