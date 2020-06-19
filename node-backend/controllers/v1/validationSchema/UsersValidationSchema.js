const yup = require("yup");

module.exports.softDeleteUser = () => {
  return yup.object().shape({
    id: yup
      .number()
      .typeError({ id: "should be number" })
      .required({ id: "required" }),
  });
};

module.exports.updateUser = () => {
  return yup.object().shape({
    first_name: yup
      .string()
      .typeError({ first_name: "should be string" })
      .required({ first_name: "required" }),
    last_name: yup
      .string()
      .typeError({ last_name: "should be string" })
      .required({ last_name: "required" }),
    display_name: yup
      .string()
      .typeError({ display_name: "should be string" })
      .required({ display_name: "required" }),
    profile_image_url: yup
      .string()
      .typeError({ profile_image_url: "should be string" }),
  });
};

module.exports.updateUserByAdmin = () => {
  return yup.object().shape({
    role_id: yup
      .number()
      .typeError({ role_id: "should be number" })
      .required({ role_id: "required" }),
    userId: yup.number().typeError({ id: "should be number" }),
  });
};

module.exports.getProfileById = () => {
  return yup.object().shape({
    id: yup
      .number()
      .typeError({ id: "should be number" })
      .required({ id: "required" }),
  });
};

module.exports.findUsersByOrg = () => {
  return yup.object().shape({
    org_id: yup.number().typeError({ org_id: "should be a number" }),
    starts_with: yup.string().typeError({ starts_with: "should be a string" }),
    limit: yup.number().typeError({ limit: "should be a number" }),
    offset: yup.number().typeError({ offset: "should be a number" }),
  });
};
