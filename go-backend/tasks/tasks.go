package tasks

import (
	_ "fmt"
	_ "joshsoftware/peerly/db"
	"joshsoftware/peerly/service"
	"time"

	"github.com/go-co-op/gocron"
)

func Init(deps service.Dependencies) {
	s1 := gocron.NewScheduler(time.UTC)
	s1.Every(3).Seconds().Do(deps.Store.CleanBlacklistedTokens)
	s1.Start()
}
