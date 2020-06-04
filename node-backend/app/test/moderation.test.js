const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars

const server = supertest.agent(process.env.TEST_URL);
const token = process.env.TOKEN;

describe(/*eslint-disable-line no-undef*/ "test case for recognition moderation", function () {
  it(/*eslint-disable-line no-undef*/ "post request for report recognition with right Contents and url", function (done) {
    server
      .post("/recognitions/1/report")
      .send({
        type_of_reporting: "fraud",
        reason_for_reporting: "wrong content",
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
      .post("/recognitions/1/report")
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
      .post("/recognitions/1/report")
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
      .post("/recognitions/1/review")
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
      .post("/recognitions/1/review")
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
      .post("/recognitions/1/review")
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
