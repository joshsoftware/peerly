CREATE TABLE recognition_moderation (
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
	recognition_id integer REFERENCES recognitions(id),
	is_inappropriate BOOLEAN default FALSE,
	moderator_comment TEXT,
	moderated_by INTEGER REFERENCES users(id),
	moderated_at BIGINT,
	created_at timestamp with time zone NOT NULL default current_timestamp,
    updated_at timestamp with time zone NOT NULL
);
