"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars

exports.setup = /*eslint-disable-line node/exports-style*/ (
  options,
  seedLink
) => {
  dbm = options.dbmigrate;
  type = dbm.dataType; // eslint-disable-line no-undef
  seed = seedLink; // eslint-disable-line no-undef
};

exports.up = /*eslint-disable-line node/exports-style*/ (db, callback) => {
  db.addColumn(
    "recognition_hi5",
    "comment",
    {
      type: "text",
    },
    function (err) {
      if (err) return callback(err);
      return callback();
    }
  );
};

exports.down = /*eslint-disable-line node/exports-style*/ (db, callback) => {
  db.removeColumn("recognition_hi5", "comment", function (err) {
    if (err) return callback(err);
    return callback();
  });
};

exports._meta = /*eslint-disable-line node/exports-style*/ {
  version: 1,
};
