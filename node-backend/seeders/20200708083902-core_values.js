"use strict";

module.exports = {
  up: async (queryInterface) => {
    const coreValuesCount = await queryInterface.sequelize.query(
      "SELECT count(*) from core_values;"
    );
    if (coreValuesCount[0][0].count > 0) {
      return coreValuesCount;
    } else {
      return queryInterface.bulkInsert("core_values", [
        {
          org_id: 1,
          text: "collaboration",
          description: "Helping others in their work.",
          thumbnail_url: "https://picsum.photos/200/300/?blur",
          parent_core_value_id: 2,
        },
        {
          org_id: 1,
          text: "Good Citizen",
          description: "Doing the right thing for another person or a group.",
          thumbnail_url:
            "https://i.picsum.photos/id/1012/3973/2639.jpg?hmac=s2eybz51lnKy2ZHkE2wsgc6S81fVD1W2NKYOSh8bzDc",
          parent_core_value_id: 2,
        },
        {
          org_id: 1,
          text: "Blogger",
          description: "Publish a blog post.",
          thumbnail_url:
            "https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ",
          parent_core_value_id: 2,
        },
        {
          org_id: 1,
          text: "Planner",
          description:
            "Planning a party, activity that involves a lot of peolpe at Josh.",
          thumbnail_url:
            "https://i.picsum.photos/id/113/4168/2464.jpg?hmac=p1FqJDS9KHL70UWqUjlYPhJKBdiNOI_CIH0Qo-74_fU",
          parent_core_value_id: 2,
        },
      ]);
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("core_values", null);
  },
};
