const chai = require("chai");
chai.should();
const utility = require("../utils/utility");

describe(/*eslint-disable-line no-undef*/ "test cases for validateRole function", function () {
  it(/*eslint-disable-line no-undef*/ "should give false", function () {
    let role = utility.validateRole(1, "Employee");
    role.should.equal(false);
  });

  it(/*eslint-disable-line no-undef*/ "should give true", function () {
    let role = utility.validateRole(1, "SuperAdmin");
    role.should.equal(true);
  });
});

describe(/*eslint-disable-line no-undef*/ "test cases for error response function", function () {
  const code = "server-error";
  const message = "Internal server error";
  it(/*eslint-disable-line no-undef*/ "should return correct object", function () {
    let errorObject = utility.getErrorResponseObject(code, message);
    errorObject.should.be.a("object");
    errorObject.error.code.should.eql(code);
    errorObject.error.message.should.eql(message);
  });
});
