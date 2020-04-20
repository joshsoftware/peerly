'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
	
  db.createTable('user_blacklisted_token', {
    id: {
      type: 'int',
      notNull: true,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: 'int',
      notNull: true,
      foreignKey: {
        name: 'UserBlacklistedToken_userID_fk',
        table: 'users',
        mapping: 'id',
	  rules: {
        onDelete: 'NO ACTION'
        },
      }
    },
    token: {
      type: 'text',
	  notNull: true,
    },
    expiry_date: {
      type: 'timestamp',
	  notNull: true,
    }
	
    
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });
};
exports.down = function(db, callback) {
  db.dropTable('user_blacklisted_token', callback);
};

exports._meta = {
  "version": 1
};
