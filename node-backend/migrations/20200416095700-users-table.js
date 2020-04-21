"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType; // eslint-disable-line no-unused-vars
  seed = seedLink; // eslint-disable-line no-unused-vars
};
exports.up = function (db, callback) {
  db.createTable(
    "users",
    {
      id: {
        type: "int",
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      org_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "Users_usersOrgID_fk",
          table: "organizations",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      name: {
        type: "string",
        length: 30,
        notNull: true,
      },
      email: {
        type: "string",
        length: 50,
        notNull: true,
      },
      display_name: {
        type: "string",
        length: 30,
        notNull: false,
      },
      profile_image_url: {
        type: "text",
        notNull: false,
      },
      soft_delete: {
        type: "boolean",
        notNull: true,
      },
      role_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "Users_roleID_fk",
          table: "roles",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      hi5_quota_balance: {
        type: " int",
        notNull: true,
      },
      soft_delete_by: {
        type: "int",
      },
      soft_delete_on: {
        type: "timestamp",
      },
    },
    function (err) {
      if (err) return callback(err);
      return callback();
    }
  );
};
exports.down = function (db, callback) {
  db.dropTable("users", callback);
};

exports._meta = {
  "version": 1 // eslint-disable-line prettier/prettier
};
