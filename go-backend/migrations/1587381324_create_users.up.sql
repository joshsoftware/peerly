CREATE TABLE users
(
  id serial PRIMARY KEY,
  org_id integer,
  first_name character(100),
  last_name character(100),
  email character(100),
  display_name character(100),
  profile_image character(150),
  soft_delete boolean,
  role_id integer,
  hi5_quota_balance integer,
  soft_delete_by integer,
  soft_delete_at BIGINT
);
