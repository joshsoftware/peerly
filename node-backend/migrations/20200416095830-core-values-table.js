"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars

// Core Values Table Migration
exports.setup = /*eslint-disable-line node/exports-style*/ (
  options,
  seedLink
) => {
  dbm = options.dbmigrate;
  type = dbm.dataType; // eslint-disable-line no-undef
  seed = seedLink; // eslint-disable-line no-undef
};

exports.up = /*eslint-disable-line node/exports-style*/ (db, callback) => {
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
      text: {
        type: "text",
        notNull: true,
      },
      description: {
        type: "string",
        length: 100,
      },
      thumbnail_url: {
        type: "text",
        notNull: false,
      },
      parent_core_value_id: {
        type: "int",
        notNull: false,
      },
    },
    function (err) {
      if (err) return callback(err);
      return callback();
    }
  );
};

exports.down = /*eslint-disable-line node/exports-style*/ (db, callback) => {
  db.dropTable("core_values", callback);
};
exports._meta = /*eslint-disable-line node/exports-style*/ {
  version: 1,
};
