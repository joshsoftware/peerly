const path = require("path");
const dotEnvPath = path.resolve("../.env");
require("dotenv").config({ path: dotEnvPath });
const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars

const db = require("./dbConnection");
const data = require("./data");
const { createToken } = require("./jwtTokenGenration");

const server = supertest.agent(process.env.TEST_URL + process.env.HTTP_PORT);
let orgId;
let userId;
let coreValueId;
let recognitionId;
let token;
describe(/*eslint-disable-line no-undef*/ "test case for recognition moderation", function () {
  /*eslint-disable-line no-undef*/ before((done) => {
    db.organizations.create(data.organizations).then((res) => {
      orgId = res.id;
      data.user.org_id = orgId;
      data.user.role_id = 3;
      db.users.create(data.user).then((res) => {
        userId = res.id;
        data.coreValue.org_id = orgId;
        db.core_value.create(data.coreValue).then((res) => {
          coreValueId = res.id;
          data.recognition.core_value_id = coreValueId;
          data.recognition.given_by = userId;
          data.recognition.given_for = userId;
          db.recognitions.create(data.recognition).then((res) => {
            recognitionId = res.id;
            token = createToken(3, orgId, userId);
            done();
          });
        });
      });
    });
  });

  /*eslint-disable-line no-undef*/ after((done) => {
    db.reported_recognitions.destroy({ where: {} });
    db.recognition_moderation.destroy({ where: {} });
    db.recognition_hi5.destroy({ where: {} });
    db.recognitions.destroy({ where: {} });
    db.users.destroy({ where: {} });
    db.core_value.destroy({ where: {} });
    db.organizations.destroy({ where: {} });
    done();
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with right Contents and url", function (done) {
    server
      .post(`/recognitions/${recognitionId}/report`)
      .send({
        mark_as: "fraud",
        reason: "wrong content",
      })
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(201);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with incorrect Contents", function (done) {
    server
      .post(`/recognitions/${recognitionId}/report`)
      .send({
        type_of_reporting: "negative",
        reason_for_reporting: "wrong content",
      })
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(400)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with invalid token", function (done) {
    server
      .post(`/recognitions/${recognitionId}/report`)
      .send({
        type_of_reporting: "negative",
        reason_for_reporting: "wrong content",
      })
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + "")
      .set("Accept", "application/vnd.peerly.v1")
      .expect(401)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(401);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with right Contents and url", function (done) {
    server
      .post(`/recognitions/${recognitionId}/review`)
      .send({
        is_inappropriate: "true",
        moderator_comment: "wrong content",
      })
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(201);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with incorrect Contents", function (done) {
    server
      .post(`/recognitions/${recognitionId}/review`)
      .send({
        is_inappropriate: "hello",
        moderator_comment: "wrong content",
      })
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect(400)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for report recognition with invalid token", function (done) {
    server
      .post(`/recognitions/${recognitionId}/review`)
      .send({
        is_inappropriate: "true",
        moderator_comment: "wrong content",
      })
      .expect("Content-type", /json/)
      .set("Authorization", "Bearer " + "")
      .set("Accept", "application/vnd.peerly.v1")
      .expect(401)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(401);
        done();
      });
  });
});
