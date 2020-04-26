const db = require("../models/sequelize");

setInterval(() => {
  const date = new Date();
  const delete_token_time = Math.round(date.getTime() / 1000);
  db.sequelize.query(
    "delete from user_blacklisted_tokens where expiry_date < '" +
      delete_token_time +
      "'"
  );
}, process.env.TOKEN_DELETION_INTERVAL);
