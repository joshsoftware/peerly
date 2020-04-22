CREATE TABLE core_values(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    org_id INTEGER NOT NULL,
    core_value_text TEXT,
    description VARCHAR(100),
    parent_core_value_id INTEGER,
    created_at timestamp with time zone NOT NULL default current_timestamp,
    updated_at timestamp with time zone NOT NULL
);
