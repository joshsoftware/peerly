"use strict";

module.exports = {
  up: async (queryInterface) => {
    let organizationsCount = await queryInterface.sequelize.query(
      "SELECT count(*) from organizations;"
    );
    if (organizationsCount[0][0].count > 0) {
      return organizationsCount;
    } else {
      return queryInterface.bulkInsert("organizations", [
        {
          name: "josh software",
          contact_email: "info@joshsoftware.com",
          domain_name: "joshsoftware.com",
          hi5_limit: 5,
          subscription_status: 1,
          subscription_valid_upto: 12239,
          hi5_quota_renewal_frequency: "WEEKLY",
          timezone: "india",
        },
      ]);
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("organizations", null);
  },
};
