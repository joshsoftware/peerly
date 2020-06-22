CREATE TABLE reported_recognitions (
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
	recognition_id integer REFERENCES recognitions(id),
	type_of_reporting varchar(50),
	reason_for_reporting TEXT,
	reported_by INTEGER REFERENCES users(id),
	reported_at BIGINT,
	created_at timestamp with time zone NOT NULL default current_timestamp,
    updated_at timestamp with time zone NOT NULL
);