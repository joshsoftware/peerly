const log4js = require("log4js");
var cron = require("node-cron");
const moment = require("moment");

const db = require("../models/sequelize");
const Organizations = db.organizations;
const Users = db.users;

const logger = log4js.getLogger();

cron.schedule(process.env.TIME_RESET_HI5_QUOTA, async () => {
  try {
    const organisationObject = await Organizations.findAll({
      attributes: ["id", "hi5_limit", "hi5_quota_renewal_frequency"],
    });
    let iterator = 0;
    while (iterator < organisationObject.length) {
      let updateHi5Quota = {
        hi5_quota_balance: organisationObject[iterator].dataValues.hi5_limit,
      };
      if (
        organisationObject[iterator].dataValues.hi5_quota_renewal_frequency ==
        "WEEKLY"
      ) {
        if (moment().format("dddd") == "Monday") {
          Users.update(updateHi5Quota, {
            where: { org_id: organisationObject[iterator].dataValues.id },
          });
        }
      } else if (
        organisationObject[iterator].dataValues.hi5_quota_renewal_frequency ==
        "MONTHLY"
      ) {
        if (moment().format("DD") == 1) {
          Users.update(updateHi5Quota, {
            where: { org_id: organisationObject[iterator].dataValues.id },
          });
        }
      }
      iterator++;
    }
  } catch (error) {
    logger.error("executing reset hi5 quota cron job");
    logger.error(
      "error accured at find hi5_limit and quota_renewal_frequency and id of organisations"
    );
    logger.error(error);
    logger.info("=========================================");
  }
});
