package db

import (
	"joshsoftware/peerly/config"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	logger "github.com/sirupsen/logrus"
)

// Create your schema here (sample provided below)
// If this schema is too big, put it in a schema.go file
var schema = `
CREATE TABLE IF NOT EXISTS users (
	name text,
	age integer
);

CREATE TABLE IF NOT EXISTS roles (
	role text
);

CREATE TABLE IF NOT EXISTS core_values (
	role text,
	organisation_id integer,
	core_value_text text,
	description text,
	created_at time,
	updated_at time
);`

type pgStore struct {
	db *sqlx.DB
}

func Init() (s Storer, err error) {
	uri := config.ReadEnvString("DB_URI")

	conn, err := sqlx.Connect("postgres", uri)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Cannot initialize database")
		return
	}

	// exec the schema or fail; multi-statement Exec behavior varies between
	// database drivers;  pq will exec them all, sqlite3 won't, ymmv
	conn.MustExec(schema)

	logger.WithField("uri", uri).Info("Connected to pg database")

	return &pgStore{conn}, nil
}
