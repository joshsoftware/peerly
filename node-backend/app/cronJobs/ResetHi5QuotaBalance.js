const log4js = require("log4js");
var cron = require("node-cron");
const moment = require("moment");

const db = require("../models/sequelize");
const Organizations = db.organizations;
const Users = db.users;

const now = moment();
const logger = log4js.getLogger();

cron.schedule(process.env.TIME_RESET_HI5_QUOTA, async () => {
  try {
    const noOfOrganisation = await Organizations.count();
    let iterator = 1;
    while (iterator < noOfOrganisation + 1) {
      try {
        const organisationObject = await Organizations.findOne({
          where: { id: iterator },
          attributes: ["hi5_limit", "hi5_quota_renewal_frequency"],
        });

        let updateHi5Quota = {
          hi5_quota_balance: organisationObject.dataValues.hi5_limit,
        };

        if (
          organisationObject.dataValues.hi5_quota_renewal_frequency == "WEEKLY"
        ) {
          if (now.format("dddd") == "Monday") {
            Users.update(updateHi5Quota, {
              where: { org_id: iterator },
            });
          }
        } else if (
          organisationObject.dataValues.hi5_quota_renewal_frequency == "MONTHLY"
        ) {
          if (now.format("DD") == 1) {
            Users.update(updateHi5Quota, {
              where: { org_id: iterator },
            });
          }
        }
      } catch (error) {
        logger.error("executing reset hi5 quota cron job");
        logger.error(
          "error accured at find hi5_limit and quota_renewal_frequency organisations"
        );
        logger.error(error);
        logger.info("=========================================");
      }
      iterator++;
    }
  } catch (error) {
    logger.error("executing reset hi5 quota cron job");
    logger.error("error accured at counting organisations");
    logger.error(error);
    logger.info("=========================================");
  }
});
