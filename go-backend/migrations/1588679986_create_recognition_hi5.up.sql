CREATE TABLE recognition_hi5 (
  id serial PRIMARY KEY,
  recognition_id integer,
  comment text,
  given_by integer REFERENCES users(id),
  given_at BIGINT
);
