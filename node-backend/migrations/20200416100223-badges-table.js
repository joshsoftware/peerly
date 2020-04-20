'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('badges', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      notNull: true
    },
    name: {
      type: 'string',
      length: 45,
      notNull: true
      
    },
    org_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'organizations_orgID_fk',
        table: 'organizations',
        mapping: 'id',
        rules: {
          onDelete: 'NO ACTION'
        }
      }
    },
    hi5_count_required: {
      type: 'int',
      notNull: true
    },
    hi5_frequency: {
      type: 'string',
      length: 45,
      notNull: true
    }
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });
};
exports.down = function(db, callback) {
  db.dropTable('badges', callback);
};

exports._meta = {
  "version": 1
};
