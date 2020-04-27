const moment = require("moment");
var cron = require("node-cron");

const db = require("../models/sequelize");
let epoch = moment().valueOf();
epoch = (epoch - (epoch % 1000)) / 1000;
cron.schedule(process.env.TOKEN_DELETION_INTERVAL, () => {
  db.sequelize.query(
    "delete from user_blacklisted_tokens where expiry_date < '" + epoch + "'"
  );
});
