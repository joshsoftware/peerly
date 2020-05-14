package main

import (
	"time"

	"joshsoftware/peerly/service"

	"github.com/go-co-op/gocron"
)

// Init - called in main.go this method "bootstraps" the goroutine for
// cleaning up blacklisted tokens (handled in the db package) and can
// be used for other such tasks. This is run in place of cron or
// external scripts that would otherwise do the same thing.
func Init(deps service.Dependencies) {

	s1 := gocron.NewScheduler(time.UTC)
	s1.Every(1).Day().At("00:05").Do(deps.Store.ResetHi5QuotaBalanceJob)
	s1.Start()
}
