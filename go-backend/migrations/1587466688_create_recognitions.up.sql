CREATE TABLE recognitions (
  id serial PRIMARY KEY,
  core_values_id INTEGER,
  recognition_text TEXT,
  recognition_for INTEGER,
  recognition_by INTEGER,
  recognition_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
