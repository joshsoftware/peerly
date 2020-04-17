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

CREATE TABLE IF NOT EXISTS roles(
  id SERIAL not null primary key,
  role varchar(15)
);

CREATE INDEX IF NOT EXISTS roles_id_index ON roles (id);
CREATE INDEX IF NOT EXISTS roles__role_index ON roles (lower(role));

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

    pgstore := &pgStore{conn}

    // exec the schema or fail; multi-statement Exec behavior varies between
    // database drivers;  pq will exec them all, sqlite3 won't, ymmv
    conn.MustExec(schema)

    logger.WithField("uri", uri).Info("Connected to pg database")

    return pgstore, nil
}
