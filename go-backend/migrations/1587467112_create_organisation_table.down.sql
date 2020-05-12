-- First, drop the foriegn key on users(org_id) -> organizations(id)
ALTER TABLE IF EXISTS users DROP CONSTRAINT IF EXISTS fk_users_org_id_organizations_id;
DROP TABLE IF EXISTS organizations;
