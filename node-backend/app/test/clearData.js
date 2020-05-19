/*eslint-disable  no-unused-vars */
const Sequelize = require("sequelize");

const sequelize = new Sequelize("test_db", "root", "root", {
  host: "localhost",
  dialect: "postgres",
});
const core_value = require("../models/core_values.model")(sequelize, Sequelize);
const organizations = require("../models/organizations.model")(
  sequelize,
  Sequelize
);
const badges = require("../models/badges.model")(sequelize, Sequelize);
describe(/*eslint-disable-line no-undef*/ "remove data from test db", function () {
  /*eslint-disable-line no-undef*/ before(function () {
    organizations.destroy({ where: {} });
    core_value.destroy({ where: {} });
    badges.destroy({ where: {} });
  });

  it(/*eslint-disable-line no-undef*/ "delete all data", function (done) {
    done();
  });
});
/*eslint-disable  no-undef*/
