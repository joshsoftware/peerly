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
CREATE TABLE IF NOT EXISTS organizations (
	id serial PRIMARY KEY,
	name varchar(50),
	contact_email varchar(50),
	domain_name varchar(45),
	subscription_status integer,
	subscription_valid_upto TIMESTAMP,
	hi5_limit integer,
	hi5_quota_renewal_frequency varchar(50),
	timezone varchar(100),
	created_by integer,
	updated_by integer,
	updated_on TIMESTAMP
);
`

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
