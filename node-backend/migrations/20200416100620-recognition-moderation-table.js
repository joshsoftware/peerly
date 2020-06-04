"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars
exports.setup = /*eslint-disable-line node/exports-style*/ (
  options,
  seedLink
) => {
  dbm = options.dbmigrate;
  type = dbm.dataType; // eslint-disable-line no-unused-vars
  seed = seedLink; // eslint-disable-line no-unused-vars
};
exports.up = /*eslint-disable-line node/exports-style*/ (db, callback) => {
  db.createTable(
    "recognition_moderation",
    {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
        notNull: true,
      },
      recognition_id: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "recognition_recognitionID_fk",
          table: "recognitions",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      is_inappropriate: {
        type: "boolean",
        notNull: true,
      },
      moderator_comment: {
        type: "string",
        length: 45,
        notNull: false,
      },
      moderated_by: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "user_moderatedID_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      moderated_at: {
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
  db.dropTable("recognition_moderation", callback);
};

exports._meta = /*eslint-disable-line node/exports-style*/ {
  version: 1,
};
