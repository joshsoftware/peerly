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
    "user_badges",
    {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
        notNull: true,
      },
      badges_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "badges_badgesID_fk",
          table: "badges",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      user_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "user_badges_userID_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      obtained_on: {
        type: "timestamp",
        notNull: true,
      },
    },
    function (err) {
      if (err) return callback(err);
      return callback();
    }
  );
};
exports.down = function (db, callback) {
  db.dropTable("user_badges", callback);
};

exports._meta = {
  version: 1,
};
