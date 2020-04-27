"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars

//Recongnition table migration

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
    "recognition_comments",
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
      comment: {
        type: "text",
        notNull: true,
      },
      comment_by: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "comment_by_users_id_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      commented_on: {
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
  db.dropTable("recognition_comments", callback);
};

exports._meta = /*eslint-disable-line node/exports-style*/ {
  version: 1,
};
