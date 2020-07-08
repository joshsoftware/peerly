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
          thumbnail_url: "https://peerly-images.s3.ap-south-1.amazonaws.com/mentoring%402x.png",
          parent_core_value_id: 2,
        },
        {
          org_id: 1,
          text: "Training",
          description: "Given training",
          thumbnail_url:
            "https://peerly-images.s3.ap-south-1.amazonaws.com/training%402x.png",
          parent_core_value_id: 2,
        },
        {
          org_id: 1,
          text: "Blogger",
          description: "Published a blog post.",
          thumbnail_url:
            "https://peerly-images.s3.ap-south-1.amazonaws.com/quality%402x.png",
          parent_core_value_id: 2,
        },
        {
          org_id: 1,
          text: "Planner",
          description:
            "Planned a activity that involves a lots of peolpe at Josh.",
          thumbnail_url:
            "https://peerly-images.s3.ap-south-1.amazonaws.com/planner%402x.png",
          parent_core_value_id: 2,
        },
      ]);
    }
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete("core_values", null);
  },
};
