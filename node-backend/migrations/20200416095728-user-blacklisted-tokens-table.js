"use strict";
var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars
module.exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};
module.exports.up = function (db, callback) {
  db.createTable(
    "user_blacklisted_tokens",
    {
      id: {
        type: "int",
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "UserBlacklistedToken_userID_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      token: {
        type: "text",
        notNull: true,
      },
      expiry_date: {
        type: "bigint",
        notNull: true,
      },
    },
    function (err) {
      if (err) return callback(err);
      return callback();
    }
  );
};
module.exports.down = function (db, callback) {
  db.dropTable("user_blacklisted_tokens", callback);
};

module.exports._meta = {
  "version": 1 // eslint-disable-line prettier/prettier
};
