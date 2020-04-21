"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars

exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate; // eslint-disable-line no-unused-vars
  type = dbm.dataType; // eslint-disable-line no-unused-vars
  seed = seedLink;
};

exports.up = function (db, callback) {
  db.createTable(
    "reported_recognitions",
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
      type_of_reporting: {
        type: "string",
        length: 45,
        notNull: true,
      },
      reason_for_reporting: {
        type: "text",
        notNull: true,
      },
      reported_by: {
        type: "int",
        notNull: true,
        foreignKey: {
          name: "user_recognitionID_fk",
          table: "users",
          mapping: "id",
          rules: {
            onDelete: "NO ACTION",
          },
        },
      },
      reported_on: {
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
  db.dropTable("reported_recognitions", callback);
};

exports._meta = {
  version: 1,
};


