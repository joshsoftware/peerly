CREATE TABLE IF NOT EXISTS user_blacklisted_tokens(
  id SERIAL NOT NULL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  token TEXT,
  expiration_date TIMESTAMP
);

CREATE INDEX IF NOT EXISTS user_blacklisted_tokens_user_id_idx ON user_blacklisted_tokens(user_id);
CREATE INDEX IF NOT EXISTS user_blacklisted_tokens_token_idx ON user_blacklisted_tokens(token);
CREATE INDEX IF NOT EXISTS user_blacklisted_tokens_expiration_date_idx ON user_blacklisted_tokens(expiration_date);
