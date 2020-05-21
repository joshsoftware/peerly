const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars

// This agent refers to PORT where program is runninng.

const server = supertest.agent(process.env.URL);
const token = process.env.TOKEN;
// UNIT test begin
let id; //eslint-disable-line no-unused-vars

describe(/*eslint-disable-line no-undef*/ "SAMPLE unit test", function () {
  it(/*eslint-disable-line no-undef*/ "post request for create recognition with write Contents,url", function (done) {
    // post request for create Recognition successfully
    server
      .post("/recognitions/")
      .send({
        core_value_id: 3,
        text: "good contribution in open source",
        given_for: 15,
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        id = res.body.data.id;
        res.status.should.equal(201);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get recognition by id with write url", function (done) {
    // post request for get Recognition successfully
    server
      .get("/recognitions/" + id)
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get all recognition  with write url", function (done) {
    // post request for get Recognition successfully
    server
      .get("/recognitions/")
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        done();
      });
  });
});
