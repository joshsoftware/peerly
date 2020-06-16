"use strict";

module.exports = {
  up: async (queryInterface) => {
    let organizationsCount = await queryInterface.sequelize.query(
      "SELECT count(*) from organizations;"
    );
    if (organizationsCount[0][0].count > 0) {
      return organizationsCount;
    } else {
      return queryInterface.bulkInsert(
        "roles",
        [
          {
            role: "SuperAdmin",
          },
          {
            role: "OrganisationAdmin",
          },
          {
            role: "Employee",
          },
          {
            role: "Moderator",
          },
        ],
        {}
      );
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("roles", null, {});
  },
};
