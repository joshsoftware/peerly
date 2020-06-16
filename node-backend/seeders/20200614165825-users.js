"use strict";

module.exports = {
  up: async (queryInterface) => {
    const usersCount = await queryInterface.sequelize.query(
      "SELECT count(*) from users;"
    );
    if (usersCount[0][0].count > 0) {
      return usersCount;
    } else {
      const organizationObject = await queryInterface.sequelize.query(
        "SELECT id, hi5_limit from organizations;"
      );
      return queryInterface.bulkInsert("users", [
        {
          org_id: organizationObject[0][0].id,
          first_name: "sunil",
          last_name: "sonawane",
          email: "sunil.sonawane@joshsoftware.com",
          soft_delete: false,
          role_id: 1,
          hi5_quota_balance: organizationObject[0][0].hi5_limit,
        },
      ]);
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("users", null);
  },
};
