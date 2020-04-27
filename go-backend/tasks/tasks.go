package tasks

import (
	"joshsoftware/peerly/service"
	"time"

	"github.com/go-co-op/gocron"
)

// Init - called in main.go this method "bootstraps" the goroutine for
// cleaning up blacklisted tokens (handled in the db package) and can
// be used for other such tasks. This is run in place of cron or
// external scripts that would otherwise do the same thing.
func Init(deps service.Dependencies) {
	s1 := gocron.NewScheduler(time.UTC)
	s1.Every(3).Seconds().Do(deps.Store.CleanBlacklistedTokens)
	s1.Start()
}
