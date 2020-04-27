"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars
// Recognition Table Migration

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
    "recognitions",
    {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
        notNull: true,
      },
      core_value_id: {
        type: "int",
        foreignKey: {
          name: "coreValuesInRecongnitionsForeignKey",
          table: "core_values",
          rules: {
            onDelete: "NO ACTION",
          },
          mapping: "id",
        },
        notNull: true,
      },
      recognition_text: {
        type: "text",
        notNull: true,
      },
      recognition_for: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "recognition_for_users_id_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      recognition_by: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "recognition_by_users_id_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      recognition_on: {
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
  db.dropTable("recognitions", callback);
};

exports._meta = /*eslint-disable-line node/exports-style*/ {
  version: 1,
};
