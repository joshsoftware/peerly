package db

import (
	"database/sql"
	"errors"
	"fmt"
	"joshsoftware/peerly/config"
	"os"
	"strconv"
	"time"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/mattes/migrate"
	"github.com/mattes/migrate/database/postgres"
	_ "github.com/mattes/migrate/source/file"
	logger "github.com/sirupsen/logrus"
)

const (
	dbDriver      = "postgres"
	migrationPath = "./migrations"
)

var errFindingDriver = errors.New("no migrate driver instance found")

var oragnizationSchema = `
CREATE TABLE IF NOT EXISTS organizations (
	id serial PRIMARY KEY,
	name varchar(50),
	contact_email varchar(50),
	domain_name varchar(45),
	subscription_status integer,
	subscription_valid_upto timestamp,
	hi5_limit integer,
	hi5_quota_renewal_frequency varchar(50),
	timezone varchar(100),
	created_by integer,
	created_on timestamp,
	updated_by integer,
	updated_on timestamp
);`

type pgStore struct {
	db *sqlx.DB
}

func Init() (s Storer, err error) {
	uri := config.ReadEnvString("DB_URI")

	conn, err := sqlx.Connect(dbDriver, uri)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Cannot initialize database")
		return
	}

	// exec the schema or fail; multi-statement Exec behavior varies between
	// database drivers;  pq will exec them all, sqlite3 won't, ymmv

	conn.MustExec(oragnizationSchema)

	logger.WithField("uri", uri).Info("Connected to pg database")
	return &pgStore{conn}, nil
}

func RunMigrations() (err error) {
	uri := config.ReadEnvString("DB_URI")

	db, err := sql.Open(dbDriver, uri)
	if err != nil {
		return
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return
	}

	m, err := migrate.NewWithDatabaseInstance(getMigrationPath(), dbDriver, driver)
	if err != nil {
		return
	}

	err = m.Up()
	if err == migrate.ErrNoChange || err == nil {
		err = nil
		return
	}

	return
}

func CreateMigrationFile(filename string) (err error) {
	if len(filename) == 0 {
		err = errors.New("filename is not provided")
		return
	}

	timeStamp := time.Now().Unix()
	upMigrationFilePath := fmt.Sprintf("%s/%d_%s.up.sql", migrationPath, timeStamp, filename)
	downMigrationFilePath := fmt.Sprintf("%s/%d_%s.down.sql", migrationPath, timeStamp, filename)

	err = createFile(upMigrationFilePath)
	if err != nil {
		return
	}

	err = createFile(downMigrationFilePath)
	if err != nil {
		os.Remove(upMigrationFilePath)
		return
	}

	logger.WithFields(logger.Fields{
		"up":   upMigrationFilePath,
		"down": downMigrationFilePath,
	}).Info("Created migration files")

	return
}

func RollbackMigrations(s string) (err error) {
	uri := config.ReadEnvString("DB_URI")

	steps, err := strconv.Atoi(s)
	if err != nil {
		return
	}

	m, err := migrate.New(getMigrationPath(), uri)
	if err != nil {
		return
	}

	err = m.Steps(-1 * steps)
	if err == migrate.ErrNoChange || err == nil {
		err = nil
		return
	}

	return
}

func createFile(filename string) (err error) {
	f, err := os.Create(filename)
	if err != nil {
		return
	}

	err = f.Close()
	return
}

func getMigrationPath() string {
	return fmt.Sprintf("file://%s", migrationPath)
}
