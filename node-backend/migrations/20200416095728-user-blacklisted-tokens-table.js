"use strict";
var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars
exports.setup = /*eslint-disable-line node/exports-style*/ (
  options,
  seedLink
) => {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};
exports.up = /*eslint-disable-line node/exports-style*/ (db, callback) => {
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
      expires_at: {
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

exports.down = /*eslint-disable-line node/exports-style*/ (db, callback) => {
  db.dropTable("user_blacklisted_tokens", callback);
};

exports._meta = /*eslint-disable-line node/exports-style*/ {
  "version": 1 // eslint-disable-line prettier/prettier
};
