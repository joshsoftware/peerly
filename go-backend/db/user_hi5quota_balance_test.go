package db

import (
	"time"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/jmoiron/sqlx"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"
)

type UserHi5QuotaBalanceTestSuite struct {
	suite.Suite
	dbStore Storer
	db      *sqlx.DB
	sqlmock sqlmock.Sqlmock
}

func (suite *UserHi5QuotaBalanceTestSuite) SetupTest() {
	dbStore, dbConn, sqlmock := InitMockDB()
	suite.dbStore = dbStore
	suite.db = dbConn
	suite.sqlmock = sqlmock
}

func (suite *UserHi5QuotaBalanceTestSuite) TearDownTest() {
	suite.db.Close()
}

func (suite *UserHi5QuotaBalanceTestSuite) TestResetHi5QuotaBalanceJob() {
	suite.sqlmock.ExpectBegin()
	renewalFrequency := "WEEKLY"
	startDay := time.Now().Weekday()
	weekDay := time.Now().Weekday()
	hi5Limit := 10
	var org = Organization{
		ID:                       1,
		Name:                     "test organization",
		ContactEmail:             "test@gmail.com",
		DomainName:               "www.testdomain.com",
		SubscriptionStatus:       1,
		SubscriptionValidUpto:    1588073442241,
		Hi5Limit:                 hi5Limit,
		Hi5QuotaRenewalFrequency: renewalFrequency,
		Timezone:                 "IST",
	}
	mockedOrganizationsRows := suite.sqlmock.NewRows([]string{"id", "name", "contact_email", "domain_name", "subscription_status", "subscription_valid_upto", "hi5_limit", "hi5_quota_renewal_frequency", "timezone"}).
		AddRow(1, "test organization", "test@gmail.com", "www.testdomain.com", 1, 1588073442241, 5, "WEEKLY", "IST")

	suite.sqlmock.ExpectQuery("SELECT organizations").
		WillReturnRows(mockedOrganizationsRows)

	if renewalFrequency == org.Hi5QuotaRenewalFrequency {
		if startDay.String() == weekDay.String() {
			suite.sqlmock.ExpectExec("UPDATE users").WithArgs(org.Hi5Limit, org.ID).
				WillReturnResult(sqlmock.NewResult(1, 1))
		}

	}
	err := suite.dbStore.ResetHi5QuotaBalanceJob()
	assert.Nil(suite.T(), suite.sqlmock.ExpectationsWereMet())
	assert.Nil(suite.T(), err)
}
