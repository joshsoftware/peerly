const chai = require("chai");
chai.should();
const controller = require("../controllers/v1/recognitionController");
const data = require("./data");

describe(/*eslint-disable-line no-undef*/ "unit test  for recognition controller ", function () {
  it(/*eslint-disable-line no-undef*/ "should return filter object", function () {
    let filterData = controller.getFilterData(data.filterData);
    filterData.should.be.a("object");
    filterData.should.eql(data.filterData);
  });

  it(/*eslint-disable-line no-undef*/ "should return filter clause with two object", function () {
    let clause = controller.createWhereClause({ orgId: 1 }, "2,33");
    clause.should.be.a("object");
    let orgId = Object.values(clause)[0];
    orgId.should.eql(1);
    Object.values(clause).length.should.eql(2);
  });

  it(/*eslint-disable-line no-undef*/ "return only org_id filter clause", function () {
    let clause = controller.createWhereClause({ orgId: 1 });
    clause.should.be.a("object");
    let orgId = Object.values(clause)[0];
    orgId.should.eql(1);
    Object.values(clause).length.should.eql(1);
  });
});
