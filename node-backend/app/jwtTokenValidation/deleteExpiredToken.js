const db = require("../models/sequelize");

setInterval((req, res) => {
  const date = new Date();
  const delete_token_time = Math.round(date.getTime() / 1000);
  db.sequelize
    .query(
      "delete from user_blacklisted_tokens where expiry_date < '" +
        delete_token_time +
        "'"
    )
    .catch(() => {
      res.status(500).send({
        error: {
          message: "internal server error",
        },
      });
    });
}, process.env.TOKEN_DELETION_INTERVAL);
