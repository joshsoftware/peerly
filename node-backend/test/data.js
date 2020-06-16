const faker = require("faker");

const data = {};
data.organizations = {
  name: faker.name.firstName(),
  contact_email: faker.internet.email(),
  domain_name: faker.internet.domainName(),
  subscription_status: faker.random.number(1),
  subscription_valid_upto: faker.random.number(7),
  hi5_limit: faker.random.number(1),
  hi5_quota_renewal_frequency: faker.lorem.words(1),
  timezone: faker.address.city(),
};

data.user = {
  org_id: faker.random.number(),
  first_name: faker.name.firstName(),
  email: faker.internet.email(),
  role_id: faker.random.number(),
  soft_delete: false,
  hi5_quota_balance: faker.random.number(2),
};

data.coreValue = {
  org_id: faker.random.number(),
  text: faker.lorem.words(5),
  description: faker.lorem.words(3),
  parent_core_value_id: faker.random.number(1),
  thumbnail_url: faker.internet.url(),
};

data.recognition = {
  core_value_id: faker.random.number(),
  text: faker.lorem.words(5),
  given_for: faker.random.number(),
  given_by: faker.random.number(),
  given_at: faker.random.number(5),
};

data.badges = {
  name: faker.name.firstName(),
  hi5_count_required: faker.random.number(1),
  hi5_frequency: faker.lorem.words(1),
};
module.exports = data;
