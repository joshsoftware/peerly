"use strict";

module.exports = {
  up: async (queryInterface) => {
    let organizationsCount = await queryInterface.sequelize.query(
      "SELECT count(*) from organizations;"
    );
    if (organizationsCount[0][0].count > 0) {
      return organizationsCount;
    } else {
      await queryInterface.bulkInsert(
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

      await queryInterface.bulkInsert(
        "organizations",
        [
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
        ],
        {}
      );

      let organizationObject = await queryInterface.sequelize.query(
        "SELECT id, hi5_limit from organizations;"
      );
      return queryInterface.bulkInsert(
        "users",
        [
          {
            org_id: organizationObject[0][0].id,
            first_name: "admin",
            email: "admin123@gmail.com",
            soft_delete: false,
            role_id: 1,
            hi5_quota_balance: organizationObject[0][0].hi5_limit,
          },
        ],
        {}
      );
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("organizations", null, {});
    await queryInterface.bulkDelete("roles", null, {});
  },
};
