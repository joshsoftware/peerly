package db

import (
	"context"
	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
	"time"
)

// Define the suite, and absorb the built-in basic suite
// functionality from testify - including assertion methods.
type RecognitionModerationTestSuite struct {
	suite.Suite
	dbStore Storer
	db      *sqlx.DB
	sqlmock sqlmock.Sqlmock
}

func (suite *RecognitionModerationTestSuite) SetupTest() {
	dbStore, dbConn, sqlmock := InitMockDB()
	suite.dbStore = dbStore
	suite.db = dbConn
	suite.sqlmock = sqlmock
	now = time.Now()
	mockedRows = suite.getMockedRows(now)
}

func (suite *RecognitionModerationTestSuite) TearDownTest() {
	suite.db.Close()
}

func (suite *RecognitionModerationTestSuite) getMockedRows(now time.Time) (mockedRows *sqlmock.Rows) {
	mockedRows = suite.sqlmock.NewRows([]string{"id", "recognition_id", "is_inappropriate", "moderator_comment", "moderated_by", "moderated_at", "created_at", "updated_at"}).
		AddRow(1, 1, true, "Test Comment", 1, now.Unix(), now, now)
	return
}

func (suite *RecognitionModerationTestSuite) TestCreateRecognitionModerationSuccess() {
	isInappropriate := true
	expectedRecognitionModeration := RecognitionModeration{
		ID:               int64(1),
		RecognitionID:    int64(1),
		IsInappropriate:  &isInappropriate,
		ModeratorComment: "Test Comment",
		ModeratedBy:      int64(1),
		ModeratedAt:      now.Unix(),
		CreatedAt:        now,
		UpdatedAt:        now,
	}

	suite.sqlmock.ExpectQuery("INSERT INTO recognition_moderation").
		WithArgs(1, true, "Test Comment", 1, now.Unix(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnRows(mockedRows)

	resp, err := suite.dbStore.CreateRecognitionModeration(context.Background(), expectedRecognitionModeration.ID, expectedRecognitionModeration)

	assert.Equal(suite.T(), expectedRecognitionModeration, resp)
	assert.Nil(suite.T(), err)
}

func (suite *RecognitionModerationTestSuite) TestCreateRecognitionModerationFailure() {
	suite.db.Close()

	isInappropriate := true
	expectedRecognitionModeration := RecognitionModeration{
		ID:               int64(1),
		RecognitionID:    int64(1),
		IsInappropriate:  &isInappropriate,
		ModeratorComment: "Test Comment",
		ModeratedBy:      int64(1),
		ModeratedAt:      now.Unix(),
		CreatedAt:        now,
		UpdatedAt:        now,
	}

	suite.sqlmock.ExpectQuery("INSERT INTO recognition_moderation").
		WithArgs(1, true, "Test Comment", 1, now.Unix(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnRows(mockedRows)

	resp, err := suite.dbStore.CreateRecognitionModeration(context.Background(), expectedRecognitionModeration.ID, expectedRecognitionModeration)

	assert.Equal(suite.T(), RecognitionModeration{}, resp)
	assert.NotNil(suite.T(), err)
}
