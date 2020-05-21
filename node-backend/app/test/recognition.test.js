const supertest = require("supertest"); //eslint-disable-line node/no-unpublished-require
const should = require("should" /*eslint-disable-line node/no-unpublished-require*/); //eslint-disable-line no-unused-vars

// This agent refers to PORT where program is runninng.

const server = supertest.agent(process.env.URL);
const token = process.env.TOKEN;
// UNIT test begin
let sampleData; //eslint-disable-line no-unused-vars

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
        sampleData = res.body.data;
        res.status.should.equal(201);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "get request for get recognition by id with write url", function (done) {
    // post request for get Recognition successfully
    server
      .get("/recognitions/" + sampleData.id)
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

  it(/*eslint-disable-line no-undef*/ "get request for get all recognition  with all filter parameters", function (done) {
    // post request for get filter Recognition successfully
    server
      .get(
        "/recognitions/?core_values=" +
          sampleData.core_value_id +
          "&given_for=" +
          sampleData.given_for +
          "&given_by=" +
          sampleData.given_by +
          "&limit=1&offset=0"
      )
      .set("Authorization", "Bearer " + token) //?core_value_id=2&given_for=5&given_by=6
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(200)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(200);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for give hi5 for recognition with write Contents,url", function (done) {
    // post request for give hi5 Recognition successfully
    server
      .post("/recognitions/" + sampleData.id + "/hi5")
      .send({
        comment: "good efforts ",
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(201)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        sampleData = res.body.data;
        res.status.should.equal(201);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for create recognition with wrong Contents,response code is 400 ", function (done) {
    // post request with wrong contents
    server
      .post("/recognitions/")
      .send({
        core_value_id: "",
        text: "good contribution in open source",
        given_for: 15,
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });

  it(/*eslint-disable-line no-undef*/ "post request for give hi5 for recognition with wrong Contents, response code is 400", function (done) {
    // post request with wrong contents
    server
      .post("/recognitions/" + sampleData.id + "/hi5")
      .send({
        comment: 2,
      })
      .set("Authorization", "Bearer " + token)
      .set("Accept", "application/vnd.peerly.v1")
      .expect("Content-type", /json/)
      .expect(400)
      .end(function (err /*eslint-disable-line no-undef*/, res) {
        res.status.should.equal(400);
        done();
      });
  });
});
