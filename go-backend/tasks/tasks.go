package tasks

import (
  _"fmt"
  "time"
  "github.com/go-co-op/gocron"
  "joshsoftware/peerly/service"
  _"joshsoftware/peerly/db"
)

func Init(deps service.Dependencies) {
  s1 := gocron.NewScheduler(time.UTC)
  s1.Every(3).Seconds().Do(deps.Store.CleanBlacklistedTokens)
  <- s1.Start()
}
