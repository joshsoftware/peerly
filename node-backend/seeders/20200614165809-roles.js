"use strict";

module.exports = {
  up: async (queryInterface) => {
    const rolesCount = await queryInterface.sequelize.query(
      "SELECT count(*) from roles;"
    );
    if (rolesCount[0][0].count > 0) {
      return rolesCount;
    } else {
      return queryInterface.bulkInsert("roles", [
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
      ]);
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("roles", null);
  },
};
