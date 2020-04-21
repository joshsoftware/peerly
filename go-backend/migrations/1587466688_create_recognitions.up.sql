CREATE TABLE recognitions (
  id serial PRIMARY KEY,
  core_values_id integer,
  recognition_text text,
  recognition_for integer,
  recognition_by integer,
  recognition_on timestamp
);
