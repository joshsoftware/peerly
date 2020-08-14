CREATE TABLE core_values(
    id SERIAL PRIMARY KEY NOT NULL UNIQUE,
    org_id INTEGER NOT NULL REFERENCES organizations(id),
    text TEXT,
    description VARCHAR(100),
    parent_id INTEGER,
    thumbnail_url VARCHAR(100),
    created_at timestamp with time zone NOT NULL default current_timestamp,
    updated_at timestamp with time zone NOT NULL
);
