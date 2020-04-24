"use strict";

var dbm;
var type; // eslint-disable-line no-unused-vars
var seed; // eslint-disable-line no-unused-vars
module.exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};
module.exports.up = function (db, callback) {
  db.createTable(
    "roles",
    {
      id: {
        type: "int",
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: "string",
        length: 15,
        notNull: true,
      },
    },
    function (err) {
      if (err) return callback(err);
      return callback();
    }
  );
};
module.exports.down = function (db, callback) {
  db.dropTable("roles", callback);
};
