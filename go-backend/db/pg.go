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
	// TODO: This repo is archived and they say to use golang-migrate/migrate instead; change?
	"github.com/mattes/migrate"
	"github.com/mattes/migrate/database/postgres"

	logger "github.com/sirupsen/logrus"

	// Import PostgreSQL database driver
	_ "github.com/lib/pq"

	// For database migrations
	_ "github.com/mattes/migrate/source/file"
)

const (
	dbDriver = "postgres"
)

var errFindingDriver = errors.New("no migrate driver instance found")

type pgStore struct {
	db *sqlx.DB
}

// Init - initialize database connection and return the db store
func Init() (s Storer, err error) {
	uri := config.ReadEnvString("DB_URI")

	conn, err := sqlx.Connect(dbDriver, uri)
	if err != nil {
		logger.WithField("err", err.Error()).Error("Cannot initialize database")
		return
	}

	logger.WithField("uri", uri).Info("Connected to pg database")
	return &pgStore{conn}, nil
}

// RunMigrations - runs all database migrations (see ../migrtions/*.up.sql)
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

// CreateMigrationFile - Creates a boilerplate *.sql files for a database migration
func CreateMigrationFile(filename string) (err error) {
	if len(filename) == 0 {
		err = errors.New("filename is not provided")
		return
	}

	timeStamp := time.Now().Unix()
	upMigrationFilePath := fmt.Sprintf("%s/%d_%s.up.sql", config.ReadEnvString("MIGRATION_FOLDER_PATH"), timeStamp, filename)
	downMigrationFilePath := fmt.Sprintf("%s/%d_%s.down.sql", config.ReadEnvString("MIGRATION_FOLDER_PATH"), timeStamp, filename)

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

// RollbackMigrations - Used to run the "down" database migrations in ../migrations/*.down.sql
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
	return fmt.Sprintf("file://%s", config.ReadEnvString("MIGRATION_FOLDER_PATH"))
}
