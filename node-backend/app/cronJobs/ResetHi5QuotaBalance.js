var cron = require("node-cron");

const db = require("../models/sequelize");
cron.schedule(process.env.TIME_RESET_HI5_QUOTA, async () => {
  await db.sequelize.query(
    "create or replace function resetHi5Quota() returns Int as $$ declare data Record; date Int; day varchar(10); begin select date_part into date('day',current_date); select to_char into day(current_date,'day'); for data in SELECT hi5_quota_renewal_frequency,id FROM organizations LOOP if( (data.hi5_quota_renewal_frequency='WEEKLY') and  (day ='monday')) then UPDATE users SET hi5_quota_balance=(select hi5_limit from organizations where id = data.id ) where org_id = data.id; return 2; else if((data.hi5_quota_renewal_frequency='MONTHLY') and (date = 1)) then UPDATE users SET hi5_quota_balance=(select hi5_limit from organizations where id = data.id ) where org_id = data.id; return 1; end if; end if; end LOOP; return 3; end; $$ language plpgsql security definer;"
  );
  db.sequelize.query("select resetHi5Quota();");
});
