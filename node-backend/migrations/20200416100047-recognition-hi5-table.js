"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars
// Recognition_hi5 Table Migration
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType; // eslint-disable-line no-undef
  seed = seedLink; // eslint-disable-line no-undef
};

exports.up = function (db, callback) {
  db.createTable(
    "recognition_hi5",
    {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
        notNull: true,
      },
      recognition_id: {
        type: "int",
        foreignKey: {
          name: "recongnitionIdInRecongnitionCommentsForeignKey",
          table: "recognitions",
          rules: {
            onDelete: "NO ACTION",
          },
          mapping: "id",
        },
        notNull: true,
      },
      hi5_by: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "hi5_by_users_id_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      hi5_given_on_date: {
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
  db.dropTable("recognition_hi5", callback);
};

exports._meta = {
  version: 1,
};
