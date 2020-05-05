package db

import (
	"context"
  "fmt"
)

const (
	createRecognitionHi5Query = `INSERT INTO recognition_hi5 (
		recognition_id,
		comment,
		given_by,
		given_at
		) VALUES ($1, $2, $3, $4);`
)

type RecognitionHi5 struct {
	Id int  `db:"id" json:"id"`
	RecognitionId int `db:"recognition_id" json:"recognition_id"`
	Comment string  `db:"comment" json:"comment"`
	GivenBy int `db:"given_by" json:"given_by"`
	GivenAt int64 `db:"given_at" json:"given_at"`
}

func (s *pgStore)CreateRecognitionHi5(ctx context.Context, reqHi5 RecognitionHi5)(err error){
  // TODO
  fmt.Println(reqHi5, "Object")
  return
}