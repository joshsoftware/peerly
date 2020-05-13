const moment = require("moment");
var cron = require("node-cron");

const db = require("../models/sequelize");
cron.schedule(process.env.TOKEN_DELETION_INTERVAL, () => {
  db.sequelize.query(
    "delete from user_blacklisted_tokens where expires_at < " +
      moment.utc().unix() +
      ""
  );
});
