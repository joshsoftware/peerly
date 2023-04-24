CREATE TABLE IF NOT EXISTS users (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  org_id BIGINT REFERENCES organizations(id), -- TODO: Foreign Key over to Organizations table when that's done
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  display_name VARCHAR(30) DEFAULT NULL,
  profile_image_url TEXT DEFAULT NULL,
  soft_delete BOOLEAN DEFAULT FALSE,
  role_id BIGINT, -- TODO: Foreign Key over to Roles when that's done
  hi5_quota_balance INT DEFAULT 0,
  soft_delete_by BIGINT DEFAULT NULL, -- TODO: Foreign key over to users(id)
  soft_delete_on TIMESTAMP DEFAULT NULL,
  created_at TIMESTAMP DEFAULT (NOW() AT TIME ZONE 'UTC')
);

CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS users_soft_delete_idx ON users(soft_delete);
CREATE INDEX IF NOT EXISTS users_soft_delete_by_idx ON users(soft_delete_by);
CREATE INDEX IF NOT EXISTS users_soft_delete_on_idx ON users(soft_delete_on);
CREATE INDEX IF NOT EXISTS users_created_at_idx ON users(created_at);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique_idx ON users(email);