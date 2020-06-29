package main

// @APITitle Main
// @APIDescription Main API for Microservices in Go!

import (
	"errors"
	"fmt"
	"joshsoftware/peerly/aws"
	"joshsoftware/peerly/config"
	"joshsoftware/peerly/cronjobs"
	"joshsoftware/peerly/db"

	"joshsoftware/peerly/service"
	"joshsoftware/peerly/tasks"
	"os"
	"strconv"

	logger "github.com/sirupsen/logrus"
	"github.com/urfave/cli"
	"github.com/urfave/negroni"
)

func main() {
	logger.SetFormatter(&logger.TextFormatter{
		FullTimestamp:   true,
		TimestampFormat: "02-01-2006 15:04:05",
	})

	config.Load("application")

	cliApp := cli.NewApp()
	cliApp.Name = config.AppName()
	cliApp.Version = "1.0.0"
	cliApp.Commands = []cli.Command{
		{
			Name:  "start",
			Usage: "start server",
			Action: func(c *cli.Context) error {
				return startApp()
			},
		},
		{
			Name:  "create_migration",
			Usage: "create migration file",
			Action: func(c *cli.Context) error {
				return db.CreateMigrationFile(c.Args().Get(0))
			},
		},
		{
			Name:  "migrate",
			Usage: "run db migrations",
			Action: func(c *cli.Context) error {
				return db.RunMigrations()
			},
		},
		{
			Name:      "rollback",
			Usage:     "rollback migrations [step (int)]",
			ArgsUsage: "[step (int)]",
			Action: func(c *cli.Context) error {
				if c.NArg() == 0 {
					return errors.New("migration step is required")
				}
				return db.RollbackMigrations(c.Args().Get(0))
			},
		},
	}

	if err := cliApp.Run(os.Args); err != nil {
		panic(err)
	}
}

func startApp() (err error) {
	store, err := db.Init()
	if err != nil {
		logger.WithField("err", err.Error()).Error("Database init failed")
		return
	}
	awsstore, err := aws.Init()
	if err != nil {
		logger.WithField("err", err.Error()).Error("AWS service init failed")
		return
	}

	deps := service.Dependencies{
		Store:    store,
		AWSStore: awsstore,
	}

	// Start up all the background tasks Peerly depends upon
	tasks.Init(deps)

	// mux router
	router := service.InitRouter(deps)

	// Start up all the background tasks Peerly depends upon
	cronjobs.Init(deps)
	// init web server
	server := negroni.Classic()
	server.UseHandler(router)

	port := config.AppPort() // This can be changed to the service port number via environment variable.
	addr := fmt.Sprintf(":%s", strconv.Itoa(port))

	server.Run(addr)
	return
}
