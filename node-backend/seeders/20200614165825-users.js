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
        "users",
        [
          {
            org_id: 4,
            first_name: "admin",
            email: "admin@123",
            soft_delete: false,
            role_id: 1,
            hi5_quota_balance: 5,
          },
        ],
        {}
      );
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
