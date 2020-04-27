"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars

// Core Values Table Migration
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType; // eslint-disable-line no-undef
  seed = seedLink; // eslint-disable-line no-undef
};

exports.up = function (db, callback) {
  db.createTable(
    "core_values",
    {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
        notNull: true,
      },
      org_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "org_id_organizations_id_fk",
          table: "organizations",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      core_value_text: {
        type: "text",
        notNull: true,
      },
      description: {
        type: "string",
        length: 100,
      },
      parent_core_value_id: {
        type: "int",
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
  db.dropTable("core_values", callback);
};
exports._meta = {
  version: 1,
};
