-- Table definition
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create some indexes to help find roles easier
CREATE UNIQUE INDEX IF NOT EXISTS idx_roles_role ON roles(name);

-- Create a foreign key over from users(role_id) to roles(id)
ALTER TABLE IF EXISTS users ADD CONSTRAINT fk_users_role_id_roles_id FOREIGN KEY (role_id) REFERENCES roles(id);

-- Create the default role, "Employee", at migration time
INSERT INTO roles (id, name) VALUES (DEFAULT, 'Employee');
