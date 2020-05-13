-- To remove this table we first have to drop the foreign key the users
-- table has over to it.
ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS fk_users_role_id_roles_id;

-- Now we can safely drop the roles table
DROP TABLE roles;