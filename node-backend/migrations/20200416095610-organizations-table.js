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
    "organizations",
    {
      id: {
        type: "int",
        notNull: true,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: "string",
        length: 50,
        notNull: true,
      },
      contact_email: {
        type: "string",
        length: 50,
        notNull: false,
      },
      domain_name: {
        type: "string",
        length: 45,
        notNull: true,
      },
      subscription_status: {
        type: "int",
        notNull: true,
      },
      subscription_valid_upto: {
        type: "bigint",
        notNull: true,
      },
      hi5_limit: {
        type: "int",
        notNull: true,
      },
      hi5_quota_renewal_frequency: {
        type: "string",
        length: 9,
        notNull: false,
      },
      timezone: {
        type: "text",
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
  db.dropTable("organizations", callback);
};

module.exports._meta = {
  "version": 1, // eslint-disable-line prettier/prettier
};
