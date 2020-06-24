CREATE TABLE badges (
  id serial PRIMARY KEY,
	name varchar(50),
    org_id integer,
	hi5_count_required integer,
	hi5_frequency varchar(50)
);
