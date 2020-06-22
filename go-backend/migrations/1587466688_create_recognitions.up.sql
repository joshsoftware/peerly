CREATE TABLE recognitions (
  id serial PRIMARY KEY,
  core_value_id INTEGER,
  text TEXT,
  given_for INTEGER,
  given_by INTEGER,
  given_at BIGINT
);
