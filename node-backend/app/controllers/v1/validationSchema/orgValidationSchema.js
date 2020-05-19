const yup = require("yup");

module.exports.insertSchema = () => {
  return yup.object().shape({
    name: yup.string({ name: "should be text" }).required({ name: "required" }),
    contact_email: yup.string().email({ contact_email: "should be valid" }),
    domain_name: yup
      .string()
      .matches(
        {
          regex: /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g,
        },
        { domain_name: "should be valid" }
      )
      .required({ domain_name: "required" })
      .typeError({ domain_name: "should be valid" }),
    subscription_status: yup
      .number()
      .required({ subscription_status: "required" })
      .typeError({ subscription_status: "should be number" }),
    subscription_valid_upto: yup
      .number()
      .required({ subscription_valid_upto: "required" })
      .typeError({ subscription_valid_upto: "should be number" }),
    hi5_limit: yup
      .number()
      .required({ hi5_limit: "required" })
      .typeError({ hi5_limit: "should be number" }),
    hi5_quota_renewal_frequency: yup
      .string({
        hi5_quota_renewal_frequency: "should be string",
      })
      .required({
        hi5_quota_renewal_frequency: "required",
      }),
    timezone: yup.string().required({ timezone: "required" }),
  });
};

module.exports.getByIdSchema = () => {
  return yup.object().shape({
    id: yup
      .number()
      .required({ id: "required" })
      .typeError({ id: "should be number " }),
  });
};

module.exports.updateSchema = () => {
  return yup.object().shape({
    name: yup.string({ name: "should be text" }),
    contact_email: yup.string().email({ contact_email: "should be valid" }),
    domain_name: yup
      .string()
      .matches(
        {
          regex: /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g,
        },
        { domain_name: "should be valid" }
      )
      .typeError({ domain_name: "should be valid" }),
    subscription_status: yup
      .number()
      .typeError({ subscription_status: "should be number" }),
    subscription_valid_upto: yup
      .number()
      .typeError({ subscription_valid_upto: "should be number" }),
    hi5_limit: yup.number().typeError({ hi5_limit: "should be number" }),
    hi5_quota_renewal_frequency: yup.string({
      hi5_quota_renewal_frequency: "should be string",
    }),
    timezone: yup.string(),
  });
};
