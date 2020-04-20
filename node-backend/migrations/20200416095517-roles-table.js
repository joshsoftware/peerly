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
	
  db.createTable('roles', {
    id: {
      type: 'int',
      notNull: true,
      primaryKey: true,
      autoIncrement: true
    },	
    role: {
      type: 'string',
      length: 15,
	  notNull: true,
    },
   
  }, function(err) {
    if (err) return callback(err);
    return callback();
  });
};
exports.down = function(db, callback) {
  db.dropTable('roles', callback);
};
