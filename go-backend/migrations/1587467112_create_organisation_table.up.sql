CREATE TABLE organizations (
  id serial PRIMARY KEY,
	name varchar(50),
	contact_email varchar(50),
	domain_name varchar(45),
	subscription_status integer,
	subscription_valid_upto BIGINT,
	hi5_limit integer,
	hi5_quota_renewal_frequency varchar(50),
	timezone varchar(100)
);
