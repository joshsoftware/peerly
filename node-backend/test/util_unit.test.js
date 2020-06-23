const faker = require("faker");
const chai = require("chai");
chai.should();
const utility = require("../utils/utility");
const data = require("./data");

const code = faker.lorem.word();
const message = faker.lorem.words(3);

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
  it(/*eslint-disable-line no-undef*/ "should return correct object", function () {
    let errorObject = utility.getErrorResponseObject(code, message);
    errorObject.should.be.a("object");
    errorObject.error.code.should.eql(code);
    errorObject.error.message.should.eql(message);
  });
});

describe(/*eslint-disable-line no-undef*/ "test cases for getLimitAndOffset function", function () {
  it(/*eslint-disable-line no-undef*/ "send limit  greater than 100 but should return 100", function () {
    const setObj = {
      limit: 101,
      offset: 15,
    };
    let limitOffsetObj = utility.getLimitAndOffset(setObj);
    limitOffsetObj.should.be.a("object");
    limitOffsetObj.limit.should.equal(100);
    limitOffsetObj.offset.should.equal(15);
  });

  it(/*eslint-disable-line no-undef*/ "should return default limit and offset ", function () {
    const setObj = {
      limit: null,
      offset: null,
    };
    let limitOffsetObj = utility.getLimitAndOffset(setObj);
    limitOffsetObj.should.be.a("object");
    limitOffsetObj.limit.should.equal(10);
    limitOffsetObj.offset.should.equal(0);
  });
});

describe(/*eslint-disable-line no-undef*/ "test cases for getVersionedController function", function () {
  it(/*eslint-disable-line no-undef*/ "should return versioned controler", function () {
    let route = utility.getVersionedController(data.header, "/organisation");
    route.should.be.a("string");
    route.should.equal("/organisationV1");
  });
});

describe(/*eslint-disable-line no-undef*/ "test cases for getFormattedErrorObj function", function () {
  it(/*eslint-disable-line no-undef*/ "should return correct formate error ", function () {
    const fieldError = [
      { id: faker.lorem.words(3) },
      { id: faker.lorem.words(3) },
    ];
    let errorObj = utility.getFormattedErrorObj(code, message, fieldError);
    errorObj.should.be.a("object");
    errorObj.code.should.equal(code);
    errorObj.message.should.equal(message);
    errorObj.fields.should.be.a("object");
  });
});
