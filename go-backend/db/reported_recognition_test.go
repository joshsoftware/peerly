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
type ReportedRecognitionTestSuite struct {
	suite.Suite
	dbStore Storer
	db      *sqlx.DB
	sqlmock sqlmock.Sqlmock
}

func (suite *ReportedRecognitionTestSuite) SetupTest() {
	dbStore, dbConn, sqlmock := InitMockDB()
	suite.dbStore = dbStore
	suite.db = dbConn
	suite.sqlmock = sqlmock
	now = time.Now()
	mockedRows = suite.getMockedRows()
}

func (suite *ReportedRecognitionTestSuite) TearDownTest() {
	suite.db.Close()
}

func (suite *ReportedRecognitionTestSuite) getMockedRows() (mockedRows *sqlmock.Rows) {
	mockedRows = suite.sqlmock.NewRows([]string{"id", "recognition_id", "type_of_reporting", "reason_for_reporting", "reported_by", "reported_at", "created_at", "updated_at"}).
		AddRow(1, 1, "fraud", "Test Reason", 1, now.Unix(), now, now)
	return
}

func (suite *ReportedRecognitionTestSuite) TestCreateReportedRecognitionSuccess() {
	expectedReportedRecognition := ReportedRecognition{
		ID:                 int64(1),
		RecognitionID:      int64(1),
		TypeOfReporting:    "fraud",
		ReasonForReporting: "Test Reason",
		ReportedBy:         int64(1),
		ReportedAt:         now.Unix(),
		CreatedAt:          now,
		UpdatedAt:          now,
	}

	suite.sqlmock.ExpectQuery("INSERT INTO reported_recognitions").
		WithArgs(1, "fraud", "Test Reason", 1, now.Unix(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnRows(mockedRows)

	resp, err := suite.dbStore.CreateReportedRecognition(context.Background(), expectedReportedRecognition.ID, expectedReportedRecognition)

	assert.Equal(suite.T(), expectedReportedRecognition, resp)
	assert.Nil(suite.T(), err)
}

func (suite *ReportedRecognitionTestSuite) TestCreateReportedRecognitionFailure() {
	suite.db.Close()

	expectedReportedRecognition := ReportedRecognition{
		ID:                 int64(1),
		RecognitionID:      int64(1),
		TypeOfReporting:    "fraud",
		ReasonForReporting: "Test Reason",
		ReportedBy:         int64(1),
		ReportedAt:         now.Unix(),
		CreatedAt:          now,
		UpdatedAt:          now,
	}

	suite.sqlmock.ExpectQuery("INSERT INTO reported_recognitions").
		WithArgs(1, "fraud", "Test Reason", 1, now.Unix(), sqlmock.AnyArg(), sqlmock.AnyArg()).
		WillReturnRows(mockedRows)

	resp, err := suite.dbStore.CreateReportedRecognition(context.Background(), expectedReportedRecognition.ID, expectedReportedRecognition)

	assert.Equal(suite.T(), ReportedRecognition{}, resp)
	assert.NotNil(suite.T(), err)
}
